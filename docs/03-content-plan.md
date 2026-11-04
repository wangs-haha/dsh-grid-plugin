# 03 · 内容规划

## 1. 交付物结构

```
dsh-grid-plugin/
├── package.json            # @local/dsh-grid，dsh.bundle.patch + dsh.client
├── cordis.patch.yml        # 插入 id=grid 的 Host 行
├── index.js                # Host：路由 / 会话 / 工具注册
├── client.js               # Client：整面板 UI（零构建 React.createElement）
├── lib/
│   ├── connections.js      # 连接 CRUD、AES-256-GCM、校验、迁移
│   ├── session.js          # 会话池、空闲回收、自动重连
│   ├── api.js              # action 路由（HTTP 与工具共用）
│   ├── query.js            # 语句切分、只读判定、标识符引用、分页 SQL
│   ├── tools.js            # grid_* 四个 Agent 工具
│   └── drivers/
│       ├── index.js        # 引擎注册表 + 惰性加载
│       ├── sqlite.js       # node:sqlite
│       ├── mysql.js        # mysql2
│       ├── postgres.js     # pg
│       ├── sqlserver.js    # mssql
│       └── redis.js        # ioredis
├── locale/{en,zh}.json     # meta.title / meta.description
├── icon.svg                # 原创图标（Apache-2.0）
├── README.md
├── docs/
│   ├── 01-research.md
│   ├── 02-product-design.md
│   ├── 03-content-plan.md
│   └── 04-test-report.md
└── test/
    ├── query.test.mjs
    ├── connections.test.mjs
    └── drivers.test.mjs
```

## 2. 命名与文案

- 产品名（en）：**Grid**；中文：**Grid 数据库**
- 面板标签：`Grid` / `数据库`
- 侧边栏 `id`：`grid`；槽位 `key`：`grid`；i18n 命名空间：`grid`
- 工具前缀：`grid_`（`grid_list_connections`、`grid_inspect`、`grid_query`、`grid_execute`）
- HTTP 路由：`/api/grid`
- 数据目录：`$DSH_HOME/dsh-grid/`

### 2.1 关键文案（en / zh）

| key | en | zh |
| --- | --- | --- |
| `panel` | Grid | 数据库 |
| `newConnection` | New connection | 新建连接 |
| `test` | Test | 测试 |
| `connect` | Connect | 连接 |
| `disconnect` | Disconnect | 断开 |
| `emptyConnections` | No connections yet. Add one to browse your databases. | 还没有连接。新建一个连接来浏览数据库。 |
| `emptyTable` | This table is empty. | 这张表还没有数据。 |
| `noPrimaryKey` | This table has no primary key, so rows cannot be located safely. Editing is disabled. | 该表没有主键，无法安全定位行，编辑已禁用。 |
| `runHint` | Ctrl/Cmd + Enter to run | Ctrl/Cmd + Enter 执行 |
| `queryOk` | {n} row(s) in {ms} ms | {n} 行，耗时 {ms} 毫秒 |
| `confirmDelete` | Delete this row? | 确定删除这一行？ |
| `driverMissing` | The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory. | 未安装 {engine} 驱动，请在插件目录执行 `pnpm add {pkg}`。 |

> 所有界面文案都走 Client `ctx.locale`，`zh` 为回退语言；服务端返回的错误原文（数据库驱动消息）不翻译，原样呈现在「详情」里。

## 3. 图标

`icon.svg`，24×24 视口，原创几何图形：三个叠起的数据库圆柱 + 一个表示「网格/数据行」的三横线方块，颜色用 `currentColor` 主色 + 一个强调色。不复制 RustGrid 商标或截图素材。

## 4. 视觉规范

- 容器与控件只用宿主令牌，面板内部再收一层 `--dg-*` 语义变量（表面 / 线条 / 文字 / 强调 / 圆角 / 间距 / 字号），组件规则里不写字面值。
- 表面用「文字色 3% 混入背景」推导，而不是 `bg-layer-*`：后者在浅色主题下三层都等于白，层级和 hover 会全部消失。
- 强调色用 `--dsw-alias-state-business-primary`（#4176e6，两套主题同值），只用于填充、描边与状态字形；它约 4.2:1，不用于正文。主按钮用宿主的 `button-primary-fill` + `label-primary-inverted`（浅色黑底白字 / 深色白底深字）。
- 危险操作 `--dsw-alias-state-error-primary`；状态色只承载图标、左侧竖条与淡底，不写彩色正文，否则两套主题下都无法稳定达到 4.5:1。
- 字号四档：正文 13 / 次要 12 / 小字 11 / 数字卡 18；11px 是宿主下限，不再出现 9.5px、10.5px 这类档位。
- 行高 28px（网格）、控件 28px、图标按钮 26px、可点区域不小于 24px；圆角 4 / 6 / 8 / 10。
- 深浅色主题自动继承（令牌已分主题），不写死背景色；语法配色取宿主 `--shiki-token-*` 并向文字色拉近 24%，使浅色下的字符串/注释达到 4.5:1。
- 面板根节点处理 `--dsh-frame-top-clearance` / `--dsh-frame-leading-clearance`，避免被宿主标题栏遮挡。

## 5. 文档交付

- `README.md`：安装、引擎支持矩阵、配置项、Agent 工具用法、安全说明、已知限制。
- `docs/04-test-report.md`：测试用例清单、真实引擎结果、环境、遗留问题。
