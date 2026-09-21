---
name: canonical-docs
description: Use when writing or reviewing maintained engineering documentation, choosing its location, or resolving drift between documentation and implementation.
---

# Canonical Docs

Give useful explanations a clear owner. Code is the source of truth for actual behavior; requirements and valid decisions define intended behavior. Tests are evidence, not infallible authority. A discrepancy may be stale prose or a defect: determine which before changing the explanation.

## Place before writing

Identify the reader and the judgment or operation the text helps them perform. Extend an existing owner before adding a page. Avoid hand-copying fields, call sequences, and inventories that source or a generator already provides.

Follow the project's documentation structure. If none exists and the task needs one, offer a few proportionate options, explain their costs, and recommend one. Establish it after the user chooses. Useful options include:

- A root README and nearby explanations for a small project.
- A root navigation page, module READMEs for local contracts, and `docs/` for cross-module material.
- System explanations, subsystem references, task guides, and incident records for a larger documentation corpus.

Create only needed pages. These are reference patterns, not a required tree.

Keep local mechanics beside code, module contracts with their module, and cross-module relationships at the system level. Higher pages explain purpose and guide readers to detail. Decision records own why a design was chosen; ordinary documentation owns the current explanation, not the decision history.

## Preserve the proposition

State actors, actions, conditions, timing, ownership, failures, exceptions, and compatibility where readers need them. Use concrete active prose and ordinary punctuation, without em dashes. Keep non-obvious causal explanations. Cutting words must not weaken an obligation or remove an ordering guarantee.

Remove code narration, agent self-talk, private deliberation, repeated inventories, and stale plans. A tutorial follows prerequisites toward an observable outcome; a reference supports lookup. Do not bury either in the other's detail.

## Verify and maintain

Check behavior claims against current implementation. Run documented operations when feasible and authorized, especially configuration, migration, and recovery instructions. State verification limits rather than claiming an unobserved result. Never document a known defect as intended behavior merely to reconcile text with code.

Update the owner when related behavior changes, then update derivatives and affected links. Follow existing translation and generation rules; do not invent a parallel synchronization system. Use relevant documentation checks and inspect the final text for accuracy.

Keep temporary task state out of formal explanations. A scoped edit does not authorize restructuring the whole corpus. Finish when the needed explanation is accurate and discoverable; no new document is required when existing code and prose already suffice.
