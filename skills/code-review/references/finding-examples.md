# Finding examples

Calibration for the review decisions in [SKILL.md](../SKILL.md). A finding is a located, explained problem, not an impression.

## Anatomy of a usable finding

State the location, the triggering condition, the consequence, and the evidence.

| Weak | Strong |
| --- | --- |
| "Error handling could be better." | "`save()` swallows `EACCES` and resolves, so the caller cannot tell whether the write committed; the catch at line 12 logs and returns." |
| "This looks racy." | "Two awaits run between the read and the write with no lock, so a concurrent `delete()` can commit between them; reproduce by calling both without awaiting." |
| "Consider extracting a module." | "The same retry-and-classify logic appears in three callers; a shared helper would own the policy and remove three copies." |

## Requirements versus engineering

Keep two judgments separate. A polished implementation can do the wrong thing (requirements), and correct output can conceal an unreliable implementation (engineering).

- Requirements: missing or misread behavior, incomplete scenarios, violated constraints, unrequested scope.
- Engineering: failure paths, ownership, cancellation, resource release, concurrency, compatibility, project rules.

## Challenge the evidence

- Trace claimed behavior through real code; an explanation is not evidence.
- Look for unimplemented paths, unexplained constant returns, swallowed unexpected errors, and branches that exist only to satisfy tests.
- Check whether tests exercise the changed behavior or a mock replaces it. Zero selected tests, an unavailable environment, and stale output do not establish success.
- A green gate covers only what it asserts; it is not a guarantee beyond the inspected scope.

## Reporting

- Rank by impact and likelihood, not rhetorical force.
- Separate blockers from suggestions, and omit issues a green gate already enforces.
- Place a localized defect on the tightest relevant range; use a summary comment for cross-cutting architecture or scope.
- A review-only request produces findings, not edits or remote comments.
