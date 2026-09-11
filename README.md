# Beyond Code: Engineering Guardrails Suite

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

A lean suite of high-standard engineering mental models and hard guardrails for coding agents.

English | [中文](README_zh-CN.md)

## Why This Exists

As reasoning models and autonomous coding agents grow increasingly capable, heavy bureaucratic scaffolding (rigid tabular forms, directory state machines, and multi-stage ceremonies) yields diminishing returns and clutters token context.

Modern agents do not need micromanagement. What they need are **sharp mental models, clear boundaries, and non-negotiable engineering disciplines**:
- Knowing when to stop and align instead of guessing.
- Refusing to slap band-aid null checks down at the crash site.
- Staying strictly within declared boundaries during implementation.
- Auditing diffs with adversarial skepticism before shipping.

Inspired by the modular simplicity of Matt Pocock's engineering skills, Beyond Code strips away the procedural red tape and distills core software engineering intuitions into **four composable, zero-overhead atomic skills**.

## The Skill Suite

| Skill | Trigger / When to Use | Core Intuition |
| :--- | :--- | :--- |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)** | When tests fail, code throws, or unexpected behavior occurs | **Fix at the source, never band-aid**: Trace upstream along the call chain, align contracts, and resolve defects at the origin instead of masking nulls downstream with `?.` or empty catches. |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)** | When implementing features, refactoring, or guarding scope | **Declare bounds, stop on substantive deviations**: Stick to the declared target files and interfaces. Allow cohesive local edits (tests, barrel exports), but halt immediately if cross-domain files or public APIs are breached. |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)** | Before completing a task, submitting a PR, or verifying changes | **Adversarial diff verification**: Inspect new additions for AI shortcuts, mock stubs, swallowed errors, and tautological tests. Demand fresh command output (evidence before claims). |
| **[`scope-guard`](skills/scope-guard/SKILL.md)** | When defining requirements, planning, or clarifying intent | **Carve the negative space**: Define 2 to 4 Explicit Non-Goals to prevent scope creep. Engage in high-leverage technical alignment while keeping the developer in control of pacing. |

## Installation

Install all skills into your coding agent (Claude Code, Codex, DSH, Cursor, etc.):

```bash
npx skills add Celec7/beyond-code
```

Or selectively install individual skills you want.

## How to Use

Each skill is self-contained and model-invoked by default. They can be used independently or paired seamlessly with your favorite workflows (such as TDD, PR review, or Matt Pocock's skill suite):

- **During feature design**: `scope-guard` helps you and the agent agree on explicit boundaries and Non-Goals before coding.
- **During execution**: `implementation-bounds` keeps the agent focused on the primary files, preventing unauthorized dependency additions or schema drift.
- **When code breaks**: `root-cause-debugging` forces the agent to trace bad data back to its upstream producer rather than adding ad-hoc `?.` or fallback defaults.
- **Before sign-off**: `code-integrity-audit` runs a rigorous, skeptical check over the diff to ensure no stubs or faked tests slip through.

## License

[MIT](LICENSE)
