# Grid · DSH 数据库工作台

Grid 为 DeepSeek Harness 提供连接树、可编辑数据网格、SQL 控制台、Redis 浏览器，以及共享同一套 Host 路由的 `grid_*` Agent 工具。

支持 **SQLite、MySQL/MariaDB、PostgreSQL、SQL Server、Redis**。网络驱动与 SSH 支持均惰性加载；Agent 默认只读，写操作需要显式开启 `allowWrites`。

## 快速开始

- **插件运行时**：Node ≥ 22.13；SQLite 使用内置 `node:sqlite`。开发/测试建议 Node 22.22.2+ 或 24.15+（开发依赖要求更高）。
- **包管理器**：pnpm 10.33.0，版本记录在 [package.json](<package.json>)；提交并使用 [锁文件](<pnpm-lock.yaml>)。
- **DSH**：需要支持 Web Client 插件和 `connection.fetch` 的宿主。安装前阅读 [使用指南](<docs/user-guide.md>)；这不是可独立运行的 Web 应用。

```sh
pnpm install --frozen-lockfile
pnpm check
```

在 DSH 插件管理器中选择本仓库目录，或使用 CLI（替换为真实绝对路径）：

```text
dsh plugin add <absolute-path-to-this-repository>
```

仓库保留了安装所需的构建产物；修改客户端后仍必须重新执行 `pnpm build`。Host 改动需要重新加载插件，浏览器刷新不能替换已导入的 Host 模块。详见 [开发与加载](<docs/development.md>)。

## 界面

| 浅色 | 深色 |
| --- | --- |
| ![浅色数据网格](<docs/screenshots/data-grid-light.png>) | ![深色数据网格](<docs/screenshots/data-grid-dark.png>) |

更多截图、SSH/TLS 配置、数据编辑与 Agent 用法见 [使用指南](<docs/user-guide.md>)。

## 从哪里开始读

| 你想做什么 | 入口 |
| --- | --- |
| 使用插件、了解功能与限制 | [使用指南](<docs/user-guide.md>) |
| 查找当前文档 | [文档索引](<docs/README.md>) |
| 理解模块边界与请求链路 | [架构说明](<docs/architecture.md>) |
| 开发、构建、重新加载插件 | [开发指南](<docs/development.md>) |
| 选择测试与了解跳过项 | [测试指南](<docs/testing.md>) |
| 理解密钥、TLS、只读与重试边界 | [安全设计](<docs/security.md>) |
| 贡献代码或使用编码 Agent | [贡献规范](<CONTRIBUTING.md>) · [Agent 约束](<AGENTS.md>) · [项目 skill](<.agents/skills/grid-maintenance/SKILL.md>) |
| 打包、升级与发布前复核 | [维护与交付](<docs/maintenance.md>) · [变更记录](<CHANGELOG.md>) |
| 报告安全问题 | [安全报告政策](<SECURITY.md>) |

## 常用命令

```sh
pnpm check            # 仓库约束 + locale 同步 + 类型检查 + 构建 + 默认测试
pnpm build            # 生成客户端安装产物
pnpm test             # 自建临时 SQLite / 回环服务；不访问现有 DB 夹具
pnpm test:ssh         # SSH、安全与连接对话框定向测试
pnpm locale           # 从 i18n.ts 导出 en/zh JSON
```

`pnpm test:integration` 是**显式有副作用**的本地数据库集成命令，会访问固定端口与测试库并创建/删除对象。不要对日常或生产数据库执行；参数、凭据和限制见 [测试指南](<docs/testing.md>)。

## 仓库布局

```text
index.js                 Host 插件入口
lib/                     路由、连接存储、会话、SSH 传输与数据库驱动
src/client/              React + TypeScript 客户端源码
scripts/                 构建、语言包、仓库检查、安全测试入口
test/                    Node test runner / jsdom / 回环集成夹具
dev/                     文件夹具式 UI 测量与截图工具（非线上 Host）
dist/client.js           提交的客户端安装产物，禁止手改
locale/                  提交的语言包，源头是 i18n.ts
docs/                    当前使用、开发和维护文档；archive/ 为历史材料
.agents/skills/          项目级 Agent 技能
```

项目是私有本地 bundle（`@local/dsh-grid`），并不因为有交付检查就意味着已发布到 npm。源码遵循 [Apache-2.0](<LICENSE>)。
