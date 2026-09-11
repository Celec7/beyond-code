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
1. Touching files in unrelated modules, domains, or microservices.
2. Altering public API signatures, shared cross-module contracts, or database schemas.
3. Adding a new external library, CLI package, or updating build tooling.
4. Violating an explicit non-goal.

**When a substantive deviation is needed: STOP immediately.** Do not commit. Present what boundary was reached, explain why the change is necessary, and await explicit user confirmation.
