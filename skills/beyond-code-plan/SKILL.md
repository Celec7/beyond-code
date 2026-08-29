---
name: beyond-code-plan
description: >
  Use when designing architecture and writing the implementation plan,
  after spec.md is confirmed. Covers Architecture Overview, unified data flows,
  bite-sized task format, Implementation Bounds, and pre-presentation validation.
---

# Terminology Reference

This skill uses RFC 2119 keywords and structural definitions defined in `beyond-code/SKILL.md`.

# Scope Constraint

You MUST NOT write or modify ANY code. Your ONLY outputs in this stage are
`plan.md` and `gate.md` updates. Implementation happens in the build stage
AFTER this plan is confirmed.

# Purpose

Create `plan.md` — an exhaustive implementation plan that leaves the
build agent zero room for guesswork or ad-hoc deviation. The build agent MUST be
able to execute the plan strictly within the declared bounds.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`. Gate 1 MUST be cleared before
proceeding. If not cleared, STOP and report: "Spec is not confirmed.
Return to think stage."

Read `.beyond-code/<slug>/spec.md`. The plan MUST cover every R, respect every
Invariant, and avoid all Explicit Non-Goals.

# Stage 1: Write Architecture Overview

Write 3-5 paragraphs describing:
- Key pieces and their responsibilities
- Core data flow & contract shapes (how entities transform from producer to consumer without ad-hoc assembling)
- How components connect
- What existing modules are touched and how
- Order of operations for the primary code path

Write for someone familiar with the codebase.

# Stage 2: Write Global Constraints

List constraints every task inherits. Include exact values:
versions, limits, naming rules, platform requirements. Copy verbatim
from spec.md Constraints section.

```markdown
> **Global Constraints** (every task inherits these):
> - [constraint with exact value]
```

# Stage 3: Write Tasks

Each task MUST follow this format exactly:

```markdown
## Task N: [Action-verb description]

**Covers:** R1, R3
**Files:** Create: `exact/path/a.py`; Modify: `exact/path/b.py:42-60`
**Consumes:** [upstream interface signatures — exact names and types]
**Produces:** [downstream interface signatures — exact names and types]

- [ ] Step 1: [Concrete action — exact signatures + precise behavior description, or exact command]
- [ ] Step 2: [Verification step with full command and expected output]
- [ ] Step N: Commit
```

Task rules:
- Steps MUST be atomic: each step focuses on a single file change or a single command with one verifiable output.
- Code steps MUST specify the exact signatures involved (as declared
  in API Surface) plus a precise behavior description: the algorithm,
  control flow, and how each named edge case is handled. They MUST NOT
  contain the literal function body — the build agent writes that.
- A behavior description MUST be specific: name which validation runs,
  which edge cases exist, and how each is handled. Vague hand-waving
  is a plan failure.
- Command steps MUST include the exact command and expected output.
- Forbidden step content: "TBD", "TODO", "implement later", "add appropriate error handling",
  "add validation", "handle edge cases", "Similar to Task N" (or equivalent in any language),
  and references to types/functions not declared in any task.

# Stage 4: Write Implementation Bounds

Write the exhaustive boundary list. The build agent MUST NOT exceed these bounds:

```markdown
## Implementation Bounds
> BUILD AGENT: You MUST NOT touch any file, create any function,
> add any import, or introduce any dependency NOT listed below.
> If a step requires something not in this list, STOP and report.

### File Inventory (exhaustive)
| Path | Action (CREATE/MODIFY) | Purpose |
|------|------------------------|---------|

### API Surface (exhaustive)
| Signature | Location | Visibility |
|-----------|----------|------------|

### Dependencies (exhaustive)
| Package | Version | Purpose |
|---------|---------|---------|

### Prohibited Actions
The build agent MUST NOT:
- Create files outside File Inventory
- Create functions/classes outside API Surface
- Add dependencies outside Dependencies list
- Modify files NOT in File Inventory
- Change existing public interfaces NOT in API Surface
- Violate Explicit Non-Goals or Invariants declared in spec.md
```

# Stage 5: Pre-Presentation Validation

Before presenting the plan, run and pass all three validation checks:

### 5a. Spec & Non-Goals Coverage
Verify every spec R has ≥1 task and no task breaches Non-Goals:
```markdown
## Spec Coverage Self-Review
| Requirement | Task(s) | Status |
|-------------|---------|--------|
| R1          | T1      | ✅     |
| R2          | T2      | ✅     |
```
MUST NOT present the plan with any missing requirements.

### 5b. Placeholder Scan
Ensure zero vague placeholders remain in `plan.md`:
- "TBD": 0 instances
- "TODO": 0 instances
- "implement later": 0 instances
- "add appropriate error handling": 0 instances
- "add validation": 0 instances
- "handle edge cases": 0 instances
- All referenced types and signatures are fully declared.

### 5c. Bounds Cross-Validation
- Every path in each task's Files field appears in File Inventory.
- Every signature referenced in Consumes, Produces, or behavior descriptions appears in API Surface.
- No task touches an undeclared file.

# Stage 6: Present and Update gate.md

Present the user with:
1. The Architecture Overview & Data Flow
2. A summary of tasks (count, order, dependencies)
3. The Spec Coverage table
4. The Implementation Bounds

Wait for explicit confirmation.

After confirmation, update `gate.md`:
```markdown
## Gate 2: Plan Ready
- [x] plan.md created: `.beyond-code/<slug>/plan.md`
- [x] Pre-presentation validation passed
- [x] User confirmed: <timestamp>
- [x] Gate cleared
```

Then return to the `beyond-code` router.

If the user gave "just do it" / autonomous pipeline instruction:
- Write `plan.md` fully with all bounds and tasks.
- Ensure Pre-Presentation Validation passes completely.
- Mark `gate.md` Gate 2 as cleared with timestamp.
- Return to the router immediately to advance to the build stage.
