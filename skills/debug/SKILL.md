---
name: debug
description: Use when behavior is wrong, a failure has an unclear cause, a defect recurs, or attempted fixes accumulate without a convincing explanation.
---

# Debug

This skill is guidance, not a script. Make each investigation reduce uncertainty. A patch that changes the symptom without explaining it is not yet a diagnosis.

## When not to use

- Designing the failure behavior itself, rather than explaining an observed wrong behavior. Use [error-handling](../error-handling/SKILL.md).
- A test that passes or fails inconsistently with no product symptom. Use [test-reliability](../test-reliability/SKILL.md).
- A behavior that is merely undesired but correct. That is a change request, not a defect.

## Inputs and authorization

- **Required:** the input, expected result, actual result, and the conditions that trigger the failure.
- **Authorization:** diagnosis-only work ends with findings. Apply a repair only when the task authorizes it, and renew alignment before changing agreed behavior or compatibility.

## Method

Establish the input, expected, actual, and triggering conditions without removing the timing, scale, configuration, or environment that causes the failure. Prefer a fast, repeatable observation that catches the user's exact symptom. If reproduction is unavailable, inspect existing traces and successful versus failing paths, state the evidence limit, and identify the next discriminating observation.

### Find the broken promise

Trace where observed behavior first diverges from the contract:

- A producer breaks its promise: repair the producer.
- A consumer misreads an honest promise: repair the consumer.
- External input enters unchecked: validate at the entry boundary.
- Absence or failure is legitimate: establish the intended recovery behavior.

The crash site is not necessarily the defect, and "root cause" does not always mean "further upstream."

### Distinguish explanations

For each plausible cause, name an observation that would support or contradict it. Change one meaningful factor at a time. Target instrumentation at the distinction between hypotheses; avoid logging everything. Redact secrets in captured evidence.

After a failed attempt, update the explanation before adding another patch. Narrow the case, compare paths, or reconsider the expected behavior when progress stalls. For slowness, measure a representative baseline and profile the suspected work before optimizing.

### Repair and verify

When repair is authorized, make the smallest change that explains and removes the failure mechanism. Defaults, retries, and degradation need contractual justification; silent success after an unexpected error does not handle it. Run the original case and relevant adjacent checks. A regression test must catch the defect, not merely execute new lines. Repeated success alone does not prove an intermittent cause removed. Remove task-owned instrumentation and disposable experiments.

## Validate and report

- Return the supported cause and repair with evidence, or the unresolved limit and next useful observation.
- Persist durable rationale only when needed, not a debugging transcript.
- Report what could not be verified rather than claiming certainty.

## References

- [Hypothesis and reproduction](references/hypothesis-and-repro.md)
- [Anti-patterns and worked cases](../error-handling/references/examples.md)
