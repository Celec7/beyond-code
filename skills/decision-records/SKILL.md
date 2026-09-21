---
name: decision-records
description: Use when lasting engineering rationale needs recording, an existing decision changes, or related proposals and decisions need lifecycle maintenance.
---

# Decision Records

Preserve reasons a future maintainer cannot reliably recover from code. Local mechanical changes and ordinary discussions do not automatically need a record.

Search for an existing owner first. Follow the project's rules for amending or superseding it; do not create a new file per session. Record the problem, choice, meaningful constraints, real alternatives, consequences, and verification or evidence gaps that still affect judgment. Include conditions for reconsideration when useful. Never invent alternatives to fill a template.

## Place the record

Follow an existing, active ADR or RFC convention, including its amendment, retention, and immutability rules. The layout and lifecycle below are defaults where the project has no corresponding rule; they do not authorize rewriting immutable records or deleting required history.

By default, use `.agents/notes/<status>/YYYY-MM-DD-topic.md`, dated when first proposed. Create only needed directories, with no central index, category tree, or sidecar requirement. Let the path carry status. Use a clear title and headings suited to the decision rather than a mandatory form.

| Status | Meaning |
| --- | --- |
| `proposed` | Undecided or not fully implemented; keep remaining questions and actual progress clear. |
| `implemented` | Shipped and still useful for future judgment; keep realization facts current. |
| `rejected` | Declined, with a reason still useful against a plausible mistake. |
| `archived` | An implemented historical decision, frozen and no longer current authority. |

Status records reality; it grants no implementation permission. Plans, investigation logs, and handoff state are temporary work material, not decision rationale.

## Maintain the decision

On implementation, replace the proposal with what actually shipped. Remove completed task lists; retain consequences, constraints, and meaningful verification. Do not mark a partly delivered proposal complete.

When a status transition moves a record, repair inbound links in the same change and check relative links from its new location. Complete permitted link repairs before freezing an archive; preserve historical references as history rather than rewriting their meaning. An existing immutable archive stays frozen.

Update factual realization in place when paths, names, or mechanisms change. Reversing the decision or its rationale needs a new record and an explicit relationship to the old one.

When writing a replacement, check supersession now. Keep partially valid records current and cross-linked. Consolidate fully superseded records only after preserving unique rationale, alternatives, consequences, and still-relevant verification in the owner; repair inbound links before deletion.

## Retire by future value

Archive an implemented record when its decision is complete and its reasons no longer guide likely work. Freeze it as history; do not refresh its facts or treat it as current guidance. Search active lifecycle directories for current decisions and the archive explicitly for history.

Reject an obsolete proposal rather than archiving it. Delete a rejected record when it no longer prevents a plausible mistake. Age and word count are not retention criteria.

Maintain related records within the current task. A corpus-wide cleanup needs its own scope. Keep useful reasons and evidence, not private deliberation transcripts. No new record is often the right outcome.
