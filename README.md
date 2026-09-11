# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

A practical skill suite to stop coding agents from hallucinating, patching symptoms, cutting corners, and polluting documentation.

English | [中文](README_zh-CN.md)

## Why This Exists

Coding with AI agents is fast, but anyone who uses them daily knows the recurring headaches:

1. **Over-engineering**: without clear boundaries on what **not** to build, agents invent unnecessary abstractions and bloated code.
2. **Touching unrelated code**: asked to fix one function, they quietly modify unrelated files, public APIs, or dependencies.
3. **Band-aid fixes**: when a test breaks or returns null, they slap `?.`, fallback defaults, or empty catch blocks at the crash site instead of investigating who passed the bad data.
4. **Cutting corners**: under complex tasks, they leave `TODO` comments, fake implementations with empty functions, or relax test assertions just to get a green light.
5. **Documentation rot**: cluttering project docs with temporary task checklists, refactoring histories, and speculative future promises that rot the moment code lands.

You do not need a heavy framework, extra directories, or endless tracking tables.

Beyond Code gives you five focused, lightweight skills. Each does one job well, keeping the agent grounded and delivering clean code and living contracts.

## The 5 Core Skills

| Skill | When to Use |
| :--- | :--- |
| **[`scope-guard`](skills/scope-guard/SKILL.md)** | Clarifying requirements, or an ask that is broader than the change it should produce |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)** | Before code lands, or the moment an edit leaves the declared target scope |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)** | A test fails, code throws, a result is wrong, or a bug keeps recurring |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)** | Claiming a task complete, committing, or opening a PR |
| **[`canonical-docs`](skills/canonical-docs/SKILL.md)** | Writing or auditing `docs/`, or a document and its code have drifted apart |

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
- **Documenting architecture**: use `canonical-docs` to keep `docs/` accurate to the living code, completely free of ephemeral task slop.

## License

[MIT](LICENSE)
