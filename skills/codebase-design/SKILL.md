---
name: codebase-design
description: Use when designing or evaluating module responsibilities, interfaces, state ownership, or abstractions, especially when callers must understand internal mechanics.
---

# Codebase Design

This skill is guidance, not a script. Put complexity in the module responsible for it. Design a small, understandable interface that carries substantial behavior: a **deep module**.

An interface includes everything a caller must know: inputs and results, ordering, configuration, failure, cancellation, ownership, and relevant performance constraints. Few methods do not make an interface simple if callers must reconstruct hidden rules.

## When not to use

- Removing existing complexity with a defined scope. Use [simplify](../simplify/SKILL.md).
- A settled local choice with no material tradeoff.
- Recording a lasting rationale. Use [decision-records](../decision-records/SKILL.md).

## Inputs and authorization

- **Required:** one representative caller behavior and the current code it goes through.
- **Authorization:** design discussion alone does not authorize code changes. An incidental design opportunity does not widen the task.

## Method

### Start with a real caller

Walk one representative behavior through the existing code. Identify who initiates it, who owns each fact, where state changes, and how success and failure return. Propose an interface by showing how a real caller uses it. Resolve unclear business meaning before turning a guessed concept into a type.

Group rules that must remain consistent and responsibilities that change for the same reason. Hide internal steps callers do not need to control. Preserve control they genuinely need, such as composing several writes into one transaction.

### Test the shape

- **Caller knowledge:** can the module take responsibility for ordering, validation, or cleanup currently repeated by callers?
- **Ownership:** does each fact have an owner, or do independently mutable copies need synchronization?
- **Deletion:** if this module disappeared, would its complexity disappear too, or spread back across callers?
- **Variation:** what actually varies across a proposed abstraction? A possible future implementation alone does not justify a framework.
- **Verification:** can the promised behavior be observed through a stable interface? Excessive internal mocking may reveal scattered responsibilities.

Judge these against current consumers and valid project decisions. Similar code can express different concepts; a small adapter can still own an important protocol or compatibility rule.

### Design it twice when the choice matters

Before committing to a consequential, unsettled design, sketch a structurally different alternative. Change a meaningful choice, such as ownership, state, or the caller's interaction. Walk the same real scenario through both and compare caller knowledge, hidden complexity, change locality, failure handling, and verification. Keep the sketches small; skip this for settled local choices. Choose on the tradeoff, not familiarity with the first idea.

## Validate and report

- Stop when responsibilities, important interface behavior, constraints, and material tradeoffs support the next step.
- Report a proportionate explanation or diagram; persist only reasons worth keeping.
- Use a small isolated experiment when discussion cannot settle a critical behavior, and clean up its resources afterward.
