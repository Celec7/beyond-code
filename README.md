# Beyond Code

A lightweight, natural-language-driven interaction skill for coding agents.

Make the agent understand your intent. Force the plan through your review. Constrain every action to your consent. Demand evidence before acceptance.

English | [中文](README_zh-CN.md)

## Why This Exists

In my vibe coding practice, I tried several AI-process-driven skills: [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec), [obra/superpowers](https://github.com/obra/superpowers), [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core). They are powerful, but I ran into problems.

Some are clean and lightweight, yet after generating a plan they jump straight to ask for my permission without explaining the plan. Some are thorough and disciplined, but every step requires CLI interactions or bash commands to gather state, burning context on infrastructure instead of thinking.

These skills share a deeper issue: they trust the agent too much and rely on their own internal terminology to constrain it. So I stopped using them and found that with the same token budget, a flexible process of my own could work better. I designed this skill to help developers and agents collaborate more effectively and produce code that actually matches expectations.

## Philosophy

**User intent before code.** The agent MUST NOT write code until the spec is confirmed. Every requirement must be traceable to a concrete acceptance criterion.

**Plan exhaustively, execute within bounds.** The plan must list every file, function, and dependency the build agent may touch. Anything not in that list is a deviation — and deviations trigger review.

**First-principles root cause diagnosis.** When errors or test failures arise, NEVER slap blind symptom patches or speculative edge-case guards. Trace callers upstream in read-only mode and fix the contract at the source.

**Independent audit & exception-first reporting.** Verify uses an independent red-team perspective to audit diffs against specs. It collapses benign internal glue and prioritizes substantive deviations and silent degradation.

**Evidence, not claims.** EVIDENCE BEFORE CLAIMS. No "should be fine." No extrapolation from old output. Run the command fresh, show the output, then make your claim.

**The process uses hard language, not soft suggestions.** The skill suite uses RFC 2119 keywords (MUST, MUST NOT, NEVER, HARD-GATE, STOP) throughout. An agent that skips a gate violates the skill.

## Install

```bash
npx skills add Cccc-owo/beyond-code
```

Triggered by natural language or manual invocation. Say "let's plan first", or the agent should activate automatically when the task involves architectural decisions or spans multiple files. The ONLY skip condition: a trivial bug fix in a small-scale project (e.g. a script under ~100 lines) where the user explicitly says "skip beyond-code".

## Flow

```
Think ──[HARD-GATE]──→ Plan ──[HARD-GATE]──→ Build ──[HARD-GATE]──→ Verify (Auditor)
  │                      │                       │                        │
  └── spec.md            └── plan.md             └── commits +           └── independent audit +
       (scenarios +            (architecture +         read-only trace +       exception-first
        contracts +             data flow +             deviations              report +
        Non-Goals)              bounds + tasks)         logged in gate)         archive)
```

**Think** — Anti-noise questioning gate (no micro-implementation questions, no 0.01% extreme cases). Scope Check splits multi-subsystem initiatives. Produces `spec.md` with Given/When/Then scenarios, Core Data Contracts & Invariants, Explicit Non-Goals (negative space), and reasonable Assumptions.

**Plan** — Architecture & unified data flow overview + bite-sized tasks with exact signatures and behavior descriptions. Exhaustive Implementation Bounds. Spec Coverage self-review and Non-Goals compliance check.

**Build** — Step 0 validates Implementation Bounds. Enforces the **First-Principles Root-Cause Protocol** (no ad-hoc symptom patching, upstream source fix). Deviations logged in real-time; ≥5 or first substantive deviation triggers STOP and user review.

**Verify** — Spawns an independent Auditor Subagent (isolated from builder bias) for 3D adversarial auditing. Filters benign seams and generates an **Exception-First Verification Report** highlighting substantive deviations, silent degradation, and fresh command evidence before user acceptance.

## Directory Structure

```
.beyond-code/
├── config.yaml               # commit preferences
├── <slug>/
│   ├── spec.md               # what to build + acceptance criteria
│   ├── plan.md               # how to build + exhaustive bounds + tasks
│   └── gate.md               # progress ledger — single source of truth
├── .archive/                 # completed initiatives
└── .project/                 # project context docs (manual trigger)
```

## Skill Architecture

```
beyond-code (Router)
  ├── think      → produce spec.md
  ├── plan       → produce plan.md
  ├── build      → execute tasks, log deviations
  ├── verify     → checks + acceptance + archive
  └── project-docs → deep scan (explicit trigger only)
```

Every sub-skill embeds a Terminology Reference block and re-declares the code-before-spec prohibition. Each checks gate.md before proceeding.

## License

[MIT](LICENSE)
