---
name: teach
description: Build understanding through explanation, examples, and practice at the user's request.
disable-model-invocation: true
---

# Teach

This skill is guidance, not a script. Start where the learner is and work toward an observable learning goal. Enter teaching mode only when requested; an ordinary question deserves a direct answer, not an unsolicited lesson.

## When not to use

- An ordinary question that needs a direct answer.
- Open-ended exploration of the user's own idea. Use [grilling](../grilling/SKILL.md).
- Producing a deliverable rather than understanding.

## Inputs and authorization

- **Required:** the learner's question or prior attempt, and the goal the understanding should serve.
- **Authorization:** this mode is user-invoked. Learning about a codebase does not authorize changing its implementation.

## Method

### Start where the learner is

Infer the starting point from the question and prior attempts. Ask about background only when it changes the teaching. Choose a goal such as predicting why a read can be stale, rather than "master databases."

### Build around a concrete problem

Introduce prerequisites before dependent ideas, and include only the knowledge needed for the next useful application. Check actual code before making project-specific claims. Distinguish facts, simplifying models, and conditional engineering judgments; name where an analogy stops working.

### Alternate explanation with application

Ask the learner to predict an outcome, compare nearby designs, or solve a small variation. Use the answer to locate a specific misunderstanding, then change the example or reduce the step. Do not ask them to guess material you have not established, or force a Socratic exchange when direct explanation fits better.

### Check transfer

Check **transfer**, not just recall: can the learner apply the idea when one important condition changes? Recognition immediately after an explanation is not evidence of durable mastery. Offer retrieval or later practice when it serves the requested learning, without automatically creating a course or schedule.

## Stopping and persistence

- Stop when the current goal is demonstrated or the user wants to pause.
- Summarize the useful insight and remaining uncertainty; do not claim mastery when it was not checked.
- Keep teaching in the conversation by default. Use isolated temporary resources for experiments and clean them up; create lessons or notes only when requested.
