# AGENTS.md

适用于整个 Grid 仓库。面向贡献者的流程见 [CONTRIBUTING.md](<CONTRIBUTING.md>)；当前文档入口见 [docs/README.md](<docs/README.md>)。本文是维护约束，不是功能路线图。

## 开始工作

1. 阅读本文件、[package.json](<package.json>) 以及改动涉及的实现和测试；先检查 `git status --short`，保留用户已有改动。
2. 只围绕当前任务做小而完整的修改。不要顺手升级依赖、重写大模块、批量格式化旧代码或修改 DSH 宿主安装。
3. 涉及 Grid 开发、排错、测试、文档或打包时，加载项目 skill `grid-maintenance`（见 [.agents/skills/grid-maintenance/SKILL.md](<.agents/skills/grid-maintenance/SKILL.md>)）。技能未被当前会话发现时，直接阅读该文件。
4. 当前事实以源码和可复现测试为准；`docs/archive/` 仅保存历史，不能作为现行 API 或验收结论。

## 架构边界

- Host 是 `index.js` + `lib/` 的原生 ESM JavaScript；Client 是 `src/client/` 的严格 TypeScript + React。
- UI 和 Agent 工具共用 `lib/api.js` action router。新增能力不得复制一套绕过校验、会话池或写策略的数据库访问路径。
- 数据库方言和 vendor API 留在 `lib/drivers/`；公共连接输入/密钥规则留在 `lib/connections.js`；会话/隧道生命周期分别归 `lib/session.js`、`lib/transport.js`。
- 不新增第二份 React。构建必须保留宿主 `window.__ModuleLoader__` 注册协议与外部 React 依赖。
- 新 UI 文案同步维护 `src/client/lib/i18n.ts` 的中英文，再执行 `pnpm locale`；不要单独手改生成的 JSON。
- 沿用两空格、LF、UTF-8、单引号、无分号及现有局部风格。组件使用 `--dg-*` 语义令牌，并验证浅/深色和 Portal 弹层。

## 不可削弱的安全契约

- Agent 默认只读；`grid_execute` 必须受 Host `allowWrites` 限制，不能用 UI 的人工操作能力替代 Agent 授权。
- 只读 SQL 保持逐语句判定与引擎层保护。SQL Server 的登录权限仍是必要边界；不要把 SQL 分类器称作完整沙箱。
- 行更新/删除必须用真实主键；值参数化、标识符按方言引用，不用字符串拼接用户值。
- 密码、SSH 私钥/口令及其密文不返回 UI、工具、日志或错误详情。省略保留、显式空串清除的更新语义不能改变。
- TLS 校验默认不降级；SSH 必须固定主机指纹，不做 TOFU、直连回退或系统 `ssh`/shell 调用。
- 写入、原始 Redis 命令、取消后的操作和 SSH 中断中的请求不能自动重放。保留关闭/编辑/删除后的 generation fence、超时、abort 和迟到结果清理。
- 测试使用自建临时目录/回环夹具，不读写用户 `$DSH_HOME`、真实密钥或生产数据库。现有本机 DB 集成必须显式 opt-in。

## 验证与交付

- 默认执行 `pnpm check`：仓库约束、语言包同步、两套 TypeScript 检查、构建和安全默认测试。
- 修改前端后重新构建 `dist/client.js`；该文件和 `locale/*.json` 是刻意提交的安装产物，不能当垃圾删除、忽略或手改。
- 按 [测试指南](<docs/testing.md>) 补对应回归；失败先定位，不能删断言、放宽安全策略或把跳过项计作已验证。
- 不自动运行 `pnpm test:integration`，不安装/重启插件、不启用写权限、不启动替代 DSH Web 服务，除非任务明确需要且具备相应授权。
- 修改 Host 后仅刷新浏览器不能替换已导入模块；实际加载方式和 UI 验证见 [开发指南](<docs/development.md>)。未验证热更新接收器和 watcher 就不要承诺 HMR。
- 同步受影响的使用文档；可观察行为变化写入 `CHANGELOG.md` 的 Unreleased。不要伪造版本、测试数字或发布记录。
- 删除/移动前确认绝对路径和引用；历史材料归档，有效测试提升为正式脚本。保留 lockfile、bundle patch、许可证、截图资源和公开测试证书。
- 交付说明列出变更、执行命令、结果与未验证范围，不自动提交或推送。
