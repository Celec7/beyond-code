---
name: beyond-code-build
description: >
  Use when executing a confirmed plan, building features task by
  task, tracking progress through gate.md, or entering the build
  phase of beyond-code. Covers bounds validation, first-principles
  read-only root-cause diagnosis, task execution, deviation logging, and gap tracking.
---

# Terminology Reference

This skill uses RFC 2119 keywords and structural definitions defined in `beyond-code/SKILL.md`.

# Purpose

Execute the task list from `plan.md` faithfully and rigorously.
Stay strictly within the Implementation Bounds. When errors or gaps occur, diagnose
the root cause from **first principles via read-only investigation** rather than
applying blind symptom patches. Log minor and substantive deviations in `gate.md`.

# Stage 0: Gate Check and Bounds Validation

Read `.beyond-code/<slug>/gate.md`. Gate 2 MUST be cleared. If not,
STOP and report: "Plan is not confirmed. Return to plan stage."

Read `.beyond-code/<slug>/plan.md`.

Before writing ANY code, validate the Implementation Bounds:
1. For each task's Files field: confirm all paths are in File Inventory.
2. For each task's declared signatures (Consumes, Produces, exported APIs):
   confirm all are in API Surface or Dependencies.
3. If ANY mismatch: STOP. Report the mismatch to the user. Do NOT proceed.

This validation MUST complete before Task 1 starts.

# First-Principles Root-Cause Protocol

When a test fails, a build breaks, or an unexpected error occurs during execution:

**Prohibitions**:
- **MUST NOT** immediately edit code to slap a "band-aid" (symptom patch): Never add ad-hoc `if (!x) return`, optional chaining `?.` to mask nulls, or speculative defensive wrappers in loops.
- **MUST NOT** invent fictitious 0.01% edge cases down in consumer logic instead of fixing broken data flows upstream.

**Mandatory 3-step investigation before any fix**:
1. **Trace Upstream (只读溯源)**: Inspect callers and producers along the call chain to discover where invalid data or unexpected state was first introduced.
2. **Contract Breakdown (契约审视)**: Check the data contracts defined in `spec.md` and `plan.md`. Is the issue caused by inconsistent data shapes assembled on-the-fly?
3. **Fix at the Source (源头治理)**: Always fix the defect at the root producer/contract level, or unify the data flow. If this requires altering the agreed plan, log a substantive Deviation.

# Stage 1: Execute Each Task

Read `.beyond-code/config.yaml` for commit preferences (defaults to `per-task`).

For each task in `plan.md`, in order:
1. Mark it in-progress in `gate.md`'s Task Execution table.
2. Execute each step faithfully without shortcuts (NEVER leave `TODO`, `FIXME`, stubs, or mock shortcuts).
3. Run verifications as specified — EVIDENCE BEFORE CLAIMS.
   **If a verification fails, apply the First-Principles Root-Cause Protocol above before making any fix.**
4. After each action, classify any unscripted decisions:
   - **Minor Deviation**: Internal implementation detail (e.g. private helper, local type). Log in `gate.md` and continue.
   - **Substantive Deviation**: Touched files outside File Inventory, altered public API signatures, added unapproved packages, or changed data contracts. Log in `gate.md` AND immediately apply the threshold check.
5. Handle commit per config (`per-task`, `per-plan`, or `manual`).
6. Mark task complete with commit hash.

When a task has `depends_on`: that dependency's initiative gate.md MUST show
Gate 3 completed before starting.

# Deviation Recording

Write to `gate.md` under the `## Deviations` section:

```markdown
| Timestamp | Task | Level (Minor / Substantive) | Deviation | Rationale |
|-----------|------|-----------------------------|-----------|-----------|
| HH:MM     | T3   | Minor                       | Extracted internal `formatChunk` helper | Cleaner loop readability |
| HH:MM     | T5   | Substantive                 | Modified `src/types.ts` (not in bounds) | Resolved circular contract dependency |
```

Record BEFORE moving to the next step. Do not batch deviations.

# Deviation Threshold

STOP and present deviations to the user when EITHER:
- A **Substantive Deviation** occurs (stop immediately, even on the very first occurrence), OR
- Minor deviations accumulate to ≥5 total.

```markdown
Deviations from plan.md so far:
| # | Task | Level | Deviation | Rationale |
|---|------|-------|-----------|-----------|
[table]

Options:
1. Accept all — continue
2. Reject specific deviations — revert and redo
3. Re-plan — return to plan stage

Which?
```

Do NOT continue until the user responds (unless operating in an authorized autonomous pipeline without unhandled blockers).

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

# Stage 2: Finalize Build

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
- Deviations logged (if any).
- Recorded gaps (if any).

Return to the `beyond-code` router to enter the `verify` stage.
