# Removal checklist

What to account for when removing complexity, for the decisions in [SKILL.md](../SKILL.md).

## Trace the responsibility before deleting

- Production consumers: search exact symbols, property reads and writes, discriminants, config keys, package names, and both `.method(` and `method(` forms.
- Non-source consumers: configuration, dynamic loading, plugin registries, external contracts, persisted data, and migrations. A search miss does not prove absence.
- Tests: they may be the only visible consumer of a required guarantee, or they may preserve obsolete structure.

## Account for everything that belongs to the removed part

Exports, registrations, configuration, dependencies, fixtures, comments, documentation, and generators. Update the owner of each explanation, then regenerate derivatives.

A behavior or compatibility change is a product decision, not an incidental refactor. Surface the tradeoff before crossing the authorized bounds.

## Full versus partial supersession

- Full: every unique proposition of the old owner is preserved in the new owner. Consolidate only then.
- Partial: keep both current and cross-linked. Removing one implementation does not erase a surviving compatibility obligation or justify deleting its rationale.

## Trade-off checks

- Removing a wrapper that makes every caller manage transactions and cleanup moves complexity; it does not remove it.
- Combining similar code behind many flags can cost more than local duplication.
- A dependency can reduce owned code while adding deployment and maintenance costs. Compare the whole removed system, including residual glue.

## A deliberate keep is a valid result

"This complexity still earns its place" is a finding, not a failure. There is no deletion quota.
