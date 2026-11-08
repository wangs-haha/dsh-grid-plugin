# 04 · 测试报告

> 历史档案：保留原始调研、计划与当时的验证结果，不代表当前实现或维护约束。
> 当前行为以 [使用指南](<../user-guide.md>)、[架构](<../architecture.md>) 和 [测试指南](<../testing.md>) 为准。

> 被测版本：`@local/dsh-grid` 0.1.0
> 环境：Windows · DSH Desktop（profile `desktop`）· Node v24.14.0 · pnpm 10.33.0
> 执行时间：2026-11-04

## 1. 总览

两轮执行，覆盖「真实服务在线」与「服务全部下线」两种环境：

```text
# 第 1 轮：MySQL / PostgreSQL / Redis 容器在线（v1 客户端）
ℹ tests 39   ℹ pass 39   ℹ fail 0   ℹ skipped 0

# 第 2 轮：界面重做后，容器全部在线
ℹ tests 43   ℹ pass 43   ℹ fail 0   ℹ skipped 0

# 第 3 轮：容器回收后（验证降级与超时）
ℹ tests 43   ℹ pass 39   ℹ fail 0   ℹ skipped 4
```

第 3 轮中 4 个跳过项是 MySQL / PostgreSQL（2 个）/ Redis 的驱动契约——无法连接时测试以明确原因跳过，而不是失败或挂起；其余 39 项（含 SQLite 真实库、路由、工具、UI、语言包）全部通过。

| 测试文件 | 覆盖内容 | 用例数 |
| --- | --- | --- |
| `test/query.test.mjs` | 语句切分（引号/注释/`$$`/`[]`）、只读判定、标识符引用、分页、值序列化 | 10 |
| `test/connections.test.mjs` | 注册表 CRUD、AES-256-GCM 落盘、密码保留语义、校验、默认端口 | 6 |
| `test/drivers.test.mjs` | 同一套表契约跑 **真实** SQLite / MySQL / PostgreSQL / Redis，并校验表元数据形状 | 6 |
| `test/api.test.mjs` | action 路由 + 会话池 + Agent 工具（真实 SQLite 文件），含不可达主机的超时约束 | 17 |
| `test/ui.test.mjs` | 真实 `client.js` 在 jsdom 中渲染并驱动完整交互（40+ 断言） | 1 |
| `test/locale.test.mjs` | 内嵌字典与 `locale/*.json` 一致、双语键集合相同、无空文案 | 3 |

## 2. 真实引擎集成

用 Docker 拉起真实服务，测试直接走生产驱动代码：

| 引擎 | 版本 | 结果 |
| --- | --- | --- |
| SQLite | 3.51.2（Node 内置 `node:sqlite`） | ✅ 全通过 |
| MySQL | 8.4（`mysql:8.4` 容器） | ✅ 全通过 |
| PostgreSQL | 16（`postgres:16-alpine` 容器） | ✅ 全通过 |
| Redis | 7（`redis:7-alpine` 容器） | ✅ 全通过 |
| SQL Server | — | ⚠️ 无可用实例，仅静态检查 + 与其他引擎共享的 SQL 生成单测覆盖 |

每个引擎都跑同一份契约：建表 → 插入 → 分页查询 → 排序 → 改单元格（主键定位）→ 结构描述（字段顺序、主键、索引）→ 删除 → 多语句执行 → 失败语句只报错不抛出。

## 3. UI 端到端（jsdom）

`test/ui.test.mjs` 不使用 mock 组件：它加载真实的 `client.js`，替换 `window.__ModuleLoader__` 取得工厂，用真实的 React 18 渲染 `GridPanel`，只把 `fetch` 换成记录型桩。断言覆盖：

1. `apply(ctx)` 注册了 `main:grid` 与 `sidebar.panellist:grid`，并注册了 `zh`/`en` 字典；
2. 面板渲染出已保存的连接；
3. 点击连接 → 发出 `connections.connect` + `databases`，树出现 `main`；
4. 展开数据库 → 发出 `tables`，出现 `users`；
5. 打开表 → 发出 `rows`，单元格渲染出 `Ada`；
6. 双击单元格 → 出现编辑框；改值回车 → 发出 `rows.update`，且 `key={id:1}`、`changes={name:'Beta'}`（主键定位正确）；
7. 新建查询 → 输入 SQL + `Ctrl+Enter` → 发出 `sql` 且语句原文正确；
8. 新建连接 → 模态框通过 Portal 挂到 `body`，两种引擎卡片都渲染。

> 说明：jsdom 会让 React 18 走 legacy `input` polyfill（调用不存在的 `attachEvent`），因此受控输入的改动通过读取 React 挂在 DOM 节点上的 props 来驱动，按键同理。点击、双击、Portal、副作用时序仍走真实 DOM 与真实 `useEffect`。

## 4. 线上验证（真实 Host，Agent 工具路径）

插件安装后（`application: applied`），用一个独立子代理在**运行中的 Host** 上依次调用工具，验证的是安装后的真实链路，而不是测试进程：

| # | 调用 | 期望 | 结果 |
| --- | --- | --- | --- |
| 1 | `grid_list_connections` | 列出连接与状态 | ✅（首轮缺 `[closed]` 标记，已修） |
| 2 | `grid_inspect`（无表） | 列出 `customers`、`orders` | ✅ |
| 3 | `grid_inspect`（`customers`） | 4 字段、`id` 为主键 | ⚠️ 内容正确但**渲染错位**，已修 |
| 4 | `grid_query` 排序查询 | 3 行 | ✅ |
| 5 | `grid_query` 聚合 JOIN | Ada 162.75 / Grace 89 | ✅ |
| 6 | `grid_query` 执行 `DELETE` | 必须被拒绝 | ✅ 拒绝且数据未变（复跑第 5 步结果一致） |
| 7 | `grid_execute` 执行 `DELETE` | `allowWrites=false` 时必须拒绝 | ✅ 拒绝并给出开启方式 |

同时确认 Host 侧注册：`Tool.listTools` 返回 4 个 `grid_*` 工具；`Slots.listSubTree('main')` 的 occupants 含 `grid`，`Slots.listSubTree('sidebar.panellist')` 的 occupants 含 `grid`（`order: 15`），两者均 `active: true`。

修复后的复核：重挂载插件后再调用一次 `grid_inspect`，输出变为

```text
customers — 4 column(s)

column | type    | nullable | key
-------+---------+----------+----
id     | INTEGER | NO       | PK
name   | TEXT    | NO       |
city   | TEXT    | YES      |
signup | TEXT    | YES      |

indexes: PRIMARY(id) UNIQUE
```

即修复在运行中的 Host 上生效（不是只存在于测试进程）。复核后已删除演示连接与临时数据库，profile 中的注册表恢复为空。

## 5. 缺陷与修复

| # | 缺陷 | 影响 | 修复 | 回归 |
| --- | --- | --- | --- | --- |
| 1 | `grid_list_connections` 只在已连接时追加 `[open]`，未连接时没有任何状态 | 模型无法判断连接是否可用 | 始终输出 `[open]` / `[closed]`，并附服务器版本 | `api.test.mjs` 断言 `[closed]/[open]` 与 `connected` 字段 |
| 2 | `grid_inspect`（带表）把字段元数据数组当成「列定义」传给 `formatTable` | 4 个同名列、每值重复 4 次，表结构不可读 | 改为 `column/type/nullable/key` 四列表格，并附索引摘要 | 新增断言：表头匹配、`id` 行只出现一次 |
| 3 | 插入行对话框对 `INTEGER PRIMARY KEY` 未默认 NULL | 空串写入 SQLite 整型主键会报 `datatype mismatch` | 整型主键 / 自增列默认勾选 NULL 并跳过该字段 | 由 `ui.test.mjs` 与手工建表验证覆盖 |
| 4 | Redis 类型筛选在 `setState` 后立即扫描，读到旧闭包 | 首次切换类型不生效 | `scan(reset, overrides)` 显式传参 | 代码审查 + 类型化调用 |
| 5 | 主机不可达时连接握手可能长时间不返回（ioredis 默认无限重试） | 输入错误主机名后界面一直转圈，拖住整轮测试 | Redis 关闭重试/离线队列并把握手限制在 5s；会话层再包一层 20s 超时 | 新增用例：不可达主机必须在 20s 内报错 |

另修复两处设计问题：

- **PostgreSQL / SQL Server 不再列出全部数据库**。单条连接只能访问一个库，列出来会让用户展开到一个永远加载不出表的层级；现在只显示当前库及其 schema，切换库通过编辑连接完成。
- **SQLite 主键索引补显**。`INTEGER PRIMARY KEY` 是 rowid 别名，SQLite 不为其建索引对象，结构页曾显示「无索引」；现在合成一条 `PRIMARY` 索引。

## 6. 未验证项与已知限制

- **SQL Server 未连真实实例**：驱动为纯 JS，逻辑与 MySQL/PostgreSQL 共用同一套方言工具并有单测，但缺少真实握手验证。
- **Oracle / ODBC**：未实现。
- **SSH / SOCKS5 隧道、结构编辑、结构同步、备份容器**：v1 明确不做，见 README「Known limits」。
- **并发编辑**：`rows.update` 以主键定位，命中 0 行返回 `409`；没有做乐观锁（版本号/时间戳）比对。
- **大结果集**：单次 `exec` 每个结果集截断 2000 行、导出上限 10000 行，属于有意的保护。

## 7. 第二轮：界面重做与验证（v2）

首轮交付被判定为「未吸取 RustGrid 的优点」，复核后确认这是范围取舍失误，而非技术受限。第二轮按桌面客户端的交互重做了 UI 层，Host 协议未变。

### 7.1 变更

| 区域 | 新增 |
| --- | --- |
| 布局 | 三栏（连接树 / 对象列表 / 工作区）+ 底部状态栏；树与对象列表可拖拽调宽；宽度 <1120/940/780/620px 逐级收起品牌、连接徽标、对象列表、连接树 |
| 对象列表 | 名称 / 类型 / 估算行数 / 注释 四列，可排序、可搜索、可过滤表/视图；双击开表，右键菜单 |
| 数据网格 | 拖选与 Shift 扩选、`Ctrl+C` 复制 TSV、`Ctrl+V` 粘贴（多行需确认）、选区求和/平均、列宽拖拽、字段显示/隐藏、行详情抽屉、筛选构建器（字段/操作符/值 + AND-OR + 原始 WHERE） |
| SQL 控制台 | 语法高亮（关键字/函数/字符串/数字/注释/变量）、行号、补全（关键字+函数+当前库表名，箭头选择、Enter/Tab 接受、Ctrl+Space 唤起）、Beautify、Explain、历史菜单 |
| Redis | 按命名空间分组、类型徽标、TTL 设置、重命名、编辑字符串值、新建键、删除 |
| 连接树 | 分组折叠、右键菜单（连接/断开/测试/新建查询/编辑/刷新/删除）、状态点 |
| 本地化 | 字典与 `locale/*.json` 由 `scripts/export-locale.mjs` 单一来源生成，共 164 个键 |

### 7.2 验证方式

1. **jsdom 交互测试**（`test/ui.test.mjs`，扩展到 40+ 条断言）：加载真实 `client.js`，依次驱动「展开连接 → 选库 → 对象列表双击开表 → 双击改单元格（断言 `rows.update` 的 key/changes）→ 点选与 Shift 扩选（断言选中数与求和 3.00）→ 行详情抽屉 → 筛选构建器（断言行内自动生成的 WHERE）→ 字段隐藏 → 语法高亮 token → Ctrl+Space 补全 → Beautify → 新建查询并执行」。
2. **无头 Edge 度量**（`dev/cdp-shot.mjs`）：用 CDP 渲染真实面板，导出各栏几何与溢出情况。

| 视口 | 树 | 对象列表 | 工作区 | 工具栏裁切 | 水平溢出 |
| --- | --- | --- | --- | --- | --- |
| 1680×1050 | 238 | 300 | 1142 | 0 | 无 |
| 1024×760 | 238 | 300 | 486 | 0 | 无 |
| 700×700 | 238 | 收起 | 462 | 0 | 无 |

3. **回归**：`node --test` 全量 43 项；首轮的驱动契约、路由与安全用例全部保留。

### 7.3 仍未验证

- MySQL / PostgreSQL 的 `tables()` 元数据查询（表注释、`reltuples` 估算）已在第二轮用真实容器复验（43/43 通过）；SQL Server 仍无实例可连。

## 8. 第三轮：配色与布局统一（v3）

第二轮留下的观感问题是「深浅两套主题看起来不像同一个产品」。原因在令牌层，不在组件层：面板用
`bg-layer-1/2` 表达表面与 hover，而宿主在**浅色主题下把 `bg-layer-1/2/3` 全部设成与 `bg-base`
相同的白色**，`border-l1` 只有 4% 黑。于是浅色下树栏、工具栏、标签条、hover、斑马纹全部消失，
层次只剩一圈几乎看不见的描边；深色下则正常 —— 界面只在一种主题里成立。

### 8.1 死代码与真实缺陷（本轮发现）

| # | 问题 | 影响 |
| --- | --- | --- |
| 1 | `.dg-results`、`.dg-rownum-editable` 在 TSX 里使用但 CSS 从未定义 | SQL 结果区不是 flex 子项，表格溢出面板而不是内部滚动 |
| 2 | `.dg-tok-ident` 等语法色写死成深色主题的 16 进制（`#e6e9ef` 等） | 浅色主题下标识符接近白字白底，SQL 控制台基本不可读 |
| 3 | 行号、NULL、字段提示等正文用了 `label-tertiary` | 浅色下 3.4:1，低于正文阈值 |
| 4 | 表格输入框内联 `height: 22`，标签关闭区 18×18 | 可点区域小于 24px；字号 9/10/10.5 低于宿主 11px 下限 |
| 5 | 标签页把关闭按钮嵌在 `<button>` 里（`span role=button`，无 tabindex） | 非法嵌套 + 键盘不可达 |
| 6 | 主键标记用 `⚿`（U+26BF） | 字体无此字形，渲染成豆腐块 |
| 7 | 连接对话框 `width: 620px` 无上限；`1fr 1fr auto` 的绑定行被挤扁 | 窄面板下对话框横向溢出、字段不可用 |

### 8.2 改法

- 引入 `--dg-*` 语义层（表面/线条/文字/强调/圆角/间距/字号/控件高度），组件规则不再写字面值；表面由「文字色 3%、7% 混入背景」推导，两种主题同一条声明都成立。声明同时挂在 `.dg-root`、`.dg-backdrop`、`.dg-ctxmenu` 上，因为后两者被 portal 到 `body`。
- 字号从 7 档（9.5–12.5）收敛到 3 档 + 数字卡：11 / 12 / 13 / 18；控件高度统一 28，图标按钮 26，关闭区 24。
- 强调色改用 `state-business-primary`，主按钮改用宿主的 `button-primary-fill` + `label-primary-inverted`。
- 语法色改为宿主 `--shiki-token-*` 向文字色拉近 24%，两套主题下同时达标。
- 把 `dev/harness.html` 的令牌替身换成从宿主主题样式表**逐条抄下来的真实值**：此前它给浅色主题伪造了 `bg-layer-1: #f7f8fa`，正好抹掉了上面第 1 条之外的整个层次问题。

### 8.3 验证

`dev/audit.mjs` 在无头 Edge 里渲染真实面板，按 14 个「视图 × 主题」组合测量：文本对比度（颜色经 1×1 canvas 归一，半透明背景沿祖先链合成）、相邻表面色差（CIE L*，绝对值差在深色主题下无意义）、hover/按下/斑马纹的可辨差、可点区域尺寸、字号档位、以及未覆盖字形。

| 指标 | 改前（浅色 table 视图） | 改后（7 视图 × 2 主题） |
| --- | --- | --- |
| 正文对比度 < 4.5:1 | 127 处 | 0 |
| 相邻表面 ΔL*（最小值） | 0（树栏/工具栏/标签条与主区同色） | 2.42（浅）/ 3.50（深） |
| 可点区域 < 24px | 4 处 | 0 |
| 字号档位 | 9 / 10 / 10.5 / 11 / 11.5 / 12 / 12.5 | 11 / 12 / 13（+10px 排序箭头） |
| 未覆盖字形 | 主键标记豆腐块 | 0（4/4 处改为 SVG） |

同时 `node --test` 108 项全绿，`tsc` 两套配置无错。截图见 `dev/shots/`（`final-*` 为本轮产物）。
