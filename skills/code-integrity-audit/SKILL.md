---
name: code-integrity-audit
description: Adversarial diff audit to catch AI shortcuts, mock stubs, and silent logic degradation before completion. Use before finishing a task, submitting a PR, or verifying implementation completeness.
---

# Code Integrity Audit

Under long sessions or complex tasks, coding agents often degrade silently: leaving stub implementations, swallowing exceptions, faking passing tests, or hardcoding mock returns.

This skill audits `git diff` with adversarial objectivity before changes are accepted.

## Evidence Before Claims

No task is complete on verbal assurance alone.
- Run the actual test, lint, and build commands (`npm test`, `pytest`, `cargo test`, etc.).
- Inspect fresh raw terminal output.
- Never report success without showing command execution evidence.

## The 4-Point Diff Scan

Inspect the newly added lines (the green lines in `git diff <base>...HEAD`):

### 1. Placeholders and Stubs
Search the diff for shortcuts left behind:
- Comments containing `TODO`, `FIXME`, `STUB`, or `temporary`.
- Functions containing `throw new Error("Not implemented")` or empty `{}` bodies.
- Hardcoded test returns inside production logic to make tests pass artificially.

### 2. Deceptive Logic and Swallowed Errors
Verify that error handling is honest:
- Empty `catch` blocks or `catch (e) {}` with no re-throw.
- Functions that silently return empty arrays or null on unexpected failures, hiding underlying defects.
- Hardcoded branches or bypass flags added purely to satisfy a test runner.

### 3. Test Authenticity
Inspect any new or modified tests in the diff:
- Do tests exercise public seams, or do they test internal mock collaborators?
- Are assertions testing real behavior, or are they tautologies (`expect(x).toBe(x)`)?
- Were assertions weakened (e.g. relaxed tolerances, deleted assertions) just to turn a red test green?

### 4. Git Hygiene
Review commit messages and history:
- Messages must read like high-quality commits authored by an expert human engineer (e.g. Conventional Commits).
- Never leak AI process markers, task numbers, prompt references, or scaffolding terms into commit titles or bodies.

## Audit Verdict

Report findings clearly:
- **Integrity Issues**: stubs, faked tests, or swallowed errors that must be resolved before sign-off.
- **Benign Changes**: clean, cohesive refactoring and helper adjustments.
- **Verification Evidence**: raw command results proving tests and builds pass.
