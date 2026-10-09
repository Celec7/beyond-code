---
name: code-review
description: Use for a requested change review or a risk-based review of completed work, including requirements, correctness, hidden failures, and unsupported completion claims.
---

# Code Review

This skill is guidance, not a script. Review the actual behavior and its evidence independently of the author's explanation. Report problems you can locate and explain; do not manufacture findings to fill a report.

## When not to use

- Diagnosing a specific failure with an unclear cause. Use [debug](../debug/SKILL.md).
- Authoring the change rather than reviewing it.
- A pure style preference with no project rule behind it.

## Inputs and authorization

- **Required:** the base, the target, and the requested scope. If the comparison or requirement is materially ambiguous, resolve it; do not invent a specification.
- **Authorization:** a review-only request produces findings, not edits or remote comments. Fix only when repair is already authorized.

## Method

Establish the base, target, requirements, and applicable project standards. Include committed, staged, unstaged, and new files as the requested scope requires. Distinguish unrelated existing changes. Read removals, callers, configuration, and tests when they affect the result.

### Keep two judgments distinct

**Requirements:** missing or misread behavior, incomplete scenarios, violated constraints, and unrequested scope.

**Engineering:** concrete failure paths, ownership, cancellation, resource release, concurrency, compatibility, and documented project rules. Design smells are hypotheses to investigate, not automatic violations.

A polished implementation can do the wrong thing. Correct visible output can conceal an unreliable implementation. Preserve both judgments without forcing an empty section for either.

### Challenge the evidence

Trace claimed behavior through real code. Look for unimplemented paths, unexplained constant returns, swallowed unexpected errors, and production branches that exist only to satisfy tests. Judge semantics: a legitimate abstract method or test double is not a stub defect.

Inspect whether tests exercise the changed behavior, whether mocks replace it, and whether assertions, skips, or exclusions hide a regression. Zero selected tests, unavailable environments, and stale output do not establish success.

Reuse applicable evidence. Run the smallest missing check that matters, plus required checks; do not reflexively rerun the entire suite.

### Make findings actionable

For each finding, identify its location, triggering condition, consequence, and evidence. Rank by impact and likelihood, not rhetorical force. Distinguish confirmed defects, project-rule violations, and unresolved concerns. Prefer consequential findings over personal style preferences.

## Validate and report

- Finish with findings or no findings within the inspected scope, plus material evidence gaps.
- Apply [error-handling](../error-handling/SKILL.md) to changed failure paths and [test-reliability](../test-reliability/SKILL.md) to resource-owning or asynchronous tests.
- Use [prose-standard](../prose-standard/SKILL.md) for added or changed prose and [trim-reasoning-leakage](../trim-reasoning-leakage/SKILL.md) for authoring-session residue.
- Keep the result in the conversation unless another deliverable was requested. A clean review is not a guarantee beyond that scope or permission to publish.
