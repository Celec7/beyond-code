---
name: beyond-code-verify
description: >
  Use when verifying implementation results, running automated checks,
  performing adversarial independent audits, or entering the verify phase
  of beyond-code. Covers exception-first verification, semantic seam analysis,
  anti-laziness scans, automated evidence, and archiving.
---

# Terminology Reference

This skill uses RFC 2119 keywords and structural definitions defined in `beyond-code/SKILL.md`.

# Purpose

Verify that the implementation matches the agreed spec and plan with zero
silent compromises. Offer the user an independent auditor option (via subagent)
to audit the actual code diff against spec and plan, filter benign implementation seams,
and generate an **Exception-First Verification Report** highlighting substantive deviations,
silent degradation, and concrete evidence.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`. Gate 3 MUST show all tasks
complete with commit hashes. If not, STOP and report: "Not all
tasks are complete. Return to build stage."

# Stage 1: Verification & Independent Auditor Selection

### 1. Automated Baseline Checks (EVIDENCE BEFORE CLAIMS)
Detect project tooling and execute in order: `lint → typecheck → build → test`.
MUST capture raw outputs. NEVER claim success without running fresh commands.
If baseline checks fail, return to the root-cause fix loop or report blockers.

### 2. Independent Auditor Choice (Human-in-the-Loop)
Present the baseline test status and ask the user:

> "Baseline checks passed. Would you like to spawn an **Independent Auditor Subagent** to perform an isolated red-team audit (comparing spec.md + plan.md against git diff to catch silent degradation and substantive deviations)? [Recommended for complex changes] (Yes / No)"

**Branching Logic**:
- **If User confirms (e.g. "yes", "好", "用", "audit", "check")**:
  - The agent **MUST** explicitly call the `subagent` tool. NEVER skip or self-audit under this branch.
  - Inputs to the auditor subagent MUST strictly contain ONLY:
    1. `.beyond-code/<slug>/spec.md` (agreed requirements, contracts & Non-Goals)
    2. `.beyond-code/<slug>/plan.md` (architecture, bounds & tasks)
    3. `git diff` against the starting base commit.
  - The subagent prompt MUST instruct the child agent to run the 3-dimensional scan (Sections 3.1 - 3.3 below) and format its response as the Exception-First Verification Report (Stage 2).
  - Adopt the subagent's audit findings directly.

- **If User declines or skips (e.g. "no", "不用", "direct", or during autonomous pipeline)**:
  - The verifying agent performs the 3-dimensional scan directly with strict objectivity.

### 3. The 3-Dimensional Audit Scan

#### 3.1. Tooling & Test Coverage Evidence
Confirm all test suites and linter passes with raw outputs.

#### 3.2. Anti-Laziness & Silent Degradation Scan
Search `git diff` for:
- Lingering `TODO`, `FIXME`, `STUB`, `MOCK`, or empty functions.
- Oversimplified logic (e.g. replacing a planned concurrent queue with a simple loop,
  swallowing errors silently via empty `catch` blocks, hardcoding test data).
- Any scenario in `spec.md` or task in `plan.md` that lacks corresponding implementation in diff.

#### 3.3. Semantic Seam & Substantive Deviation Analysis
Distinguish between benign code realities and unauthorized agent discretion:
- **🟢 Minor Deviations / Benign Seams (Accept & Collapse)**:
  Internal helper variables, TypeScript type annotations, extracting private helpers,
  framework syntax boilerplate.
- **🔴 Substantive Deviations (FLAG IMMEDIATELY)**:
  - Altered public API signatures / exports not in `plan.md`.
  - Introduced undeclared external packages or altered global configuration.
  - Changed error handling semantics or architectural invariants.
  - Modified files strictly outside `Implementation Bounds`.

# Stage 2: Exception-First Verification Report

The verification report MUST prioritize anomalies over routine confirmations.
Present to the user in this exact high-signal structure:

```markdown
# 🏁 Verification Report: <slug>

### 🚨 Substantive Deviations (Require User Review)
<!-- List unauthorized architectural, file, or contract changes. If none, state "None detected." -->
- [Location/Module]: <What changed> — <Difference from plan.md> — <Potential impact>

### ⚠️ Incomplete & Silent Degradation
<!-- List any TODOs, stubs, mocks, or planned tasks lacking code diff. If none, state "None detected." -->
- [Location/Task]: <Description of shortcut or omitted requirement>

### ✅ Acceptance Criteria & Fresh Evidence
<!-- Automated checks and requirement verification -->
- **Audit Mode**: [Independent Subagent Auditor | Direct Verifier]
- **Lint & Typecheck**: `<command>` → `<exit code / summary>`
- **Test Suite**: `<command>` → `<N passing, 0 failing>`
- **Scenarios Verified**:
  - [x] Scenario 1 ([Title]): `<Fresh command or diff evidence showing it works>`
  - [x] Scenario 2 ([Title]): `<Fresh command or diff evidence showing it works>`

<details>
<summary>🟢 Minor Implementation Details (Collapsed)</summary>
- <List of internal glue / minor helper adjustments>
</details>
```

# Stage 3: Remediation or User Acceptance

- **If Substantive Deviations or Silent Degradation are found**:
  STOP and present the findings to the user. Ask:
  "1) Should the agent fix these gaps to match the original plan?
   2) Or do you approve these implementation changes?"
  Do NOT proceed to archive until user explicitly signs off or gaps are resolved.

- **If all checks pass cleanly**:
  Ask the user for final confirmation: "All requirements and automated checks passed with clean audit evidence. Confirm to archive?"

Update `gate.md`:

```markdown
## Gate 4: Verification
- [ ] Automated checks passed (with auditor evidence)
- [ ] Substantive deviations: [None | User Approved]
- [ ] R<N>: user confirmed
```

# Stage 4: Archive

When user explicitly confirms acceptance:

1. Create `.beyond-code/.archive/` if needed.
2. MOVE the entire initiative directory to `.beyond-code/.archive/<slug>/`.
3. Verify the move:
```bash
ls .beyond-code/.archive/<slug>/
```
4. Update `gate.md`:
```markdown
## Archive
- [x] Moved to .beyond-code/.archive/<slug>/
```

If the move fails, MUST report the error and STOP.

# Stage 5: Post-Archive & Gap Review

1. Review accumulated Gaps in `gate.md` and present them to the user:
   "These out-of-scope gaps were recorded during this initiative. Any worth pursuing as new initiatives?"
2. If `.beyond-code/.project/` exists, ask: "Should I update any project docs?" If yes, load `beyond-code-project-docs`.
3. The initiative is complete. If no other active initiatives exist, ask what to work on next.
