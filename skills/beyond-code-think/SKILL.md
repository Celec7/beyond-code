---
name: beyond-code-think
description: >
  Use when clarifying requirements before coding, the user's intent
  is unclear, needs to narrow down what to build, or entering the think phase
  of beyond-code. Covers Scope Check, core data contracts,
  Explicit Non-Goals, Given/When/Then spec format, and gate.md management.
---

# Terminology Reference

This skill uses RFC 2119 keywords and structural definitions defined in `beyond-code/SKILL.md`.

# Scope Constraint

You MUST NOT write or modify ANY code. Your ONLY outputs in this stage are
`spec.md` and `gate.md` updates. Implementation happens in the build stage.

# Purpose

Clarify user intent from **first principles**, establish clear data contracts,
and carve out the **negative space (Explicit Non-Goals)** to prevent agent drift.
Capture the result in `spec.md` with verifiable acceptance criteria. Do NOT plan
detailed file-by-file implementation tasks — that belongs to the plan stage.

# Stage 0: Gate Check

Read `.beyond-code/<slug>/gate.md`.

If Gate 1 is already cleared, report this and STOP — the initiative
should proceed to plan, not re-think. If gate.md is missing, create
it with an empty Gate 1 checklist.

# Stage 1: Scope Check

Before asking clarifying questions, assess: does this feature contain
≥2 independently deliverable subsystems?

If YES — ask the user to confirm the subsystem split before writing
any spec. Present a Module Breakdown:

```
| Module | Description | Initiative Slug | depends_on |
|--------|-------------|-----------------|------------|
| ...    | ...         | ...             | none       |
```

Each module becomes a separate initiative. Start with the first one;
the rest get summarized in the first spec's Module Breakdown table for later.

If NO — proceed to Stage 2.

# Stage 2: Foundational Clarification (Anti-Noise Rule)

Clarifying questions MUST be high-leverage and focused on architecture/user intent.

**Questioning prohibitions**:
- **MUST NOT ask micro-implementation details**: Never ask about function names, variable naming, file organization, or internal library choices that the agent can decide in Plan.
- **MUST NOT ask 0.01% extreme-edge cases**: Never derail discussion with ultra-rare failure permutations (e.g. power outage during atomic write). Address realistic edge cases via explicit **Assumptions**.

**When you do need to ask**:
- Ask at most ONE high-impact question at a time.
- State your understanding, present 2 concrete choices, and provide a recommended default.
- If user input is largely sufficient, formulate reasonable defaults as **Assumptions** in `spec.md` rather than stalling progress with unnecessary questions.

# Stage 3: Write spec.md

Generate `.beyond-code/<slug>/spec.md` using this expressive, high-leverage template:

```markdown
---
slug: <initiative-slug>
status: draft | confirmed
---

# Feature: [One-line summary of capability]

## 1. Core Scenarios & Acceptance Criteria

### R1: [Description — MUST use concrete action verbs]
<!-- Banned vague verbs: support, integrate, enhance, optimize, handle, manage, process, facilitate, leverage, utilize -->
<!-- Preferred concrete verbs: create, return, validate, reject, transform, emit, store, delete -->
- **Given**: [Preconditions / initial state]
- **When**: [Action or trigger event]
- **Then**: [Observable, verifiable result]

### R2: ...

## 2. Core Data Contracts & Invariants (First Principles)
<!-- Define key entities, schemas, and immutable system invariants -->
- **Data Flow**: <Source / producer> → <Unified schema / DTO> → <Consumer>
- **Invariants**:
  - [Invariant 1: e.g. "Timestamps MUST be UTC ISO-8601 strings"]
  - [Invariant 2: e.g. "All errors MUST return structured { code, message } object"]

## 3. Explicit Non-Goals (Negative Space)
<!-- What this initiative deliberately will NOT do, to prevent agent hallucination & scope creep -->
- ⛔ Will NOT: <e.g. Support multi-tenant isolation in this version>
- ⛔ Will NOT: <e.g. Alter existing database migrations>

## 4. Assumptions
<!-- Reasonable defaults inferred by the agent; user can adjust before confirmation -->
- [Assumption 1: e.g. "CLI output defaults to human-readable text unless --json is passed"]

## 5. Constraints
- [Hard architectural or platform boundary]
```

If the Scope Check identified sub-systems, append:

```markdown
## Module Breakdown

| Module | Initiative Slug | depends_on |
|--------|-----------------|------------|
```

# Stage 4: Update gate.md

Append to Gate 1:

```markdown
## Gate 1: Spec Confirmed
- [x] spec.md created: `.beyond-code/<slug>/spec.md`
- [ ] User confirmed
```

# Stage 5: Present and get confirmation

Present a clean, high-signal summary of what was captured:
1. **Core Capabilities (R1, R2...)**
2. **Explicit Non-Goals (What we are NOT doing)**
3. **Key Assumptions & Invariants**

Ask:
> "Does this spec match your intent? Please confirm to proceed to Plan, or let me know what to adjust."

Set `spec.md` status to `draft`. Change to `confirmed` ONLY after the user agrees.

When confirmed, update `gate.md` Gate 1:
```markdown
- [x] User confirmed: <timestamp>
- [x] Gate cleared
```

Then return to the `beyond-code` router.

If the user says "just do it" / "proceed" (Autonomous Pipeline):
- Write `spec.md` with status `confirmed`.
- Mark `gate.md` Gate 1 as cleared with timestamp.
- Return to the router immediately to advance to the plan stage.
