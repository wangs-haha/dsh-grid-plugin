# 维护与交付

返回 [文档索引](<README.md>)。本仓库当前是 `private` 的本地 DSH bundle；下面是可重复的交付流程，不表示已发布 npm 包或已在真实 Host 验证。

## 约束与自动化

- [AGENTS.md](<../AGENTS.md>) 定义不变量；[项目 skill](<../.agents/skills/grid-maintenance/SKILL.md>) 定义任务步骤；[EditorConfig](<../.editorconfig>) 与 [Git attributes](<../.gitattributes>) 统一 UTF-8/LF/两空格。
- [repo checker](<../scripts/check-repo.mjs>) 无第三方依赖：检查必要文件、脚本目标、技能必填信息、安装入口和 Markdown 本地文件目标。不做外链请求、不验证锚点、不冒充完整 Markdown/YAML parser 或 secret scanner。
- [CI](<../.github/workflows/ci.yml>) 运行固定 pnpm + Node 22/24 的 Windows/Linux 矩阵，执行 frozen install、`pnpm check` 和生成物 drift 检查；不接触已有数据库、不加载用户 profile、不启动 DSH。
- `pnpm check` 不是 Host JavaScript 的完整静态类型/风格检查；现有 TypeScript 严格检查只覆盖 Client 与 TS 测试。增加 lint/Host 类型检查须渐进引入，避免无关格式化。

## 依赖变更

只在有明确目的时升级，单独评审清单与 lock diff；不要为文档整理重解整个 lock。保留网络驱动和 SSH 的 optional、lazy 特性及宿主 peer compatibility。新依赖说明用途、体积、许可、运行最低 Node、安装脚本、可选路径与缺失降级。

当前插件 minimum Node 与开发依赖 minimum 分开记录，见 [开发环境](<development.md#工具与安装>)。不要仅提升 `engines.node` 来掩盖未验证的运行时兼容性。

## 生成物与打包复核

[manifest](<../package.json>) 的 exports、files、`dsh.bundle.patch` 是安装契约。[cordis.patch.yml](<../cordis.patch.yml>) 是受维护的 Host 插入声明，不是本机配置垃圾。保留默认 `allowWrites: false`。

发布/交付前执行：

```sh
pnpm check
git diff --check
pnpm pack --out .tmp/grid-package.tgz
tar -tzf .tmp/grid-package.tgz
```

打包目录需要先存在（例如创建仓库内 `.tmp/`）。`pnpm pack` 不发布、不安装、不执行 Host，也不保证代码已构建。检查包内含 Host/driver、客户端 bundle、locale、icon、patch、许可证、README 与其文档/图片；不含测试数据库、浏览器 profile、日志、依赖目录或开发截图。打包文件是临时产物，不提交。

专题架构/开发文档中的源码链接以完整源码仓库为阅读上下文；交付包不包含全部源码/测试工具。用户入口、配置说明和图片随包提供，开发者仍应使用仓库 checkout。

## 行为变更与实际加载

- 可观察行为写 [Unreleased](<../CHANGELOG.md#unreleased>)：默认值、结果形状、权限、取消/重试、持久化语义或运行前提发生了什么变化。
- 改动 Client 重建、改动 Host 重载插件，再在既有 DSH 页面刷新。不要另起一个 Web server 并宣称用户页面已更新。
- 使用单独测试 profile/临时库验证真实宿主；这与本地 Node/jsdom/文件 harness 不同。记录实际执行的层级与限制，不回填未执行结果。
- 发布版本、tag、提交和推送由维护者明确决定，本整理流程不自动执行。

## 仓库清理规则

| 内容 | 处理 |
| --- | --- |
| 历史调研/设计/执行记录 | 移入 archive，标非规范性并修链接，不伪造更新后的测试报告 |
| 临时脚本 | 先检查是否包含唯一有效回归；提升为维护工具后才删副本 |
| `.tmp/`、`dev/shots/`、压缩包、log | 确认为可再生且无运行进程占用后，按解析后的绝对路径白名单删除 |
| `node_modules/` | 忽略但不为“整洁”反复卸载，避免破坏本地开发环境 |
| `.git/`、lock、源码、patch、LICENSE、README 截图、公开证书 | 保留，不使用宽泛 clean/rm 递归误删 |
| 真实数据库/密钥/profile | 不应放仓库；不要在未知用途时替用户删除，先隔离/脱敏处理 |

[忽略规则](<../.gitignore>) 防止新临时文件混入提交，不会移除已跟踪文件或修复历史泄露。清理完成检查 `git status --short`，区分历史迁移与真正删除。
