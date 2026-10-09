---
name: simplify
description: Use when evaluating or removing redundant state, unused abstractions, speculative mechanisms, or leftovers from a removed capability within a defined scope.
---

# Simplify

This skill is guidance, not a script. Prove what complexity earns before removing it. Fewer lines or files do not necessarily mean less work for callers and maintainers.

## When not to use

- Designing a new abstraction rather than removing one. Use [codebase-design](../codebase-design/SKILL.md).
- A behavior or compatibility change. Surface that tradeoff before crossing the authorized bounds.
- A corpus-wide cleanup with no defined scope; that needs its own scope.

## Inputs and authorization

- **Required:** the defined scope and the concrete burden, such as duplicated rules, synchronized copies, or unused machinery.
- **Authorization:** discovery-only work ends with ranked proposals. Remove only when the task authorizes it and the evidence supports it.

## Method

Start with a concrete burden: duplicated rules, synchronized copies of one fact, repeated internal knowledge at call sites, unused extension machinery, or obsolete companions. File length and aesthetic discomfort are clues, not evidence.

### Trace the responsibility

Check production consumers, configuration, dynamic loading, external contracts, persisted data, and migrations. A search miss does not prove absence. Tests may be the only visible consumer of a required public guarantee; they may also preserve obsolete structure. Judge against actual needs and current decisions.

Compare the complete result: implementation, caller code, tests, configuration, dependencies, and documentation. Deleting a wrapper that makes every caller manage transactions and cleanup moves complexity rather than removing it. Combining similar code with many flags may cost more than local duplication. A dependency can reduce owned code while adding deployment and maintenance costs; weigh both.

### Remove the whole obsolete part

When removal is authorized and supported, account for exports, registrations, configuration, dependencies, fixtures, comments, and documentation belonging solely to it. Preserve behavior checks that still matter, even when their old implementation disappears.

Update current explanations at their owner, and use [decision-records](../decision-records/SKILL.md) for related records: preserve unique reasons and distinguish full from partial supersession. Removing one implementation does not erase a surviving compatibility obligation or justify deleting its rationale.

## Validate and report

- Verify the behavior and contracts the change can affect, using focused evidence and required project checks.
- Report supported removals or ranked proposals, deliberate keeps, and remaining consumer uncertainty.
- "This complexity still earns its place" is a valid result; there is no deletion quota.

## References

- [Removal checklist](references/removal-checklist.md)
