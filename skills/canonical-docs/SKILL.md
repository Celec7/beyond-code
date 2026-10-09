---
name: canonical-docs
description: Use when writing or reviewing maintained engineering documentation, choosing its location, or resolving drift between documentation and implementation.
---

# Canonical Docs

This skill is guidance, not a script. Give useful explanations a clear owner. Code is the source of truth for actual behavior; requirements and valid decisions define intended behavior. Tests are evidence, not infallible authority. A discrepancy may be stale prose or a defect: determine which before changing the explanation.

## When not to use

- The sentence-level contract of a passage. Use [prose-standard](../prose-standard/SKILL.md).
- Prose that takes the authoring session's vantage. Use [trim-reasoning-leakage](../trim-reasoning-leakage/SKILL.md).
- The rationale for a design decision. Use [decision-records](../decision-records/SKILL.md).

## Inputs and authorization

- **Required:** the reader and the judgment or operation the text helps them perform.
- **Authorization:** a scoped edit does not authorize restructuring the whole corpus. Establish a new documentation structure only after the user chooses among options.

## Method

Keep local mechanics beside code, module contracts with their module, and cross-module relationships at the system level. Higher pages explain purpose and guide readers to detail. Decision records own why a design was chosen; ordinary documentation owns the current explanation, not the decision history.

### Place before writing

Identify the reader and the judgment or operation the text helps them perform. Extend an existing owner before adding a page. Avoid hand-copying fields, call sequences, and inventories that source or a generator already provides.

Follow the project's documentation structure. If none exists and the task needs one, offer a few proportionate options, explain their costs, and recommend one. Establish it after the user chooses. Useful options include:

- A root README and nearby explanations for a small project.
- A root navigation page, module READMEs for local contracts, and `docs/` for cross-module material.
- System explanations, subsystem references, task guides, and incident records for a larger documentation corpus.

An optional [tier preset](references/documentation-tiers.md) maps each documentation role to a home and states what does not belong, for repositories that want a ready-made taxonomy.

Create only needed pages. These are reference patterns, not a required tree.

### Preserve the proposition

Use [prose-standard](../prose-standard/SKILL.md) for the sentence-level contract and [trim-reasoning-leakage](../trim-reasoning-leakage/SKILL.md) for reasoning leakage. A tutorial follows prerequisites to an observable outcome; a reference supports lookup. Do not bury either in the other's detail.

### Incident records

Own the postmortem tier: a backward-looking record of a defect that reached a user, a merged change, or a release. Write one when the defect is subtle, systemic, and costly to rediscover, and link the guardrails it motivated. [incident records](references/incident-records.md) owns the trigger criteria and the required shape.

### Verify and maintain

Check behavior claims against current implementation, and run documented operations when feasible and authorized, especially configuration, migration, and recovery instructions. State verification limits rather than claiming an unobserved result. Never document a known defect as intended behavior merely to reconcile text with code.

Update the owner when related behavior changes, then update derivatives and affected links. Follow existing translation and generation rules; do not invent a parallel synchronization system. Keep temporary task state out of formal explanations.

## Validate and report

- Run the relevant documentation checks and inspect the final text for accuracy.
- Report verification limits, deliberate keeps, and any drift you did not resolve.
- Confirm that every changed claim still has one owner and that derivatives were regenerated.
