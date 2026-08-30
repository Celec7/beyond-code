---
name: beyond-code-plan
description: >
  Use when designing architecture and writing the implementation plan,
  after requirements are clear or spec.md is confirmed. Covers architecture
  trade-offs (Pros & Cons), unified data flows, self-descriptive tasks with
  dependency topology, context anchors, and implementation bounds.
  Supports both single initiatives and nested sub-initiatives inside an Epic.
---

# Scope Constraint

You MUST NOT write or modify implementation code. Your ONLY output in this stage is
`plan.md` (located at `.beyond-code/<slug>/plan.md` or `.beyond-code/<epic-slug>/<sub-slug>/plan.md`).
Implementation happens in the build stage AFTER this plan is confirmed.

# Purpose

Create `plan.md` — an implementation plan grounded in **first principles and trade-off evaluation**.
The build agent MUST be able to execute the tasks strictly along the declared dependency DAG and bounds.
`plan.md` is the single source of truth for both task specifications and execution progress tracking.

# Stage 0: Prerequisite Check

Check relevant `spec.md`:
- If in a nested sub-initiative, check parent `.beyond-code/<epic-slug>/spec.md` for global invariants/contracts and any local module specs.
- Confirm requirements and Non-Goals are understood.
- The plan MUST address the core scenarios, respect all invariants, and avoid all Explicit Non-Goals.

# Stage 1: Architecture & Trade-Offs (Pros & Cons)

Write structured architectural trade-offs:
1. **Component Map & Data Flow**: Key modules, responsibilities, and unified data shapes (how entities transform without ad-hoc assembling).
2. **First-Principles Trade-offs (Pros & Cons)**:
   - **Selected Approach**: Why this design was chosen from fundamental requirements.
   - **Pros & Cons**: Benefits gained vs. what was intentionally given up (e.g. "Chosen: single-table layout. Pros: atomic ACID updates; Cons: future sharding requires migration").
   - **Discarded Alternatives**: Why alternative approaches were rejected.
3. **Execution Order**: High-level flow across affected modules.

# Stage 2: Write Tasks (Self-Descriptive & Topology-Aware)

Write tasks using **descriptive titles** rather than abstract numbers (e.g. use `## Task: Implement Token Validation` instead of `Task 1` or `T1`).

Format each task as:

```markdown
## Task: [Action-Verb Descriptive Title]

- **Covers Requirements**: [Scenario Title or Capability]
- **Files**: Create: `exact/path/a.py`; Modify: `exact/path/b.py:42-60`
- **Depends On**: [Task: Prerequisite Title, ...] <!-- [] if independent -->
- **Consumes**: [upstream interface signatures or types]
- **Produces**: [downstream interface signatures or types]

> **Context / Intention Anchor:**
> One-line explanation of what changes in the affected area and why.

- [ ] Step 1: [Concrete action — exact signatures and behavior description, or exact command]
- [ ] Step 2: [Verification step with command and expected outcome]
- [ ] Step 3: Commit
```

Task & Topology rules:
- **Dependency DAG**: If a task relies on types, files, or state produced by another task, declare its prerequisite in `Depends On`. The plan MUST form a valid Directed Acyclic Graph.
- **Atomic Steps**: Focus on concise modifications with verifiable outputs.
- **Behavior Descriptions**: Specify algorithms, control flow, and exact error handling. Do not paste full function bodies.
- **Forbidden Content**: "TBD", "TODO", "implement later", "add validation", "handle edge cases", and references to undeclared types.

# Stage 3: Define Implementation Bounds

Define clear operational bounds directly in `plan.md`:

```markdown
## Implementation Bounds
The build agent MUST operate strictly within these declared boundaries:
- **Allowed Files**: ONLY files explicitly declared in the tasks above.
- **Contract Adherence**: Public interfaces and data shapes must match declared Consumes/Produces.
- **Dependencies**: No undeclared external packages or libraries may be added.
- **Non-Goals**: Strict compliance with Explicit Non-Goals declared in `spec.md`.

*Any modification outside these bounds constitutes a Substantive Deviation and requires an immediate STOP.*
```

# Stage 4: Pre-Presentation Validation

Before presenting the plan, verify:
1. **Requirements Coverage**: Every requirement scenario is covered by at least one task.
2. **DAG Integrity**: Dependencies form a clean DAG with no circular dependencies.
3. **Zero Placeholder**: No "TBD", "TODO", or undefined stubs exist in task steps.

# Stage 5: Present and Get Confirmation

Present the plan summary:
1. **Architecture & Trade-offs (Pros & Cons)**
2. **Task List & Dependency Order**
3. **Implementation Bounds**

Ask:
> "Does this implementation plan look good? Please confirm to start building, or let me know what to adjust."

Set `plan.md` status to `confirmed` once the user approves, then proceed to `beyond-code-build`.

If operating in autonomous mode ("just do it"):
- Write `plan.md` with status `confirmed`.
- Proceed immediately to the build stage.
