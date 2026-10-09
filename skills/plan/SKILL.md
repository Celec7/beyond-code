---
name: plan
description: Use when work needs verifiable slices, dependency ordering, compatibility stages, or coordination across sessions, or when the user asks for a plan.
---

# Plan

This skill is guidance, not a script. Plan observable progress. Make the next slice concrete and keep distant steps open to evidence. A clear local edit may need only a sentence about the change and its check.

## When not to use

- Consequential ambiguity in the goal, outcome, or bounds. Resolve it with [clarify](../clarify/SKILL.md) first.
- A single small local edit that already has an obvious next action.
- Executing the work; planning alone never grants implementation permission.

## Inputs and authorization

- **Required:** the goal, constraints, and decisions already available. Missing information is a gap to resolve, not a reason to rerun earlier skills.
- **Authorization:** keep the plan in conversation unless it must survive a handoff. Adjust local execution within existing authorization; return to the user when behavior, constraints, or scope changes.

## Method

Use the goal, constraints, and decisions already available. Expose an unresolved design choice instead of hiding it inside an implementation step.

### Slice through behavior

Prefer a tracer bullet: a narrow path from input to useful result through the necessary layers. Give each slice its result, responsibilities, evidence of completion, and genuine prerequisites. Cover the intended outcome across the slices without prescribing every function.

Order by real dependencies and useful feedback, and check that dependencies do not cycle. Wide migrations may need expand, migrate, contract. [slicing](references/slicing.md) has the comparison, the four slice fields, and the ordering cautions.

### Keep the plan current

When evidence changes an assumption, revise the affected steps and dependencies. If a file is needed and no project convention exists, use one optional [work record](templates/work-record.md) at `docs/agents/work/<task>.md`. Avoid a dot-directory; if the project cannot write it, report that and use its documented alternative. State its owner and when it will be removed or promoted; do not create parallel plan, progress, and handoff files or assume it should be committed.

On completion or abandonment, preserve worthwhile decisions in their owner and remove disposable task-owned state. On resumption, check the record against current code and user instructions. It is context, not fresh evidence or authority.

## Validate and report

- Check that every slice has a completion evidence and that its prerequisites exist and do not cycle.
- Report the current plan, the open questions, and any assumption that still needs evidence.
- Before removing a work record, promote what is durable: a lasting decision to [decision-records](../decision-records/SKILL.md), and an incident lesson to a postmortem under [canonical-docs](../canonical-docs/SKILL.md). Delete the rest.
- Keep the plan in the conversation unless a handoff requires a record.

## References

- [Slicing](references/slicing.md)
- [Work record template](templates/work-record.md)
