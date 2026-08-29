---
name: beyond-code-verify
description: >
  Use when verifying implementation results, running automated checks,
  performing adversarial independent audits, or entering the verify phase
  of beyond-code. Covers exception-first verification, semantic seam analysis,
  anti-laziness scans, automated evidence, and archiving.
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

Verify that the implementation matches the agreed spec and plan with zero
silent compromises. An independent auditor perspective (via subagent or strict
adversarial persona) audits the actual code diff against spec and plan, filters
benign implementation seams, and generates an **Exception-First Verification Report**
highlighting substantive deviations, silent degradation, and concrete evidence.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`. Gate 3 MUST show all tasks
complete with commit hashes. If not, STOP and report: "Not all
tasks are complete. Return to build stage."

# Stage 1: Independent Adversarial Audit

To eliminate self-confirmation bias and laziness, verification MUST be performed
from an isolated, adversarial auditor perspective:

- **If the environment supports subagents** (e.g. `subagent` tool):
  Spawn an independent auditor subagent with ONLY 3 inputs:
  1. `.beyond-code/<slug>/spec.md` (agreed requirements & scenarios)
  2. `.beyond-code/<slug>/plan.md` (agreed bounds, architecture & tasks)
  3. Current `git diff` against the starting base commit.
  Do NOT pass intermediate conversational chit-chat or excuses from the build stage.

- **If subagents are unavailable**:
  The verifying agent MUST explicitly switch to a **Strict Red-Team Auditor Persona**:
  assume the implementation contains hidden shortcuts, skipped edge cases, or
  unauthorized compromises until fresh concrete evidence proves otherwise.

The Auditor MUST execute the following 3-dimensional scan:

### 1. Automated Checks with Fresh Evidence (EVIDENCE BEFORE CLAIMS)
Detect tooling (linter, type-checker, build step, test suite) and run in order:
`lint → typecheck → build → test`.
MUST capture raw outputs. NEVER claim success without running fresh commands.
NEVER extrapolate from partial runs.

### 2. Anti-Laziness & Silent Degradation Scan
Scan `git diff` and search for:
- Lingering `TODO`, `FIXME`, `STUB`, `MOCK`, or empty functions.
- Oversimplified logic (e.g. replacing a planned concurrent queue with a simple loop,
  swallowing errors silently via empty `catch` blocks, hardcoding test data).
- Any scenario in `spec.md` or task in `plan.md` that lacks corresponding implementation in diff.

### 3. Semantic Seam & Substantive Deviation Analysis
Distinguish between benign code realities and unauthorized agent discretion:
- **🟢 Benign Implementation Seams (Accept & Collapse)**:
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
<!-- List unauthorized architectural or contract changes not in plan.md. If none, state "None detected." -->
- [Location/Module]: <What changed> — <Difference from plan.md> — <Potential impact>

### ⚠️ Incomplete & Silent Degradation
<!-- List any TODOs, stubs, mocks, or planned tasks lacking code diff. If none, state "None detected." -->
- [Location/Task]: <Description of shortcut or omitted requirement>

###  Acceptance Criteria & Fresh Evidence
<!-- Automated checks and requirement verification -->
- **Lint & Typecheck**: `<command>` → `<exit code / summary>`
- **Test Suite**: `<command>` → `<N passing, 0 failing>`
- **Scenarios Verified**:
  - [x] Scenario 1 ([Title]): `<Fresh command or diff evidence showing it works>`
  - [x] Scenario 2 ([Title]): `<Fresh command or diff evidence showing it works>`

<details>
<summary>🟢 Benign Implementation Details (Collapsed)</summary>
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
