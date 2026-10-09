# Hypothesis and reproduction

A method for the investigation steps in [SKILL.md](../SKILL.md#method).

## Build the smallest faithful reproduction

Reduce the failing case without removing the timing, scale, configuration, or environment that causes it. A reproduction that no longer fails is not a reproduction; one that fails for a different reason is a new bug.

Prefer a fast, repeatable observation that catches the user's exact symptom. Record the input, the expected result, the actual result, and the conditions that trigger it.

## Put hypotheses in a table

For each plausible cause, name an observation that would support it and one that would contradict it.

| Hypothesis | Supporting observation | Contradicting observation |
| --- | --- | --- |
| The producer writes a stale value | A read immediately after the write returns the old value | A fresh read returns the new value |
| The consumer misreads a valid value | Logging the raw input shows the expected bytes | The raw input differs from the contract |

Change one meaningful factor at a time. Target instrumentation at the distinction between two hypotheses, not at "everything".

## When reproduction is unavailable

Inspect existing traces, logs, and successful versus failing paths. State the evidence limit. Identify the next discriminating observation and who can obtain it. Do not invent certainty, and do not abandon a useful investigation solely because a local reproduction is missing.

## After a failed attempt

Update the explanation before adding another patch. Narrow the case, compare the passing and failing paths, or reconsider the expected behavior. A second patch on an unchanged explanation is guessing.
