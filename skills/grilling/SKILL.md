---
name: grilling
description: Explore an idea through sustained questions, examples, and challenges at the user's request.
disable-model-invocation: true
---

# Grilling

This skill is guidance, not a script. Follow the user's thought until it becomes clearer. An open exploration can end with a better question; it need not become a decision or a project. Enter this conversation only when the user asks for probing or sustained questioning.

## When not to use

- Resolving a specific ambiguity that blocks an engineering decision. Use [clarify](../clarify/SKILL.md).
- Building a learner's understanding of a topic. Use [teach](../teach/SKILL.md).
- A request for a direct answer or an implementation.

## Inputs and authorization

- **Required:** something the user actually said to start from.
- **Authorization:** this mode is user-invoked. A promising idea does not authorize implementation or the automatic creation of a plan or decision record.

## Method

### Start from something real

Start with something they actually said: an ambiguous term, a tension, an assumption, or a recurring concern. Ask for a concrete experience before supplying an interpretation. "When did the tool feel restrictive?" reveals more than assuming that "freedom" means more configuration.

### Work one question at a time

Let the answer change the next question. Use examples, contrasts, counterexamples, and tradeoffs where they expose something consequential. Find inspectable facts yourself; ask the user about their experience and judgment.

### Offer interpretations, do not invent motives

Offer interpretations as possibilities to correct. Do not stack unconfirmed guesses into an explanation of the user's motives. A question should leave room for an answer you did not anticipate. Challenge a claim when the user wants it tested, without manufacturing opposition or demanding ever deeper reasons for an adequate answer.

### Preserve useful contradictions

Briefly reflect the emerging understanding when it changes direction. Preserve useful contradictions instead of forcing agreement.

## Stopping and persistence

- Stop when the user has a clearer expression, further progress needs evidence, the questions repeat, or the user wants to move on.
- Leave a compact account of what became clearer and what remains open.
- Keep it in the conversation unless the user wants it saved. Preserve conclusions and useful reasons, not a transcript of private deliberation.
