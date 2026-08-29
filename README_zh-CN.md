# Beyond Code

一个轻量、自然语言驱动的 Coding Agent 交互 Skill

让 Agent 明确你的需求。强制方案经过你的审核。约束 Agent 的每一步行动。要求 Agent 拿出证据而非口头声称。

[English](README.md) | 中文

## 为什么会有这个 Skill？

在 Vibe Coding 实践中，我曾试过几个 AI 流程主导的 Skills，比如 [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec), [obra/superpowers](https://github.com/obra/superpowers), [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core)。

在感受它们的强大的同时，我也遇到了一些问题。有些 Skills 轻量但 plan 不细就催你确认，验收浮于表面。有些认真但每一步都需要 CLI 交互，上下文成本高。

更重要的是，它们都过于信任 Agent，且偏好用自己定义的术语约束 Agent。于是我决定抛开这些 Skills，用自己的流程设计了这个 Skill，来让人类更好地与 Agent 交互，得到更符合预期的代码。

## 设计理念

**需求先于代码。** Agent 在 spec 未确认前 MUST NOT 写任何代码。每个需求必须有可追溯的验收标准。

**穷举边界，禁止越界。** plan 必须列出 build agent 可以触碰的所有文件、函数、依赖。超出清单的一律是 deviation，累计触发用户审查。

**第一性原理与只读溯源。** 遇到 Bug 或测试失败，严禁立即打盲目补丁或添加伪边界防御；必须沿调用链向上只读溯源，从根本契约与数据流源头治理。

**独立审计与异常优先汇报。** Verify 阶段采用独立红队视角（无写代码记忆偏见），自动过滤良性实现细节，优先顶格呈报实质性擅自发挥与偷工减料。

**证据，而非声称。** EVIDENCE BEFORE CLAIMS。禁止 "应该没问题"、"看起来对"，必须跑命令、看输出、再下结论。

**用硬语言，不用软建议。** 全 skill 使用 RFC 2119 关键词（MUST, MUST NOT, NEVER, HARD-GATE, STOP）。跳过门禁 = 违反 skill。

## 使用

```bash
npx skills add Cccc-owo/beyond-code
```

通过自然语言触发或手动调用，如"先计划一下"。仅在极小规模项目（如 ~100 行的脚本）的 trivial bug fix + 用户明确说"skip beyond-code"时才可以跳过。

## 流程

```
Think ──[HARD-GATE]──→ Plan ──[HARD-GATE]──→ Build ──[HARD-GATE]──→ Verify (Auditor)
  │                      │                       │                        │
  └── spec.md            └── plan.md             └── commits +           └── 独立红队审计 +
       (场景 + 契约 +          (架构 + 数据流 +           只读溯源 +               异常优先汇报 +
        Explicit Non-Goals)    穷举边界 + tasks)          deviations              验收归档)
```

**Think** — 反噪音追问门禁（禁微观命名/禁0.01%极端case）。Scope Check 自动拆分。产出 `spec.md`（含核心场景 Given/When/Then、核心数据契约 Invariants、Explicit Non-Goals 负向禁区与合理默认 Assumptions）。

**Plan** — 架构与统一数据流概览 + bite-sized tasks（含精确文件路径与原子化行为描述）。穷举 Implementation Bounds（文件、API、依赖、禁止项）。涵盖 Pre-Presentation 验证（Spec Coverage 自检、占位符扫描、Non-Goals 约束核对）。

**Build** — Stage 0 验证 Bounds。执行中严格遵守**第一性原理只读溯源协议**（禁止创可贴式盲目打补丁，从源头契约修复）。分类记录偏差（Minor vs Substantive）；实质性偏差立即触发 STOP，良性偏差累计 ≥5 条触发审查。

**Verify** — 派发独立 Auditor Subagent（无写代码偏见）进行三维对抗性审计。自动折叠良性胶水接缝，采用**异常优先汇报（Exception-First Reporting）**顶格披露实质性偏差与偷懒降级，出示新鲜命令证据后进行验收归档。

## 工作目录结构

```
.beyond-code/
├── config.yaml               # commit 偏好设置
├── <slug>/
│   ├── spec.md               # 做什么 + 验收标准
│   ├── plan.md               # 怎么做 + 穷举边界 + task 列表
│   └── gate.md               # 进度账本 — 唯一状态源
├── .archive/                 # 已完成的 initiative
└── .project/                 # 项目上下文文档（手动触发）
```

## Skill 架构

```
beyond-code (路由)
  ├── think      → 产出 spec.md
  ├── plan       → 产出 plan.md
  ├── build      → 执行 task，记录 deviation
  ├── verify     → 检查 + 验收 + 归档
  └── project-docs → deep scan（显式触发）
```

每个子 skill 内嵌 Terminology Reference 表格，并重申禁止代码前的禁令。每个子 skill 加载时检查 gate.md 确认上一关已通过。

## LICENSE

[MIT](LICENSE)
