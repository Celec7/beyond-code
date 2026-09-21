---
name: conventional-commit
description: Use when drafting or reviewing commit messages or organizing changes into coherent conventional commits.
---

# Conventional Commit

Describe one coherent engineering change using Conventional Commits. Read the actual intended diff first; the original task title may no longer describe it.

Implementation, tests, and related documentation can share one intent. Split independent changes when doing so improves review or reversal, not merely because files have different types. Do not force coupled edits into broken intermediate commits.

## Grammar

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footers]
```

Choose the type by effect: `feat` adds capability, `fix` repairs behavior, and `refactor` changes structure without changing intended behavior. Use `docs` or `test` for changes confined to those concerns. Use the project's other types, such as `build`, `ci`, `perf`, `style`, or `chore`, when they fit; `chore` is not a substitute for understanding the change.

Scope is optional and names a meaningful component or domain. Reuse project vocabulary; omit it when no natural scope exists.

Write a concise description without a trailing period. In English, use the imperative. Follow the project's message language; Conventional Commits does not require English prose. Keep the type and machine-readable markers consistent.

Add a body only for a problem, reason, or impact the title does not explain. Separate it with a blank line and wrap prose around 72 columns. Describe the change, not the agent's sequence of edits.

## Compatibility and trailers

Mark a breaking contract with `!` or an uppercase `BREAKING CHANGE:` footer. Explain impact and migration when needed. Compatibility depends on what consumers can rely on, not diff size. Under Conventional Commits semantics, `fix` indicates PATCH, `feat` MINOR, and a breaking change MAJOR; other types have no implicit version effect.

Separate footers from the preceding text with a blank line. Use trailer forms such as `Refs: #123` or `Fixes #123`; hyphenate multiword tokens except `BREAKING CHANGE`. Include only real references and attribution.

```text
fix(export): preserve filters across export pages

Apply active filters to every page so exported records match the
selected result set.
```

Before returning the message, check for omitted behavior, overstated results, breaking effects, and unrelated content. A request for a message authorizes no Git mutation. When committing is requested, inspect the exact staged content and preserve unrelated user work. Commit permission does not extend to push or history rewriting.
