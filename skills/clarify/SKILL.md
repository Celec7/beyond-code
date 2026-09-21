---
name: clarify
description: Use when an engineering request has consequential ambiguity in its intended behavior, scope, or constraints, or when requirements conflict.
---

# Clarify

Clarify enough to make the next engineering decision. An already clear request needs no interview.

Read the conversation and inspect relevant implementation first. Reuse settled answers. Facts available in the code are yours to investigate; product intent and consequential tradeoffs belong with the user.

Follow the request through these questions, skipping what is already clear:

- **Problem:** who encounters what difficulty, in which situation?
- **Outcome:** what observable result would resolve it?
- **Flow:** what happens from the initiating action to completion?
- **Bounds:** what must remain true, and what is outside this change?
- **Tradeoffs:** which requirements compete and need a choice?

Use a concrete scenario to test abstract words. “Export the filtered results” may leave one important question: the current page or every matching result? Ask that question instead of reopening the entire feature.

Prioritize the gap that changes later decisions. Ask dependent questions after their prerequisites are settled; combine independent small questions when useful. Offer genuine alternatives and a grounded recommendation, leaving room for a different answer. Do not enumerate edge cases that cannot affect the next decision.

Distinguish agreed requirements from assumptions. State a reasonable assumption for a low-impact, reversible detail; resolve choices that materially change behavior, cost, compatibility, or scope. Silence does not confirm a consequential guess.

When the core scenario, expected behavior, and important bounds are clear, return a short current understanding. Leave implementation details to implementation. Discovery may instead lead to investigation, a smaller problem, or deciding not to proceed.

Keep clarification in the conversation by default. A request to discuss stops at discussion. An existing instruction to implement remains valid within its scope; do not add another approval ritual. Revisit alignment when new information changes that scope.
