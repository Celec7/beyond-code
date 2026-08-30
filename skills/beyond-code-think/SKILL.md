---
name: beyond-code-think
description: >
  Use when clarifying requirements before coding, the user's intent
  is unclear, needs to narrow down what to build, or entering the think phase
  of beyond-code. Covers Scope Check (Epic vs. Single Initiative), first-principles
  data contracts, Explicit Non-Goals, and self-descriptive scenario specs.
---

# Scope Constraint

You MUST NOT write or modify implementation code during this stage. Your ONLY output in this stage is
the specification file (`spec.md`, and `roadmap.md` if an Epic). Detailed task planning belongs to the plan stage.

# Purpose

Clarify user intent from **first principles**, establish clear data contracts,
and carve out the **negative space (Explicit Non-Goals)** to prevent agent drift.
For complex, multi-modular requirements, decompose them into a nested **Epic & Sub-Initiatives** hierarchy.

# Stage 0: Prerequisite Check

Check `.beyond-code/<slug>/spec.md` or `.beyond-code/<epic-slug>/spec.md`.

If `spec.md` already exists and has `status: confirmed`, STOP and report: "Spec is already confirmed. Proceed to plan."

# Stage 1: Scope Check (Single Initiative vs. Epic Decomposition)

Before asking clarifying questions, assess: does this feature contain
≥2 independently deliverable subsystems / modules?

### If NO (Single Initiative):
Proceed to Stage 2 with a single slug: `.beyond-code/<slug>/`.

### If YES (Nested Epic):
1. Create the parent Epic directory: `.beyond-code/<epic-slug>/`.
2. Write the global architecture, data contracts, and Non-Goals in `.beyond-code/<epic-slug>/spec.md`.
3. Create `.beyond-code/<epic-slug>/roadmap.md` to establish the sub-initiatives DAG and sequence:

```markdown
# Epic Roadmap: <epic-slug>

## Sub-Initiatives
- [ ] `<sub-slug-1>`: [One-line summary of subsystem] (depends_on: [])
- [ ] `<sub-slug-2>`: [One-line summary of subsystem] (depends_on: [`<sub-slug-1>`])

## Execution Flow
1. Run `<sub-slug-1>` (Plan → Build → Verify)
2. Run `<sub-slug-2>` (Plan → Build → Verify)
3. Run Epic End-to-End Acceptance & Archive
```

Ask the user to confirm the Epic breakdown before proceeding to the first sub-initiative:
> "This feature spans multiple subsystems. I have broken it down into an Epic (`<epic-slug>`) with the sub-initiatives above. Please confirm to proceed with `<sub-slug-1>`, or let me know what to adjust."

# Stage 2: Foundational Clarification (Anti-Noise Rule)

Clarifying questions MUST be high-leverage and focused on architecture and user intent.

**Questioning prohibitions**:
- **MUST NOT ask micro-implementation details**: Never ask about function names, variable naming, file organization, or internal library choices that the agent can decide during planning.
- **MUST NOT ask 0.01% extreme-edge cases**: Never derail discussion with ultra-rare failure permutations. Address realistic edge cases via explicit **Assumptions**.

**When you do need to ask**:
- Ask at most ONE high-impact question at a time.
- State your understanding, present 2 concrete choices, and provide a recommended default.
- If user input is largely sufficient, formulate reasonable defaults as **Assumptions** in `spec.md` rather than stalling progress with unnecessary questions.

# Stage 3: Write spec.md (No Internal Code Names)

Generate `spec.md` (`.beyond-code/<slug>/spec.md` or `.beyond-code/<epic-slug>/spec.md`) using this self-descriptive template:

```markdown
---
slug: <initiative-slug | epic-slug>
status: draft | confirmed
---

# Feature: [One-line summary of capability]

## 1. Core Scenarios & Acceptance Criteria

### Scenario: [Descriptive Title — MUST use concrete action verbs]
<!-- Concrete verbs: create, return, validate, reject, transform, emit, store, delete -->
- **Given**: [Preconditions / initial state]
- **When**: [Action or trigger event]
- **Then**: [Observable, verifiable result]

### Scenario: [Next Descriptive Title]
...

## 2. Core Data Contracts & Invariants (First Principles)
<!-- Define key entities, schemas, and immutable system invariants as defensive rules -->
- **Data Flow**: <Source / producer> → <Unified schema / DTO> → <Consumer>
- **Invariants**:
  - [Invariant 1: e.g. "Timestamps MUST be UTC ISO-8601 strings"]
  - [Invariant 2: e.g. "Error responses MUST return structured { code, message } format"]

## 3. Explicit Non-Goals (Negative Space)
<!-- Deliberately excluded scope to prevent agent hallucination & scope creep -->
- ⛔ Will NOT: <e.g. Support multi-tenant isolation in this version>
- ⛔ Will NOT: <e.g. Modify existing database migrations>

## 4. Assumptions
<!-- Reasonable defaults inferred by the agent; user can adjust before confirmation -->
- [Assumption 1: e.g. "CLI output defaults to human-readable text unless --json is passed"]

## 5. Constraints
- [Hard architectural or platform boundary]
```

# Stage 4: Present and Get Confirmation

Present a clean, human-first summary of what was captured:
1. **Core Capabilities & Scenarios** (and Sub-initiatives breakdown if Epic)
2. **Explicit Non-Goals (What we are NOT doing)**
3. **Key Assumptions & Invariants**

Ask:
> "Does this spec match your intent? Please confirm to proceed to Plan, or let me know what to adjust."

Set `spec.md` status to `draft`. Change to `confirmed` once the user agrees.

Then proceed to `beyond-code-plan` for the active initiative (or first sub-initiative: `.beyond-code/<epic-slug>/<sub-slug-1>/`).

If operating in autonomous mode ("just do it"):
- Write `spec.md` with status `confirmed`.
- Advance directly to the plan stage.
