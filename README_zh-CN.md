# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

一个轻量、自然语言驱动的 Coding Agent 交互规范与工作流套件。

让 Agent 明确你的需求。从第一性原理权衡方案。严格在边界内执行。要求 Agent 拿出证据而非口头声称。原生支持单体 Scope 与复合嵌套 Epic。

[English](README.md) | 中文

## 为什么会有这个 Skill？

在 Vibe Coding 实践中，我曾试过几个 AI 流程主导的 Skills（如 [OpenSpec](https://github.com/Fission-AI/OpenSpec), [superpowers](https://github.com/obra/superpowers), [gsd-core](https://github.com/open-gsd/gsd-core)）。

它们固然强大，但在实战中往往存在一些摩擦点：有些缺乏架构权衡推演，产生抽象代号让 Git 历史充满内部黑话；有些过度信任 Agent 导致写代码时偷工减料、留 TODO；有些每一步都需要沉重的 CLI 交互或多重重复填写的 Markdown 跟踪表格，消耗上下文预算；还有些做完验收后不会自动归档，留下一堆僵尸目录。

因此我用自己的工程流程设计了这个 Skill：**不造额外 CLI 工具、不搞形式主义台账，以第一性原理、单点状态源与自解释语言约束 Agent，让人类与 Agent 协作时更清晰、更可控，交付干净的高质量代码。**

## 核心设计哲学

1. **需求先于代码（No Code Before Spec）**：在需求规格、核心契约与负向禁区确认前，非小修补严禁编写业务代码。
2. **第一性原理与权衡推演（First-Principles Trade-offs）**：从本质需求出发设计架构，明确声明选择理由、优缺点（Pros & Cons）以及放弃了什么，杜绝创可贴式打补丁。
3. **自解释与零内部代号（Self-Descriptive, No Code Names）**：不使用 `R1`/`T1` 等抽象代号，统一使用具象业务场景与任务标题；**严禁将内部过程代号渗入 Git Commit 历史**。
4. **单点事实归宿（One Home Per Fact）**：拒绝多处重复记账。`plan.md` 作为架构设计、任务拓扑与执行进度的唯一状态源。
5. **模块化分层拆解（Nested Epics & Scopes）**：支持将复杂系统拆解为嵌套 Epic 与子 Scopes 路线图（Roadmap DAG），分模块按拓扑执行。
6. **清晰边界，违规即停（Implementation Bounds）**：任务内明确声明涉及的文件与接口；实质性越界（Substantive Deviation）立即触发中断（STOP）交由人类裁决。
7. **第一性原理只读溯源协议（Root-Cause Protocol）**：遇 Bug 强制只读排查上游生产者与数据契约，严禁在下游盲目打补丁（如滥用 `?.` 或掩盖错误）。
8. **独立审计与异常优先（Exception-First Adversarial Audit）**：Verify 阶段提供独立红队 Auditor Subagent 选项（无写代码记忆偏见），自动折叠内部良性胶水代码，优先汇报实质性偏差与未完成项。
9. **三态验收裁决与原子归档（Three-Way Triage & Atomic Archive）**：用户签收即在同一轮对话内原子化完成浓缩归档，消除僵尸目录滞留；同时无缝支持就地修复（In-Flight Fix）与推倒重构（Course Correction）。
10. **证据先于声称（EVIDENCE BEFORE CLAIMS）**：杜绝口头声称，必须运行命令并捕获原始输出作为验收证据。

## 使用

```bash
npx skills add Celec7/beyond-code
```

通过自然语言触发（如“先计划一下”、“按 beyond-code 流程做”）。若用户要求“直接做（just do it）”，Agent 将开启**自驱流水线模式**：步骤完整不打折、静默自动流转、遇实质偏差立即报警。

## 流程

```
Think ─────────→ Plan ─────────→ Build ─────────→ Verify (Auditor)
  │                │                │                  │
  └── spec.md      └── plan.md      └── DAG tasks +    └── 独立审计 +
       (场景 +          (架构 Pros/Cons + 纯净 Git 提交 +      影响面分析 +
        契约 +           边界 +           只读溯源             三态裁决 +
        Non-Goals)       DAG tasks)                           原子归档)
```

- **Think**：范围检查（Single Scope vs. Nested Epic）。产出 `spec.md`（包含具体需求场景、核心数据契约 Invariants、Explicit Non-Goals 负向禁区与默认 Assumptions）。
- **Plan**：架构权衡推演（Pros & Cons）+ 统一数据流 + 具备依赖拓扑（`Depends On`）与代码上下文锚点的原子化任务，定义明确实现边界。
- **Build**：严格按 DAG 拓扑顺序执行。遇 Bug 强制执行**第一性原理只读溯源协议**（查上游契约，禁止下游盲目打补丁）。保持 Git 提交纯净无代号。
- **Verify**：人机协同选择是否派发独立 Auditor Subagent。提供改动影响面（Blast Radius）分析，异常优先汇报实质性偏差与未完成项；更新 Epic 路线图或在用户最终签收后同轮执行**原子归档**并生成浓缩 `summary.md`。

## 工作目录结构

### 1. 单体 Scope（Single Scope）

```
.beyond-code/
├── config.yaml               # commit 偏好设置 (per-task / per-plan / manual)
├── <scope-slug>/
│   ├── spec.md               # 业务需求场景 + 数据契约 + Non-Goals
│   └── plan.md               # 架构 Pros/Cons + 边界 + DAG tasks 与执行进度
└── .archive/                 # 已完成并浓缩的 scope 归档
```

### 2. 嵌套模块化 Epic（Nested Epic & Scopes）

```
.beyond-code/
├── config.yaml
├── <epic-slug>/
│   ├── spec.md               # 全局架构契约 + 系统不变式 + Non-Goals
│   ├── roadmap.md            # Scopes DAG 拓扑路线图与完成状态看板
│   ├── <sub-scope-1>/        # 子模块 1（继承全局 spec.md）
│   │   └── plan.md           # 模块架构权衡 + 边界 + DAG tasks 与进度
│   └── <sub-scope-2>/        # 子模块 2
│       └── plan.md           # 模块架构权衡 + 边界 + DAG tasks 与进度
└── .archive/                 # 大工程完成后整包归档
```

## LICENSE

[MIT](LICENSE)
