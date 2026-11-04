# 02 · 产品设计

## 1. 定位

**Grid** —— DSH 里的数据库工作台。一句话：*连上、看得见、改得动、问得出*。

它同时服务两个用户：**人**（左侧连接树 + 数据网格 + SQL 编辑器）和**模型**（`grid_*` 工具）。两者共享同一个连接注册表和同一批活跃会话，所以「人连上、模型就能查」。

设计原则：

1. **Navicat 的肌肉记忆**：连接树 → 表 → 数据网格 / SQL 编辑器，快捷键与排布贴近桌面客户端。
2. **默认安全**：密码不出 Host；写操作在 UI 有确认，在 Agent 侧默认禁止。
3. **优雅降级**：任一引擎驱动缺失只影响该引擎；任一语句报错只影响该结果集。
4. **零构建**：单文件 `client.js`，`React.createElement` 直写。

## 2. 范围

### v1 包含

| 模块 | 能力 |
| --- | --- |
| 连接管理 | 新建 / 编辑 / 复制 / 删除 / 测试连通性 / 连接与断开；分组名、环境色（none/red/yellow/green）；密码加密落盘 |
| 对象导航 | 连接 → 数据库（SQLite 为「主」/ MySQL 为 database / PG 为 database→schema）→ 表 / 视图；树内搜索；刷新 |
| 表数据 | 分页（默认 100 行）、列头排序、服务端 `ORDER BY`、双击单元格原地编辑、插入行、删除行、刷新、导出 CSV/JSON |
| 表结构 | 字段列表（名称/类型/可空/默认值/主键/注释）、索引列表、`CREATE TABLE` 预览 |
| SQL 编辑器 | 多语句（`;` 分隔）、每个结果集一个结果标签、耗时与行数、错误定位、`Ctrl/Cmd+Enter` 执行、Explain、清空 |
| 数据导出 | 当前结果集 / 当前表页导出为 CSV 或 JSON（浏览器下载） |
| Redis | 键空间浏览（`SCAN` + 类型过滤）、值查看（string/hash/list/set/zset）、TTL、命令控制台 |
| Agent 工具 | `grid_list_connections` / `grid_inspect` / `grid_query` / `grid_execute`（写操作受 `allowWrites` 控制） |

### v1 不包含（路线图）

SSH / SOCKS5 / HTTP 隧道、Oracle 与 ODBC 引擎、`.rgbak` 备份恢复、结构/数据同步、表设计器写操作、用户与权限管理、Excel 导入向导、命名查询保存。

## 3. 信息架构

```
侧边栏图标（sidebar.panellist, id=grid）
└── 主面板（main, key=grid）
    ├── 工具栏   [＋ 新建连接] [⟳ 刷新] │ 环境色点 │ 连接名 │ [测试] [连接/断开] │ 右侧 [导出 ▾]
    ├── 左栏 · 连接树（可拖拽改宽 180–460px）
    │   ├── 搜索框
    │   ├── 连接节点（状态点：已连接/未连接/错误）
    │   │   └── 数据库 / schema 节点
    │   │       ├── 表 ▸（展开即加载数据）
    │   │       └── 视图
    │   └── 空态：引导新建第一个连接
    └── 右栏 · 工作区（多标签）
        ├── 数据标签：表名 · 行数 · 分页器 · 网格
        ├── 结构标签：字段 / 索引 / DDL
        ├── SQL 标签：编辑器 + 结果标签组
        └── Redis 标签：键列表 + 值面板 + 控制台
```

## 4. 交互细则

### 4.1 连接

- 「＋ 新建连接」打开模态框：引擎选择（4 个卡片）→ 动态表单（SQLite 只需文件路径；网络引擎需 host/port/user/password/database；Redis 需 host/port/password/db）。
- 保存后立即测试连通性：成功则建立会话并把连接节点展开到数据库层；失败在弹窗内显示错误原文，不阻塞保存。
- 未连接状态下点击表节点：先自动 `connect`，再取数据。
- 环境色渲染为连接节点左侧 3px 竖条 + 工具栏圆点，用于区分生产/测试。

### 4.2 数据网格

- 虚拟化非必需：单页上限 500 行，用普通 DOM 即可。
- 排序：点击列头循环 `asc → desc → 无`，以服务端 `ORDER BY` 实现（保证跨页正确）。
- 原地编辑：双击进入编辑；`Enter` 提交、`Esc` 取消、失焦提交。提交调用 `rows.update`，以主键定位；无主键的表禁用编辑并提示「该表没有主键，无法安全定位行」。
- 删除行需二次确认；插入行弹出表单，按列类型给默认值。
- 空值显示为灰色 `NULL`，与空字符串 `''` 区分。

### 4.3 SQL 编辑器

- `<textarea>` + 等宽字体 + `Tab` 插入两空格；不做语法高亮（v1 取舍，避免引入编辑器依赖）。
- `Ctrl/Cmd + Enter` 执行全部；选中文本时只执行选中部分。
- 结果区按语句顺序渲染标签；失败语句给出错误消息与位置，后续语句不执行（与多数客户端一致）。
- 语句耗时合计显示在工具栏。

### 4.4 状态与错误

- 所有错误统一 `{ error: string }`，UI 用顶部横幅 + 3 秒自动消失的 toast 双通道呈现。
- 会话断开会话：`ECONNRESET` 等错误自动重连一次，仍失败则把连接标记为「错误」并提示。

## 5. 数据模型

### 5.1 连接记录（落盘）

`$DSH_HOME/dsh-grid/connections.json`

```jsonc
{
  "version": 1,
  "items": [
    {
      "id": "c_8f2a…",
      "name": "本地 MySQL",
      "engine": "mysql",
      "group": "dev",
      "color": "green",
      "host": "127.0.0.1", "port": 3306, "user": "root",
      "database": "gridtest", "ssl": false,
      "file": null,          // sqlite
      "redisDb": 0,          // redis
      "options": {},
      "secret": "v1:base64(iv|tag|ciphertext)",  // 仅密码，AES-256-GCM
      "createdAt": "…", "updatedAt": "…"
    }
  ]
}
```

密钥文件 `$DSH_HOME/dsh-grid/key`（32 字节随机，`0600`），与数据文件分开放置；`secret` 字段永不进入任何 HTTP 响应或工具返回值，对外只暴露 `hasPassword: boolean`。

### 5.2 会话

Host 进程内 `Map<connectionId, Session>`，`Session = { id, engine, driver handle, lastUsed, databases }`。空闲 10 分钟自动关闭；`disconnect` 立即关闭。

### 5.3 统一表标识

`{ connectionId, database?, schema?, table }`。SQLite 的 `database` 为空（单文件），MySQL 的 `database` 即库名且 `schema` 为空，PostgreSQL 的 `database` 与 `schema`（默认 `public`）都有意义。

## 6. Host HTTP API

单一路由 `POST /api/grid`，`Content-Type: application/json`，请求体 `{ action, ...payload }`，响应 `{ ok: true, ...data }` 或 `{ error }`（HTTP 4xx/5xx）。

| action | 入参 | 出参 |
| --- | --- | --- |
| `meta` | — | `{ engineList, version, allowWrites }` |
| `connections.list` | — | `{ connections: PublicConnection[] }` |
| `connections.create` | `connection` | `{ connection }` |
| `connections.update` | `id, patch` | `{ connection }` |
| `connections.delete` | `id` | `{ ok }` |
| `connections.test` | `id` \| `connection` | `{ ok, latencyMs, serverVersion }` |
| `connections.connect` | `id` | `{ ok, serverVersion }` |
| `connections.disconnect` | `id` | `{ ok }` |
| `connections.sessions` | — | `{ sessions: [{ id, engine, idleMs, version }] }` |
| `databases` | `connectionId` | `{ databases: [{ name, schemas? }] }` |
| `tables` | `connectionId, database?, schema?` | `{ tables: [{ name, kind, rows? }] }` |
| `columns` | `connectionId, database?, schema?, table` | `{ columns, indexes, ddl }` |
| `rows` | `…, page, pageSize, orderBy, orderDir, where` | `{ columns, rows, total, durationMs }` |
| `rows.update` | `…, key, changes` | `{ affected }` |
| `rows.insert` | `…, values` | `{ affected }` |
| `rows.delete` | `…, key` | `{ affected }` |
| `sql` | `connectionId, database?, sql` | `{ results: [{ columns, rows, rowCount, durationMs, error? }] }` |
| `redis.scan` | `connectionId, pattern, cursor, type` | `{ keys, cursor }` |
| `redis.key` | `connectionId, key` | `{ type, ttl, value }` |
| `redis.command` | `connectionId, command` | `{ reply }` |
| `redis.delete` | `connectionId, key` | `{ deleted }` |
| `export` | `…, where, orderBy, orderDir` | `{ columns, rows, truncated, total }` |

## 7. Agent 工具

| 工具 | 作用 | 写 |
| --- | --- | --- |
| `grid_list_connections` | 列出连接与引擎（不含密码） | — |
| `grid_inspect` | 传 `connectionId` 看库表；再传 `table` 看字段/索引 | — |
| `grid_query` | 执行只读 SQL（`SELECT`/`WITH`/`EXPLAIN`/`SHOW`/`DESCRIBE`/`PRAGMA`），返回表格化文本 | 否 |
| `grid_execute` | 执行任意 SQL，含写操作 | 需 `Config.allowWrites=true` |

工具返回纯文本表格（列名 + 前 N 行），并附 `meta` 里的结构化 JSON，便于模型与 UI 双消费。超时 30s，单次结果行数上限 200。

## 8. 安全

- 密码仅以 AES-256-GCM 密文落盘；密钥独立文件、权限 0600。
- HTTP 路由继承 `ctx.connection.fetch` 的鉴权，非浏览器同源请求被拒。
- Agent 写操作默认禁止，需在 `cordis.patch.yml` 里显式 `allowWrites: true`。
- SQL 执行不做关键字黑名单（GUI 场景下用户本就有权限），但 `rows.*` 操作强制要求主键，避免误伤全表。
