---
name: conventional-commit
description: Use when creating, formatting, or reviewing git commit messages, pull request titles, or squash merge messages.
---

# Conventional Commit

Agents often produce unstructured commit messages ("update code", "fix error"), mix multiple unrelated changes into a single message, fail to flag breaking changes, or format footers incorrectly for automated tooling.

This skill enforces strict conformance to the **Conventional Commits v1.0.0** specification for a machine-readable, SemVer-aligned commit history.

## 1. Commit Message Grammar

Every commit message follows this structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- **Blank lines are mandatory delimiters**: The body MUST begin exactly one blank line after the description. Footers MUST begin exactly one blank line after the body (or one blank line after the description if the body is omitted). Never omit the separating blank lines.
- **Atomic commits**: If a change addresses multiple unrelated concerns or spans multiple types, split it into separate commits.

## 2. Type Semantics (SemVer Correlation)

The `<type>` MUST be a noun, followed by an optional scope, optional `!`, and a required colon and space (`: `).

- **`fix`**: Patches a bug in the codebase. Correlates with SemVer **PATCH**.
- **`feat`**: Introduces a new feature to the codebase. Correlates with SemVer **MINOR**.
- **Extended types**: Commits other than `feat` and `fix` are permitted and carry no implicit SemVer impact (unless paired with a breaking change):
  - `build`: Changes affecting build systems or external dependencies.
  - `chore`: Maintenance tasks, tool configurations, or auxiliary files.
  - `ci`: Changes to CI workflows and configuration scripts.
  - `docs`: Documentation modifications only.
  - `perf`: Performance improvements.
  - `refactor`: Code restructurings that neither fix a bug nor add a feature.
  - `style`: Formatting or whitespace edits that do not alter code meaning.
  - `test`: Adding or correcting tests.

## 3. Scope Rules

A `<scope>` is OPTIONAL:
- MUST follow the type immediately and be wrapped in parentheses: `<type>(<scope>): <description>`.
- MUST consist of a noun describing the affected section or package of the codebase (e.g. `fix(parser):`, `feat(auth):`).
- Omit scope when the commit spans the whole repository or has no clean architectural noun.

## 4. Description and Body

- **`<description>`**: MUST immediately follow the colon and space (`: `). Provide a concise, imperative summary of the code change (e.g. `add ability to parse arrays`, not `added ability...` or `fixes array parsing`). Do not append a trailing period.
- **`[body]`**: OPTIONAL free-form text providing additional context, intent, or background. May consist of multiple newline-separated paragraphs. Follow these language norms:
  - **Tone and Mood**: Use the imperative, present tense (`Introduce...`, `Ensure...`, `Prevent...`), never past tense (`Introduced...`) or progressive (`Introducing...`).
  - **No First-Person Pronouns**: Omit "I", "we", "my", or conversational storytelling ("I changed line 42 because...").
  - **Focus on Why and What, not How**: Explain the problem, rationale, and behavioral invariants. Do not narrate line-by-line mechanics already visible in the diff.
  - **Line Wrapping**: Hard-wrap body paragraphs at ~72 characters for clean rendering in terminal logs (`git log`) and Git GUIs.

## 5. Breaking Changes (SemVer MAJOR)

A breaking change correlates with SemVer **MAJOR** and can accompany ANY commit type. It MUST be declared in at least one of two ways:

1. **Type/Scope exclamation mark (`!`)**: Append `!` immediately before the terminal colon:
   ```
   feat!: send an email to the customer when a product is shipped
   feat(api)!: switch authentication payload from cookie to bearer token
   ```
   When `!` is used, the `BREAKING CHANGE:` footer MAY be omitted, and `<description>` describes the breaking change.
2. **Footer token (`BREAKING CHANGE:`)**: Provide a footer beginning with the exact uppercase token `BREAKING CHANGE:` (or `BREAKING-CHANGE:`) followed by a space and description:
   ```
   feat: allow config object to extend presets

   BREAKING CHANGE: `extends` key in config file is now used for extending other configs.
   ```
   The token MUST be uppercase.

## 6. Footers and Git Trailers

Footers communicate metadata to tools and automated release pipelines:
- MUST follow the git trailer convention: `<token>: <value>` or `<token> #<value>`.
- `<token>` MUST use hyphens (`-`) in place of whitespace (e.g. `Reviewed-by:`, `Refs: #123`, `Fixes #456`, `Co-authored-by:`). The only exception is `BREAKING CHANGE`.
- Multi-line footer values are valid and parse until the next valid footer token/separator pair.

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Reviewed-by: Alice <alice@example.com>
Refs: #123
```

## Anti-Patterns (Strictly Prohibited)

- **The Missing Blank Line**: Placing body text or footers directly under the description without a blank line. Parsers will swallow the text into the summary or body.
- **Lowercase Breaking Change**: Writing `breaking change:` or `Breaking-Change:`. The token MUST be uppercase `BREAKING CHANGE:` or `BREAKING-CHANGE:`.
- **Missing Colon-Space**: Writing `feat(parser):add support` or `fix:bug`. The terminal `: ` (colon followed by space) is REQUIRED.
- **Conversation Slop**: Leaking prompt instructions, issue template checkboxes, or raw scratchpad thoughts into the commit message.
- **Diff Narration**: Reciting line-by-line file edits or writing in the first person ("I modified auth.ts to add a check..."). Focus on the defect, architectural intent, and contract change instead.
- **Bundled Commits**: Writing `feat: implement login and fix table overflow`. Split into a `feat` commit and a `fix` commit.
