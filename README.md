# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

A lightweight, natural-language-driven interaction standard and skill suite for coding agents.

Make the agent understand your intent. Ground architecture in first-principles trade-offs. Constrain every action to declared bounds. Demand fresh evidence over claims.

English | [中文](README_zh-CN.md)

## Why This Exists

In my vibe coding practice, I tried several AI-process-driven skills ([OpenSpec](https://github.com/Fission-AI/OpenSpec), [superpowers](https://github.com/obra/superpowers), [gsd-core](https://github.com/open-gsd/gsd-core)).

While powerful, real-world development highlighted recurring problems: some lacked deep architectural trade-off evaluations and polluted Git history with internal jargon (`R1`, `T1`); some trusted the agent too much and let silent degradation or half-baked TODOs slip through; others required heavy CLI interactions or duplicated markdown tracking tables that consumed precious token context; and completed initiatives frequently lingered as zombie directories without being archived.

I designed Beyond Code to bridge these gaps: **no bespoke CLI tools, no token-wasting bureaucracy. Instead, it enforces first-principles engineering, clean self-descriptive naming, single-source-of-truth progress tracking, and adversarial verification so developers and agents collaborate with clarity and deliver production-grade code.**

## Philosophy

1. **User intent before code (No Code Before Spec)**: Confirm requirements, core contracts, and Explicit Non-Goals before coding non-trivial features.
2. **First-Principles & Trade-off Rigor**: Ground architecture in fundamental business needs. Evaluate explicit Pros & Cons and document what was given up.
3. **Self-Descriptive Clarity (No Internal Code Names)**: Abolish abstract code names (`R1`, `T1`). Use self-descriptive scenario and task titles. **NEVER leak internal process markers into Git commit history.**
4. **One Home Per Fact**: Eliminate duplicate tracking tables and checklists. `plan.md` is the single source of truth for architecture, tasks, and live progress.
5. **Plan exhaustively, execute within bounds**: Tasks explicitly declare affected files and interfaces. Substantive deviations trigger an immediate STOP for user review.
6. **First-Principles Root-Cause Protocol**: When bugs occur during execution, trace upstream callers and contracts instead of slapping downstream band-aids.
7. **Independent Adversarial Verification**: Verify results with an optional isolated Auditor Subagent (free from builder confirmation bias) to filter benign glue code and highlight substantive deviations.
8. **Three-Way Acceptance Triage & Atomic Archiving**: User sign-off triggers immediate atomic archiving in the same turn to eliminate zombie folders, with seamless support for in-flight remediation and course correction.
9. **Evidence, not claims (EVIDENCE BEFORE CLAIMS)**: Demand fresh command outputs and raw evidence before declaring success.

## Install

```bash
npx skills add Celec7/beyond-code
```

Triggered via natural language (e.g. "let's plan first", "follow beyond-code"). When instructed to "just do it", the agent activates the **Autonomous Pipeline**: full discipline, zero conversational interruptions, alerting only on substantive exceptions.

## Flow

```
Think ─────────→ Plan ─────────→ Build ─────────→ Verify (Auditor)
  │                │                │                  │
  └── spec.md      └── plan.md      └── DAG tasks +    └── independent audit +
       (scenarios +     (Pros/Cons +     read-only trace +   blast radius +
        contracts +      bounds +         clean Git commits   3-way triage +
        Non-Goals)       DAG tasks)                           atomic archive)
```

- **Think**: Anti-noise questioning. Produces `spec.md` with self-descriptive scenarios, Core Data Contracts & Invariants, Explicit Non-Goals, and reasonable Assumptions.
- **Plan**: Architecture trade-offs (Pros & Cons) + unified data flows + atomic tasks with dependency DAGs (`Depends On`) and context code anchors. Clear implementation bounds.
- **Build**: Executes strictly in topological DAG order. Enforces the **First-Principles Root-Cause Protocol** (trace upstream callers; no blind symptom patching). Keeps Git history clean of internal markers.
- **Verify**: User-guided independent Auditor Subagent choice. Analyzes Blast Radius, prioritizes substantive deviations and silent degradation in an Exception-First report; executes atomic archiving with lean `summary.md` on sign-off, or handles in-flight fixes.

## Directory Structure

```
.beyond-code/
├── config.yaml               # commit preferences (per-task / per-plan / manual)
├── <slug>/
│   ├── spec.md               # requirements + data contracts + Non-Goals
│   └── plan.md               # architecture Pros/Cons + bounds + DAG tasks & progress
└── .archive/                 # completed and summarized initiatives
```

## License

[MIT](LICENSE)
