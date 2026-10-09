# The decision lifecycle

Details for the status values and transitions named in [SKILL.md](../SKILL.md#maintain-and-retire).

| Status | Meaning |
| --- | --- |
| `proposed` | Undecided or not fully implemented; keep remaining questions and actual progress clear. |
| `implemented` | Shipped and still useful for future judgment; keep realization facts current. |
| `rejected` | Declined, with a reason still useful against a plausible mistake. |
| `archived` | An implemented historical decision, frozen and no longer current authority. |

Status records reality; it grants no implementation permission. Plans, investigation logs, and handoff state are temporary work material, not decision rationale.

## On implementation

Replace the proposal with what actually shipped. Remove completed task lists; retain consequences, constraints, and meaningful verification. Do not mark a partly delivered proposal complete. Update factual realization in place when paths, names, or mechanisms change.

## On a move

Repair inbound links in the same change, and check relative links from the new location. Complete permitted link repairs before freezing an archive; preserve historical references as history rather than rewriting their meaning. An existing immutable archive stays frozen.

## Supersession

Check supersession when writing a replacement. Keep partially valid records current and cross-linked. Consolidate a fully superseded record only after preserving unique rationale, alternatives, consequences, and still-relevant verification in the owner, and repair inbound links before deletion.

## Retirement

Archive an implemented record when its decision is complete and its reasons no longer guide likely work. Freeze it as history; do not refresh its facts or treat it as current guidance. Search active lifecycle directories for current decisions and the archive explicitly for history.

Reject an obsolete proposal rather than archiving it. Delete a rejected record when it no longer prevents a plausible mistake. Age and word count are not retention criteria.

A corpus-wide cleanup needs its own scope. Keep useful reasons and evidence, not private deliberation transcripts. No new record is often the right outcome.
