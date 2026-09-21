---
name: debug
description: Use when behavior is wrong, a failure has an unclear cause, a defect recurs, or attempted fixes accumulate without a convincing explanation.
---

# Debug

Make each investigation reduce uncertainty. A patch that changes the symptom without explaining it is not yet a diagnosis.

Establish the input, expected result, actual result, and triggering conditions. Requirements and valid decisions define intent; an existing assertion can be wrong. Build the smallest useful reproduction without removing the timing, scale, configuration, or environment that causes the failure.

Prefer a fast, repeatable observation that catches the user's exact symptom. If reproduction is unavailable, inspect existing traces and successful versus failing paths, state the evidence limit, and identify the next discriminating observation. Do not invent certainty or abandon useful investigation solely because a local reproduction is missing.

## Find the broken promise

Trace where observed behavior first diverges from the contract:

- A producer breaks its promise: repair the producer.
- A consumer misreads an honest promise: repair the consumer.
- External input enters unchecked: validate at the entry boundary.
- Absence or failure is legitimate: establish the intended recovery behavior.

The crash site is not necessarily the defect, and “root cause” does not always mean “further upstream.”

## Distinguish explanations

For each plausible cause, name an observation that would support or contradict it. Change one meaningful factor at a time. Target instrumentation at the distinction between hypotheses; avoid logging everything. Redact secrets in captured evidence.

After a failed attempt, update the explanation before adding another patch. Narrow the case, compare paths, or reconsider the expected behavior when progress stalls. For slowness, measure a representative baseline and profile the suspected work before optimizing.

## Repair and verify

When repair is authorized, make the smallest change that explains and removes the failure mechanism. Defaults, retries, and degradation need contractual justification; silent success after an unexpected error does not handle it. A change to agreed behavior or compatibility requires renewed alignment.

Rerun the original case and relevant adjacent checks. A regression test must catch the defect, not merely execute new lines. Repeated success alone does not prove an intermittent cause removed. Remove task-owned instrumentation and disposable experiments.

Return the supported cause, repair and evidence, or the unresolved limit and next useful observation. Diagnosis-only work ends with findings. Persist durable rationale only when needed, not a debugging transcript.
