# 01 · 需求调研

> 参考项目：[`yisier/rustgrid`](https://github.com/yisier/rustgrid)（Apache-2.0）
> 目标：在 DeepSeek Harness (DSH) 中以插件形式提供「连接并管理数据库」的能力。
> 调研时间：2026-11-04 · 运行环境：DSH Desktop / Windows / Node v24.14.0

## 1. 参考项目拆解

RustGrid 是一个 Rust + GPUI 编写的原生（无 WebView）Navicat 风格数据库客户端。它的能力可以拆成 7 个层级：

| 层 | RustGrid 提供的能力 | 对本插件的价值 |
| --- | --- | --- |
| **连接层** | 增删改查连接；连接分组（可拖拽）；环境色（红/黄/绿）；TLS；SSH / SOCKS5 / HTTP 隧道；密码 XChaCha20-Poly1305 落盘加密；从 RustGrid / Navicat / DBX 导入连接 | 核心。取「连接 CRUD + 环境色 + 密码加密落盘」，隧道/导入列为后续 |
| **导航层** | 连接树 → 数据库 → schema（SQL Server / PG / Oracle）→ 表 / 视图；可搜索、可排序、列宽可调 | 核心。取「连接 → 数据库 → 表/视图」三级树 + 搜索 |
| **数据层** | 分页数据网格、原地编辑、类 Excel 多区域选择、复制粘贴、排序、树形筛选器、字段隐藏/排序、选中单元格求和、清空/截断/重命名表 | 核心取「分页网格 + 排序 + 原地编辑 + 增删行 + 导出」 |
| **SQL 层** | 语法高亮、智能补全、Beautify、Explain、单会话多语句（每个结果集一个标签页）、保存命名查询、执行 SQL 文件 | 核心取「多语句执行 + 每结果集一个标签页 + 耗时/行数 + Explain」 |
| **结构层** | 表设计器：字段、索引、外键、唯一键、检查、排除约束、规则、触发器、分区、注释，带实时 SQL 预览 | 精简为「结构只读视图（字段 / 索引 / 建表 SQL）」 |
| **运维层** | 用户与权限、结构/数据同步、`.rgbak` 备份恢复、Excel/CSV/TXT 导入导出向导 | 精简为「结果集导出 CSV / JSON」；备份/同步列为后续 |
| **Redis 层** | standalone / Sentinel / Cluster；按命名空间浏览；每个 key 独立页面（RAW / JSON、集合可编辑表格）；新建 key、TTL、重命名、删除；命令补全 | 取「键列表 + 值查看 + 命令控制台」 |

明确 **不进入 v1** 的部分（避免范围失控，且它们依赖桌面端专有能力）：SSH/SOCKS5 隧道、`.rgbak` 备份、跨库结构同步、表设计器写操作、用户权限管理、Oracle / ODBC 驱动。

## 2. DSH 侧能力盘点（已用 `cordis_inspect_query` 核实）

| 能力 | 结论 | 证据 |
| --- | --- | --- |
| Host 注册认证 HTTP 路由 | 可用：`ctx.connection.fetch.register({ path, methods, requestBody, fetch })`，由浏览器同源携带鉴权 | 现有 `dsh-git-view` 插件的 `index.js` 即此形态 |
| Host 注册 Agent 工具 | 可用：`ctx.tools.register(ToolDefinition)`，`ToolDefinition = ToolSchema + { output: { schema, render }, execute(args, exec) }` | `Service.listService('tools')` 返回的 `ToolDefinition` 声明 |
| Client 面板 | 可用：`window.__ModuleLoader__.load({ id, factory(require) })`，`require('react')` / `require('react-dom')` 由页面模块表提供 | `client.Builtin.listBuiltins` |
| 槽位 | `main`（keyed，中央面板，`key` 由侧边栏 id 派发）+ `sidebar.panellist`（list，全局图标） | `Slots.listSubTree` 的 `keyDomain` 与 `occupants` |
| 主题 | 只允许 `--dsw-alias-*` / `--dsw-elevation-*` / `--shiki-token-*` 令牌（面板实际用到 20 余个；`bg-layer-1/2/3` 在浅色下与 `bg-base` 同值，不能用来表达层级） | `Theme.listTokens`、宿主 `ui-theme` 样式表 |
| i18n | Client `ctx.locale.register(ns, { zh, en })` + `ctx.locale.bind(ns)`；Host 侧另有 `locale/*.json` 供插件管理页读取 `meta.title/description` | `ui-plugin.md`、`Slots` catalog |
| 密码等密钥 | **没有**可直接复用的「插件私有 KV + 加密」一站式 API（`storageDomain` 需 `defineDomain`/zod 等内部包，增加耦合风险） | `Service.listService('storageDomain')` |
| 运行时 | Node v24.14.0，内置 `node:sqlite`（`DatabaseSync`，无需原生编译） | 实测 `node -e` |

## 3. 驱动可用性实测

| 引擎 | 驱动 | 形态 | 结论 |
| --- | --- | --- | --- |
| SQLite | `node:sqlite` | Node 内置 | ✅ 零依赖，直接可用 |
| MySQL / MariaDB | `mysql2` | 纯 JS | ✅ 本地安装成功（3.24.6） |
| PostgreSQL | `pg` | 纯 JS | ✅ 本地安装成功（8.23.1） |
| Redis | `ioredis` | 纯 JS | ✅ 本地安装成功（5.11.1） |
| SQL Server | `mssql`（tedious） | 纯 JS | ✅ 本地安装成功（11.0.2） |
| Oracle / DB2 | — | 需 Instant Client / ODBC | ⛔ v1 不支持，列入路线图 |

四个网络驱动全部是纯 JS、无 install script，不会给 `install_bundle` 带来原生编译风险。

## 4. 关键设计约束（由调研推出）

1. **不能照搬桌面交互**：DSH 插件是 Web 面板，无法做多窗口、系统级对话框、文件拖拽导入。因此用「左树 + 右多标签」的单窗口布局，导出改为浏览器下载。
2. **插件必须零构建**：`client.js` 手写 `React.createElement`（与 `dsh-git-view` 一致），不引入打包器，保证安装即可用。
3. **驱动不能污染 bundle 安装**：四个网络驱动放进 `optionalDependencies` 且**惰性 `import()`**——缺某个驱动时仅该引擎报「请安装驱动」，其余引擎与 UI 正常工作。
4. **安全边界要在 Host 侧**：连接密码只在 Host 内存/加密文件中；HTTP 响应永不回传密码；Agent 工具默认只读，写操作需 `Config.allowWrites` 显式开启。
5. **Agent 是一等公民**：与桌面客户端不同，DSH 的价值在于模型能直接查库。因此除 UI 外必须提供工具（`grid_*`），且工具与 UI 共用同一套连接与会话。

## 5. 结论

可行性成立：**SQLite 开箱即用，MySQL / PostgreSQL / SQL Server / Redis 惰性加载**，UI 走 `main` + `sidebar.panellist` 槽位，Agent 通过 `grid_*` 工具访问同一批连接。技术风险集中在「多方言 SQL 生成」与「Web 面板的数据网格交互」，这两处需要在设计与测试阶段重点覆盖。
