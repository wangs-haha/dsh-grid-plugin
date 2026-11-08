# 架构与代码导航

返回 [文档索引](<README.md>)。这是当前实现的导航，不是第二份独立 API 规范；改动协议时必须同时检查实现、类型、工具与测试。

## 两个运行边界

```text
DSH browser
  Client entry → React panel/store → typed API client
                                   │ ctx.connection.fetch
                                   ▼
DSH Host                   POST /api/grid
  grid_* tools ──────────→ action router
                                   │
                   connection registry + SessionPool
                                   │
                     opener / optional SSH transport
                                   │
                     engine adapter → database
```

- **Host**：[index.js](<../index.js>) 注册认证 HTTP 路由、Agent 工具、绑定提示与资源释放。Host 是原生 ESM，不经过客户端打包器。
- **Client**：[main.tsx](<../src/client/main.tsx>) 注册宿主槽位与 locale；不能当作独立 Vite 应用启动。
- **唯一业务路由**：[api.js](<../lib/api.js>) 供 Web 和工具共用；客户端隐藏按钮不是安全边界。
- **模块加载**：[build.mjs](<../scripts/build.mjs>) 将 TSX/CSS 生成经典脚本，调用 `window.__ModuleLoader__.load`，React/ReactDOM 由宿主提供。

## Host 模块职责

| 模块 | 负责什么 | 不应放进去什么 |
| --- | --- | --- |
| [connections.js](<../lib/connections.js>) | 引擎/输入校验、秘密合并/清空、AES-GCM、持久化与公开投影 | UI 状态、数据库连接池 |
| [api.js](<../lib/api.js>) | action 校验、写策略、真实主键检查、导入/导出、统一结果 | vendor 连接细节 |
| [tools.js](<../lib/tools.js>) | `grid_*` schema、workspace 默认绑定、工具输出 | 绕过 router 的 SQL 执行路径 |
| [session.js](<../lib/session.js>) | lane、串行队列、重连策略、空闲清理、generation fence、probe | Secret 的持久化格式 |
| [open.js](<../lib/open.js>) | 总连接 deadline、abort、迟到结果和有界 teardown | 新的路由层 |
| [transport.js](<../lib/transport.js>) | 可选 ssh2、固定指纹、共享 SSH 与独立 listener lease | 系统 shell / ssh、直连兜底 |
| [network.js](<../lib/drivers/network.js>) / [tls.js](<../lib/drivers/tls.js>) | 物理拨号与逻辑 TLS 身份分离、连接/销毁保护 | Host 级策略配置 UI |
| [驱动注册表](<../lib/drivers/index.js>) | 引擎可用性、惰性导入适配器 | 顶层强制加载全部可选依赖 |
| [query.js](<../lib/query.js>) | 分句、只读分类、方言引用、分页和值序列化 | 将关键字检测宣称为完整 SQL 沙箱 |
| [extras.js](<../lib/extras.js>) | 保存查询与 workspace 绑定 | 连接密钥 |
| [errors.js](<../lib/errors.js>) | 可区分的用户错误和 HTTP 状态 | 对外泄露秘密 |

MySQL/PostgreSQL/SQL Server/Redis 的 vendor 调用分别留在驱动目录中。PostgreSQL 和 SQL Server 的 DDL composer 是纯元数据到文本转换，契约与 driver wiring 分别测试，避免只测 composer 而漏掉 catalog 字段。

SQLite 通过 [异步 façade](<../lib/drivers/sqlite.js>) 将工作交给 [worker entry](<../lib/drivers/sqlite-worker.js>) 和 [同步 core](<../lib/drivers/sqlite-core.js>)。worker 启动失败时有 in-process 降级；这会重新暴露同步阻塞，不代表已经实现可中断 SQLite 查询。

## Client 模块职责

| 入口 | 职责 |
| --- | --- |
| [GridPanel](<../src/client/panel/GridPanel.tsx>) | 三栏布局、工具栏、tab 容器 |
| [ConnectionDialog](<../src/client/panel/ConnectionDialog.tsx>) | 连接草稿、凭据只写编辑、SSH/TLS 表单 |
| [WorkspaceDialog](<../src/client/panel/WorkspaceDialog.tsx>) | workspace 与数据库绑定 |
| [store](<../src/client/store.ts>) | 连接、目录、tab、查询与元信息的可观察状态 |
| [API client](<../src/client/lib/api.ts>) / [types](<../src/client/lib/types.ts>) | action 调用、类型和错误传播 |
| [i18n](<../src/client/lib/i18n.ts>) | 英中双语唯一来源 |
| [kit](<../src/client/ui/kit.tsx>) / [panel.css](<../src/client/ui/panel.css>) | 公共控件、Portal、宿主令牌上的 `--dg-*` 语义层 |
| [TableView](<../src/client/views/TableView.tsx>) / [SqlView](<../src/client/views/SqlView.tsx>) / [RedisView](<../src/client/views/RedisView.tsx>) | 各自的数据交互，不承担 Host 授权 |

## 会话与生命周期不变量

- 每个连接按 `main` / `query` 分 lane，MySQL、PostgreSQL、Redis 的长查询不阻塞常规树/表操作；SQLite、SQL Server 归并成一个 lane。
- 队列属于连接 + lane，不属于可被替换的 driver。关闭、编辑、删除必须 fence 掉旧队列、握手与 probe。
- SSH client 可共享，但每个 driver 的临时回环 listener 独立持有和释放；取消 side connection 也必须走同一隧道策略。
- 读操作的重试不是所有操作的默认承诺：写入、原始 Redis 命令、取消后的操作与 SSH 不确定结果不能重放。
- 连接过程有总 deadline 与有界清理；卸载必须停止新工作、释放 pool/transport。不要只给调用者加 timeout 而遗留后台 socket。

## 数据、生成物与变更接缝

运行数据在 `$DSH_HOME/dsh-grid/`（默认 `~/.dsh/dsh-grid/`），不在仓库里。连接与 key、保存查询和 workspace 绑定都属于用户数据，不用作测试夹具。详见 [安全设计](<security.md>)。

提交的客户端产物 [client.js](<../dist/client.js>) 从源码构建，语言包 [en.json](<../locale/en.json>) / [zh.json](<../locale/zh.json>) 从 i18n 导出。两类产物均需保持同步，不能通过删掉 tracked artifact“清爽化”仓库。

新增 action 至少复核：Host router → Client API/types → Agent schema（若公开给 Agent）→ 回归 → 使用/安全文档。涉及连接格式则额外检查旧记录兼容、投影不含秘密、编辑的 omission/clear 语义和未保存草稿不落盘。
