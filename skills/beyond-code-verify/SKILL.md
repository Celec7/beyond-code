---
name: beyond-code-verify
description: >
  Use when verifying implementation results, running automated checks,
  offering adversarial independent audits, or entering the verify phase
  of beyond-code. Covers exception-first verification, blast radius analysis,
  three-way acceptance triage, in-flight remediation, and atomic archiving.
---

# Scope & Context

Follow the global terminology, deviation standards, and gate rules defined in `beyond-code/SKILL.md`.

# Purpose

Verify that the implementation matches the agreed spec and plan with zero
silent compromises. Offer an independent auditor option (via subagent), analyze
blast radius, present an **Exception-First Verification Report**, and execute
the **Three-Way Acceptance Triage Protocol** to handle acceptance, in-flight fixes,
or course corrections seamlessly.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`. Gate 3 MUST show all tasks
complete with commit hashes. If not, STOP and report: "Not all
tasks are complete. Return to build stage."

# Stage 1: Verification & Independent Auditor Selection

### 1. Automated Baseline Checks (EVIDENCE BEFORE CLAIMS)
Detect project tooling and execute in order: `lint → typecheck → build → test`.
MUST capture raw outputs. NEVER claim success without running fresh commands.
If baseline checks fail, apply the First-Principles Root-Cause Protocol to fix before presenting.

### 2. Independent Auditor Choice (Human-in-the-Loop)
Present the baseline test status and ask the user:

> "Baseline checks passed. Would you like to spawn an **Independent Auditor Subagent** to perform an isolated red-team audit (comparing spec.md + plan.md against git diff to catch silent degradation and substantive deviations)? [Recommended for complex changes] (Yes / No)"

**Branching Logic**:
- **If User confirms (e.g. "yes", "好", "用", "audit", "check")**:
  - The agent **MUST** explicitly call the `subagent` tool. NEVER skip or self-audit under this branch.
  - Inputs to the auditor subagent MUST strictly contain ONLY:
    1. `.beyond-code/<slug>/spec.md` (requirements, contracts & Non-Goals)
    2. `.beyond-code/<slug>/plan.md` (trade-offs, bounds & tasks)
    3. `git diff` against the starting base commit.
  - The subagent prompt MUST instruct the child agent to execute the 3-dimensional scan (Sections 3.1 - 3.3 below) and format its response as the Exception-First Verification Report (Stage 2).
  - Adopt the subagent's audit findings directly.

- **If User declines or skips (e.g. "no", "不用", "direct", or during autonomous pipeline)**:
  - The verifying agent performs the 3-dimensional scan directly with strict objectivity.

### 3. The 3-Dimensional Audit Scan

#### 3.1. Blast Radius & Scope Analysis
Categorize modified files and identify external impacts:
- **Core Logic**: Main business functions altered.
- **Contract & Types**: Schema / DTO / interface changes.
- **Support / Tests**: Auxiliary test cases and fixtures.
- **External Surface Impact**: State if any external callers or public APIs are affected.

#### 3.2. Anti-Laziness & Silent Degradation Scan
Search `git diff` for:
- Lingering `TODO`, `FIXME`, `STUB`, `MOCK`, or empty functions.
- Oversimplified logic (e.g. replacing a planned concurrent queue with a simple loop, swallowing errors silently via empty `catch` blocks, hardcoding test data).
- Any scenario in `spec.md` or task in `plan.md` lacking corresponding implementation in diff.

#### 3.3. Semantic Seam & Substantive Deviation Analysis
Distinguish between benign code realities and unauthorized agent discretion:
- **🟢 Minor Deviations / Benign Seams (Accept & Collapse)**:
  Internal helper variables, TypeScript type annotations, extracting private helpers, framework syntax boilerplate.
- **🔴 Substantive Deviations (FLAG IMMEDIATELY)**:
  Altered public API signatures, introduced undeclared packages, modified out-of-bounds files, or violated Non-Goals/Invariants.

# Stage 2: Exception-First Verification Report

Present the verification report in this high-signal, self-descriptive structure:

```markdown
# 🏁 Verification Report: <slug>

### 🎯 Blast Radius & Affected Surface
- **Core Logic**: `<list of primary modified files>`
- **Contracts / Types**: `<list of modified schemas/interfaces>`
- **Tests & Tooling**: `<list of test files>`
- **External Breaking Impact**: [None | Description of external API changes]

### 🚨 Substantive Deviations (Require User Review)
<!-- List unauthorized architectural, file, or contract changes. If none, state "None detected." -->
- [Module/File]: <What changed> — <Difference from plan.md> — <Potential impact>

### ⚠️ Incomplete & Silent Degradation
<!-- List any TODOs, stubs, mocks, or planned tasks lacking code diff. If none, state "None detected." -->
- [Task/Module]: <Description of shortcut or omitted requirement>

### ✅ Requirements & Evidence
- **Audit Mode**: [Independent Subagent Auditor | Direct Verifier]
- **Baseline Checks**: `<lint/test commands>` → `<all passing summary>`
- **Scenarios Verified**:
  - [x] [Scenario Title A]: `<Fresh command or diff evidence showing it works>`
  - [x] [Scenario Title B]: `<Fresh command or diff evidence showing it works>`

<details>
<summary>🟢 Minor Implementation Details (Collapsed)</summary>
- <List of internal glue / minor helper adjustments>
</details>

---
### 🚦 Next Steps (Please choose):
1. **Accept & Archive**: Everything matches expectations → Proceed to archive.
2. **In-Flight Fix**: Behavior or UX doesn't match intent → Describe the gap, agent fixes in-place.
3. **Course Correction / Re-scope**: Fundamental mismatch → Archive as superseded, start fresh spec.
```

# Stage 3: Three-Way Acceptance Triage Protocol

Evaluate the user's response:

### 🟢 Branch 1: User Accepts (e.g. "looks good", "通过", "ok", "archive")
The agent **MUST immediately in the SAME turn** execute the atomic archiving workflow:
1. Update `gate.md` Gate 4 with user sign-off timestamp.
2. Generate `.beyond-code/<slug>/summary.md` (delivered features, key trade-offs, remaining gaps).
3. Move directory: `mv .beyond-code/<slug> .beyond-code/.archive/<slug>`.
4. Confirm completion: "Initiative successfully archived to `.beyond-code/.archive/<slug>/`. Ready for the next initiative!"
**NEVER defer or skip the `mv` command once acceptance is received.**

### 🟡 Branch 2: In-Flight Remediation (e.g. "this error message is wrong", "still missing edge case")
If the implementation does not meet the user's practical expectations:
1. **Do NOT archive**. Keep the initiative active.
2. Append a Remediation Task to `plan.md` and `gate.md` describing the exact human adjustment needed.
3. Apply the **First-Principles Root-Cause Protocol** to implement the fix.
4. Re-run tests, re-verify with fresh evidence, and re-present the Verification Report.

### 🔴 Branch 3: Course Correction (e.g. "this whole approach won't work", "abandon this")
If the concept itself is fundamentally flawed:
1. Update `gate.md` with:
   ```markdown
   ## Status: SUPERSEDED / ABORTED
   <timestamp> — <Reason for pivoting>
   ```
2. Generate `summary.md` documenting what was learned and why it was superseded.
3. Move directory to `.beyond-code/.archive/<slug>/`.
4. Ask the user if they would like to start a fresh initiative (e.g. `<slug>-v2`) with the new requirements.

# Stage 4: Post-Archive Review

After successful archiving:
1. Review accumulated Gaps in `summary.md` / `gate.md` with the user: "Any out-of-scope gaps worth spinning into a new initiative?"
2. If `.beyond-code/.project/` exists, ask if project docs should be refreshed via `beyond-code-project-docs`.
