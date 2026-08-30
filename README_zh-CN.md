# Beyond Code

一个轻量、自然语言驱动的 Coding Agent 交互规范与工作流套件。

让 Agent 明确你的需求。从第一性原理权衡方案。严格在边界内执行。要求 Agent 拿出证据而非口头声称。

[English](README.md) | 中文

## 为什么会有这个 Skill？

在 Vibe Coding 实践中，我曾试过几个 AI 流程主导的 Skills（如 [OpenSpec](https://github.com/Fission-AI/OpenSpec), [superpowers](https://github.com/obra/superpowers), [gsd-core](https://github.com/open-gsd/gsd-core)）。

它们固然强大，但在实战中往往存在一些痛点：有些轻量但缺乏深度权衡，产生抽象代号让 Git 历史充满黑话；有些过度信任 Agent 导致写代码时偷工减料、留 TODO；有些每一步都需要沉重的 CLI 交互，白白消耗大量的上下文预算；还有些做完验收后不会自动归档，留下一堆僵尸目录。

因此我用自己的工程流程设计了这个 Skill：**不造轮子、不堆砌 CLI 工具，以第一性原理与自解释语言约束 Agent，让人类与 Agent 协作时更透明、更可控，交付更纯粹的高质量代码。**

## 核心设计哲学

1. **需求先于代码（No Code Before Spec）**：在需求规格与数据契约确认前，Agent 严禁编写任何业务代码。
2. **第一性原理与权衡推演（First-Principles Trade-offs）**：从本质业务需求出发设计架构，明确声明选择理由、优缺点（Pros & Cons）以及放弃了什么，杜绝创可贴式打补丁。
3. **自解释与零黑话（Self-Descriptive, No Code Names）**：全面废除 `R1`/`T1` 等抽象代号，统一使用具象业务场景与任务标题；**严禁将内部过程代号渗入 Git Commit 历史**。
4. **单点事实归宿（One Home Per Fact）**：吸收优秀工程文档规范，全局规则单点定义，拒绝多处重复叙事与心路流水账。
5. **穷举边界，违规即停（Implementation Bounds）**：白名单式列出涉及的文件、API 与依赖；实质性越界（Substantive Deviation）立即触发中断（STOP）交由人类裁决。
6. **独立审计与异常优先（Exception-First Adversarial Audit）**：Verify 阶段提供独立红队 Auditor Subagent 选项（无写代码记忆偏见），自动折叠内部良性胶水代码，顶格汇报实质性偏差与偷懒降级。
7. **三态验收裁决与原子归档（Three-Way Triage & Atomic Archive）**：用户签收即在同一轮对话内原子化完成浓缩归档，杜绝僵尸提案滞留；同时无缝支持就地微调（In-Flight Fix）与推倒重构（Course Correction）。
8. **证据先于声称（EVIDENCE BEFORE CLAIMS）**：杜绝口头声称，必须运行命令并捕获原始输出作为验收证据。

## 使用

```bash
npx skills add Cccc-owo/beyond-code
```

通过自然语言触发（如“先计划一下”、“按 beyond-code 流程做”）。若用户要求“直接做（just do it）”，Agent 将开启**自驱流水线模式**：步骤完整不打折、静默自动流转、遇实质偏差立即报警。

## 流程

```
Think ──[HARD-GATE 1]──→ Plan ──[HARD-GATE 2]──→ Build ──[HARD-GATE 3]──→ Verify (Auditor)
  │                        │                        │                         │
  └── spec.md              └── plan.md              └── tasks (DAG) +         └── 独立审计 +
       (场景 + 契约 +           (架构 Pros/Cons +        只读溯源 +                影响面分析 +
        Explicit Non-Goals)     穷举边界 + DAG tasks)    纯净 Git Commits          三态裁决 + 原子归档)
```

- **Think**：反噪音追问门禁。产出 `spec.md`（包含具体需求场景、核心数据契约 Invariants、Explicit Non-Goals 负向禁区与默认 Assumptions）。
- **Plan**：架构权衡推演（Pros & Cons）+ 统一数据流 + 具备依赖拓扑（`Depends On`）与代码上下文锚点的原子化任务。穷举 Implementation Bounds 并通过 Pre-Presentation 自检。
- **Build**：严格按 DAG 拓扑顺序执行。遇 Bug 强制执行**第一性原理只读溯源协议**（查上游契约，禁止下游盲目打补丁）。保持 Git 提交纯净无代号。
- **Verify**：人机协同选择是否派发独立 Auditor Subagent。提供改动影响面（Blast Radius）分析，异常优先汇报实质性偏差与未完成项；用户签收后同轮执行**原子归档**并生成浓缩 `summary.md`，若未达预期则支持就地修复或推倒重构。

## 工作目录结构

```
.beyond-code/
├── config.yaml               # commit 偏好设置 (per-task / per-plan / manual)
├── <slug>/
│   ├── spec.md               # 业务需求场景 + 数据契约 + Non-Goals
│   ├── plan.md               # 架构 Pros/Cons + 边界 + DAG tasks
│   └── gate.md               # 进度看板与唯一状态源
└── .archive/                 # 已完成并浓缩的 initiative 归档
```

## LICENSE

[MIT](LICENSE)
