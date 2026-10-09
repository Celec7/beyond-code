# Slicing

Details for the "slice through behavior" step in [SKILL.md](../SKILL.md#slice-through-behavior).

## Prefer a tracer bullet

A tracer bullet is a narrow path from input to useful result through the necessary layers. "Export existing records in one fixed format" tests the whole path earlier than separate tasks to finish all storage, all APIs, and all UI.

| Horizontal | Tracer bullet |
| --- | --- |
| Finish all storage, then all APIs, then all UI | One record flows storage to UI, then widen |
| Feedback at the end | Feedback on the first slice |
| Integration risk discovered late | Integration risk discovered early |

## Give each slice four things

- Result: the observable outcome it produces.
- Responsibilities: the likely code locations or owners.
- Evidence: how completion will be observed.
- Prerequisites: the genuine dependencies that must exist first.

Do not prescribe every function or freeze an exhaustive file list before investigation supports it.

## Wide migrations

Use expand, migrate, contract. State what remains compatible during the transition and where integration can actually be verified. A preparatory refactor earns a place only when it makes this change easier or safer.

## Ordering

Order by real dependencies and useful feedback. Check that dependencies exist and do not cycle. Independent tasks are not automatically safe to run concurrently: shared writes or unstable interfaces can still require coordination.
