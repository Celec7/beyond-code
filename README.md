# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

The main workflow for agent-assisted software engineering, expressed through eighteen independent skills.

English | [中文](README_zh-CN.md)

## Philosophy

Beyond Code provides the engineering methods and conventions that guide work from clarification and design through planning, implementation feedback, review, and decision maintenance. Skills earn their place by changing a decision: when to ask, how to divide work, what evidence to trust, and which reasons to retain. Routine coding and tool operations remain the agent's work; specialized skills can supply additional expertise where needed.

The suite draws on Matt Pocock's skill design and conversational methods, and DeepSeek Harness's engineering discipline and decision-record practices. Instructions are direct and scoped. There are no hooks, mandatory setup, router skills, or required invocation chains.

Each skill works with the information supplied in the request, conversation, code, or relevant records. Missing information calls for a specific investigation or question, not a replay of earlier stages. Invoking a skill does not widen the task or grant permission to implement. Existing authorization remains valid within its bounds.

## Skills

“Automatic” means the agent may select the skill when relevant; users can also invoke it explicitly. It does not mean every task runs every skill. “User only” reserves a change in conversational mode for the user.

### Foundation

Foundation skills carry judgment the other skills reuse.

| Skill | Judgment it provides | Invocation |
| --- | --- | --- |
| [skill-authoring](skills/skill-authoring/SKILL.md) | Decide when a skill earns its place, and write its description, body, and tests | Automatic |
| [error-handling](skills/error-handling/SKILL.md) | Define failures, their owners, and what remains safe after failure | Automatic |
| [prose-standard](skills/prose-standard/SKILL.md) | Preserve every proposition and state what each prose surface owes | Automatic |
| [trim-reasoning-leakage](skills/trim-reasoning-leakage/SKILL.md) | Remove prose that takes the authoring session's vantage | Automatic |

### Domain

| Skill | Judgment it provides | Invocation |
| --- | --- | --- |
| [clarify](skills/clarify/SKILL.md) | Resolve consequential ambiguity in problems, outcomes, and scope | Automatic |
| [codebase-design](skills/codebase-design/SKILL.md) | Place responsibility and complexity behind useful interfaces | Automatic |
| [plan](skills/plan/SKILL.md) | Arrange verifiable slices, dependencies, and staged migrations | Automatic |
| [tdd](skills/tdd/SKILL.md) | Build one behavior through red, green, and refactoring | Automatic |
| [debug](skills/debug/SKILL.md) | Distinguish causes with evidence before repairing behavior | Automatic |
| [simplify](skills/simplify/SKILL.md) | Remove complexity only after understanding what it earns | Automatic |
| [test-reliability](skills/test-reliability/SKILL.md) | Control timing, isolation, resource ownership, and teardown | Automatic |
| [code-review](skills/code-review/SKILL.md) | Inspect requirements, implementation, and evidence independently | Automatic |
| [canonical-docs](skills/canonical-docs/SKILL.md) | Give accurate explanations one appropriate owner | Automatic |
| [decision-records](skills/decision-records/SKILL.md) | Preserve and maintain reasons that code cannot recover | Automatic |
| [conventional-commit](skills/conventional-commit/SKILL.md) | Express a coherent change using the chosen commit convention | Automatic |

### Modes

| Skill | Judgment it provides | Invocation |
| --- | --- | --- |
| [grilling](skills/grilling/SKILL.md) | Explore ideas without imposing a goal or inventing the user's motives | User only |
| [teach](skills/teach/SKILL.md) | Build understanding through explanation and application | User only |
| [retro](skills/retro/SKILL.md) | Derive concrete improvements from real work | User only |

The suite's structure, its three content layers, its authoring rules, and its task flow and record ownership live in [docs/skill-architecture.md](docs/skill-architecture.md).

A task can enter anywhere. A clear bug report can start with diagnosis; an existing change can start with review. Design, planning, and verification are methods to use where needed, not a sequence of approval ceremonies. Small tasks stay small.

## Pairing with other skills

Use Beyond Code as the main engineering workflow and select companions from [Matt Pocock's skills](https://github.com/mattpocock/skills) for specific needs:

| Companion | When it helps | Fit with this workflow |
| --- | --- | --- |
| [writing-for-agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md) | Writing skills or agent instructions such as AGENTS.md | Adds guidance on discovery, information hierarchy, and removing ineffective instructions; it is not a prerequisite for other skills. |
| [prototype](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md) | Exploring state behavior interactively or comparing UI variants | Supplies concrete experiment formats. Agree on artifact placement and retention; its default workflow includes repository-local prototypes and a throwaway-branch commit, which need appropriate authorization. |
| [wizard](https://github.com/mattpocock/skills/blob/main/skills/engineering/wizard/SKILL.md) | Guiding setup steps that require human access or decisions | Generates an interactive script. Use it for genuinely human-only steps and retain the script only when a reusable setup deliverable is wanted. |
| [handoff](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md) | Explicitly handing work to a fresh agent or session | Produces a redacted handoff in the OS temporary directory; reference existing records instead of creating a second task history. |

These suggestions reflect the Matt sources reviewed for this suite; check the selected version's instructions before use. Other skill collections can contribute frontend design, framework expertise, browser testing, or document production. Companions are optional capabilities, not dependencies or missing stages in the workflow.

The agent can use specialist guidance within the current task, then carry its result and evidence into the continuing work. Beyond Code supplies the workflow principles; the companion supplies its particular method or tool knowledge. A companion does not create permission to expand scope, publish, or establish a parallel record system.

Select companions individually rather than installing overlapping suites wholesale. For shared names such as `tdd`, `code-review`, or `codebase-design`, choose one active definition; use Beyond Code's version when adopting this workflow. Check dependencies in companion skills too: a different name may still call a shared skill or prescribe different approval, artifact, or commit behavior. Resolve those conflicts through user and project conventions, not by assuming installation order establishes precedence.

## Code, documentation, and decisions

Code is the source of truth for actual behavior. Requirements and valid decisions describe intended behavior; a mismatch may be a bug, not permission to rewrite the requirement. Tests provide evidence and can themselves be wrong.

Formal documentation follows the project's existing structure. If there is none and a structure is needed, `canonical-docs` offers suitable options for the user to choose. No empty documentation tree is created as setup.

Decision records preserve motivation, constraints, real alternatives, consequences, and reasons to reconsider. Follow an active ADR/RFC convention when one exists. Otherwise, `decision-records` uses `docs/agents/notes/{proposed,implemented,rejected,archived}/YYYY-MM-DD-topic.md`, creating only needed directories. No index, classification tree, or sidecar is required. Archived records are frozen history, not current authority.

Keep temporary state in conversation by default. When a handoff needs a file and no project convention exists, `plan` offers one optional `docs/agents/work/<task>.md` record. Name its owner and cleanup or promotion point. Do not assume it should be committed. On closure, preserve useful decisions in their owner and remove disposable task-owned state. No skill invocation requires a file output.

## Installation and invocation

```bash
npx skills add Celec7/beyond-code
```

Select the whole suite or the individual skills you need. Skill bodies are English; the root catalog is available in both languages.

For `grilling`, `teach`, and `retro`, `SKILL.md` declares `disable-model-invocation: true`, and `agents/openai.yaml` declares `policy.allow_implicit_invocation: false`. These encode user-only intent for hosts that support the respective metadata. Host behavior varies; the skill text also requires a user request. Other skills retain default discovery. This is instruction and invocation configuration, not mechanical edit prevention.

Structural checks cover packaging and references, not agent behavior. Behavioral evaluation will come from development use; the suite makes no claim of tested compliance across models or hosts.

## License

[MIT](LICENSE)
