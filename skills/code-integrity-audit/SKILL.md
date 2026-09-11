---
name: code-integrity-audit
description: Use when a change is ready to commit, or a task looks complete, to inspect the diff for stubs, swallowed errors, weakened tests, and mock returns that were never real.
---

# Code Integrity Audit

Under long sessions or complex tasks, coding agents often degrade silently: leaving stub implementations, swallowing exceptions, faking passing tests, or hardcoding mock returns.

This skill audits `git diff` with adversarial objectivity before changes are accepted.

## Evidence Before Claims

A completion claim carries the command output that produced it.
- Run the repository's real test, lint, and build commands (`npm test`, `pytest`, `cargo test`, and whatever CI runs).
- Read the fresh terminal output, failures included.
- State which command supports each claim.

## The 4-Point Diff Scan

Inspect every added line in the change under review. That means committed and uncommitted work:

```
git diff <base>...HEAD     # committed on this branch
git diff HEAD              # uncommitted, scan this too
```

`<base>` is the branch, tag, or commit the developer named. When none was named, use the merge-base with the repository's default branch. When the repository has a single commit or no base to name, `git diff HEAD` and `git status --short` cover the work. An agent's shortcuts usually sit in the uncommitted diff, so a scan that only reads commits misses the most common case.

### 1. Placeholders and Stubs
Search the diff for shortcuts left behind:
- Comments containing `TODO`, `FIXME`, `STUB`, or `temporary`.
- Functions whose entire body is a throw, a bare `return`, or a bare `pass`, where the caller expects a value.
- Return values nobody computes, such as an empty object literal standing in for a result.
- Hardcoded test returns inside production logic to make tests pass artificially.

### 2. Deceptive Logic and Swallowed Errors
Verify that error handling is honest:
- A `catch` or `except` block that neither re-throws nor handles, including the named form (`catch (e) {}`).
- Functions that silently return an empty array or null on an unexpected failure, hiding the defect.
- Branches or bypass flags added purely to satisfy a test runner.

### 3. Test Authenticity
Inspect any new or modified tests in the diff:
- Do tests exercise public seams, or do they test internal mock collaborators?
- Are assertions testing real behavior, or are they tautologies (`expect(x).toBe(x)`)?
- Were assertions weakened (e.g. relaxed tolerances, deleted assertions) just to turn a red test green?

### 4. Git Hygiene
Review commit messages and history:
- Match the repository's existing commit convention. When it has none, use Conventional Commits.
- Keep a message to what the change does and why. Task numbers, prompt text, and scaffolding terms belong in the conversation, not in the permanent history.

## Audit Verdict

Any hit in points 1 through 3 is an integrity issue. Fix it, then re-run the scan. The task stays incomplete while one is open.

Report in this order, with every category present:
- **Integrity Issues**: each hit with its file, line, and the rule it breaks. Write `none found` when there are none.
- **Benign Changes**: changes you can justify as safe in one line each. Omit the category when the diff is clean.
- **Verification Evidence**: the raw output, one block per command, copied from the terminal.
