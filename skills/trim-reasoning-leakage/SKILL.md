---
name: trim-reasoning-leakage
description: Use when auditing or fixing prose that reads like a leaked reasoning transcript, such as dead design-session citations, change narration, stack or review vantage, reviewer-addressed justification, control-flow narration, or hedged planning residue in comments, JSDoc, docs, or decision records.
---

# Trim Reasoning Leakage

This skill is guidance, not a script. Reasoning leakage is prose whose vantage is the authoring session rather than the repository: it cites artifacts only that session could see, narrates a change instead of the state, or argues with a reviewer who has left.

## When not to use

- Ordinary wording or contract problems. Use [prose-standard](../prose-standard/SKILL.md) instead.
- Decision records, postmortems, and alternatives-considered sections, which legitimately preserve history and rejected alternatives.
- Frozen records, generated catalogs, snapshots, and fixtures. Fix the owner, then regenerate.
- Deleting a fact because it sounds historical. Resolvability and durability are the tests, not tone.

## Inputs and authorization

- **Required:** an explicit scope (paths, surfaces, or a diff). If missing, report it and stop; do not assume repository-wide.
- **Authorization:** an audit is read-only. Edit only when the task asks for a fix. Fixing a citation never authorizes changing the behavior it describes.

## Method

### The one test

For every suspect passage ask: could a reader at HEAD, with no session transcript, PR thread, or uncommitted draft, resolve every reference and verify every claim? If not, restate the surviving facts from the repository's vantage and delete the transcript around them. A dead citation rarely carries zero propositions: delete clauses, not sentences, when propositions share a line, and delete the passage only when no factual clause remains.

### Taxonomy

Name the class before fixing it: dead design-session citations, stack or PR vantage, change narration and version stamps, review choreography, reviewer-addressed justification, restatement and derivation transcripts, hedges and planning residue, and authoring-language slips. [examples](references/examples.md) works one case per class.

### What is not leakage

Do not delete these; they resolve at HEAD or state a needed fact.

- Issue references and `TODO(name)` markers.
- Merged-PR citations inside decision records and postmortems.
- Suppression justifications such as lint-disable reasons.
- Present-tense counterfactual regression pins ("without X, Y happens").
- Measured bounds, including the word "measured".
- Runtime old/new handover states, which name live objects, not repository history.
- External standards and committed documents that own their section numbering.

### Overcorrection traps

The common failure is not leftover leakage; it is deleting a durable fact with the transcript around it. Before deleting, enumerate the propositions and check that you are not flipping an obligation into an endorsement, promoting a hypothetical to a shipped feature, deleting a true fact, or dropping a measurement's source. [examples](references/examples.md) calibrates each.

### Fix at the owner

Generated catalogs, snapshots, and fixtures are derivatives: fix the source template, then regenerate. For paired prose, update the counterpart minimally and re-record the pair.

## Validate and report

- Re-run the probes in [recall batteries](references/recall-batteries.md); expect only sanctioned keeps and this skill's own quoted evidence.
- Confirm every remaining citation resolves at HEAD.
- Report the scope inspected, passages fixed or kept, deliberate keeps, and unverified cases.

## References

- [Worked examples](references/examples.md)
- [Recall batteries](references/recall-batteries.md)
