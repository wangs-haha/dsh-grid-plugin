---
name: grid-maintenance
description: "在此仓库开发、排错、审查、测试或整理 DSH Grid 插件时使用，按 Host/Client 边界、安全契约与生成物规则完成可复现的小步变更。"
---

# Grid 维护技能

## 适用范围与入口

这是维护 Grid **源码仓库**的项目级 skill，不是连接真实数据库的操作指南。用户要求修复、功能开发、重构、测试、文档、依赖或打包时使用；仅浏览数据库内容时不适用。

从 skill 目录回到仓库根目录 `../../..`，依次阅读：

1. [根约束](<../../../AGENTS.md>) 与 [贡献规范](<../../../CONTRIBUTING.md>)。
2. [架构](<../../../docs/architecture.md>)，确认本次涉及的模块。
3. [测试指南](<../../../docs/testing.md>)，选择回归，区分自建夹具和既有数据库。

先看 `git status --short`，记录已有改动；搜索当前实现再设计，不以 archive 的历史计划推断功能。

## 工作步骤

### 1. 定位改动面

- API/action：同时看 Host `lib/api.js`、Client `src/client/lib/api.ts` / `types.ts` 和 `lib/tools.js`。
- 连接/SSH/TLS：看 `connections.js`、`session.js`、`open.js`、`transport.js` 和目标 driver 的 network/TLS 接缝。
- UI：看 panel/views/store 与 `ui/kit.tsx`、`ui/panel.css`；弹窗和菜单 Portal 不一定在面板根节点下。
- i18n：只以 `src/client/lib/i18n.ts` 为源，双语修改后执行 `pnpm locale`。
- 文档/交付：读当前 docs 索引和维护指南；根 README 只保留快速入口，不再堆完整测试清单。

### 2. 写清不变量，再改实现

保持 UI/Agent 共用 router、默认 Agent 只读、真实主键定位、值参数化、只读逐语句与引擎保护。不要返回或记录秘密及其密文；省略保留与显式清空必须区分。TLS/SSH pin 不降级，隧道故障不直连。写/未知结果不重放，取消与关闭必须 fence 掉排队和迟到请求。

优先现有扩展点，不新建平行服务、第二份 React 或全局状态框架。增加依赖必须说明必要性、可选性和安装脚本风险，不能为了整理顺手升级。

### 3. 补回归，按边界验证

先补覆盖错误路径的最小测试，再验证正向行为：

| 改动 | 定向回归 |
| --- | --- |
| SQL 分类/引号/序列化 | `test/query.test.mjs` + `test/api.test.mjs` |
| 持久化/秘密编辑 | `test/connections.test.mjs` + `test/ssh-config.test.mjs` |
| 生命周期、取消、重试 | session、ssh-transport、ssh-review、api suites |
| vendor 连接/TLS | ssh-driver-wiring、ssh-integration、streaming suites |
| UI/文案 | connection-dialog-ui、ui、locale suites；构建后检查双主题与窄宽度 |
| 仓库检查脚本/文档链接 | `test/repo.test.mjs` + `pnpm check:repo` |

最终执行 `pnpm check`。定向 `node --test ...` 不触发构建，UI 修改先 `pnpm build`。浏览器量具的可用环境和覆盖限制见 [测试指南](<../../../docs/testing.md>)，不要用 jsdom 结果冒充实际浏览器布局验证。

### 4. 审查与交付

- `git diff --check`；检查差异中是否包含无关源码、秘密或临时文件。
- Client / i18n 源变化提交对应生成物，不手改安装产物；未改源码时生成结果应无差异。
- 可观察行为更新 Unreleased，API/流程变化更新当前 docs。
- 删除前检查绝对路径及引用；先保留临时脚本中的有效回归，再删除可再生产物。
- 报告执行过的命令、通过/失败/跳过及真实限制，不声称未做的线上加载、外部数据库、浏览器或跨平台验证。

## 禁止用作捷径

不使用真实 profile/生产库验证，不自动运行 `test:integration`，不删除失败测试，不把超时改为无限等待，不因“能连通”就关闭证书/指纹校验，不自动安装或重启宿主插件，不自动 commit/push。
