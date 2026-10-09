---
name: decision-records
description: Use when lasting engineering rationale needs recording, an existing decision changes, or related proposals and decisions need lifecycle maintenance.
---

# Decision Records

This skill is guidance, not a script. Preserve reasons a future maintainer cannot reliably recover from code. Local mechanical changes and ordinary discussions do not automatically need a record.

## When not to use

- Temporary task state, plans, or investigation logs. Use [plan](../plan/SKILL.md) or the conversation.
- The current explanation of a system. Use [canonical-docs](../canonical-docs/SKILL.md).
- Wording of the record. Use [prose-standard](../prose-standard/SKILL.md).

## Inputs and authorization

- **Required:** the problem, the choice, and the alternatives actually considered. Never invent alternatives to fill a template.
- **Authorization:** recording a status records reality; it grants no implementation permission.

## Method

Search for an existing owner first. Follow the project's rules for amending or superseding it; do not create a new file per session. Record the problem, choice, meaningful constraints, real alternatives, consequences, and verification or evidence gaps that still affect judgment. Include conditions for reconsideration when useful.

### Place the record

Follow an existing, active ADR or RFC convention, including its amendment, retention, and immutability rules. Where the project has no rule, use `docs/agents/notes/<status>/YYYY-MM-DD-topic.md`, dated when first proposed, with status in the path: `proposed`, `implemented`, `rejected`, or `archived`. Avoid a dot-directory: some agents cannot write one, and search tools skip it. Create only needed directories, with no central index, category tree, or sidecar requirement. If the project cannot write this path, report that and use its documented alternative rather than failing silently.

### Maintain and retire

On implementation, replace the proposal with what actually shipped, and do not mark a partly delivered proposal complete. When a status transition moves a record, repair inbound links in the same change. Keep partially superseded records current and cross-linked; consolidate a fully superseded record only after preserving its unique rationale in the new owner. Reversing a decision needs a new record that names the old one. Archive a complete implemented record whose reasons no longer guide work; reject an obsolete proposal; delete a rejection that no longer prevents a plausible mistake. Age and word count are not retention criteria.

Details and the status table: [the decision lifecycle](references/lifecycle.md).

## Validate and report

- Report the record added or changed, its status, and the supersession you checked.
- Repair inbound links on any move; never refresh a frozen archive.
- Maintain related records within the current task; a corpus-wide cleanup needs its own scope. No new record is often the right outcome.
