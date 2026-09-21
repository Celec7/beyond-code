---
name: tdd
description: Use for requested test-first development, reproducible regression fixes, or behavior changes with a clear interface and testable result.
---

# Test-Driven Development

Build one behavior at a time: **red, green, refactor**. Use the authorized outcome and existing interfaces; TDD does not expand the task or apply to every kind of edit.

## Red

Choose one caller-visible result and write the smallest test that can detect its absence. Test through a stable interface. Assert on internal calls only when those calls carry a real contract, such as limiting billable requests.

Run the test. Confirm it fails for the intended missing or incorrect behavior, not an import error or broken fixture. If it already passes, investigate whether the behavior exists or the test misses it. Do not manufacture a failure by changing an expected value arbitrarily.

Expected results need an independent basis: the requirement, a worked example, or known-good data. Reimplementing the production calculation in an assertion can reproduce the same mistake.

## Green

Implement only the current behavior, then run the same test. Minimal implementation still fulfills a real contract; production test bypasses, unexplained hardcoded results, and swallowed failures do not qualify.

Use test doubles to control external dependencies without replacing the behavior being proved. To test retry behavior, control the service responses and exercise the real retry logic.

## Refactor

With behavior green, improve names, remove relevant duplication, and clarify responsibilities within scope. Keep the behavior passing. Tests that break on a behavior-preserving refactor may be coupled to internals; repair that coupling without weakening their guarantee.

Repeat vertically. Writing a large batch of tests before any implementation fixes untested design assumptions into the suite and delays feedback.

Run focused checks during the loop, required project checks, and broader checks when affected shared behavior warrants them. Read selected test counts and actual output; a successful command with no relevant tests proves little. Reuse evidence only while its code and inputs remain applicable.

Finish when the requested behaviors and affected contracts have credible evidence. Report meaningful coverage and gaps, not a cycle-by-cycle diary. If the original failure could not be observed, say so rather than claiming a completed red-green cycle. Keep disposable test outputs out of permanent project documentation.
