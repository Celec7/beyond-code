# Beyond Code: 现代 Coding Agent 工程护栏技能组

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

一套轻量、高信噪比的 Coding Agent 顶尖工程心智模型与硬核防守护栏。

[English](README.md) | 中文

## 为什么会有这个技能组？

随着具备深度思考能力（Reasoning Models）的大模型和 Coding Agent 日益成熟，早期那些沉重的“保姆式外骨骼”（僵化的 Markdown 表单、多级目录状态机、繁文缛节的台账）带来的边际收益越来越低，甚至沦为消耗上下文与分散注意力的负资产。

现代的高智能 Agent 不需要人类亦步亦趋的微观流程绑架，它们真正需要的是**关键时刻的高杠杆心智模型（Mental Models）与不可逾越的工程底线**：

- 在编码前划清边界，不搞过度设计；
- 报错时不盲目在下游打 `?.` 创可贴补丁，而是溯源到生产者根治；
- 实施代码时严格遵循最小文件与接口范围，实质性越界时立即停下请示；
- 交付前以红队视角客观审查代码，杜绝伪实现桩、吞异常和测试作弊。

借鉴 Matt Pocock 技能体系的极简、模块化与高可组合美学，Beyond Code 彻底剔除所有形式主义程序，将最核心的工程师直觉提炼为 **4 个即插即用、零额外负担的原子子 Skill**。

## 技能组全景

| 子 Skill | 触发与使用时机 | 核心工程心智与准则 |
| :--- | :--- | :--- |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)***(只读溯源调试)* | 代码报错、测试失败或出现异常状态时 | **源头治理，禁止创可贴补丁**：沿调用链只读向上追溯，核验生产者与消费者的契约关系，在根源修复缺陷；严禁在下游滥用 `?.`、`if (!x) return` 或空 `catch` 掩盖错误。 |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)***(实现边界守卫)* | 功能开发、重构或需要圈定代码范围时 | **声明边界，实质偏差即停**：圈定目标文件与接口范围。允许合理的同模块级联改动（单测、本地导出），但一旦跨越业务域、改动公共 API 或引入新依赖，必须立即 STOP 请示人类。 |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)***(代码完整性审查)* | 任务完成前、提交 PR 前或复核变更时 | **对抗性 Diff 审查与证据优先**：审查 `git diff` 新增行中的 AI 偷懒痕迹（残留 `TODO`、未实现桩、吞异常、作弊测试）；必须运行真实命令并核验原始输出（证据先于声称）。 |
| **[`scope-guard`](skills/scope-guard/SKILL.md)***(范围与负向空间)* | 需求梳理、方案设计或功能启动时 | **划定负向空间，高信噪比对齐**：定义 2~4 个 Explicit Non-Goals（明确不做什么）防止范围膨胀；探讨高价值技术选型，由开发者掌握推进步调，不搞突击式开工。 |

## 安装

一键安装全部技能到你的 Agent（Claude Code, Codex, DSH, Cursor 等）：

```bash
npx skills add Celec7/beyond-code
```

也可以按需挑选单个技能使用。

## 协作与工作流搭配

每个子 Skill 均为独立原子，默认支持模型隐式触发，也支持用户显式调用。它们可以与任何日常工程流程（例如 TDD、PR 评审、或 Matt Pocock 的技能体系）无缝协同：

- **在需求设计时**：`scope-guard` 帮你和 Agent 在动手前对齐明确的 Non-Goals 与核心技术选型；
- **在执行编码时**：`implementation-bounds` 锁定改动范围，杜绝 Agent 随性修改无关模块或随意引入第三方包；
- **在遇到报错时**：`root-cause-debugging` 强制 Agent 向上游寻找脏数据源头，避免下游创可贴式防御代码蔓延；
- **在交付验收前**：`code-integrity-audit` 以红队视角审查 diff，确保代码真实完整、测试真实有效。

## 开源协议

[MIT](LICENSE)
