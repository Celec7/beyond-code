# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

A baseline engineering standard for coding agents: six small skills you can read in one sitting and rewrite to match how your team works.

English | [中文](README_zh-CN.md)

## Why This Exists

A capable coding agent does not need to be taught how to code. It needs to know which conventions are yours.

Left unstated, those conventions get re-derived every session, and the answer drifts. A team that wants one home per fact, or no dependencies without asking, or commits that read like their repo's history, has no place to write that down where an agent will find it at the moment it matters.

Beyond Code is that place. Six guardrails, each one a norm rather than a procedure:

1. **scope-guard**: state what the change will not do, before it starts.
2. **implementation-bounds**: name the target files, and stop at the boundary.
3. **root-cause-debugging**: fix the defect where it lives, not where it surfaced.
4. **code-integrity-audit**: a completion claim carries the output that proves it.
5. **canonical-docs**: one home per fact, in the present tense, anchored to real types.
6. **conventional-commit**: structured, SemVer-aligned commits that read like your repo's history.

They are deliberately plain Markdown, with no directory structure to adopt, no tracking tables, and no workflow to run. Edit them like the rest of your config: delete a rule you disagree with, add one your team keeps repeating, and let a capable agent do the rest.

## The 6 Core Skills

| Skill | When to Use |
| :--- | :--- |
| **[`scope-guard`](skills/scope-guard/SKILL.md)** | Clarifying requirements, or an ask that is broader than the change it should produce |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)** | Before code lands, or the moment an edit leaves the declared target scope |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)** | A test fails, code throws, a result is wrong, or a bug keeps recurring |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)** | Claiming a task complete, committing, or opening a PR |
| **[`canonical-docs`](skills/canonical-docs/SKILL.md)** | Writing or auditing `docs/`, or a document and its code have drifted apart |
| **[`conventional-commit`](skills/conventional-commit/SKILL.md)** | Creating, formatting, or reviewing git commits, PR titles, or squash merges |

## Installation

Install all skills into your coding agent (Claude Code, Codex, DSH, Cursor, etc.):

```bash
npx skills add Celec7/beyond-code
```

Or selectively install individual skills you want.

## How to Use in Daily Work

Each skill is independent and model-invoked by default. You do not need to memorize commands:

- **Starting a feature**: let the agent use `scope-guard` to align on what is out of scope and clarify key technical choices;
- **Writing code**: use `implementation-bounds` to confine changes to a tight set of files and avoid unintended blast radius;
- **When code breaks**: remind the agent to use `root-cause-debugging` to fix bad data at the source rather than masking it downstream;
- **Before sign-off**: run `code-integrity-audit` to inspect the diff for shortcuts, ensuring tests actually ran and passed;
- **Documenting architecture**: use `canonical-docs` to keep `docs/` accurate to the living code, completely free of ephemeral task slop;
- **Committing changes**: use `conventional-commit` to construct SemVer-aligned, machine-readable commit messages and trailers.

## License

[MIT](LICENSE)
