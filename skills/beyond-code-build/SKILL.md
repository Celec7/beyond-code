---
name: beyond-code-build
description: >
  Use when executing a confirmed plan, building features task by
  task, tracking progress directly in plan.md, or entering the build
  phase of beyond-code. Covers topological task execution, first-principles
  root-cause diagnosis, clean Git hygiene, and deviation management.
  Supports both single scopes and nested sub-scopes inside an Epic.
---

# Scope & Context

Execute tasks strictly from `plan.md` (`.beyond-code/<scope-slug>/plan.md` or `.beyond-code/<epic-slug>/<sub-scope-slug>/plan.md`) within the declared Implementation Bounds.
Follow the global rules and definitions in `beyond-code/SKILL.md`.

# Purpose

Execute the tasks from `plan.md` faithfully and in topological dependency order.
When errors or test failures occur, diagnose root causes via **read-only investigation** from first principles.
Maintain clean Git history free of internal process code names.

# Stage 0: Prerequisite & Bounds Check

Read the active `plan.md`.

Before writing code:
1. Confirm tasks and boundaries are clear.
2. Ensure upstream dependencies for the first task are satisfied.

# First-Principles Root-Cause Protocol

When a test fails, a build breaks, or an unexpected error occurs during execution:

**Prohibitions**:
- **MUST NOT** slap a "band-aid" (symptom patch): Never add ad-hoc `if (!x) return`, optional chaining `?.` to mask nulls, or speculative defensive wrappers in loops.
- **MUST NOT** invent fictitious 0.01% edge cases down in consumer logic instead of fixing broken data flows upstream.

**Mandatory 3-step investigation before any fix**:
1. **Trace Upstream (只读溯源)**: Inspect callers and producers along the call chain to discover where invalid data or unexpected state was first introduced.
2. **Contract Breakdown (契约审视)**: Check the data contracts defined in `spec.md` (and parent Epic `spec.md` if nested) and `plan.md`. Is the issue caused by inconsistent data shapes assembled on-the-fly?
3. **Fix at the Source (源头治理)**: Always fix the defect at the root producer/contract level, or unify the data flow. If this requires altering the agreed plan, treat it as a Substantive Deviation.

# Stage 1: Execute Each Task in Topological Order

Read `.beyond-code/config.yaml` for commit preferences (defaults to `per-task`).

Execute tasks following their declared DAG order:
- **Dependency Check**: Before starting a task, confirm all prerequisite tasks are checked off (`- [x]`) in `plan.md`. NEVER execute a blocked task out of order.

For each task in `plan.md`:
1. Execute each step faithfully without shortcuts (NEVER leave `TODO`, `FIXME`, stubs, or mock shortcuts).
2. Run verifications as specified — EVIDENCE BEFORE CLAIMS.
   **If a verification fails, apply the First-Principles Root-Cause Protocol before making any fix.**
3. Classify any unscripted implementation decisions:
   - **Minor Deviation**: Internal implementation detail (e.g. private helper, local type). Non-blocking.
   - **Substantive Deviation**: Touched files outside declared task bounds, altered public API signatures, added unapproved packages, or changed data contracts. **STOP immediately and ask the user for approval.**
4. Commit changes according to `config.yaml` (`per-task`, `per-plan`, or `manual`) following **Git Hygiene Rules**.
5. Check off completed steps in `plan.md`, recording the commit hash:
   ```markdown
   - [x] Step 3: Commit (`a1b2c3d`)
   ```

# Git Hygiene Rules (Zero Internal Code Names)

When creating Git commits:
- Use standard Conventional Commits or repo-native conventions (e.g. `feat(auth): implement JWT refresh token endpoint`).
- **MUST NOT leak internal process markers**: NEVER include `T1`, `Task 1`, `R1`, `Scenario 2`, `beyond-code`, or scope slugs in commit messages.
- Commits must read like high-quality commits authored by an expert human software engineer.

# Substantive Deviation Alert

If a Substantive Deviation is necessary:
STOP and present the situation clearly to the user:

```markdown
### 🚨 Substantive Deviation Encountered
- **Task**: [Task Title]
- **Human Reason**: [Why this out-of-bounds change is needed]
- **Proposed Change**: [Exact files or contracts affected]

Please confirm whether to proceed with this change, adjust the approach, or re-plan.
```

# Stage 2: Finalize Build

Based on `config.yaml` `commit.when`:
- **`per-task`:** Tasks already have individual commit hashes recorded in `plan.md`.
- **`per-plan`:** Commit all remaining changes with a descriptive message (e.g. `feat(<scope>): <summary of capability>`).
- **`manual`:** Leave commit to the user.

Once all tasks in `plan.md` are marked complete, proceed to `beyond-code-verify`.
