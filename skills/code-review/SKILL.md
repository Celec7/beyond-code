---
name: code-review
description: Use for a requested change review or a risk-based review of completed work, including requirements, correctness, hidden failures, and unsupported completion claims.
---

# Code Review

Review the actual behavior and its evidence independently of the author's explanation. Report problems you can locate and explain; do not manufacture findings to fill a report.

Establish the base, target, requirements, and applicable project standards. Include committed, staged, unstaged, and new files as the requested scope requires. Distinguish unrelated existing changes. Read removals, callers, configuration, and tests when they affect the result. If the intended comparison or requirement is materially ambiguous, resolve it; do not invent a specification.

## Keep two judgments distinct

**Requirements:** missing or misread behavior, incomplete scenarios, violated constraints, and unrequested scope.

**Engineering:** concrete failure paths, ownership, cancellation, resource release, concurrency, compatibility, and documented project rules. Design smells are hypotheses to investigate, not automatic violations.

A polished implementation can do the wrong thing. Correct visible output can conceal an unreliable implementation. Preserve both judgments without forcing an empty section for either.

## Challenge the evidence

Trace claimed behavior through real code. Look for unimplemented paths, unexplained constant returns, swallowed unexpected errors, and production branches that exist only to satisfy tests. Judge semantics: a legitimate abstract method or test double is not a stub defect.

Inspect whether tests exercise the changed behavior, whether mocks replace it, and whether assertions, skips, or exclusions hide a regression. Zero selected tests, unavailable environments, and stale output do not establish success.

Reuse applicable evidence. Run the smallest missing check that matters, plus required checks; do not reflexively rerun the entire suite. Report what remains unverified. Check that relevant documentation and decisions have not become misleading.

## Make findings actionable

For each finding, identify its location, triggering condition, consequence, and evidence. Rank by impact and likelihood, not rhetorical force. Distinguish confirmed defects, project-rule violations, and unresolved concerns. Prefer consequential findings over personal style preferences.

Review-only requests produce findings, not edits or remote comments. If repair is already authorized, fix in scope and recheck affected evidence. Independent reviewers are optional, not a prerequisite.

Finish with findings or no findings within the inspected scope, and material evidence gaps. Keep the result in the conversation unless another deliverable was requested. A clean review is not a guarantee beyond that scope or permission to publish.
