---
name: beyond-code
description: >
  Use when the user wants to think through requirements before coding,
  asks to design or plan first before implementing, or uses /beyond-code.
  Also when the task spans architectural decisions, complex features,
  multi-scope epics, or ambiguous requirements. For straightforward,
  small changes, apply the principles leanly without unnecessary friction.
---

# Terminology & Global Standards (One Home Per Fact)

This root skill defines the single authoritative vocabulary and rules for the entire suite:

| Term / Keyword | Definition & Authority |
|----------------|------------------------|
| MUST / REQUIRED | Absolute obligation. Violation = process failure. |
| MUST NOT | Absolute prohibition. Violation = process failure. |
| NEVER | Zero-exception prohibition. |
| STOP | Cease current action. Await user instruction. |
| ONLY | Exclusive action — no alternative permitted. |
| SHOULD / SHOULD NOT | Strong guidance — deviate only with documented rationale. |
| MAY / OPTIONAL | Agent discretion. |
| EVIDENCE BEFORE CLAIMS | No success claim without fresh command output. |
| Scope | Self-contained unit of work (`.beyond-code/<scope-slug>/`). |
| Epic | System spanning ≥2 modular sub-scopes (`.beyond-code/<epic-slug>/`). |
| Sub-Scope | Modular subsystem nested inside an Epic (`.beyond-code/<epic-slug>/<sub-scope-slug>/`). |
| Spec | Requirements, data contracts, and Non-Goals (`spec.md`). |
| Implementation Plan (Plan) | Architecture trade-offs, bounds, tasks, and live progress (`plan.md`). |
| Task | Atomic execution unit with explicit dependencies (`plan.md`). |
| Minor Deviation | Implementation detail preserving interfaces, bounds, and contracts (e.g. private helper, local type). Non-blocking. |
| Substantive Deviation | Action altering public APIs, bounds, packages, data contracts, or Non-Goals. Triggers immediate STOP and user review. |

# Core Engineering Principles

1. **User Intent Before Code**: Confirm requirements, data contracts, and Explicit Non-Goals before writing non-trivial implementation code.
2. **First-Principles & Trade-off Rigor**: Ground all designs in fundamental requirements. Evaluate explicit Pros & Cons and document what was given up.
3. **Self-Descriptive Clarity (No Internal Code Names)**: Use descriptive titles for requirements and tasks. NEVER use abstract internal codes (`R1`, `T1`) in communication or Git history.
4. **Clean Git Hygiene**: Git commit messages MUST describe real engineering changes using standard conventions. They MUST NOT contain any internal process markers (e.g. no `T1`, `beyond-code`, or scope slugs in commit titles/bodies).
5. **One Home Per Fact**: Eliminate redundant tracking tables and multiple-source bookkeeping. `plan.md` is the single source of truth for architecture, tasks, and execution progress.
6. **Human-First Rationale**: When presenting choices, deviations, or trade-offs, state the one-line plain-language human impact first before technical mechanics.

# Role & Human-Agent Dynamics

- When intent is ambiguous, ask ONE concrete clarifying question with a recommended default.
- When the user gives a clear affirmative ("go", "ok", "sure", "looks good", "start", "build it"), treat it as confirmation and proceed immediately without redundant re-asking.
- When the user asks to skip something non-essential, skip it cleanly.
- Default to confirming before irreversible actions (out-of-bounds file changes, breaking commits, architectural pivots).

# "just do it" / Autonomous Pipeline Semantics

When the user instructs "just do it", "proceed directly", or gives upfront autonomy:
- **Full Discipline, Zero Ceremony**: Formulate requirements, trade-offs, and tasks directly in `plan.md` (or `spec.md` + `plan.md` for major work) and execute sequentially without pausing for intermediate conversational confirmations.
- **Alert on Exception**: STOP immediately only if a Substantive Deviation occurs or a hard blocker is encountered.
- **Final Delivery**: Present the Exception-First Verification Report with fresh baseline command evidence for final user sign-off.

# Directory Layout

### 1. Single Scope Layout
For standard standalone features:
```
.beyond-code/<scope-slug>/
  spec.md    Requirements + data contracts + Non-Goals (optional for lightweight tasks)
  plan.md    Architecture trade-offs + bounds rule + DAG tasks with checkboxes (Single Source of Truth)
```

### 2. Nested Epic (Multi-Scope) Layout
For large systems containing ≥2 independently deliverable subsystems:
```
.beyond-code/<epic-slug>/
  spec.md                  Global contracts, system invariants, architecture, and Non-Goals
  roadmap.md               Scopes DAG roadmap and progress ledger
  <sub-scope-1>/           Sub-scope 1 (inherits global contracts from ../spec.md)
    plan.md                Module trade-offs + bounds + atomic DAG tasks
  <sub-scope-2>/           Sub-scope 2
    plan.md                Module trade-offs + bounds + atomic DAG tasks
```

`plan.md` serves as both the blueprint and the live execution ledger (using markdown `- [ ]` / `- [x]` checkboxes).

# Stage Transitions

Transitions flow naturally through the sub-skills:
1. **Unclear request / Requirement clarification** → Load `beyond-code-think` to produce `spec.md` (and `roadmap.md` if an Epic).
2. **After requirements clear / Spec confirmed** → Load `beyond-code-plan` to produce `plan.md` for the active scope/sub-scope.
3. **Execution phase** → Load `beyond-code-build` to execute tasks in topological order.
4. **After all tasks complete** → Load `beyond-code-verify` to run baseline checks, independent audit, and archive.
   - For a sub-scope within an Epic: verify, update parent `roadmap.md`, and advance to the next sub-scope.
   - For an Epic completion: perform final end-to-end audit and atomically archive the entire `.beyond-code/<epic-slug>/` to `.beyond-code/.archive/<epic-slug>/`.

# Stale Directory Auto-Sweep & Hygiene

Whenever starting a session or creating a new scope/epic, inspect `.beyond-code/`:
- If any completed directory still resides in `.beyond-code/` root, move it to `.beyond-code/.archive/<slug>/` with a concise `summary.md`. Never leave zombie completed directories in the active workspace.

# Multi-Scope & Interruption Handling

- Standalone scopes live in `.beyond-code/<scope-slug>/`; nested sub-scopes live in `.beyond-code/<epic-slug>/<sub-scope-slug>/`.
- If a scope or sub-scope depends on another, declare `depends_on: [<scope-slug>]` in `plan.md` frontmatter.
- When resuming after interruption, read `roadmap.md` (for Epics) or `plan.md` (for single scopes) to identify pending tasks.

# Commit Configuration

`.beyond-code/config.yaml` controls commit preferences (created on first run if missing):

```yaml
commit:
  when: per-task | per-plan | manual    # default per-task
  format: project | conventional | user # default project
```
