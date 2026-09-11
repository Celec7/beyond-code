---
name: implementation-bounds
description: Use before code lands, when declaring target files and touched interfaces, or when stopping the moment an edit leaves that scope.
---

# Implementation Bounds

Unbounded agents easily drift: touching unrelated files, adding unneeded dependencies, and quietly breaking public contracts. This skill establishes tight operational boundaries and a strict stop-the-line rule.

## Pre-flight: Declare the Target Scope

Before modifying code, declare:
- **Target Files**: the primary files to create or modify (ideally 1 to 5 files per slice).
- **Touched Interfaces**: which exported signatures, endpoints, or schemas will change.

## Deviation Rules

### Minor Deviation (Proceed Autonomously)
Cohesive cascading edits that directly support the target task and preserve external contracts:
- Updating accompanying unit tests for the modified functions.
- Re-exporting new symbols in a local barrel `index.ts`.
- Extracting private helpers or refining local types within the module.
Proceed with these changes without interrupting the user.

### Substantive Deviation (STOP Immediately)
Any action that crosses architectural boundaries or expands scope:
- Touching files in unrelated modules, domains, or microservices.
- Altering public API signatures, shared cross-module contracts, or database schemas.
- Adding a dependency that is not already in the manifest, or changing build tooling.
- Violating an explicit non-goal.

**STOP.** Make no further edits and commit nothing. Report which boundary the work reached, why the change is necessary, and wait for explicit confirmation.

Two cases are narrow enough to keep going, and both still require stating the change in your reply:
- Adding a symbol to a module you are already editing, when no existing signature changes.
- Deleting or renaming an internal helper that has no callers outside the module.

Anything wider than those two is a substantive deviation, however small the diff looks. Treat the list as a floor, not a ceiling: an edit that satisfies the letter of one bullet while the developer would still be surprised is a substantive deviation.
