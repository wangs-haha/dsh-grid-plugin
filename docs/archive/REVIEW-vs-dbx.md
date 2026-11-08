# Grid 插件评审 · 对照 t8y2/dbx 的优化清单

> 历史档案：保留原始调研、计划与当时的验证结果，不代表当前实现或维护约束。
> 当前行为以 [使用指南](<../user-guide.md>)、[架构](<../architecture.md>) 和 [测试指南](<../testing.md>) 为准。

评审对象：`@local/dsh-grid`（DSH 数据库工作台插件；评审时为 v0.4.0，现为 v0.5.0）
参照物：[t8y2/dbx](https://github.com/t8y2/dbx)（Rust + Tauri，100+ 数据库，桌面/Web/CLI/MCP）

> **状态：评审清单已执行完毕，版本 0.5.0。** 第 2 章的 P0 项、第 3 章的性能项、第 5 章的工程卫生项、
> 第 6 章五件事全部完成；另补上 CSV 导入、PG/SQL Server 的真实 DDL 与视图定义、MySQL/SQL Server
> 流式读取、列菜单、Insert row、行编辑器、结果截断提示，合并了重复的结构查询，修好了 `dev/` 量具
> 并借此修掉工具栏裁剪，把这些行为变更写进 [CHANGELOG.md](<../../CHANGELOG.md>)。
> 剩余项全部需要引入依赖或产品方向决定，见 §8.34。
> （`pnpm test`：108 项，104 通过 / 4 跳过，跳过的是需要真实 MySQL/PG/Redis 的用例）。逐条清单见 §8。

---

## 0. 一句话结论

Grid 的**宿主契约、安全边界和测试质量在同类插件里属于上游水平**（连接注册表加密、主键寻址才允许改行、43 个测试、双传输共用一个 router），但它现在是"**慢速局域网里的一台顺手工具**"：正确的抽象，配上会在真实规模下退化的实现。

对照 dbx，差距集中在三处：

| 维度 | Grid | dbx | 差距性质 |
| --- | --- | --- | --- |
| 执行模型 | 同步 SQLite + 单会话串行 + 无取消 | Rust 异步 + 连接池 + 可取消 | **架构**，决定规模上限 |
| 结果集处理 | 分页 + 每页 `COUNT(*)` + 全量取再截断 | 虚拟滚动 + 流式游标 | **实现**，决定大表体验 |
| 编辑与结构 | textarea 自绘高亮、只读结构页 | CodeMirror 6、表设计器、ER 图、执行计划 | **功能面**，决定替代桌面客户端的可能性 |

而 Grid 有 dbx 没有的东西：它同时是 Agent 能力（`grid_*` 工具 + workspace 绑定 + system prompt 注入）。这条线是它真正的差异化，绝大多数优化应该服务于"让 Agent 和人都能在大库上可靠工作"，而不是去追 dbx 的 100 个驱动。

---

## 1. 与 dbx 的定位差异（先说清楚，避免错误对标）

dbx 是**产品**：桌面安装包、Docker 自托管、CLI、MCP server、插件市场、自动更新、100+ 驱动、9 套编辑器主题、三种语言。Grid 是**宿主内的一个插件面板**，跑在 DSH 的 Node 进程里，UI 由 React 打进一个 ~119 KB 的 bundle。

所以：

- **不要**去对标"100+ 数据库"。Grid 的驱动面应该按"用户实际会连的 4+1 个引擎做深"来排优先级（MySQL/PG 是绝大多数，SQLite 是零安装入口，Redis/SQL Server 是补齐）。
- **应该**对标 dbx 的**交互密度**（编辑器、网格、DDL、导入导出）和**工程纪律**（CI、lint、超时/取消、流式 IO）。
- dbx 的 MCP/CLI 对 Grid 是**重复能力**：Grid 已经是 Agent 工具，不需要再做一个 MCP server。

---

## 2. P0 — 正确性与安全（建议先修，每条都能造成真实损失）

### 2.1 只读判定可被绕过，`grid_query` 并不是只读

`lib/query.js:191` 的 `isReadOnly` 只看**首个动词**是否在白名单里（`README.md:112` 据此承诺"只读 SQL"）。但：

- `EXPLAIN` 在白名单里（`lib/query.js:19-29`），而 PostgreSQL 的 `EXPLAIN ANALYZE DELETE FROM t` 会**真正执行**删除。
- `SELECT` 在白名单里，但 `SELECT ... INTO new_t`（PG/SQL Server）建表、`SELECT ... INTO OUTFILE`（MySQL）写文件。
- `WITH` 分支用整段文本正则匹配写动词（`lib/query.js:32`），既漏（`CALL` 藏在注释/字符串外的不常见写法）也误（`WITH x AS (...) SELECT ... WHERE note='delete me'` 被判成写操作，合法的读被拒）。

**建议**：只读判定改成"解析首动词 + 显式黑名单组合"：`EXPLAIN` 仅在后面不是 `ANALYZE` 时放行、`SELECT`/`WITH` 里出现 `INTO`/`FOR UPDATE`/`FOR SHARE` 即拒；`WITH` 的写动词检测先剥离字符串与注释再匹配。更稳的做法是**在数据库层加只读护栏**：PG 用只读事务（`BEGIN READ ONLY`）、MySQL 用 `SET SESSION TRANSACTION READ ONLY`、SQLite 用 `PRAGMA query_only=1`。这是 dbx 那类工具的做法——不靠正则，靠数据库自己拒绝。

### 2.2 四个网络驱动全部关闭了证书校验

- `lib/drivers/mysql.js:48` — `ssl: { rejectUnauthorized: false }`
- `lib/drivers/postgres.js:42` — 同上
- `lib/drivers/redis.js:121` — `tls: { rejectUnauthorized: false }`
- `lib/drivers/sqlserver.js:45` — `trustServerCertificate: true`

也就是说连接表单里的"TLS"勾选项**只提供加密，不提供身份认证**：任何能插到链路上的中间人都可以出示自签证书并完整读写。`README.md:128` 把连接握手列为安全项，但这里是最弱的一环。

**建议**：默认 `rejectUnauthorized: true`；连接记录里加 `sslMode: disable|require|verify-ca|verify-full`，`require` 才退化成 `false`；把 CA 路径放进 `options`（`lib/connections.js:225` 的 `options` 白名单已经允许字符串，可直接用）。

### 2.3 Redis 删除键会命中错误的库

`redis.select()`（`lib/drivers/redis.js:180`）**改变共享会话的当前库**，而 `removeKey()`（`lib/drivers/redis.js:288`）不接收 database：

```
src/client/lib/api.ts:234   redisDelete(connectionId, key)          // 没有 database
lib/api.js:432              redis.delete  → driver.removeKey({key}) // 也没有
```

用户在 db0 的键列表里点了删除，只要这个会话上一次是 db3（另一个标签页切过库），删掉的就是 db3 里同名键。同期 `redis.key`/`redis.scan` 是会传 database 的，只有 delete 漏了。

**建议**：`removeKey` 接收并 `select()` 后再删（或按库建会话）；返回里带上实际操作的 db，便于前端提示。

### 2.4 断线重试会重放写操作

`lib/session.js:159-174`：任何命中 `DISCONNECT_HINTS` 的错误都会 `close` + `acquire` + **再执行一次同样的操作**。对 `rows.insert` / `sql` 里的 INSERT 来说，"语句已在服务端提交、连接随后断开"是完全可能的状态——重试就是双写。

**建议**：`rows.insert`、`rows.update`、`rows.remove`、以及 `grid_execute` 路径显式传 `{ retry: false }`；只对读操作保留一次重试。

### 2.5 没有任何查询超时或取消

- `lib/tools.js:312` 与 `:383` 的 `timeoutMs: 30_000` 只是**工具调用**的超时，SQL 仍在数据库里跑；用户会看到工具失败但库里挂着一个长事务。
- 前端 `fetch` 没有 `AbortSignal`（`src/client/lib/api.ts:45`），翻页/改条件只丢弃响应，请求照样排队打到一个**单会话**上。
- 四个驱动都能设：MySQL `SET SESSION max_execution_time`、PG `statement_timeout`、SQL Server `LOCK_TIMEOUT`/`requestTimeout`、SQLite 用 `progress_handler`。dbx 有 cancel 按钮，这是它"敢在慢库上用"的原因。

**建议**：连接级 `options.queryTimeoutMs`，open 时下发到服务端；前端每个请求带 AbortController，新请求取消旧请求。

### 2.6 ~~`rows.update` 的冲突判定在 MySQL 上会误报~~ — **已证伪，无需修改**

初稿判断"MySQL 的 `affectedRows` 统计改变行数，改成相同值时返回 0，会被误判成 409"。核对 `node_modules/mysql2/lib/connection_config.js:286-304` 后确认：**`FOUND_ROWS` 是 mysql2 的默认 client flag**，因此 `affectedRows` 语义已经是"匹配行数"。四个引擎的返回值在这一处是一致的，冲突检测正确。

保留这条记录是为了说明：评审里的推断必须落到依赖源码上验证，否则"修一个不存在的 bug"比不修更糟。

### 2.7 校验类错误返回 500

`lib/connections.js:186/200/203` 与 `lib/extras.js:73` 抛的是普通 `Error`，`index.js:95` 只把 `GridError` 映射成 4xx，于是"host is required""port must be between 1 and 65535""a query needs a name"全部变成 **500 + 一条 warn 日志**。前端拿不到可区分的状态，日志也被噪声污染。

**建议**：`normalizeConnection` 等抛 `GridError(msg, 400)`，`updateConnection` / `getRecord` 的 not-found 抛 404。

### 2.8 SQL Server 空结果集丢列

`lib/drivers/sqlserver.js:215` / `:313` 用 `Object.keys(rows[0])` 推列名。翻到空页、过滤无命中、或 DDL 语句时 `rows[0]` 不存在 → `columns: []` → 前端表头消失（`src/client/views/TableView.tsx:405` 依赖 `data.columns`）。

**建议**：用 `result.recordset.columns` 或 `mssql` 的 `result.recordsets[0].columns` 读元数据，与 MySQL/PG 对齐。

### 2.9 列类型显示的是驱动内部编码

- MySQL：`String(field.type)`（`lib/drivers/mysql.js:195`）→ `"253"`、`"12"` 这类数字码。
- PostgreSQL：`String(field.dataTypeID)`（`lib/drivers/postgres.js:198`）→ OID `"23"`、`"1043"`。
- SQL Server：`type: ''`（`lib/drivers/sqlserver.js:215`）→ 空。

下游直接受害：结构页把 `23` 当类型展示（`src/client/views/TableView.tsx:547`）；数值右对齐的判定正则（`src/client/views/TableView.tsx:432` 匹配 `int|numeric|decimal|...`）对 MySQL/PG 永远为假，**数字列从不右对齐**。只有 SQLite 是对的（返回声明类型）。

**建议**：MySQL 用 `fields[].columnType`（如 `varchar(64)`）或类型名映射表；PG 用 `field.dataTypeID` → `pg-types` 的 OID 名称表，或直接 `format_type()`；SQL Server 从 `result.recordset.columns` 拿 `type.declaration`。

### 2.10 workspace 绑定的 `database` 被丢掉

`lib/extras.js:157` 存了 `database`，但在 `lib/tools.js:188` / `:270` 里只取了 `binding.connectionId`：

```
if (binding) connectionId = binding.connectionId
```

用户把 workspace 绑到 `shop` 库，Agent 不带 `database` 调用 `grid_query`，查询落在连接默认库上——绑定看起来生效了，其实只生效了一半。

**建议**：`resolveBinding` 返回 `{connectionId, database, schema}` 并作为默认参数传下去（显式参数优先）。

### 2.11 提示词让模型做的事，工具 schema 禁止

`index.js:184` 注入：「call grid_query / grid_inspect **without** connectionId」
`lib/tools.js:147` 与 `:246`：`required: ['connectionId']`

模型照提示词做会被 schema 校验挡住，照 schema 做则绑定永远用不上。二者改一个：`connectionId` 移出 `required`（handler 已经支持缺省 + 绑定兜底）。

### 2.12 SQLite 两个默认值会直接让页面报错

`lib/drivers/sqlite.js:42`：

- `readOnly: false, enableForeignKeyConstraints: true` — 没传 `readBigInts`，默认 `false`。表里只要有一个超出安全整数范围的 `INTEGER`（毫秒时间戳、雪花 ID 都很常见），`statement.all()` 会**抛 `ERR_OUT_OF_RANGE`**，整页读不出来。
- `timeout` 默认 `0` — 并发写立即 `SQLITE_BUSY`，没有重试窗口。

**建议**：`{ readBigInts: true, timeout: 5000 }`（`toJsonValue` 已经处理 bigint 的安全范围，`lib/query.js:276`）。顺带：`DatabaseSync` 在新版 Node 已是 `Database` 的**废弃别名**（DEP0210），可以改名。

### 2.13 导出的 CSV/JSON 会**静默截断到 1000 行**，且不提示

`lib/api.js:326` 把 `pageSize: EXPORT_LIMIT`（10 000）传给驱动，但四个驱动都把它夹到 1000：

```
lib/drivers/sqlite.js:174   const size = Math.max(1, Math.min(1000, ...))
lib/drivers/mysql.js:189    同上
lib/drivers/postgres.js:194 同上
lib/drivers/sqlserver.js:210 同上
```

于是 `lib/api.js:335` 的 `truncated: result.total > EXPORT_LIMIT`（比的是 10 000）在 1 001–10 000 行的表上恒为 `false`：用户导出 5 000 行的表，拿到 1 000 行，**界面不说一句话**（`src/client/views/TableView.tsx:216` 只在 `truncated` 为真时提示）。这是这份代码里唯一一个"看起来成功、实际丢数据"的缺陷，优先级应等同于 P0。

**建议**：导出走独立路径而不是复用 `select` —— 按游标/分块循环取满 `EXPORT_LIMIT`（或直接流式写响应），`truncated` 用实际取到的行数判断。

### 2.14 SQLite 的运行时前置条件没写进 `package.json`

`README.md:35` 说 SQLite "out of the box"，但 `node:sqlite` 需要 **Node ≥ 22.13 / ≥ 23.4** 才不需要 `--experimental-sqlite`。`package.json` 没有 `engines` 字段，也没有任何运行时检查——用户会在 `import 'node:sqlite'` 处拿到一个与"没装驱动"完全不同的错误。

**建议**：加 `"engines": { "node": ">=22.13" }`，`lib/drivers/index.js` 启动时探一次并给出可读提示。

---

## 3. P1 — 性能与规模（真实数据量下的退化点）

### 3.1 每翻一页都做一次全表 `COUNT(*)`

四个驱动都一样：`lib/drivers/sqlite.js:183`、`mysql.js:197`、`postgres.js:199`、`sqlserver.js:216`。`LIMIT 100` 的页很快，`COUNT(*)` 在千万行表上是全表/全索引扫描——**翻页成本与总行数成正比，与页大小无关**。

dbx 的做法是虚拟滚动 + 懒计数。可折中的方案：

1. 首次请求返回**估算值**（MySQL `TABLE_ROWS`、PG `reltuples`，两个驱动已经在 `tables()` 里取了）；用户点"精确计数"再跑真 `COUNT(*)`。
2. 分页改 **keyset**（`WHERE (sort_col, pk) > (?, ?)`），`OFFSET` 在深页会越来越慢。
3. 加 `SKIP LOCKED` 之外的读一致性说明，避免用户以为翻页是快照。

### 3.2 先全量取回再截断

- `lib/drivers/sqlite.js:259` — `prepared.all().slice(0, MAX_ROWS)`
- `mysql.js:280`、`postgres.js:290`、`sqlserver.js:310` — 同构问题
- `lib/api.js:331` — `export` 一次请求就要 1 万行塞进一个 JSON 响应、再在浏览器里 `JSON.stringify` 一遍（`src/client/views/TableView.tsx:206-214`）；而且因为驱动把页大小夹到 1000（见 2.13），它现在既慢又不对。

`MAX_ROWS = 2000` 这道"防线"是在**内存已经吃掉全部结果之后**才生效的。`SELECT * FROM huge` 会先把千万行读进 V8 堆。

**建议**：把上限下推到 SQL（`LIMIT n+1`），`exec` 判断"被截断"用多取一行；导出改成游标 + 分块流式写响应，前端用 `ReadableStream` 落盘。

> **已修（第一、九轮）**：SQLite 改为 `iterate()` 命中上限即停（§8.3）；MySQL 与 SQL Server 改为流式读取，超限即丢（§8.19）。**PostgreSQL 仍是先全量取回**——`pg` 没有内建游标，需要在读取前限制就必须引入 `pg-cursor` 一类依赖，这一条留在 §8.20。

### 3.3 `node:sqlite` 是同步 API，会阻塞整个 DSH Host

Node 文档明确：`Database` 的所有 API 同步执行。一次 5 秒的 SQLite 查询期间，**同一进程里的其他所有插件、GUI 的 API 调用、Agent 的工具调用全部停摆**。这是 Grid 与 dbx（Rust `sqlx` 异步）最本质的架构差异，也是 5 个引擎里唯一一个"零安装"入口的性能天花板。

**建议**：SQLite 落到 `worker_threads`，主线程只做消息编排（驱动接口已经是 `async`，改造面不大）；至少给 `exec`/`select` 包一层超时 + 只读连接（`readOnly: true`）分流读请求。

### 3.4 单会话串行，一个慢查询锁死该连接的所有动作

`lib/session.js:83` 每个连接一个 session。MySQL 是一条 connection、PG 是一条 Client，所有 `rows`/`tables`/`describe`/`sql` 排队。用户在查询页跑一个 30 秒的报表，同一连接下的 schema 树、翻页、结构页全部卡住。

**建议**：读路径与写路径分池（每连接 `poolSize` 可配，MySQL 用 `createPool`、PG 用 `Pool`），或给"查询页"单独开一条会话（Navicat/DataGrip 都是这么做的）。

### 3.5 前端：`where` 输入框每敲一个键就打一次数据库

```
src/client/views/TableView.tsx:301-308   onChange → setWhere(...)
src/client/views/TableView.tsx:100       依赖数组含 where → 触发 api.rows()
```

`WHERE` 粘一句话的过程中会发出十几次查询（每次还带一个 `COUNT(*)`），全部排到同一个单会话上。dbx 的过滤是显式应用（回车/按钮），DataGrip 是防抖 300ms。

**建议**：改成受控但**防抖 300–400ms**，或恢复"回车才应用"（`onKeyDown` 里已经有 Enter 分支，`onChange` 里那份立即 set 是多余的）。

### 3.6 Redis 扫描的往返次数

`lib/drivers/redis.js:202-207`：一页 100 个键，每个键 `TYPE` + `TTL` 两次往返 → 200 次 RTT。`inspectKey` 的 `set` 分支（`:248`）用 `SMEMBERS` 取全量再 `slice(0, 500)`——百万级 set 会直接打爆。

**建议**：用 `pipeline()` 合并 `TYPE`/`TTL`（一次 RTT），`SCAN` 加 `COUNT 500`；set/zset/hash 用 `SSCAN`/`ZSCAN`/`HSCAN` 游标分页。

### 3.7 每次请求都同步读写 JSON 注册表

`lib/connections.js:128`（`readStore()` 在 `getRecord`/`listConnections` 里每次调用）、`lib/extras.js:16`（`readJson`）、`lib/extras.js:139`。同步 `readFileSync` + `JSON.parse`，且没有缓存、没有写锁：两个并发 `connections.create` 会丢掉其中一个。

**建议**：进程内缓存 + `stat` 失效，写入走单个串行队列；或直接换 SQLite（讽刺但有效——`node:sqlite` 就在这里，只是别用主线程）。

---

## 4. 对照 dbx 的功能差距（按"值不值得做"排序）

### 4.1 值得做，投入小、感知强

| 项 | Grid 现状 | dbx | 建议 |
| --- | --- | --- | --- |
| 导出格式 | CSV / JSON（`TableView.tsx:320-325`） | + Markdown / XLSX / INSERT 语句 | 加 `INSERT` 与 Markdown 是几十行的事，对"把数据贴给 Agent/文档"最有用 |
| 过滤操作符 | `= <> > >= < <= LIKE NOT LIKE IN BETWEEN IS NULL` | DataGrip 式过滤、上下文 LIKE/NOT LIKE | 补 `NOT IN`、`BETWEEN` 的第二个值单独输入框、正则/大小写不敏感开关 |
| 破坏性操作确认 | `window.confirm`（`TableView.tsx:192`） | 带影响行数预览的确认对话框 | `DELETE` 前先 `SELECT COUNT(*)` 展示"将删除 N 行" |
| 连接颜色/分组 | 有 | 有 | 平手，保持 |
| 对象搜索 | 对象列表内搜索 | 全库对象搜索（跨 schema） | 现在的搜索只过滤已加载的列表；加一个后端 `information_schema` 模糊查询 |
| 深色模式 | 用宿主 token（`panel.css`） | 完整主题系统 | 平手，保持 |

### 4.2 值得做，投入中等

- **编辑器**：现在是 `<textarea>` + 自绘高亮层 + 自己算光标位置（`src/client/lib/sql.ts:265` 的镜像元素技巧）。dbx 用 CodeMirror 6。换成 CodeMirror 一次能拿到：括号匹配、多光标、折叠、错误下划线（`diagnostics`）、9 套主题、大文件性能。自研高亮的隐性成本会持续增长（见 `src/client/lib/sql.ts:54` 的 tokenizer 与 `beautifySql` 各自维护一套语法认知）。
- **表结构编辑**：dbx 有"可审阅的列/索引变更"。Grid 的结构页是只读的（`TableView.tsx:499`），连 DDL 都不完整（见下）。
- **导入**：CSV/Excel 导入。`rows.insert` 已经存在，缺的是批量与事务包裹。
- **SSH 隧道**：`README.md:187` 已列为已知限制。Postgres/MySQL 用户里相当比例在后端只开跳板机，这一条会让插件在真实环境里直接不可用。Node 侧 `ssh2` + `net` 转发，或复用宿主的连接能力。

### 4.3 更远的（可作为路线图）

- ER 图、结构对比（schema diff）、执行计划可视化、字段血缘、表设计器、数据库 dump、跨库数据迁移、SQL 文件直接执行、Parquet/CSV 预览（dbx 用 DuckDB，Grid 可以用 SQLite 代替）。
- 多语言：现在只有 `locale/en.json` + `zh.json`（dbx 3 种，含西语）。

### 4.4 结构页的 DDL 是"名不副实"的一处

`README.md:86` 承诺 "Structure — columns with type, nullability, default and PK marker; indexes; DDL"，实际：

- PostgreSQL（`lib/drivers/postgres.js:178` → `buildCreateTable`）是**根据 information_schema 拼出来的近似 DDL**，丢掉 UNIQUE/CHECK/外键/生成列/注释/排序规则/存储参数。用户复制走这段 DDL 重建表，得到的不是原来那张表。
- SQL Server（`lib/drivers/sqlserver.js:194`）`ddl: ''` — 完全为空。

**建议**：PG 用 `pg_get_tabledef` 的替代（`pg_dump --schema-only` 的思路，或至少拼上 `pg_indexes`/`pg_constraint`）；SQL Server 用 `OBJECT_DEFINITION` 拿不到表定义，就用 `sys.columns` + 约束拼，并在 UI 上明确标注"approximate"。

> **已修（第七、八轮）**：PostgreSQL 与 SQL Server 都改为从各自的目录表取真实元数据并拼装完整 DDL（§8.15、§8.17）。

---

### 4.5 可访问性与 i18n 的零散缺口（不紧急，但都是几行的事）

骨架是好的：模态框有 `role="dialog"` + `aria-modal` + `aria-label` + Escape 关闭 + 初始焦点（`src/client/ui/kit.tsx:212-251`），标签页有 `role="tab"`/`aria-selected`（`src/client/panel/GridPanel.tsx:301-307`），上下文菜单有 `role="menu"`/`aria-selected`（`kit.tsx:294-307`）。

缺的是：

| 缺口 | 位置 | 说明 |
| --- | --- | --- |
| 无焦点陷阱 | `kit.tsx:227-258` | `Tab` 会把焦点移到模态框背后的页面元素上；关闭后也不把焦点还给触发按钮 |
| 菜单无键盘操作 | `kit.tsx:294-307` | 只有 `Escape` 与鼠标；没有 ↑/↓/Enter/Home/End，`role="menuitem"` 的键盘语义没实现 |
| 数据网格无表格语义 | `src/client/views/TableView.tsx:400-462` | 单元格是 `<td>` + `onMouseDown`，没有 `role="grid"`/`aria-selected`/`tabindex`；`Ctrl+C` 能用是因为绑在容器上，读屏用户拿不到"选中了 3×2 个单元格"的信息 |
| 硬编码英文 | `kit.tsx:164`（`"dismiss"`）、`:248`（`"close"`） | 不在 `locale/*.json` 里，中文界面下读屏仍念英文 |
| 列宽调整不持久 | `TableView.tsx:258-274` | 直接改 `th.style.width`，任何一次重渲染（换页/重排序）都回到默认宽度；也没有保存到 tab 状态 |

## 5. 工程与仓库卫生

| 问题 | 位置 | 影响 |
| --- | --- | --- |
| UI 测试跑的是 `dist/client.js`（构建产物） | `test/ui.test.ts:60` | `pnpm test` 不会先 build。改了 `src/` 忘了 build，测试**通过**；CI 里会变成"绿灯但没测新代码" |
| `dist/` 未进 `.gitignore` | `.gitignore:1-5` | 构建产物入库，diff 噪声、合并冲突；若宿主依赖它分发则至少加 `prebuild` |
| 无 lint / 无格式化 / 无 CI | `package.json:23-28` | 直接后果见下一行 |
| 4 个驱动里有重复类方法 | `sqlite.js:297` 与 `312`；`mysql.js:318` 与 `362`；`sqlserver.js:337` 与 `375`；`redis.js:306` 与 `321` | 同名方法定义两遍（后者静默覆盖前者），ESLint `no-dupe-class-members` 一秒就能抓到 |
| 死代码 | `extras.js:38`（`literal`）、`:114`（`findByName`）、`:200`（`quoteValue`，文件在未完成的常量处结束）、`query.js:318`（`toBindValue`）、`drivers/index.js:67`（`engineInfo`）、5 个驱动的 `serverVersion()` | `extras.js` 的文件头还写着 "saved queries, backups, routine and account introspection"，但 routines/accounts 实际在 `lib/api.js` 里直连驱动，backups 根本不存在 |
| i18n 里有不存在的功能 | `locale/en.json:4`（"saved queries and backups"）、`:18`（"Backups"） | 面板上没有备份功能；`README.md:188` 也承认"no backup container"。文案承诺了没做的事 |
| README 自相矛盾 | `README.md:175`（"client.js 单文件，无需构建"）vs `:133`（esbuild 打包成 `dist/client.js`） | 新人会找不到 `client.js` |
| 密钥与注册表同目录 | `connections.js:36`、`:120-122` | README 说密钥 "stored apart from the registry"，实际在同一个 `dsh-grid/` 目录里（只是不同文件）。措辞应改，或真的分目录/交给宿主 keychain |
| `index.js` 里 `project` 在定义前被闭包引用 | `index.js:122`（引用）vs `:160`（定义） | 现在能跑（`resolveBinding` 只在 apply 之后才被调用），但这是 TDZ 陷阱；且 `index.js` 与 `lib/api.js:99` 各自 `new WorkspaceBindingStore()`，靠同一个文件共享状态，容易读错 |
| 请求体大小只信 `content-length` | `index.js:82` | 分块/无长度请求会绕过 2 MB 限制，随后 `request.json()` 无上限解析 |
| `dev/.edge/` 在磁盘上（338 个文件） | `.gitignore:5` | 已忽略但仍在本地；`README.md:167` 说 `dev/` 是本地 harness，实际体积主要来自浏览器 profile |

---

## 6. 如果只做五件事

按"投入产出 ÷ 风险"排序：

1. **给 SQL 加数据库级只读护栏 + 查询超时**（PG 只读事务 / MySQL 只读会话 / SQLite `query_only`；`statement_timeout`）。一次改动同时解决 2.1 的绕过和 2.5 的悬挂查询，也让 `grid_query` 的承诺变成真的。— **已完成**（§8.5）；SQL Server 无此机制，已在文档中标明。剩余"用户主动取消"仍未做，它依赖读路径分池。
2. **修 5 个 P0 数据正确性问题**：导出静默截断到 1000 行（2.13）、Redis 删键带库（2.3）、写操作不重试（2.4）、绑定 `database` 透传 + 工具 schema 去掉 `required`（2.10/2.11）。— **已完成**（2.6 已证伪，不需要改）。
3. **把"取全量再截断"换成 SQL 层 `LIMIT`，把每页 `COUNT(*)` 换成估算 + 按需精确**。四个驱动是同构改动，单点收益最大。— 已完成大半：估算总数与按需精确已落地（§8.9），SQLite 改用游标式 `iterate()`；剩下 MySQL/PG/SQL Server 的 `exec` 流式化未做（需要游标依赖）。
4. **`where` 输入防抖 + 前端请求 AbortController + 读路径分池**。直接把"打字即查询、查询排队"的体验问题消掉，不需要换编辑器。— 防抖与取消**已完成**，分池**未做**。
5. **TLS 默认校验 + 连接表单暴露 `sslMode`/CA**。安全债越晚还越贵。— **已完成**。

之后才是"换 CodeMirror、加导入导出格式、表设计器、SSH 隧道"这些对标 dbx 的产品化投入。

---

## 7. 附：Grid 相对 dbx 已经做对的事（别在重构里丢掉）

- **双传输共用一套 router**（`lib/api.js:95`）：面板和 Agent 行为一致，这是 dbx 用 MCP server 单独实现才换来的性质。
- **主键寻址才允许改行/删行**（`lib/api.js:275`、`:306`）：结构上杜绝了全表 `UPDATE`。
- **密码只出 `hasPassword`**（`lib/connections.js:260`）：投影层就把密文砍掉，比"前端记得别显示"可靠得多。
- **AES-256-GCM 独立密钥 + 原子写 + 损坏留档**（`lib/connections.js:89-162`）。
- **驱动按需懒加载 + 缺失只影响单个引擎**（`lib/drivers/index.js:78-106`）。
- **测试覆盖真实引擎与真实浏览器 bundle**：`test/drivers.test.mjs` 打真 MySQL/PG/Redis，`test/ui.test.ts` 在 jsdom 里加载真 bundle 驱动真交互——这个组合在小项目里很少见，是 Grid 最被低估的资产。

---

## 8. 第一轮优化：改动清单

### 8.1 安全性

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| 新增 `GridError` 模块，校验错误从 500 变 400/404；连接不存在变 404；驱动层用户错误（`select a database first`、`no primary key`、`a key is required`…）同样带 400 | `lib/errors.js`、`lib/connections.js`、`lib/session.js`、`lib/extras.js`、五个驱动、`index.js` | `connections.test.mjs`、`api.test.mjs`「driver-level user errors carry a 400」 |
| 只读分类器重写：先剥离字符串/注释再匹配；拒绝 `EXPLAIN ANALYZE`、`SELECT … INTO`、`INTO OUTFILE`、`FOR UPDATE/SHARE`、`PRAGMA x = y`；`REPLACE(` 不再被当成写动词 | `lib/query.js` | `query.test.mjs` 新增 3 个用例（含偏移对齐断言） |
| TLS 改为 `sslMode` 四档，默认 `verify-full`；`options.sslCa` 支持私有 CA；SQL Server 用 `trustServerCertificate` 镜像同一策略 | `lib/connections.js`、`lib/drivers/tls.js`、四个网络驱动、`ConnectionDialog.tsx`、`i18n.ts` | `connections.test.mjs` 两个用例；`tls.js` 映射手工验证 |
| 请求体大小不再只信 `content-length`，分块请求读后实测 | `index.js` | — |
| 写操作不再断线重试（`rows.insert/update/delete`、含写语句的 `sql`） | `lib/api.js`、`lib/session.js` | 现有 api 测试仍绿 |

### 8.2 数据正确性

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| 导出改为逐页收集，`truncated` 由实际行数与总数共同判定（原来固定返回 1000 行且声称完整） | `lib/api.js` | `api.test.mjs`「export walks every page」：1200 行全出、10050 行截断且 `total` 正确 |
| Redis 删键必须带 database；`inspectKey` 回传实际库号 | `lib/drivers/redis.js`、`lib/api.js`、`api.ts`、`RedisView.tsx` | 需要真实 Redis，用例已存在（本机跳过） |
| 绑定 workspace 的 `database` 透传到 `grid_inspect`/`grid_query`；显式指定的库即使不在列表里也照用，不再静默换成别的库 | `lib/tools.js` | `api.test.mjs`「a bound workspace supplies…」 |
| `grid_query`/`grid_inspect` 的 schema 不再强制 `connectionId`（与注入的提示词一致） | `lib/tools.js` | `api.test.mjs`「do not require connectionId」 |
| SQL Server 列元数据改从 `recordset.columns` 读，空结果集不再丢表头 | `lib/drivers/sqlserver.js` | 需真实实例 |
| MySQL 列类型由数字码映射成名字；PG 由 OID 映射成名字 | `lib/drivers/mysql.js`、`postgres.js` | 需真实实例；映射表可单测 |
| SQLite 开启 `readBigInts` 与 5s busy timeout（大整数不再让整页报错） | `lib/drivers/sqlite.js` | `drivers.test.mjs` sqlite 套件 |

### 8.3 性能

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| `rows` 支持 `count:false`：翻页不再每次全表 `COUNT(*)`，前端沿用已知总数 | `lib/api.js`、四个驱动、`TableView.tsx` | `api.test.mjs`「rows can skip the count」 |
| SQLite `exec` 改用 `iterate()`，命中上限即停（原来先全部读进内存再截断） | `lib/drivers/sqlite.js` | sqlite 套件 |
| Redis `SCAN` 用 pipeline 批量取 TYPE/TTL（一页 100 键从 200 次往返降到 1 次）；set/zset/hash 改用 `SSCAN`/`ZSCAN`/`HSCAN` | `lib/drivers/redis.js` | 需真实 Redis |
| `where` 输入防抖 320ms（原来每敲一键发一次查询） | `TableView.tsx` | UI 测试通过 |
| 每个请求带 `AbortController`，被新请求取代即取消 | `api.ts`、`TableView.tsx` | UI 测试通过 |
| 翻页/重排/刷新时清空选中与行内编辑状态（索引会指向别的行） | `TableView.tsx` | — |

### 8.4 工程卫生

- `package.json`：加 `engines.node >= 22.13.0`；`pretest` 先 build，`pnpm test` 不会再测到旧 bundle。
- 删掉驱动里 4 处重复定义的 `accounts()`；删掉死代码 `literal`/`findByName`/`quoteValue`/`toBindValue`、`Backup` 类型与「备份」相关 i18n 键（功能从不存在）。
- README：补 Requirements、TLS 模式、只读分类器的真实边界、导出上限行为、`pnpm test` 会先 build；修掉「client.js 单文件无需构建」与 `dist/client.js` 自相矛盾的描述；把「无查询超时、单会话串行、SQLite 同步」如实写进 Known limits。

### 8.5 第二轮：引擎级护栏、超时与导出格式

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **引擎自己拒绝写操作**：只读请求在 PG 里跑 `BEGIN READ ONLY`、MySQL 里 `START TRANSACTION READ ONLY`、SQLite 里 `PRAGMA query_only`，事务无条件回滚 / pragma 无条件复位 | `lib/drivers/{postgres,mysql,sqlite}.js`、`lib/api.js` | `api.test.mjs`「SQLite itself refuses a write in a read-only run, and the session stays writable」——绕过分类器直接调驱动，写入被引擎拒绝、库里没有新增行、且**失败后连接仍可写**（否则面板就不能编辑了） |
| SQL Server 明确不做会话级只读（引擎没有这个概念），驱动与 README 都写明靠分类器 + 账号权限 | `lib/drivers/sqlserver.js` | 代码注释 + README |
| **语句超时**：新增 `options.queryTimeoutMs`（默认 30s，1s–1h 夹紧），翻译成各引擎的原生机制：PG `statement_timeout`、MySQL `MAX_EXECUTION_TIME` / MariaDB `max_statement_time` / `innodb_lock_wait_timeout`、SQL Server `requestTimeout`、Redis `commandTimeout` | `lib/drivers/options.js`、四个网络驱动 | `options.test.mjs`（默认值、显式值、上下界） |
| **导出格式**：CSV / JSON 之外增加 `INSERT` 语句与 Markdown 表格，工具栏从两个按钮收敛成一个 Export 菜单 | `src/client/lib/format.ts`、`TableView.tsx`、`i18n.ts` | `format.test.mjs` 三个用例（逐引擎标识符引号、`NULL`/布尔/JSON 值、Markdown 管道与换行转义）——直接跑 TypeScript 源码，不经过 bundle |

顺带的工程改动：`tsconfig` 打开 `allowImportingTsExtensions`，`format.ts` 以 `./sql.ts` 引用依赖，
于是这个纯逻辑模块可以被 Node 的类型剥离直接加载并单测；`Button` 的 `onClick` 类型放宽到能拿到事件
（Export 菜单需要按钮位置）。

### 8.7 第三轮：会话分道与取消

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **会话分两条道**：`main` 供对象树 / 翻页 / 结构页；用户输入的 SQL 与导出走 `query` 道（独立连接）。一条 30 秒的报表不再冻住整个面板。SQLite 与 SQL Server 保持单连接（前者同步驱动、第二条连接只会增加锁争用；后者 `mssql` 自带池） | `lib/session.js`、`lib/api.js` | `session.test.mjs` 4 个用例：分道决策、单道引擎回落、按道关闭与回收；`api.test.mjs` 验证 SQLite 的 `sql` 不产生第二条连接 |
| **查询取消**：`sql.cancel` 动作 + SQL 控制台的 Cancel 按钮。PG 用旁路连接发 `pg_cancel_backend(pid)`，MySQL 发 `KILL QUERY`（失败则断开 socket 兜底），SQL Server 直接 `request.cancel()`；SQLite/Redis 明确返回"不支持"而不是假装成功 | 五个驱动、`lib/api.js`、`SqlView.tsx`、`api.ts`、`i18n.ts` | `api.test.mjs`：不支持时如实报告、取消动作不抛异常 |
| **取消后不再重试**：MySQL 兜底断开会让请求看起来像"掉线"，若照旧重试就等于把刚取消的查询又跑一遍。驱动打标记，会话池据此跳过重试 | `lib/drivers/mysql.js`、`lib/session.js` | `session.test.mjs`「a cancelled statement is not retried」——断言只执行一次、标记被清除 |
| **Agent 超时真的停库**：`grid_query`/`grid_execute` 不再只是"放弃等待"，abort 时同时发出 `sql.cancel`，服务端语句随之结束 | `lib/tools.js` | `api.test.mjs`「aborting a query cancels it on the server instead of only hanging up」 |
| 导出（最多 10 次分页读）也改走 `query` 道，导出大数据集时对象树仍可操作 | `lib/api.js` | 回归：导出用例仍绿 |

### 8.9 第四轮：SQLite 进 worker、总数改为估算

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **SQLite 移到 worker_threads**：拆成三块——`sqlite-core.js`（同步的 `node:sqlite` 实现）、`sqlite-worker.js`（请求/应答循环）、`sqlite.js`（异步门面）。原来一次 SQLite 查询会冻住整个 DSH 进程（所有插件、面板 API、Agent），现在只占 worker 线程 | `lib/drivers/sqlite-core.js`、`sqlite-worker.js`、`sqlite.js` | `sqlite-worker.test.mjs`：慢查询期间主线程定时器仍在跳；**同一查询走进程内回退路径时定时器 0 次**（正向对照，证明测的是真东西）。另有错误状态码跨线程、worker 终止、回退路径三个用例 |
| 回退保守化：只有 **worker 起不来** 才回退到进程内；真正的打开失败（文件不存在、不是数据库）照常抛给调用方，不再被吞进回退分支 | `lib/drivers/sqlite.js` | 手工验证：`Z:/definitely/not/here.db` → `unable to open database file` 原样抛出 |
| **总数改为估算 + 按需精确**：`rows` 新增 `total: 'auto' \| 'exact' \| 'none'`。无过滤时取引擎自己的估算（MySQL `TABLE_ROWS`、PG `reltuples`、SQL Server `sys.partitions`），有过滤或按刷新时做真 `COUNT(*)`；响应带 `totalKind`，UI 显示 `≈` 并在悬停里说明刷新可取精确值 | `lib/api.js`、四个驱动、`TableView.tsx`、`types.ts`、`i18n.ts` | `api.test.mjs`：用 stub 池断言路由决策——无过滤不发 `COUNT(*)`、有过滤一定发、`exact`/`none` 各自正确、没有估算能力的引擎（SQLite）自动退回精确计数 |

### 8.11 第五轮：把前四轮的改动钉进 UI 测试

前四轮改了大量交互（防抖、导出菜单、估算标记、取消按钮），而 UI 测试只覆盖了一条"打开表格并查询"的主线——这些新行为一旦回归，测试不会说话。这一轮补上，顺带修了测试骨架本身的三个问题。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **UI 测试可重复加载 bundle**：ESM 模块只执行一次，第二个用例里 `__ModuleLoader__.load` 不会再被调用。改为每次 `import('../dist/client.js?load=N')` 缓存破除，并抽出 `panelOf()` 避免重复搭建 ctx | `test/ui.test.ts` | 两个用例各自拿到独立 bundle 并通过 |
| **stub 后端可定制**：回复表提到模块级，`stubFetch(overrides)` 支持按用例覆盖；回复可以是函数，从而能"挂住"一个请求来观察 busy 状态 | 同上 | — |
| 新增第二个 UI 用例：**防抖**（连打三个字符 → 120ms 内 0 次请求；再等 400ms → 恰好 1 次且 `where` 正确）、**导出**（菜单里选 INSERT → 捕获 Blob → 断言 `INSERT INTO "main"."users" ("id", "name") VALUES (1, 'Ada');`）、**估算标记**（`≈ 42000` 且 chip 的 title 说明来源）、**取消按钮**（运行中点击 → Host 收到 `sql.cancel`） | `test/ui.test.ts` | `pnpm test` 中 2 个 UI 用例全绿 |

顺带发现并修掉的测试骨架缺陷：默认回复表里没有 `export` 动作，导出用例会静默拿到 `{}` 然后在 `columns.map` 处抛错——**这正是这类用例的价值：它先暴露了自己**。

### 8.13 第六轮：CSV 导入（补 dbx 的 4.2 缺口）

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **批量插入动作 `rows.insertMany`**：一次请求一个事务，整批要么全进要么全不进；上限 5000 行，先校验（非对象、空行、嵌套值）再碰数据库 | `lib/api.js`、四个驱动（SQLite/MySQL/PG 各自 `BEGIN`，SQL Server 用 `Transaction`；SQL Server 的 `insert` 顺带抽出 `insertStatement` 供事务内复用） | `api.test.mjs`：两条正数、第三条违反 `NOT NULL` → **整批回滚**，前两条好数据也没进来；另有四条畸形输入校验 |
| **CSV 解析器**：状态机而非 `split(',')`，处理引号内的逗号/换行/双写引号、BOM、Excel 的尾随空行、短行补齐 | `src/client/lib/format.ts` | `format.test.mjs` 4 条用例（引号与换行、BOM + 短行、单空字段不是行） |
| **导入 UI**：工具栏 Import CSV + 隐藏文件选择器；表头出现本表没有的列时**拒绝并指出列名**（不静默丢弃）；空单元格写 `NULL`；每 200 行一批，失败时报告已导入多少 | `TableView.tsx`、`api.ts`、`i18n.ts` | UI 用例：模拟两个真实 `File`，断言发出的批次内容、以及表头不匹配时**根本没有请求发出** |
| **`.dg-subbar` 从裁剪改为换行**：该行是 `overflow: hidden` + 不换行，窄面板下右侧按钮（含新的 Import）会被静默裁掉、点不到；改成 `flex-wrap: wrap` 并给筛选输入框 `minWidth` | `src/client/ui/panel.css`、`TableView.tsx` | `dev/cdp-shot.mjs` 在 1680 / 700 px 测得 `docOverflow: false`、`overflowing: []` |

### 8.15 第七轮：PostgreSQL 的真实 DDL

§4.4 指出的问题——"结构页展示的 PG DDL 是根据 `information_schema` 拼的近似值，用户复制它重建表会得到另一张表"——这一轮修掉。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **从目录表取真实元数据**：`pg_attribute` + `format_type(atttypid, atttypmod)` 拿真实类型，`pg_attrdef` 拿默认值，`attidentity`/`attgenerated` 区分 identity 与生成列，`col_description` 补上列注释 | `lib/drivers/postgres.js` | `postgres-ddl.test.mjs` 覆盖 identity ALWAYS/BY DEFAULT、STORED 生成列（不能被渲染成 DEFAULT） |
| **约束单独成句**：从 `pg_constraint` + `pg_get_constraintdef` 生成 `ALTER TABLE … ADD CONSTRAINT …`，可延迟（DEFERRABLE）等子句原样保留——内联 PRIMARY KEY 做不到这一点 | `lib/drivers/postgres-ddl.js` | 用例断言 `CHECK ((total >= 0)) DEFERRABLE` 原样输出 |
| **索引与注释**：`pg_indexes` 中排除由约束生成的索引，其余输出为 `CREATE INDEX`；表/列注释输出为 `COMMENT ON …` | 同上 | 用例覆盖空定义的跳过、表注释与带引号的列注释转义 |
| 拼装逻辑抽成纯函数 `buildPostgresDdl()`，驱动只负责取元数据——这样这段最容易出错、又最难在 CI 里跑真实 PG 的代码可以被单测 | `lib/drivers/postgres-ddl.js` | 5 条用例，含引号转义与空列表 |

**过程中抓到一个真实的回归隐患**：主键列名我一开始是从 `pg_get_constraintdef` 的文本里用 `/"([^"]+)"/` 抓的——但该函数**只在小写以外的标识符上加引号**，普通表的主键定义是 `PRIMARY KEY (id)` 而不是 `PRIMARY KEY ("id")`，于是主键集合会为空，网格随即认为"这张表没有主键"并**拒绝所有行编辑**。改为读 `conkey::int2[]`（属性号数组）再映射回列名，与标识符大小写无关。

### 8.17 第八轮：SQL Server 的 DDL，以及两个接线 bug

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **SQL Server 真实 DDL**：列从 `sys.columns`/`sys.types` 取（类型、长度、精度、identity 的 seed/increment、计算列表达式与 PERSISTED、默认约束名），类型渲染遵循 SQL Server 规则——`nvarchar` 的 `max_length` 是字节数（`nvarchar(100)` 会出现为 200）、`-1` 是 `(max)`、`decimal` 带精度与小数位；PK/UQ/FK/CHECK 与普通索引各自成句，FK 带 `ON DELETE/UPDATE` 动作 | `lib/drivers/sqlserver.js`、`lib/drivers/sqlserver-ddl.js` | `sqlserver-ddl.test.mjs` 5 条（含 `nvarchar(100)`/`(max)`/`datetime2(3)`/UDT、非默认 identity seed、命名默认约束、FK 级联） |
| **接线测试**：用假 `pg` client 与假 `mssql` pool 直接调两个驱动的 `describe()`，断言"驱动选出来的行"确实能拼出正确 DDL | `test/describe-wiring.test.mjs` | 2 条用例 |

**这一轮最重要的收获是两个接线 bug，而且都是我上一轮埋的**：两个驱动都把**给面板的投影**直接传给 DDL 拼装函数，而那份投影里没有 `notNull`/`identity`/`generated`/`defaultDef`——于是 PG 的 DDL 会把每一列都渲染成可空、丢掉 identity 和默认值。上一轮的 5 条 composer 单测全绿，因为它们喂进去的是**正确形状**的数据；真正错的接缝没人测。

所以这一轮补的不是更多 composer 用例，而是**接缝用例**：假 catalogue → 真驱动 → 真 composer。这类测试才能在"形状对不上"时报警。修复方式是两个驱动各自维护一份 `ddlColumns`（原始目录字段），与给面板的投影分开。

### 8.19 第九轮：结果集流式读取（MySQL / SQL Server）

§3.2 指出的"先全量取回再截断"——`SELECT * FROM 大表` 会把整个结果集读进 V8 堆，然后才切到 2000 行——这一轮解决一半。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **MySQL 改为流式**：用核心连接的 `query()` 事件（`fields`/`result`/`end`），到达上限后丢弃后续行；没有 `fields` 时按 OkPacket 处理 `affectedRows`/`insertId`。降级判定必须发生在**语句开始之前**（否则回退会把一条写语句跑两遍），代码里有注释 | `lib/drivers/mysql.js` | `streaming.test.mjs`：上限与 `truncated`、OkPacket、错误转成单语句错误、无核心连接时的回退 |
| **SQL Server 改为 `request.stream`**：`recordset`/`row`/`rowsaffected`/`done` 事件，超限即丢；顺带保持 `cancelQuery` 仍能中断（`this.active` 仍在 done/error 时清除） | `lib/drivers/sqlserver.js` | 同上：上限、`affected`、错误路径、`active` 被清空 |
| **PG 保持原样但在文档中写明原因**：`pg` 没有内建游标，要把结果限制在读取前需要 `pg-cursor`（额外依赖）。与其写一段本机无法验证的死代码，不如把现状和原因写进 README 的 Known limits | `README.md` | — |

测试用的是假事件发射器（`node:events`），所以这一轮**不需要真实数据库**就能覆盖上限、截断标记与错误路径——这也正是唯一可行的测法：真实环境下"SELECT 大表"本身就足以把测试跑挂。

### 8.21 第十轮：视图不再被渲染成表，以及测试文档的自查

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| **视图不再是 `CREATE TABLE`**：PG 的 `describe` 先查 `relkind`，视图用 `pg_get_viewdef` 拼 `CREATE VIEW`/`CREATE MATERIALIZED VIEW`；SQL Server 用 `OBJECT_DEFINITION` 原样返回视图定义。此前两张引擎的视图都会在结构页显示成一张虚构的表——和上一轮修的是同一类"展示不真实信息" | `lib/drivers/postgres.js`、`sqlserver.js`、`postgres-ddl.js` | `describe-wiring.test.mjs` 新增 3 条：PG 视图、PG 物化视图、SQL Server 视图，均断言"绝不出现 CREATE TABLE" |
| **选中数量其实没显示**：`fmt(t('selection'), { n })` 的文案里根本没有 `{n}` 占位符，于是"选区大小"永远只显示单词 "Selection"。补占位符并加断言 | `src/client/lib/i18n.ts`、`locale/*.json` | UI 用例断言 `Selection 1` |
| **UI 测试补两项**：单元格选中（`.dg-cell-selected` + 数量 chip）、Beautify（子句换行） | `test/ui.test.ts` | `pnpm test` |
| **纠正 README 对测试覆盖面的夸大**：原文声称 UI 用例覆盖"编辑、选区与聚合、行详情抽屉、筛选构建器、列选择器、补全"，实际只覆盖了其中一部分。改为逐项列出已覆盖内容，并明确列出**尚未覆盖**的五项 | `README.md` | — |

| **测试源码纳入类型检查**：新增 `tsconfig.test.json` 与 `@types/node`/`@types/jsdom` 两个 devDependency，`pnpm typecheck` 现在先检查 `src/client`、再检查 `test/**/*.ts`。此前 470 行的 `ui.test.ts` 只经 Node 的类型剥离运行，`tsc` 从没看过它 | `package.json`、`tsconfig.test.json` | `pnpm typecheck` 两个 tsc 都通过 |

**过程中的一次自伤**：为了离线装 `@types/node`，我用 `pnpm add --offline` 试了一次，它在缺 tarball 的中途失败，把 `node_modules` 里的 typescript 删掉了——`pnpm typecheck` 当场变成 `tsc is not recognized`。用不带 `--offline` 的 `pnpm install` 恢复（网络其实是通的），随后正常添加了两个类型包。教训：**装依赖失败可能留下半成品 node_modules，验证工具链本身也要在改完之后跑一遍**。

### 8.23 第十一轮：把"README 说有、代码里没有"的功能补上或删掉

核对 README 的功能描述时发现三处**文档承诺了而代码里不存在**的东西。这一轮按"能补就补、不能补就从文档里删掉"处理。

| 发现 | 处理 | 文件 | 验证 |
| --- | --- | --- | --- |
| **列隐藏/显示菜单** 不存在（README 写了 "column hide/show from the Columns menu"） | 实现：工具栏 Columns 菜单列出所有列，点一下切换；隐藏是纯前端状态，不重新查询，全部隐藏后可 Show all。选择、编辑、聚合、复制都改为基于"可见列"列表，索引不会错位 | `TableView.tsx` | UI 用例：隐藏后表头消失且 `rows` 调用次数不变；Show all 恢复 |
| **Insert row** 不存在，且四个驱动都拒绝空 `values` | 实现：空值插入改为引擎各自的"DEFAULT VALUES"形式（SQLite/PG/SQL Server `INSERT INTO t DEFAULT VALUES`，MySQL `INSERT INTO t () VALUES ()`），工具栏加 Insert row 按钮 | 四个驱动、`TableView.tsx`、`i18n.ts` | `api.test.mjs`：空 values 插入一行、库里确实多一行且该列为 NULL；UI 用例：按钮发出 `rows.insert` 且 `values` 为 `{}` |
| **行详情抽屉** 不存在（README 写了 "row-number column opens a row detail drawer"） | **不补，从文档里删掉**，并在 Known limits 里写明"逐单元格编辑，没有行抽屉"。一个行抽屉是独立功能，不该顺手塞进这一轮 | `README.md` | — |

另外补上了 README 里列为"未覆盖"的五项交互中的四项：单元格编辑（断言 `rows.update` 用主键寻址、只改那一格）、筛选构建器（断言生成的谓词 `"name" = 'Ada'`）、列菜单、SQL 补全（Ctrl+Space）。

顺带清理测试输出噪音：React 18 仍带着 IE11 的 `input` polyfill，在 jsdom 里会调用 `activeElement.attachEvent` 并打印一整段堆栈。改用 `VirtualConsole` **只屏蔽这一条** `jsdomError`，其他照旧可见。

### 8.25 第十二轮：行编辑器

上一轮把"行详情抽屉"从文档里删掉了，因为它不存在。这一轮按当时说的把它做出来——不是抽屉，而是一个模态行编辑器，理由是复用了组件库里已有的 `Modal`（焦点、Esc、aria 都是现成的），不自造一套侧滑面板。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| 点行号单元格打开行编辑器：所有字段一次呈现，PK 字段带 `· PK` 标记，可空字段的占位符显示 `null` | `TableView.tsx`、`i18n.ts` | UI 用例：对话框出现、字段数等于列数、PK 值回填 |
| **只提交改动的字段**：逐列与原始行比较，构造 `changes`；空值在可空列上写成 `NULL`、在不可空列上写成空串（网格无法知道用户想要哪个，这是不会污染数值列的读法） | 同上 | UI 用例：改一格 → **恰好一次** `rows.update`，且 `changes` 只含那一格；未改动字段不出现在载荷里 |
| 无可编辑主键时行号单元格不可点（不加提示样式），避免打开一个注定失败的对话框 | 同上 | — |

`dist/client.js` 131.5 → 133.1 KB。

### 8.27 第十三轮：长文本字段与"结果被截断"的如实告知

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| 行编辑器的 text/JSON/长 `varchar` 列改用多行输入框（新增 `TextArea` 组件，复用 `.dg-input` 的皮肤），其余列仍是单行 | `kit.tsx`、`panel.css`、`TableView.tsx` | UI 用例：整数列是 `INPUT`、TEXT 列是 `TEXTAREA`，两者都能改且只提交改动字段 |
| **结果被截断时如实告知**：PG 的 `exec` 补上 `truncated` 标记（它仍在内存里切片）；SQL 控制台在任何结果被截断时弹出提示"只显示前 2000 行"，而不是让行数自己说话 | `postgres.js`、`types.ts`、`SqlView.tsx`、`i18n.ts` | UI 用例：第二次运行返回 `truncated` → 断言出现 "capped" 文案 |

### 8.29 第十四轮：合并重复的结构查询

每个打开的表标签原来有**两份** `describe`：数据网格挂载时查一次，切到结构页再查一次，切回来又查一次。这一轮把描述提升到标签层，两个视图共用同一份结果。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| `meta`（describe 结果）与 `metaError`/`metaTick` 提升到 `TableView`，`DataGrid`/`StructureView` 改为纯接收；两个视图各自的 Refresh 都通过 `metaTick` 触发一次真正的重查；网格的 Refresh 同时刷新行与结构（否则别处 ALTER 加的列要重开标签才可见） | `TableView.tsx` | UI 用例：切到 Structure 再切回 Data，`columns` 调用次数**不变**（改动前会 +2） |

这是评审清单里最后一项不需要引入依赖的优化。

### 8.31 第十五轮：把十四轮的改动写成可核对的变更记录

十四轮改了很多**会让人踩坑的行为**（TLS 默认值、重试策略、导出上限、`rows` 响应形状、会话数），但这个目录不是 git 仓库，没有任何地方记录过。升级时只能靠翻代码，这比没有优化更危险。

| 改动 | 文件 | 验证 |
| --- | --- | --- |
| 新增 `CHANGELOG.md`：按"破坏性/行为变更、新增、修复、内部"分组，每条都写**用户或集成方会察觉到什么**，而不是改了什么代码；结尾有升级四步（重启 Host、刷新页面、自签证书的 `ssl: true` 连接要改成 `sslMode: 'require'`、自己调用路由的话注意 `rows`/`redis.delete` 的载荷变化） | `CHANGELOG.md` | 逐条对照源码抽查：TLS 默认值 `DEFAULT_SSL_MODE = 'verify-full'` ✓、五处 `retry: false` ✓、三种只读事务/pragma ✓、`EXPORT_LIMIT`/`EXPORT_CHUNK` ✓、四处 `DEFAULT VALUES` ✓ |
| 版本 `0.4.0` → `0.5.0`，`files` 里加入 `CHANGELOG.md`，README 顶部指向它 | `package.json`、`README.md` | `pnpm --version` 显示 0.5.0；插件在 `~/.dsh/profiles/desktop/package.json` 里是 `link:D:/work/code/dsh-grid-plugin`（路径链接、不锁版本），所以升版本号不需要重装 |

### 8.33 第十六轮：把 `dev/` 量具修好，并修掉它一直掩盖的裁剪问题

整理变更记录时发现 `dev/cdp-shot.mjs` 输出的 `rows: 0`——它跑的是关系列表而不是数据网格。查下去是两个问题叠在一起：

| 问题 | 处理 | 验证 |
| --- | --- | --- |
| **harness 驱动盯着一个已不存在的类**：`objects()`/`table()` 等 `.dg-objtable`，而客户端在早前改版后渲染的是 `.dg-list`。于是 `--view table` / `structure` / `filter` **一直在静默退化**到概览页 | 按当前界面重写驱动：点数据库 → 点工具栏「表」→ 双击 `.dg-list` 的行打开网格；`filter` 改为等待内联的构建器行而不是模态框 | `--view table` 现在 `rows: 100`、`grid` 非空 |
| **主工具栏在窄面板下裁掉按钮**：`.dg-toolbar` 是 `overflow: hidden` 且不换行，700px 时有两个控件被推出视口（`toolbarClipped: 2`），点不到 | 与上一轮 `.dg-subbar` 同样处理：`flex-wrap: wrap` + 不裁剪 | 1680 / 1024 / 700 三个宽度重测：`toolbarClipped: 0`、`docOverflow: false`、`overflowing: []`；700px 时工具栏高度 44 → 67（换到两行） |
| **README 的响应式描述是假的**：原文写"低于 1120px 品牌名消失、940px 连接徽标消失、780px 对象列表折叠、620px 连接树折叠"，但 `panel.css` 里**没有任何 `@media` 或容器查询**，客户端也没有宽度判断逻辑 | 改成实测事实：两条工具栏都是换行而不是裁剪，并给出三个宽度上的测量结果 | 上面的测量 |

这一轮的意义：前几轮我引用 harness 的几何数据来支持"布局没问题"的结论，但那个工具本身是瞎的。**量具坏了的时候，测量结果比没有更糟**——它会给你一个看起来正常的数字。

### 8.34 仍然没做的

1. PostgreSQL 的结果集流式化（需要 `pg-cursor` 或等价依赖）。
2. Excel（.xlsx）导入、CodeMirror 6、表设计器、SSH 隧道——都需要引入依赖或改变产品形态。
3. 取消的 PG/MySQL/SQL Server 三条分支仍只有"不支持"路径被覆盖（本机没有实例）。
4. 行编辑器没有按类型区分的专用控件（布尔/枚举/日期仍是一个文本框）。
5. 没有基于容器宽度的自适应（现在只有换行兜底）；`@media` 也不适用，因为面板宿主宽度不等于视口。
















