---
name: beyond-code
description: >
  Use when the user wants to think through requirements before coding,
  asks to design or plan first before implementing, or uses /beyond-code.
  Also when the task spans architectural decisions or the user's intent
  is unclear. The ONLY skip condition: a trivial bug fix in a small-scale
  project (e.g. a single script under ~100 lines) where the user
  explicitly says "skip beyond-code".
---

# Terminology & Global Standards (One Home Per Fact)

This root skill defines the single authoritative vocabulary and rules for the entire suite:

| Term / Keyword | Definition & Authority |
|----------------|------------------------|
| MUST / REQUIRED | Absolute obligation. Violation = process failure. |
| MUST NOT | Absolute prohibition. Violation = process failure. |
| NEVER | Zero-exception prohibition. |
| HARD-GATE | Prerequisite checkpoint. Blocked = STOP. |
| STOP | Cease current action. Await user instruction. |
| ONLY | Exclusive action — no alternative permitted. |
| SHOULD / SHOULD NOT | Strong guidance — deviate only with documented rationale. |
| MAY / OPTIONAL | Agent discretion. |
| EVIDENCE BEFORE CLAIMS | No success claim without fresh command output. |
| Initiative | End-to-end unit of work (`.beyond-code/<slug>/`). |
| Spec | Business requirements, data contracts, and Non-Goals (`spec.md`). |
| Implementation Plan (Plan) | Architecture trade-offs, bounds, and tasks (`plan.md`). |
| Task | Atomic execution unit with explicit dependencies (`plan.md`). |
| Step | Concrete action or verification command within a task. |
| Minor Deviation | Implementation detail not in plan that preserves interfaces, bounds, and contracts (e.g. private helper, local type). Logged; non-blocking. |
| Substantive Deviation | Action altering public APIs, bounds, packages, data contracts, or Non-Goals. Logged AND triggers immediate STOP. |

# HARD-GATE: No Code Before Spec

You MUST NOT write or modify ANY code, create ANY file, or take ANY
implementation action until `spec.md` is in `confirmed` status AND
`gate.md` Gate 1 is cleared.

The ONLY exception: a single-function, single-file bug fix where the
user explicitly says "skip beyond-code".

# Core Engineering Principles

1. **First-Principles & Trade-off Rigor**: Ground all designs in fundamental business requirements. Evaluate explicit Pros & Cons and document what was given up.
2. **Self-Descriptive Clarity (No Internal Code Names)**: Use descriptive titles for requirements and tasks. NEVER use abstract internal codes (`R1`, `T1`, `Gate 1`) in communication or Git history.
3. **Clean Git Hygiene**: Git commit messages MUST describe real engineering changes using standard conventions. They MUST NOT contain any internal process markers (e.g. no `T1`, `R2`, `beyond-code`, or `gate` in commit titles/bodies).
4. **Human-First Rationale**: When presenting choices, deviations, or trade-offs, state the one-line plain-language human impact first before technical mechanics.

# Role & Human-Agent Dynamics

- When intent is ambiguous, ask ONE concrete clarifying question with a recommended default.
- When the user gives a clear affirmative ("go", "ok", "sure", "looks good", "start", "build it"), treat it as confirmation and proceed immediately without redundant re-asking.
- When the user asks to skip something non-essential, skip it cleanly.
- Default to confirming before irreversible actions (out-of-bounds file changes, commits, stage transitions).

# "just do it" / Autonomous Pipeline Semantics

When the user instructs "just do it", "proceed directly", or gives upfront autonomy:
- **Full Discipline**: Execute all stages (Spec, Plan, Bounds cross-validation, and adversarial verification) completely.
- **Silent Flow**: Set `spec.md` and `plan.md` to `confirmed`, clear respective gates in `gate.md` with timestamps, and advance without pausing for intermediate approvals.
- **Alert on Exception**: STOP immediately only if a Substantive Deviation occurs or a hard blocker is encountered.
- **Final Delivery**: Present the Exception-First Verification Report for final user sign-off.

# Initiative Directory Layout

Each initiative lives under `.beyond-code/<slug>/`:

```
.beyond-code/<slug>/
  spec.md    Requirements + data contracts + Non-Goals + acceptance criteria
  plan.md    Architecture trade-offs + exhaustive bounds + descriptive tasks
  gate.md    Progress ledger & visual status — single source of truth
```

`gate.md` schema MUST follow this structure:

```markdown
---
slug: <initiative-slug>
created: <YYYY-MM-DD>
---

# Initiative Status: <slug>

## Gate 1: Spec Confirmed
- [ ] spec.md created: `.beyond-code/<slug>/spec.md`
- [ ] User confirmed: `<timestamp>`
- [ ] Gate cleared

## Gate 2: Plan Ready
- [ ] plan.md created: `.beyond-code/<slug>/plan.md`
- [ ] Pre-presentation validation passed
- [ ] User confirmed: `<timestamp>`
- [ ] Gate cleared

## Gate 3: Task Execution & Progress

| Task Title | Depends On | Commit | Status |
|------------|------------|--------|--------|
| <Task Name> | [] | <hash / —> | [ ⏳ Pending \| 🔄 In-Progress \| ✅ Done ] |

## Deviations
| Timestamp | Task | Level (Minor / Substantive) | Human Rationale | Deviation Detail |
|-----------|------|-----------------------------|-----------------|------------------|

## Gate 4: Verification
- [ ] Automated baseline checks passed (with raw evidence)
- [ ] Independent Auditor Subagent: [Executed | Skipped by User]
- [ ] Substantive deviations: [None | User Approved]
- [ ] Requirements verified: user confirmed

## Gaps & Future Work
- [ ] <description> — <why out of scope> — <suggested approach>

## Archive
- [ ] Moved to .beyond-code/.archive/<slug>/
```

# Stage Transitions

When a sub-skill completes, return to this file. Read `gate.md` to determine the current gate:
1. **Unclear request / New initiative** → Initialize `gate.md`, load `beyond-code-think`.
2. **After spec confirmed (Gate 1 cleared)** → Load `beyond-code-plan`.
3. **After plan ready (Gate 2 cleared)** → Load `beyond-code-build`.
4. **After all tasks complete (Gate 3 filled)** → Load `beyond-code-verify`.

# Multi-Initiative & Interruption Handling

- Each distinct goal gets its own directory under `.beyond-code/<slug>/`.
- If an initiative depends on another, declare `depends_on: [<slug>]` in `plan.md` frontmatter.
- When resuming after interruption, read `gate.md` as the single source of truth.

# Commit Configuration

`.beyond-code/config.yaml` controls commit preferences (created on first run if missing):

```yaml
commit:
  when: per-task | per-plan | manual    # default per-task
  format: project | conventional | user # default project
```
