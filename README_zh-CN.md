# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

以十四个独立技能，构成 agent 辅助软件工程的工作流主线。

[English](README.md) | 中文

## 设计哲学

Beyond Code 提供贯穿需求澄清、设计、规划、实现反馈、审查和决策维护的工程方法与约定。技能的价值在于改变判断：何时追问、怎样拆分工作、什么证据可信、哪些理由值得保留。普通编码与工具操作交给 agent 本身，需要专项知识时按需搭配其他技能。

技能设计与对话方法参考 Matt Pocock，工程纪律与决策记录参考 DeepSeek Harness。指令直接、职责明确，不加 hook，不要求初始化、总入口技能或固定调用链。

每个技能都能使用请求、对话、代码和相关记录中已有的信息。缺少信息就调查或澄清具体缺口，不重走前面的流程。调用技能不扩大任务范围，也不自动授予实施权限；已经获得的授权在其范围内继续有效。

## 技能

“自主”表示 agent 可以在适用时选择，也允许用户显式调用，并非每个任务都要执行。“仅用户”表示对话方式的改变由用户发起。

| 技能 | 提供的判断 | 调用方式 |
| --- | --- | --- |
| [grilling](skills/grilling/SKILL.md) | 深入探索想法，不强加目标，不替用户编造动机 | 仅用户 |
| [clarify](skills/clarify/SKILL.md) | 澄清问题、结果和范围中的关键歧义 | 自主 |
| [codebase-design](skills/codebase-design/SKILL.md) | 安排责任与复杂性，设计有用的接口 | 自主 |
| [plan](skills/plan/SKILL.md) | 组织可验证切片、依赖与分阶段迁移 | 自主 |
| [tdd](skills/tdd/SKILL.md) | 一次一个行为，建立红绿重构循环 | 自主 |
| [debug](skills/debug/SKILL.md) | 用证据区分原因，再修复行为 | 自主 |
| [test-reliability](skills/test-reliability/SKILL.md) | 控制时序、隔离、资源归属和清理 | 自主 |
| [simplify](skills/simplify/SKILL.md) | 理解复杂性承担的责任，再移除多余负担 | 自主 |
| [code-review](skills/code-review/SKILL.md) | 独立检查需求、实现和证据 | 自主 |
| [conventional-commit](skills/conventional-commit/SKILL.md) | 按选定的提交约定表达完整变更意图 | 自主 |
| [canonical-docs](skills/canonical-docs/SKILL.md) | 让准确说明有合适且明确的归属 | 自主 |
| [decision-records](skills/decision-records/SKILL.md) | 保存并维护无法从代码恢复的决策理由 | 自主 |
| [teach](skills/teach/SKILL.md) | 通过解释与应用建立理解 | 仅用户 |
| [retro](skills/retro/SKILL.md) | 从实际工作中提炼具体改进 | 仅用户 |

任务可以从任意位置进入。明确的故障可以直接诊断，已有改动可以直接审查。设计、规划和验证按需要使用，不组成一串审批仪式。小任务保持简短。

## 配合其他技能

将 Beyond Code 作为工程工作流的主线，按具体需要从 [Matt Pocock 的技能集](https://github.com/mattpocock/skills)中选择补充：

| 辅助技能 | 适用场景 | 与主线的衔接 |
| --- | --- | --- |
| [writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md) | 编写技能或 AGENTS.md 等 agent 指令 | 补充触发描述、信息层级和无效指令删减方法，不作为其他技能的前置条件。 |
| [prototype](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md) | 交互探索状态行为，或比较 UI 变体 | 提供具体实验形式。先约定产物位置与保留方式；其默认流程包含仓库内原型和临时分支提交，需要相应授权。 |
| [wizard](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md) | 引导需要人工访问或决定的配置步骤 | 生成交互脚本，仅用于确实需要人操作的步骤；需要可复用的配置产物时才保留脚本。 |
| [handoff](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md) | 明确要求向新 agent 或新会话交接 | 在系统临时目录生成脱敏交接说明，引用已有记录，不另建一套任务历史。 |

这些建议基于本套件审阅过的 Matt 源文件，使用前应检查所选版本的具体指令。其他技能集可以补充前端设计、框架知识、浏览器测试或文档制作。辅助技能都是可选能力，不是依赖项，也不是工作流缺失的阶段。

Agent 可以在当前任务中使用专项指导，再带着结果和证据继续推进。Beyond Code 提供工作流原则，辅助技能提供具体方法或工具知识。调用辅助技能不产生扩大范围、发布或另建一套记录体系的权限。

建议按需选择辅助技能，不整套叠加重叠的技能集。对于 `tdd`、`code-review`、`codebase-design` 等同名技能，只保留一个有效定义；采用本工作流时，选用 Beyond Code 的版本。同时检查辅助技能的依赖：名称不同，也可能调用同名技能，或规定不同的确认、产物和提交行为。冲突应根据用户选择与项目约定解决，不能假定安装顺序决定优先级。

## 代码、文档与决策

代码是实际行为的唯一真源。需求与有效决策描述预期行为；两者不一致时，可能是实现缺陷，不能直接改写需求。测试提供证据，本身也可能错误。

正式文档沿用项目已有结构。没有结构且确实需要建立时，由 `canonical-docs` 提供适合的方案供用户选择。不把空目录树作为初始化步骤。

决策记录保存动机、约束、真实替代方案、后果和重新考虑的条件。已有有效的 ADR/RFC 约定就沿用；没有时，`decision-records` 使用 `.agents/notes/{proposed,implemented,rejected,archived}/YYYY-MM-DD-topic.md`，按需创建目录。不要求索引、分类树或配套元数据。归档是冻结的历史，不作为当前依据。

临时状态默认留在对话中。交接确需文件、项目又没有约定时，`plan` 提供一个可选的 `.agents/work/<task>.md` 工作记录，注明负责人和清理或提炼时点，不默认提交。工作结束后，将有用决定放入其归属，移除本任务的可丢弃状态。任何技能调用都不强制产生文件。

## 安装与调用

```bash
npx skills add Celec7/beyond-code
```

可选择整套安装或按需安装。技能正文使用英文，根目录说明提供中英两版。

`grilling`、`teach`、`retro` 在 `SKILL.md` 中声明 `disable-model-invocation: true`，并在 `agents/openai.yaml` 中声明 `policy.allow_implicit_invocation: false`，分别供支持相应元数据的宿主表达仅用户触发的意图。宿主行为可能不同，正文也要求用户主动请求。其他技能保持默认发现方式。这些是指令与调用配置，不是机械编辑拦截。

结构检查覆盖文件格式和引用，不证明 agent 的实际行为。行为效果留待日常开发检验，当前不宣称已验证跨模型或跨宿主的遵循效果。

## 开源协议

[MIT](LICENSE)
