---
name: root-cause-debugging
description: Use when a test fails, code throws, a result is wrong, or a bug keeps recurring, and especially when the obvious fix is a null check, a fallback default, or an empty catch.
---

# Root-Cause Debugging

When code fails, agents naturally reach for symptom-masking band-aids down at the crash site: adding ad-hoc null checks, optional chaining `?.`, fallback defaults, or empty catch blocks. This masks defects, corrupts contracts, and leaves technical debt behind.

This skill is the protocol for finding and fixing the real defect at its source.

## The 3-Step Protocol

### 1. Contract Alignment
Before editing code, compare the producer and the consumer against the contract they share:
- **Did the producer break its contract?** (e.g. promised an object, emitted null or malformed data).
- **Or did the consumer misread the contract?** (e.g. accessed `item.uuid` when the interface defines `item.id`).
Decide which side of the boundary is wrong based on system types and documented contracts.

A consumer is only a band-aid when its patch hides a producer that broke its contract. When the producer honors an honest contract and the consumer misread it, fixing the consumer is the fix, not a band-aid. Name which case you are in before editing.

### 2. Trace Upstream (Read-Only)
If the producer emitted invalid state, stop editing and trace backward along the call chain:
- Where was the bad state or malformed payload introduced?
- Inspect the upstream origin: why did it create or forward this state?
- Do not make downstream edits until you locate the exact origin of the invalid state.

### 3. Fix at the Source
Apply the fix where the bad data was created, not where it caused a crash:
- **Internal systems**: Fix the defect at the root producer. Keep downstream consumers strict.
- **External boundaries (I/O, third-party APIs, user input)**: Validate, sanitize, and fail fast at the boundary (adapter, gateway, or validation layer). Never let unvalidated external shapes leak deep into domain logic to be patched by ad-hoc null checks later.
- If fixing at the source requires altering a public API or breaking an agreed contract, treat it as a substantive deviation and confirm with the user before proceeding.

## Anti-patterns (Strictly Prohibited)

- **The Band-Aid Null Check**: Adding `if (!x) return` or `x?.y` in consumer logic when `x` is contractually required to exist.
- **The Swallowed Error**: Wrapping failing logic in `try { ... } catch {}` or logging without re-throwing to force a test to pass.
- **The Speculative Default**: Silently replacing missing data with `|| ""` or `?? {}` deep in business logic instead of investigating why it was missing.
- **Downstream Patch Sprawl**: Editing five call sites to accommodate bad data when one producer returned the wrong shape.
