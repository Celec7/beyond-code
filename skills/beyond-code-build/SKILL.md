---
name: beyond-code-build
description: >
  Use when executing a confirmed plan, building features task by
  task, tracking progress through gate.md, or entering the build
  phase of beyond-code. Covers bounds validation, topological task ordering,
  first-principles root-cause diagnosis, clean Git hygiene, and deviation logging.
---

# Scope & Context

You MUST execute tasks strictly from `.beyond-code/<slug>/plan.md` within the
Implementation Bounds. Follow the global rules and definitions in `beyond-code/SKILL.md`.

# Purpose

Execute the tasks from `plan.md` faithfully, rigorously, and in topological dependency order.
Stay strictly within the Implementation Bounds. When errors occur, diagnose root causes
via **read-only investigation** from first principles. Maintain clean Git history free of
internal process code names.

# Stage 0: Gate Check and Bounds Validation

Read `.beyond-code/<slug>/gate.md`. Gate 2 MUST be cleared. If not,
STOP and report: "Plan is not confirmed. Return to plan stage."

Read `.beyond-code/<slug>/plan.md`.

Before writing ANY code, validate the Implementation Bounds:
1. For each task's Files field: confirm all paths exist in File Inventory.
2. For each task's declared signatures: confirm all exist in API Surface or Dependencies.
3. If ANY mismatch: STOP. Report the mismatch to the user. Do NOT proceed.

This validation MUST complete before the first task starts.

# First-Principles Root-Cause Protocol

When a test fails, a build breaks, or an unexpected error occurs during execution:

**Prohibitions**:
- **MUST NOT** immediately edit code to slap a "band-aid" (symptom patch): Never add ad-hoc `if (!x) return`, optional chaining `?.` to mask nulls, or speculative defensive wrappers in loops.
- **MUST NOT** invent fictitious 0.01% edge cases down in consumer logic instead of fixing broken data flows upstream.

**Mandatory 3-step investigation before any fix**:
1. **Trace Upstream (只读溯源)**: Inspect callers and producers along the call chain to discover where invalid data or unexpected state was first introduced.
2. **Contract Breakdown (契约审视)**: Check the data contracts defined in `spec.md` and `plan.md`. Is the issue caused by inconsistent data shapes assembled on-the-fly?
3. **Fix at the Source (源头治理)**: Always fix the defect at the root producer/contract level, or unify the data flow. If this requires altering the agreed plan, log a Substantive Deviation.

# Stage 1: Execute Each Task in Topological Order

Read `.beyond-code/config.yaml` for commit preferences (defaults to `per-task`).

Execute tasks following their declared DAG order:
- **Dependency Check**: Before starting a task, check its `**Depends On:**`. All prerequisites in `gate.md` MUST show completed with commit hashes (or marked complete). NEVER execute a blocked task out of order.

For each task in `plan.md`:
1. Mark it `🔄 In-Progress` in `gate.md`'s Task Execution table.
2. Execute each step faithfully without shortcuts (NEVER leave `TODO`, `FIXME`, stubs, or mock shortcuts).
3. Run verifications as specified — EVIDENCE BEFORE CLAIMS.
   **If a verification fails, apply the First-Principles Root-Cause Protocol above before making any fix.**
4. After each action, classify any unscripted decisions:
   - **Minor Deviation**: Internal implementation detail (e.g. private helper, local type). Log in `gate.md` and continue.
   - **Substantive Deviation**: Touched files outside File Inventory, altered public API signatures, added unapproved packages, or changed data contracts. Log in `gate.md` AND immediately apply the threshold check.
5. Handle commit per config (`per-task`, `per-plan`, or `manual`) following **Git Hygiene Rules** below.
6. Mark task `✅ Done` in `gate.md` with commit hash.

# Git Hygiene Rules (Zero Internal Code Names)

When creating Git commits:
- Use standard Conventional Commits or repo-native conventions (e.g. `feat(auth): implement JWT refresh token endpoint`).
- **MUST NOT leak internal process markers**: NEVER include `T1`, `Task 1`, `R1`, `Scenario 2`, `beyond-code`, `gate.md`, or initiative slugs in commit messages.
- Commits must read like high-quality commits authored by an expert human software engineer.

# Deviation Recording

Write to `gate.md` under the `## Deviations` section using human-first rationales:

```markdown
| Timestamp | Task | Level (Minor / Substantive) | Human Rationale | Deviation Detail |
|-----------|------|-----------------------------|-----------------|------------------|
| HH:MM     | [Task Title] | Minor | Improve loop readability | Extracted internal `formatChunk` helper |
| HH:MM     | [Task Title] | Substantive | Resolve circular module dependency | Modified `src/types.ts` (added to bounds) |
```

Record BEFORE moving to the next step. Do not batch deviations.

# Deviation Threshold

STOP and present deviations to the user when EITHER:
- A **Substantive Deviation** occurs (stop immediately, even on the very first occurrence), OR
- Minor deviations accumulate to ≥5 total.

```markdown
### 🚨 Deviations Encountered
| Task | Level | One-Line Human Reason | Technical Detail |
|------|-------|-----------------------|------------------|
[table]

Options:
1. Accept all — continue
2. Reject specific deviations — revert and redo
3. Re-plan — return to plan stage
```

Do NOT continue until the user responds (unless operating in an authorized autonomous pipeline without unhandled blockers).

# Gap Recording

If an out-of-scope requirement or long-term improvement is uncovered, record it:
```markdown
## Gaps & Future Work
- [ ] <description> — <why out of scope> — <suggested approach>
```

# Stage 2: Finalize Build

Based on `config.yaml` `commit.when`:
- **`per-task`:** Tasks already have individual hashes.
- **`per-plan`:** Commit all changes at once with a descriptive message (e.g. `feat(<scope>): <summary of capability>`). Update all rows in `gate.md` with this hash.
- **`manual`:** Leave all entries as `—`.

Update `gate.md` and present a concise completion summary:
- Completed task list with commit hashes.
- Deviations logged (if any).
- Recorded gaps (if any).

Return to the `beyond-code` router to enter the `verify` stage.
