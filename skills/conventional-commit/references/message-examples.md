# Message examples

Calibration for the grammar and compatibility rules in [SKILL.md](../SKILL.md).

## Subjects

| Weak | Strong |
| --- | --- |
| "fixed stuff" | "fix(export): preserve filters across export pages" |
| "Update README" | "docs: document the retry budget in the CLI reference" |
| "feat: add sorting, fix the date bug, and bump deps" | split into three commits by intent |

A subject names one coherent change, uses the imperative, and has no trailing period.

## Body

Add a body only for a problem, reason, or impact the subject cannot carry.

```text
fix(export): preserve filters across export pages

Apply the active filters to every page so the exported records match
the selected result set.
```

Do not narrate the sequence of edits or list files the diff already shows.

## Breaking changes

Mark a breaking contract with `!` or an uppercase `BREAKING CHANGE:` footer, and explain the migration.

```text
feat(api)!: rename the session cursor field

BREAKING CHANGE: cursor_id is now cursorId. Update clients that read
the field by name.
```

## Footers

Use trailer forms such as `Refs: #123` or `Fixes #123`; hyphenate multiword tokens except `BREAKING CHANGE`. Include only real references and attribution.

## Splitting

Split by intent when it improves review or reversal, not merely because files differ. Implementation, tests, and their documentation may share one commit; independent changes should not.
