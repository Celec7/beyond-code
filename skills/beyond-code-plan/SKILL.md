---
name: beyond-code-plan
description: >
  Use when designing architecture and writing the implementation plan,
  after spec.md is confirmed. Covers architecture trade-offs, unified data flows,
  self-descriptive tasks with dependency topology, context anchors, bounds, and pre-presentation validation.
---

# Scope Constraint

You MUST NOT write or modify ANY code. Your ONLY outputs in this stage are
`plan.md` and `gate.md` updates. Implementation happens in the build stage
AFTER this plan is confirmed.

# Purpose

Create `plan.md` — an exhaustive implementation plan grounded in **first principles and trade-off evaluation**.
Leave zero room for guesswork or ad-hoc drift. The build agent MUST be able to execute
the tasks strictly along the declared dependency DAG and implementation bounds.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`. Gate 1 MUST be cleared before
proceeding. If not cleared, STOP and report: "Spec is not confirmed.
Return to think stage."

Read `.beyond-code/<slug>/spec.md`. The plan MUST cover every Scenario/Requirement,
respect every Invariant, and avoid all Explicit Non-Goals.

# Stage 1: Architecture & Trade-Offs (Pros & Cons)

Write 3-5 structured paragraphs:
1. **Component Map & Data Flow**: Key modules, responsibilities, and unified data shapes (how entities transform without ad-hoc assembling).
2. **First-Principles Trade-offs (Pros & Cons)**:
   - **Selected Approach**: Why this design was chosen from fundamental requirements.
   - **Pros & Cons**: Benefits gained vs. what was intentionally given up (e.g. "Chosen: single-table layout. Pros: atomic ACID updates; Cons: future sharding requires migration").
   - **Discarded Alternatives**: Why alternative approaches were rejected.
3. **Execution Order**: High-level flow across affected modules.

# Stage 2: Global Constraints

List constraints every task inherits (versions, limits, naming rules, platform requirements).
Copy verbatim from `spec.md` Constraints section.

# Stage 3: Write Tasks (Self-Descriptive & Topology-Aware)

Write tasks using **descriptive titles** rather than abstract numbers (e.g. use `## Task: Implement Token Validation` instead of `Task 1` or `T1`).
Each task MUST include inlined context/code anchors:

```markdown
## Task: [Action-Verb Descriptive Title]

**Covers Requirements:** [Scenario Title A, Scenario Title B]
**Files:** Create: `exact/path/a.py`; Modify: `exact/path/b.py:42-60`
**Depends On:** [Task: Prerequisite Title, ...]  <!-- Explicit DAG dependencies; [] if independent -->
**Consumes:** [upstream interface signatures — exact names and types]
**Produces:** [downstream interface signatures — exact names and types]

> **Context / Intention Anchor:**
> One-line explanation of what changes in the affected area (e.g. "Inside `verifyToken()`, replace synchronous parsing with async expiry checks").

- [ ] Step 1: [Concrete action — exact signatures + precise behavior description, or exact command]
- [ ] Step 2: [Verification step with full command and expected output]
- [ ] Step N: Commit
```

Task & Topology rules:
- **Dependency DAG**: If a task relies on types, files, or state produced by another task, declare its full task title in `**Depends On:**`. The plan MUST form a valid Directed Acyclic Graph.
- **Atomic Steps**: Each step focuses on a single file modification or a single command with one verifiable output.
- **Behavior Descriptions**: Specify algorithms, control flow, and exact error handling. Do not paste full function bodies.
- **Forbidden Content**: "TBD", "TODO", "implement later", "add validation", "handle edge cases", and references to undeclared types.

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

### 5a. Requirements & Non-Goals Coverage
Verify every requirement scenario in `spec.md` is mapped to at least one task:
```markdown
## Requirements Coverage
| Requirement / Scenario | Task(s) | Status |
|-------------------------|---------|--------|
| [Scenario Title 1]      | [Task Title A] | ✅ |
| [Scenario Title 2]      | [Task Title B] | ✅ |
```
MUST NOT present with missing requirements.

### 5b. Placeholder Scan
Ensure zero vague placeholders exist:
- "TBD", "TODO", "implement later", "handle edge cases": 0 instances.
- All referenced types and signatures are fully declared.

### 5c. Bounds Cross-Validation
- Every path in each task's Files field appears in File Inventory.
- Every signature referenced in Consumes, Produces, or behavior descriptions appears in API Surface.
- No task touches an undeclared file.

# Stage 6: Present and Update gate.md

Present the user with:
1. **Architecture & Trade-offs (Pros & Cons)**
2. **Task List & Dependency DAG Order**
3. **Requirements Coverage Table**
4. **Implementation Bounds**

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
- Write `plan.md` fully with all trade-offs, bounds, and tasks.
- Ensure Pre-Presentation Validation passes completely.
- Mark `gate.md` Gate 2 as cleared with timestamp.
- Return to the router immediately to advance to the build stage.
