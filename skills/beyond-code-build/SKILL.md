---
name: beyond-code-build
description: >
  Use when executing a confirmed plan, building features task by
  task, tracking progress through gate.md, or entering the build
  phase of beyond-code. Covers bounds validation, first-principles
  read-only root-cause diagnosis, task execution, deviation logging, and gap tracking.
---

# Terminology Reference

This skill uses RFC 2119 keywords:

| Keyword | Meaning |
|---------|---------|
| MUST / REQUIRED | Absolute obligation. |
| MUST NOT | Absolute prohibition. |
| NEVER | Zero-exception prohibition. |
| HARD-GATE | Must pass before next stage. |
| STOP | Cease current action. |
| ONLY | Exclusive action — no other path permitted. |
| MAY | Agent discretion. |
| EVIDENCE BEFORE CLAIMS | No success claim without fresh command output. |

# Purpose

Execute the task list from `plan.md` faithfully and rigorously.
Stay strictly within the Implementation Bounds. When errors or gaps occur, diagnose
the root cause from **first principles via read-only investigation** rather than
applying blind symptom patches. Log substantive deviations in `gate.md`.

# Step 0: Gate Check and Bounds Validation

Read `.beyond-code/<slug>/gate.md`. Gate 2 MUST be cleared. If not,
STOP and report: "Plan is not confirmed. Return to plan stage."

Read `.beyond-code/<slug>/plan.md`.

Before writing ANY code, validate the Implementation Bounds:
1. For each task's Files field: confirm all paths are in File Inventory.
2. For each task's declared signatures (Consumes, Produces, exported APIs):
   confirm all are in API Surface or Dependencies.
3. If ANY mismatch: STOP. Report the mismatch to the user. Do NOT proceed.

This validation MUST complete before Step 1 of Task 1.

# First-Principles Root-Cause Protocol (NO BLIND PATCHING)

When a test fails, a build breaks, or an unexpected error occurs during task execution:

**STRICT PROHIBITION**:
- **MUST NOT immediately edit code to slap a "band-aid" (symptom patch)**: Never add ad-hoc `if (!x) return`, optional chaining `?.` to mask nulls, or speculative defensive wrappers in loops.
- **MUST NOT invent fictitious 0.01% edge cases** down in consumer logic instead of fixing broken data flows upstream.

**MANDATORY 3-STEP READ-ONLY INVESTIGATION**:
1. **Trace Upstream (只读溯源)**: Inspect callers and producers along the call chain to discover where invalid data or unexpected state was first introduced.
2. **Contract Breakdown (契约审视)**: Check the data contracts defined in `spec.md` and `plan.md`. Is the issue caused by inconsistent data shapes assembled on-the-fly?
3. **Fix at the Source (源头治理)**: Always fix the defect at the root producer/contract level, or unify the data flow. If this requires altering the agreed plan, log a substantive Deviation.

# Step N: Execute Each Task

Read `.beyond-code/config.yaml` for commit preferences (defaults to `per-task`).

For each task in `plan.md`, in order:
1. Mark it in-progress in `gate.md`'s Task Execution table.
2. Execute each step faithfully without shortcuts (NEVER leave `TODO`, `FIXME`, stubs, or mock shortcuts).
3. Run verifications as specified — EVIDENCE BEFORE CLAIMS.
4. After each action, check for Substantive Deviations:
   - Touched files outside File Inventory?
   - Altered public API signatures or contracts?
   - Added unapproved dependencies?
5. If yes → log as Deviation in `gate.md` immediately.
6. Handle commit per config (`per-task`, `per-plan`, or `manual`).
7. Mark task complete with commit hash.

When a task has `depends_on`: that dependency's initiative gate.md MUST show
Gate 3 completed before starting.

# Deviation Recording

Write to `gate.md` under the `## Deviations` section:

```markdown
| Timestamp | Task | Deviation | Rationale |
|-----------|------|-----------|-----------|
| HH:MM     | T3   | Modified `src/types.ts` (not in plan) | Resolved circular contract dependency |
| HH:MM     | T5   | Replaced `sync` with `async` queue | Upstream I/O contract required async stream |
```

Record BEFORE moving to the next step. Do not batch deviations.

# Deviation Threshold

If deviations accumulate to ≥5 total, OR the first deviation has
substantive design impact (new interface, new dependency, changed
data contract, out-of-bounds file modification): **STOP**.
Present all accumulated deviations to the user:

```markdown
Deviations from plan.md so far:
| # | Task | Deviation | Rationale |
|---|------|-----------|-----------|
[table]

Options:
1. Accept all — continue
2. Reject specific deviations — revert and redo
3. Re-plan — return to plan stage

Which?
```

Do NOT continue until the user responds.

# Gap Recording

If an out-of-scope requirement or long-term improvement is uncovered,
record it without expanding current scope:

```markdown
## Gaps
- [ ] <description> — <why out of scope> — <suggested approach>
```

# Completed Tasks Validation

Before moving from one task to the next, verify:
- The task's status is recorded in `gate.md`.
- `per-task` mode: `git log` confirms the recorded commit exists.
- All step verifications produced actual positive evidence.

# When All Tasks Are Done

Based on `config.yaml` `commit.when`:

- **`per-task`:** All `gate.md` entries already have individual hashes.
- **`per-plan`:** Commit all changes at once:
  ```bash
  git add <all changed files>
  git commit -m "feat: <summary of all tasks>"
  ```
  Update ALL `gate.md` Task Execution entries with the single commit hash.
- **`manual`:** Leave all entries as `—`. User commits separately.

Update `gate.md` with final table state and present a concise summary:
- Completed task list with commit hashes.
- Substantive deviations logged (if any).
- Recorded gaps (if any).

Return to the `beyond-code` router to enter the `verify` stage.
