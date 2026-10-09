---
name: retro
description: Use when the user asks to review a real work session for concrete improvements.
disable-model-invocation: true
---

# Retrospective

This skill is guidance, not a script. Learn from the work that happened. Run a retrospective only when requested; finishing a task does not invite an automatic review of the user's process.

## When not to use

- Diagnosing a specific defect. Use [debug](../debug/SKILL.md).
- A request to change skills or project policy directly; a retrospective first produces suggestions, not edits.
- A session so short that no method had room to matter.

## Inputs and authorization

- **Required:** the task or period under discussion, and the primary evidence available.
- **Authorization:** this mode is user-invoked. A retrospective does not automatically authorize edits to skills, project policy, or tooling.

## Method

### Reconstruct from primary evidence

Establish the task or period under discussion. Read available primary evidence: the request, conversation, changes, and check results. Keep only events that explain the outcome. Separate an observed event from an interpretation of its cause; missing evidence stays missing.

### Judge choices in their time

Judge choices using information available at the time. Ask what was known, which assumption went untested, which feedback arrived late, and what affordable action could have revealed the problem sooner. A reasonable decision can have a bad outcome; a weak process can get lucky.

### Look for leverage

Look for leverage in the work: wasted investigation, recurring misunderstanding, delayed integration, unreliable evidence, unclear ownership, missing information, or instructions that did not change behavior. Inspect existing practices before proposing another rule. Preserve methods that worked as well as identifying failures.

### Choose a few concrete improvements

"Do X before Y" can alter the next task; "consider compatibility more carefully" cannot. Name the situation, action, and intended effect. Do not attach an action to every observation or manufacture a lesson when the evidence supports no change.

## Stopping and persistence

- Keep local fixes local. A recurring project constraint may justify changing project guidance; a reusable method may justify proposing a skill change. Explain the gap and the cost of another rule first.
- Return the important outcomes, supported explanations, and actionable suggestions.
- Route a durable result by kind: a lasting decision to [decision-records](../decision-records/SKILL.md), an incident lesson to a postmortem under [canonical-docs](../canonical-docs/SKILL.md), and a reusable method to a skill change under [skill-authoring](../skill-authoring/SKILL.md).
- Keep the result in the conversation unless persistence is requested. Preserve accepted durable reasons in their owner, not a transcript of every attempt or an attribution of motives to the user.
