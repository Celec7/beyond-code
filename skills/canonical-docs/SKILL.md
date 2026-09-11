---
name: canonical-docs
description: Use when writing, updating, or auditing docs/, or when a document and the code it describes have drifted apart.
---

# Canonical Docs

`docs/` records how the system works today: architecture, subsystem contracts, cross-cutting invariants, and domain vocabulary. It is not a task tracker, a progress log, or a record of how the code got here.

## Place the Document Before Writing

A document's subject and its position in the tree fix its scope. Name the file after the concrete technical subject it governs. Do not sort documents into categories the tree does not have.

A fact lives in the tier whose job it is. Elsewhere, link there.

| Tier | Owns | Does not belong |
| :--- | :--- | :--- |
| Root `docs/<subject>.md` | System-wide architecture, cross-cutting contracts, shared invariants, domain vocabulary | Type definitions, single-module detail |
| `docs/subsystems/<name>.md` | One subsystem reference: type definitions, semantics, failure behavior | Architecture narration |
| `docs/cookbook/<action>.md` | Procedures with numbered verification steps | Design rationale |
| `docs/postmortem/<slug>.md` | Incident sequence, evidence, prevention | Teaching sequences |
| Package README | That package's contract: config, semantics, limitations | Other packages' concerns |
| JSDoc and code comments | Single-function mechanics, non-obvious local rationale | Anything a caller reads as a contract |

A package contract lives beside the package. It does not move into `docs/`. When a subject is too small for its own page, extend the page that already owns it rather than creating a new file.

## What Does Not Belong in `docs/`

A line earns its place by stating a fact about how the code runs today. These do not:

- **Task plans and progress**: checklists, breakdowns, status markers, completion percentages. These rot the moment the work lands.
- **Narrated history**: "previously", "renamed from", "used to", "no longer". State the current fact. Commits carry the history.
- **Status annotations in prose**: "implemented", "WIP", "future: ...".
- **Reasoning transcripts**: deduction paths, intermediate benchmarks, rejected alternatives. Keep the resulting contract and its rules.
- **Restated catalogs and types**: when source, a generator, or a type is authoritative, link to it. A hand-copied table drifts.
- **Emphasis everywhere**: bold and capitals lose their meaning when every other clause carries them. Mark the clause that changes behavior.
- **Private mechanics**: single-function behavior stays in JSDoc. `docs/` carries cross-module seams and invariant rules.

A conflict you cannot settle yet is not a fact. Leave it out, or state it explicitly as unresolved.

## Writing the Prose

Write with density. Every sentence states a fact about the running system.

- **Name actors and actions**: who calls whom, who owns a resource, who cleans up.
- **State timing and ordering**: synchronous or asynchronous, what must precede what, which order is guaranteed.
- **State negative guarantees**: what the system refuses to do, and what a caller must not assume. A refusal is as load-bearing as a capability.
- **State failure behavior**: does it throw, return null, emit a terminal chunk, retry, or fall back. Never leave the outcome ambiguous.

## Content Patterns

A contract section states what a seam governs, who provides it, who consumes it, and what sits outside it. It names its `Source:` path and carries the exported type verbatim, never retyped from memory. Prose covers only what the type does not: timing, preconditions, normalization, and failure semantics.

```markdown
## Process sandbox seam

The process-sandbox seam wraps a subprocess argv in a file-effect policy without
coupling consumers to a platform runner. `sandbox-local` supplies the OS
backends; `shell` consumers run inside it.

Source: `packages/sandbox/src/index.ts`

`SandboxMode` governs filesystem effects only. Network and process visibility
are outside this vocabulary.

```ts
type SandboxMode = 'read-only' | 'workspace-write' | 'danger-full-access'
```

Enforcement is a reported fact. `full` means the backend governs every file
effect promised by the mode; `partial` means an older kernel or host
configuration governs only a subset.
```

A bug-class rule gets an imperative heading (`## Report orthogonal outcomes independently`), the mistaken assumption callers make, and the invariant that prevents recurrence.

A domain concept gets one or two sentences saying what it IS, not what it does, plus its forbidden synonyms under `_Avoid_` (`Order`, `_Avoid_: Purchase, Transaction`). General programming terms stay out.

## Keeping Documents True

- **Present tense**: describe live mechanisms as they operate today.
- **Update the owner first**: when a public API, schema, invariant, or module composition changes, update its owning document before anything that links to it.
- **Superlatives rot fastest**: "the only", "always", "never", and "all" turn a hard rule into a sentence that expires. Write the exact condition instead, and delete the claim when the code stops supporting it.
- **Code wins**: when a document and verified code disagree, the document is wrong. Never paper over drift with a promise about the future.
- **Link by relative path**: cross-references use repository-relative Markdown paths, so a moved file breaks its links loudly.

Adopt the repository's documentation standard for metadata and taxonomy. When a repository has none, keep front matter to a description and a type, and let the file path carry the rest. Match the examples already in that repository before inventing a new layout.
