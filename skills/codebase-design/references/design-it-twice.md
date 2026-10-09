# Design it twice

A procedure for the "design it twice" step in [SKILL.md](../SKILL.md#design-it-twice-when-the-choice-matters). Use it for a consequential, unsettled design; skip it for settled local choices.

## What to vary

Change one meaningful choice so the alternatives are structurally different, not cosmetic:

- who owns a piece of state (the caller, the module, or a shared owner);
- where the mutation happens (before, during, or after the caller's action);
- the caller's interaction (one call, a staged protocol, or a returned handle);
- failure handling (throw, return a result type, or a retryable state machine).

## Worked comparison

Scenario: "export the current result set to a file".

| Dimension | Design A: caller streams | Design B: module owns the file |
| --- | --- | --- |
| Caller knowledge | must open, write, flush, and close the file | passes a target and receives a count |
| Hidden complexity | none, but every caller repeats it | the module owns atomicity and partial writes |
| Change locality | adds a caller to change the format | one module changes |
| Failure handling | each caller invents its own | one guarantee, a complete file or none |
| Verification | the caller's integration test | a module test with a clear contract |

Design B is the deep module: a small interface carrying atomic write behavior. Choose it when callers repeat the mechanics; keep Design A when callers genuinely need to interleave their own writes.

## How to run it

1. State the representative caller scenario.
2. Sketch both designs on the same scenario, small enough to discard.
3. Compare caller knowledge, hidden complexity, change locality, failure handling, and verification.
4. Choose on the tradeoff, not familiarity with the first idea.
5. Keep the sketches out of production unless the experiment is the authorized work, and clean up owned experimental resources.
