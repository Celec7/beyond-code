---
name: error-handling
description: Use when designing or reviewing failures, recovery, retries, background tasks, state guarantees after failure, and user-visible error reports.
---

# Error Handling

This skill is guidance, not a script. Define failures, their owners, and what remains safe after failure.

## When not to use

- Diagnosing a wrong behavior or a failure with an unclear cause. Use [debug](../debug/SKILL.md).
- Test isolation for asynchronous cleanup and teardown. Use [test-reliability](../test-reliability/SKILL.md).
- The wording of a report. Use [prose-standard](../prose-standard/SKILL.md).

## Inputs and authorization

- **Required:** the failure path or operation in scope. If it is missing, report it and stop.
- **Authorization:** a review is read-only. Change behavior only when the task asks for a fix. A behavior or compatibility change needs renewed alignment.

## Method

### Classify the failure

Separate an expected failure from an unexpected defect. Locate the broken promise: producer, consumer, or unchecked external input at a boundary. Expected failures need declared types, stable discriminants, and handling-relevant details; reuse the project's error conventions and preserve causes. Never route handling by parsing messages. Unexpected defects may stay plain errors; containment must never turn them into success.

### Define the owner, containment, and guarantees

For each failure, name the handling owner and the reporting owner. State the guarantees after failure: valid, absent, partial, committed, or unknown effects, and who cleans up. Background work carries the same obligations.

### Catch, recover, or stop

Catching limits exception propagation, not mutation. Only the affected state's owner can establish safe continuation. Otherwise stop dependent work, discard invalid state or instances, or escalate. Logging alone is not recovery.

Retries require safe repetition, cancellation, and an explicit owner. Finite operations need budgets; continuing supervision needs lifecycle ownership and observable degradation. Never claim success, rollback, or safe retry without the guarantee.

### Report visibly

Every final report needs a readable summary, the affected operation, and a safe next action. Localize through the receiving application's mechanism; keep sensitive internals out of user-facing text. An untrusted state or unknown outcome must be visible through the UI or default-enabled accessible logs, naming impact, uncertainty, disposition, and the safe next step. Persistent invalid state needs persistent visibility. A reporting failure needs an independent fallback.

## Validate and report

- Verify the resulting state and the visible outcome, not merely that an exception was caught.
- Add or run the focused regression for the changed failure path.
- Report the owner, the guarantees, and any outcome you could not verify.

## References

- [Anti-patterns and worked cases](references/examples.md)
