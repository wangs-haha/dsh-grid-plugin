# 文档索引

当前维护文档按职责拆分；运行行为以源码和可复现测试为准。返回 [项目首页](<../README.md>)。

| 文档 | 用途 |
| --- | --- |
| [使用指南](<user-guide.md>) | 安装、引擎、SSH/TLS、面板、Agent 工具、已知限制 |
| [架构](<architecture.md>) | Host/Client 边界、请求路径、模块导航与数据流 |
| [开发指南](<development.md>) | 环境、构建、语言包、宿主加载和项目 skill |
| [测试指南](<testing.md>) | 安全默认测试、显式集成、定向回归和视觉验证边界 |
| [安全设计](<security.md>) | 凭据、权限、SQL、TLS/SSH、重试与资源生命周期 |
| [维护与交付](<maintenance.md>) | 依赖、生成物、CI、打包与清理约定 |
| [贡献规范](<../CONTRIBUTING.md>) | 人工/Agent 共用的贡献与评审流程 |
| [Agent 约束](<../AGENTS.md>) | 编码 Agent 应遵守的不变量 |
| [项目 skill](<../.agents/skills/grid-maintenance/SKILL.md>) | 任务式维护步骤与回归选择 |
| [安全报告政策](<../SECURITY.md>) | 私密报告及支持边界 |
| [变更记录](<../CHANGELOG.md>) | 可观察行为及升级注意事项 |

## 文档如何维护

- README 只保留定位、快速开始、命令和导航；细节归对应专题，不复制完整测试清单。
- API 变更同时检查 Host router、Client 类型/调用和 Agent tools；文档不另造未经验证的协议规范。
- 测试报告注明版本、环境、命令与跳过项；不把某次通过数写成永久质量保证。
- 历史调研与执行记录集中在 [归档](<archive/README.md>)，显式非规范性，不作为当前支持矩阵。
- 仓库内 Markdown 使用相对链接；`pnpm check:repo` 检查文件目标（不访问外部链接，也不验证锚点语义）。
