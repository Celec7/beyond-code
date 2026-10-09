# Skill Architecture

## Summary

This document defines how the Beyond Code skill suite is structured and how its skills are written, reviewed, and maintained. It exists so the suite can absorb methodology from other collections, such as the DeepSeek Harness `.agents/skills/` set, without copying one repository's facts into skills that must work everywhere.

The contract has one core idea: separate portable judgment from project facts. Judgment lives in `SKILL.md`; facts stay with the project's existing documentation and are referenced by role; concrete examples live in optional references. `README.md` owns the catalog and the invocation summary. This document owns the structure and the authoring rules.

## 1. The portability problem

A skill is reusable only while its judgment transfers and its facts do not.

A skill that says "run `pnpm run doc-sync`" stops working outside the repository that defines that command. A skill stripped of every example becomes advice that no model can apply. Both failures come from mixing two different kinds of content in one file.

The suite separates three layers and gives each one a home.

## 2. The three layers

| Layer | Contains | Home | Test |
| --- | --- | --- | --- |
| **Method** | Decision procedure, defaults, boundaries, anti-patterns, and the reasoning that makes a judgment reproducible | `SKILL.md` | Would this still be true in a different repository with a different stack? If yes, it is Method. |
| **Binding** | Named project facts: commands, gate names, directory semantics, invariants, authorization rules, and the platform matrix | The project's existing authoritative sources, such as a contributor guide, README, manifests, or CI configuration | Does this name a file, command, or rule that one repository owns? If yes, it is Binding. |
| **Calibration** | Concrete examples that set the scale of a judgment: borderline cases, measured sizes, and real defects | `references/` | Does this teach judgment rather than state a rule? If yes, it is Calibration. |

Rules:

- A skill may cite a binding role by name, such as "the focused test command", but must not inline its value.
- A skill review fails when a reader cannot tell which layer a sentence belongs to.
- When a judgment has no example, state the rule and record that calibration is missing. Do not invent a fake example.

## 3. Skill anatomy

### Frontmatter

```yaml
---
name: kebab-case-name
description: Use when <triggering conditions and symptoms>. Use <other-skill> when <different case>.
---
```

- `name` uses lowercase letters, digits, and hyphens.
- `description` is third person and starts with "Use when". It states triggering conditions and symptoms only. Do not summarize the workflow in the description. A workflow summary becomes the shortcut a model follows instead of reading the body.
- `disable-model-invocation: true` declares a user-only skill (see section 6). Add `agents/openai.yaml` with `policy.allow_implicit_invocation: false` for hosts that read it.

### Body skeleton

The portable judgment behind this skeleton is owned by [skill-authoring](../skills/skill-authoring/SKILL.md). This suite enforces the structure below.

Required sections, in order:

1. Title and orientation. One short paragraph that states the skill is guidance, not a checklist or a script, and gives the core principle.
2. `## When not to use`. Exclusions and boundaries only, naming the neighboring skill or owner to use instead. Triggering conditions stay in the frontmatter `description` and are not repeated here.
3. `## Inputs and authorization`. The inputs the skill needs, such as scope, target, and mode; what to do when one is missing; and what the invocation does not authorize.
4. `## Method`. The judgment: decision points, defaults, conditions, anti-patterns, and the counter to each common mistake.
5. `## Validate and report`. How to check the result, which evidence to collect, and how to report what was executed versus left unverified. A user-only conversational mode may name this closing section for what it does, such as `## Stopping and persistence`, provided it states the exit condition and what is retained.

Optional sections:

- `## Binding`. Use only when the skill resolves more than two named project facts. List the roles it needs, not their values.
- `## Common mistakes`. A table of mistakes and counters. This may also live inline in Method.
- `## Calibration`. A short example set, or a link to `references/examples.md`.
- `## References`. One hop to further detail, never a deep chain.

Keep a `SKILL.md` under about 500 words unless it is an exhaustive reference. Move extended detail to `references/`, reusable skeletons to `templates/`, and executable tools to `scripts/`.

## 4. Resolving bindings

A skill names a binding by its role, such as "the focused test command" or "the documentation gate", and resolves that role from the project's existing authoritative sources. It does not create a parallel file for facts the project already documents.

Prefer the nearest owner: a contributor guide or a README development section for commands, package manifests or a task runner for entry points, and CI configuration for required gates. Search before inferring.

Contract:

- A skill references a binding by role, never by a path or a literal value.
- A skill that cannot resolve a binding from an existing source, or finds conflicting candidates, stops and reports what it needs. It does not guess.
- When a binding has no owner anywhere, add it to the project's existing conventions, such as its contributor guide. Do not introduce a new repository-wide file for it.
- A project may choose to maintain a dedicated binding file, but the suite does not require or assume one.

## 5. Layering and ownership

Skills form two classes.

- **Foundation skills** carry judgment that other skills reuse: authoring and invocation, failure semantics, prose and communication, reasoning-leakage removal, and evidence and verification.
- **Domain skills** carry engineering methods: design, planning, debugging, testing, review, simplification, and records.

Rules:

- One judgment, one owner. A domain skill links a foundation skill instead of restating its rule.
- Domain skills may depend on foundation skills. Foundation skills never depend on domain skills.
- There is no router skill and no required invocation chain. A task may enter at any skill.
- Dependencies are plain Markdown links. Do not force-load with `@`.

## 6. Invocation policy

Automatic is the default: the model may select a skill when its description matches. A user-only skill declares `disable-model-invocation: true`, adds the host policy file, and states in its body that a user request is required.

Invoking a skill never widens the task and never grants implementation permission. An existing authorization remains valid within its bounds.

## 7. Evidence and validation

Every skill ends with Validate and report. The shared contract:

- Distinguish executed evidence from assumed or inherited evidence.
- Prefer the smallest check that would fail for the regression at hand.
- Reuse evidence only while its code and inputs remain applicable.
- Report what remains unverified. Never describe a skipped or pending check as passing.
- When a rule can be checked mechanically, ship a gate and keep the skill for judgment.

## 8. Authoring workflow

The portable authoring method, including when to create a skill, description rules, progressive disclosure, and the test-driven workflow, is owned by [skill-authoring](../skills/skill-authoring/SKILL.md). This suite requires every skill change to have a recorded failing baseline before the change and a post-change check, and forbids batch-authoring untested skills.

## 9. Repository conventions

- `skills/<name>/SKILL.md` is required. The namespace is flat.
- `skills/<name>/references/` holds calibration and extended detail.
- `skills/<name>/templates/` holds reusable skeletons.
- `skills/<name>/scripts/` holds executable tools; test them locally.
- `skills/<name>/agents/openai.yaml` holds host invocation policy.
- No narrative histories and no session-specific examples in `SKILL.md`.

## 10. Absorbing an external methodology

The extraction procedure is owned by [skill-authoring](../skills/skill-authoring/SKILL.md): classify each source section as Method, Binding, or Calibration, keep the method, replace literal facts with named roles, and extend an existing owner before adding a skill. The suite-specific constraint is portability: project facts stay with the project's own documentation, never inside a skill. Do not keep a migration log.

## 11. Current state and gaps

The suite has eighteen host-agnostic skills. Against this contract:

- Bindings resolve from existing project documentation, so the suite ships no separate profile. This repository has no build, test, or lint entry points of its own; its conventions live in `README.md` and this document.
- Foundation skills now own reasoning-leakage removal (`trim-reasoning-leakage`), the sentence-level prose contract (`prose-standard`), failure semantics (`error-handling`), and skill authoring (`skill-authoring`). Each carries calibration examples under its `references/`. Evidence and verification remains a document-level contract plus each skill's Validate and report section.
- The domain and mode skills have been migrated to the contract: each has a boundaries section, an inputs-and-authorization section, a method region, and a closing section, and each links the foundation skills instead of restating them.
- Behavioral testing has covered the four foundation skills with before-and-after subagent runs. The migrated skills are validated structurally, not behaviorally.

## 12. Validating the contract

Check these mechanically when the suite changes:

- Every `SKILL.md` has `name` and a trigger-only `description`.
- Triggering conditions appear once, in the frontmatter `description`, not repeated as a body section.
- No skill inlines a known binding value; search for command and path literals.
- Every domain skill links its foundations instead of restating them.
- Every skill ends with `Validate and report`, or a mode-specific closing section such as `## Stopping and persistence`.
- Every changed skill has a recorded baseline and a post-change check.

## 13. Task flow and record ownership

A task may enter at any stage. The transitions below are typical, not a required chain, and invoking a skill never widens the task.

| Stage | Primary skills | Cross-cutting |
| --- | --- | --- |
| Frame | `clarify`, or `grilling` for open exploration | |
| Design | `codebase-design` | |
| Plan | `plan` | |
| Implement and harden | the agent's own work, with `tdd`, `debug`, `error-handling`, `test-reliability`, `simplify` | `prose-standard`, `trim-reasoning-leakage` |
| Review and land | `code-review`, `conventional-commit` | |
| Record and reflect | `decision-records`, `canonical-docs`, `skill-authoring`, `retro` | |

Typical next steps, all optional:

- `clarify` to `codebase-design` or `plan`.
- `codebase-design` to `plan`, and to `decision-records` when a lasting choice is made.
- `plan` to implementation with `tdd`; at closure, promote durable output before removing the work record.
- `code-review` to `conventional-commit`, and to `decision-records` for lasting rationale.
- Any closure to `retro` when the user asks for it.

### One home per fact

[The documentation tier taxonomy](../skills/canonical-docs/references/documentation-tiers.md) owns where each kind of truth lives. Two task-specific rules stay here: task state is ephemeral and is not a tier, and a known code issue belongs in the project's TODO marker convention rather than a record. The durable outputs of a task are decisions and incident records; nothing archives a task itself.
