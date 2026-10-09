# Worked examples

Adapted for this suite from the DeepSeek Harness agent-experience discipline and the pilot runs on the other foundation skills. Use each case to identify the governing principle, not as text to copy.

## The description owns discovery, not workflow

**Wrong:** `description: Use when rotating credentials. First inventory references, then create the new credential, then update secrets, then verify, then revoke the old one.`

**Right:** `description: Use when rotating database credentials, especially when revocation or rollback ordering matters.`

A workflow summary in the description becomes the shortcut a model follows. The body's ordering rules go unread, and a step the summary omits is a step the model skips.

## A skill changes a decision

**Weak:** a skill that lists the steps of a common task the agent already performs.

**Strong:** a skill that names the non-obvious judgment, such as "the old credential is the rollback path, so revoke last" or "retry only transient failures".

If the skill does not change a choice under pressure, it is documentation, and it belongs with the project's documentation.

## A checklist is not a skill

**Weak:** a numbered list with no rationale or anti-patterns.

**Strong:** the decision points, their conditions, the default, and the counter to the common mistake.

A checklist invites mechanical application. Keep the judgment that makes the steps matter, and move the long examples to `references/`.

## Progressive disclosure

**Wrong:** a 900-line `SKILL.md` that inlines every example and command.

**Right:** a short body that states the principle, names the references, and links each once.

The body is always loaded; references are loaded on demand. If a reader cannot find the deferred file from the body, the detail is lost, not deferred.

## One owner per fact

**Wrong:** two skills that each restate the same rule in slightly different words, so they drift.

**Right:** one skill owns the rule; the others link it.

Before adding a skill, search for an existing owner. Extend it rather than adding a parallel definition.

## Bind by role

**Wrong:** `Run pnpm run doc-sync and commit the generated README.` inside a portable skill.

**Right:** `Run the project's documentation gate; fix the owner before regenerating derivatives.`

A literal command makes the skill wrong outside one repository. Name the role and resolve it from the project's documentation.

## Test before trusting

**Wrong:** publish a skill because it reads well.

**Right:** run the target scenario with a subagent before the change, record the exact failure, then re-run after the change.

A skill is prose until a test shows it changes behavior. Batch-authoring several untested skills multiplies the risk.

## When a gate is better

**Wrong:** a skill that says "always use two-space indentation" or "never import from the test folder".

**Right:** a formatter configuration or a lint rule, plus a skill only for the judgment the rule cannot express.

Mechanical constraints belong in machines. Reserve skills for the calls a rule cannot make.
