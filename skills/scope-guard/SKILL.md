---
name: scope-guard
description: Use when fixing the requirements, deciding what a change deliberately leaves out, or testing whether the ask is broader than the change it should produce.
---

# Scope Guard

Agents naturally suffer from two failure modes: expanding scope into speculative generality, and badgering humans with endless trivial questions.

This skill carves out the negative space and enforces high-signal communication.

## 1. Carve the Negative Space (Explicit Non-Goals)

Before planning or implementing any non-trivial work, state 2 to 4 **Explicit Non-Goals** in your reply to the developer:
- What are we deliberately NOT building in this change?
- Which edge cases, platforms, or feature variations are explicitly deferred?
- Which existing modules, tables, or APIs must remain untouched?

Non-Goals protect both the context budget and the codebase. Anything falling into a Non-Goal is out of bounds by definition.

## 2. High-Leverage Alignment

When clarifying scope and design:

- **Surface meaningful technical choices**: Ask about important implementation decisions (such as data structure tradeoffs, key naming conventions, or library choices) when they affect architecture or maintainability. Avoid trivial questions that the codebase already answers.
- **Provide context and options**: When asking for guidance, present concrete alternatives with brief tradeoffs and your recommendation, making it easy for the developer to decide.
- **Keep the developer in control of pacing**: Agreement on an idea or approach is not a mandate to immediately start modifying files. Present the proposed steps clearly and let the developer direct the next action.
