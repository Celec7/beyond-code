---
name: canonical-docs
description: Maintain authoritative project documentation in docs/ (architecture, domain rules, subsystem specs, contracts, defensive patterns, and glossary). Enforces domain-driven naming, type-anchored contracts, seam-provider-consumer boundaries, and present-tense accuracy while rejecting ephemeral process slop. Use when documenting system design, syncing docs with code changes, or auditing docs for drift.
---

# Canonical Docs

`docs/` records the current architecture, boundaries, and verified system contracts. It is an authoritative technical reference for the living codebase, not an implementation tracker, task ledger, or meeting log.

Each fact has one home: the document whose job it is. Everywhere else, link there. Never duplicate full definitions.

## The Slop Checklist (Strictly Prohibited in `docs/`)

Keep ephemeral process debris out of formal documentation:

- **No task plans or schedules**: Task breakdowns, sprint checklists, and progress markers belong in ephemeral conversation context. They rot once code lands.
- **No narrated history or war stories**: State what the code does now. Never write "previously", "was renamed from", "used to be", or "refactored because". Git commits carry history.
- **No rotting status annotations**: Never write "implemented!", "WIP", or "future plan: ...". Unimplemented ideas are not contracts; implemented capabilities are current facts.
- **No reasoning transcripts**: Delete deduction paths, intermediate benchmark logs, and rejected local alternatives. Keep the resulting contract and its immutable rules.
- **No private implementation sprawl**: Single-function mechanics stay in code comments and docstrings. Formal docs record cross-module seams, invariant rules, and subsystem boundaries.

## Document Naming and Placement

A document's subject and tree position fix its scope. Do not force documents into arbitrary artificial categories. Name files directly after the concrete technical subject they govern (e.g. `architecture.md`, `chess-domain.md`, `agent-lifecycle.md`, `engine.md`, `defensive-patterns.md`, `testing.md`).

- **Root documents (`docs/<subject>.md`)**: Living references for system-wide architecture, core domain models, cross-cutting contracts, and shared invariants.
- **Nested directories (`docs/<tier>/<subject>.md`)**: Use subdirectories only when distinct groups naturally emerge:
  - `subsystems/<name>.md`: Detailed reference per subsystem. Root architecture links here instead of expanding lower-level detail.
  - `cookbook/<action>.md`: Step-by-step procedures with numbered verification checks.
  - `postmortem/<NNNN-slug>.md`: Incident timelines, evidence, and prevention.

## Core Content Patterns

Whatever document you are authoring, apply these concrete structural patterns where relevant:

### 1. Contract and Capability Boundaries
When describing a module, interface, or protocol, establish the boundary:
- State what the capability governs, who provides it, who consumes it, and what is explicitly outside this vocabulary.
- Anchor in **verbatim core types**: embed exported interfaces and data shapes as the factual bedrock. Use prose solely for timing, preconditions, normalization, and failure semantics.

### 2. Defensive Bug-Class Rules
When documenting non-obvious failure modes or fragile cross-module invariants:
- Use an imperative propositional heading (e.g. `## Report orthogonal outcomes independently`).
- Explain the subtle defect mechanism (what callers mistakenly assume) and the concrete invariant rule that prevents recurrence.

### 3. Canonical Domain Vocabulary
When introducing domain concepts:
- Define what a concept IS in 1 to 2 sentences, not what it does.
- List forbidden synonyms under `_Avoid_` (e.g. for `Order`, `_Avoid_: Purchase, Transaction`).
- Exclude general programming terms; include only concepts unique to this domain.

## How to Write the Prose

Write with density. Every sentence must state a living fact. Cut the filler, keep the contract:

- **Name actors and actions directly**: Who calls whom, who owns resources, who handles cleanup.
- **Define timing and ordering**: Explicitly state synchronous vs asynchronous guarantees, race-ordering rules, and sequence dependencies.
- **State negative guarantees**: What the system deliberately refuses to do. The explicit no-s are as valuable as the yes-s.
- **Specify failure behavior**: State whether an error throws, emits a terminal chunk, returns null, or triggers fallback recovery. Never leave error outcomes ambiguous.

## Golden Sample

```markdown
# Process Sandbox

The process-sandbox seam wraps a subprocess argv in a file-effect policy without coupling consumers to a platform runner. `sandbox-local` supplies the OS backends; `shell` consumers run inside it. Containers and remote execution are sibling implementations, not providers of this seam.

Source: `packages/sandbox/src/index.ts`

## Modes and enforcement

`SandboxMode` governs filesystem effects only. Network and process visibility are outside this vocabulary.

\```ts
type SandboxMode = 'read-only' | 'workspace-write' | 'danger-full-access'
\```

Enforcement is a reported fact. `full` means the backend governs every file effect promised by the mode; `partial` means an older kernel or host configuration governs only a subset. Callers requiring an absolute boundary must reject or surface `partial`.
```

## Metadata Standard

Every formal Markdown document starts with standardized YAML front matter:

```yaml
---
title: <Clear Document Title>
doc_type: architecture | contract | capability-seams | subsystem | api | defensive-patterns | glossary | cookbook | postmortem | maintenance-rules
status: current
authority: normative | descriptive | evidence | maintenance
canonical: true
summary: <One sentence stating the single responsibility of this document.>
---
```

Do not put authors, timestamps, PR links, or completion percentages in metadata. They rot immediately.

## Writing and Syncing Rules

- **Present tense only**: Describe living mechanisms as they operate today.
- **Sync on code drift**: Update the owning doc whenever public APIs, schemas, invariants, or module compositions change.
- **Code vs doc conflicts**: Update documentation to match verified code reality. Never mask drift with speculative future promises.
- **Machine-checkable links**: Cross-reference using relative Markdown paths.
