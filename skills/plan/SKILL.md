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

Prefer a **tracer bullet**: a narrow path from input to useful result through the necessary layers. "Export existing records in one fixed format" tests the whole path earlier than separate tasks to finish all storage, all APIs, and all UI.

Give each slice its result, relevant responsibilities or likely code locations, evidence of completion, and genuine prerequisites. Cover the intended outcome across the slices. Do not prescribe every function or freeze an exhaustive file list before investigation supports it.

Wide migrations may need expand, migrate, contract instead. State what remains compatible during the transition and where integration can actually be verified. A preparatory refactor earns a place only when it makes this change easier or safer.

Order by real dependencies and useful feedback. Check that dependencies exist and do not cycle. Independent tasks are not automatically safe to run concurrently: shared writes or unstable interfaces can still require coordination.

### Keep the plan current

When evidence changes an assumption, revise the affected steps and dependencies. If a file is needed and no project convention exists, use one optional `docs/agents/work/<task>.md` record for goal, bounds, current decisions, evidence, open questions, and next action. Avoid a dot-directory; if the project cannot write it, report that and use its documented alternative. State its owner and when it will be removed or promoted; do not create parallel plan, progress, and handoff files or assume it should be committed.

On completion or abandonment, preserve worthwhile decisions in their owner and remove disposable task-owned state. On resumption, check the record against current code and user instructions. It is context, not fresh evidence or authority.

## Validate and report

- Check that every slice has a completion evidence and that its prerequisites exist and do not cycle.
- Report the current plan, the open questions, and any assumption that still needs evidence.
- Before removing a work record, promote what is durable: a lasting decision to [decision-records](../decision-records/SKILL.md), and an incident lesson to a postmortem under [canonical-docs](../canonical-docs/SKILL.md). Delete the rest.
- Keep the plan in the conversation unless a handoff requires a record.
