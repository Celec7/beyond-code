---
name: skill-authoring
description: Use when creating a new skill, editing an existing skill or agent instruction, choosing between a skill and a gate or project documentation, or adopting methodology from another skill collection.
---

# Skill Authoring

This skill is guidance, not a script. A skill is a reference for a reusable judgment; it earns its place when it changes a decision, not when it restates what a capable agent already does.

## When not to use

- Project conventions, commands, or paths. Record them in the project's own documentation, not a skill.
- A constraint that can be enforced mechanically. Ship a gate or lint instead.
- Documentation placement or structure. Use [canonical-docs](../canonical-docs/SKILL.md).

## Inputs and authorization

- **Required:** the judgment the skill should change and the situation that should trigger it. If either is missing, ask or stop.
- **Authorization:** authoring or editing a skill does not authorize changing unrelated skills, committing, or publishing.

## Method

### When to create a skill

Create one when a non-obvious judgment is reusable across tasks and its absence causes a repeated, observable mistake. Do not create one for a one-off solution, for facts an existing owner already states, or for a rule a machine can enforce.

### Write the description for discovery only

The description is read to decide whether to load the skill. State the triggering conditions and observable symptoms. Do not summarize the skill's workflow: a workflow summary becomes the shortcut a model follows instead of reading the body.

### Keep the body short, load detail on demand

State the core principle and the decision points in `SKILL.md`. Move worked examples and calibration to `references/`, reusable skeletons to `templates/`, and tools to `scripts/`. The body must say where the deferred resource is.

### Give one owner to each fact

Link the skill that owns a rule instead of restating it. Do not inline project commands or paths; name the binding by role and resolve it from the project's documentation. Prefer extending an existing owner over adding a parallel skill.

### State the guardrails

Open with what the skill is and is not. State its scope and authorization, and what it does not permit. A skill that reads as a checklist invites mechanical application; keep the judgment.

### Test the skill before trusting it

Treat a skill change like a behavior change.

1. **Red.** Run the target scenario with a subagent without the skill. Record the exact wrong behavior and rationalizations.
2. **Green.** Write the minimal skill that addresses those failures, then re-run.
3. **Refactor.** Find residual rationalizations, add explicit counters, and re-test.

Do not batch-author skills without testing each. A skill is prose until a test shows it changes behavior.

### Adopt an external methodology by extracting, not copying

Classify each source section as portable method, project binding, or local calibration. Keep the method, replace literal facts with named roles, and keep calibration in `references/`. Extend an existing owner before adding a new skill, then test the result.

## Validate and report

- Check the frontmatter, the trigger-only description, and every relative link.
- Report the baseline behavior, the change, and the post-change evidence.
- Keep each change reviewable on its own.

## References

- [Worked examples](references/examples.md)
