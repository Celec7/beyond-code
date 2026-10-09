---
name: prose-standard
description: Use when writing, reviewing, trimming, or restoring prose in Markdown, JSDoc, code comments, tests, READMEs, decision records, prompts, diagnostics, or user-visible strings, and when deciding what each of those surfaces must state.
---

# Prose Standard

This skill is guidance, not a script. A contract is an obligation, invariant, precondition, postcondition, or compatibility promise that a caller, callee, implementer, producer, or consumer relies on. Write enough to preserve the contract, then remove reasoning transcripts, repetition, and decoration.

## When not to use

- Prose that takes the authoring session's vantage, such as dead citations, change narration, or review vantage. Use [trim-reasoning-leakage](../trim-reasoning-leakage/SKILL.md).
- Where documentation lives, its structure, and its audience. Use [canonical-docs](../canonical-docs/SKILL.md).
- Commit message shape or type. Use [conventional-commit](../conventional-commit/SKILL.md).
- A code or behavior defect. Prose cannot fix it.

## Inputs and authorization

- **Required:** an explicit scope of files, surfaces, or a diff. If it is missing, report it and stop.
- **Mode:** `automatic` (default) applies clear edits; `interactive` asks before rewriting. Enter interactive only when the user asks.
- **Authorization:** a review or audit is read-only. Edit only when the task asks for a fix or a trim. Treat generated catalogs, snapshots, and fixtures as derivatives: fix the owner, then regenerate.
- Exclude vendored code and frozen records. If the scope contains only excluded paths, report that nothing qualifies.

## Method

### Preserve the complete proposition

Before editing, identify every proposition in the passage. Preserve each relevant actor, action, condition, timing, modality (must, may, never), negative guarantee, exception, ownership, side effect, failure, and consequence. Remove adjectives, repetition, and narration only when every factual clause survives and the result is clearer. A smaller word count is not an improvement by itself. Prefer concrete active prose and ordinary punctuation; this suite does not use em dashes.

### What each surface owes

- **Public JSDoc:** caller-visible return distinctions, throws or rejections, side effects, ownership, timing, cancellation, and durability.
- **Internal comments:** non-local invariants, race ordering, ownership, security boundaries, and surprising failure behavior. Delete code restatement.
- **Module comments:** role, dependencies, responsibilities, and non-obvious architecture choices, linked to their owner.
- **Tests:** only non-obvious design, such as why a fixture, assertion, or indirect observation is needed. Delete walkthroughs.
- **READMEs:** the consumer contract: configuration, semantics, failures, limitations, extension points, and model-visible effects.
- **Decision records:** unique rationale, alternatives, consequences, and verification evidence.
- **Prompts and visible strings:** wording is behavior. Follow the owning localization and snapshot rules.
- **Diagnostics:** name the failing subject, the violated rule, and the correction when non-obvious.

### One owner per explanation

Keep a complete local contract at the point of use. Link architecture, rationale, algorithms, history, and extended examples to their owner. Edit the owner before its derivatives, then regenerate.

### Do not trim away an obligation

Keep non-obvious rationale when omitting it could cause misuse. Preserve modality, negation, and measured bounds. For paired bilingual prose, update the counterpart minimally and re-record the pair.

## Validate and report

- Re-read the full diff for propositions that were dropped, weakened, or added.
- Run the checks for touched surfaces, such as documentation, snapshot, or translation-pairing gates.
- Report the scope inspected, clear changes, deliberate keeps, deferred cases, and checks run.

## References

- [Worked examples](references/examples.md)
