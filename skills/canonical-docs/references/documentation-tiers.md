# Documentation tiers

An optional, opinionated taxonomy for repositories with substantial, shared, or agent-written documentation. It is not the default. First follow the project's existing structure; adopt this preset only when there is none and a ready-made one is wanted, or when a large corpus needs a shared vocabulary for where facts live.

## The one rule

Each kind of fact has one home: the tier whose job it is. Everywhere else, link to that home. A tier earns its place by having a distinct job, and stating what does not belong in it is what keeps the taxonomy from drifting.

## Roles

Tier names and paths are examples. Map each role to the project's actual paths; do not create a parallel tree beside one that already exists.

| Tier | Job | Does not belong |
| --- | --- | --- |
| Standing agent instructions | Rules an agent needs in context every session, one to three lines each, linking the home | Stories, worked examples, situational procedures, rules restated from a linked home |
| Architecture overview | Ordered map of composition, main components, seams, and extension points | Type definitions, per-component detail, decision rationale, status annotations |
| Subsystem or reference pages | One page per subsystem: types, semantics, and the generated public API | Behavior narration, decision rationale |
| Decision records | Why a choice was made, what it beat, and its consequences | Migration plans and acceptance checklists once shipped; spec-speak |
| Incident records | Failure stories: what broke, why the safeguards missed it, and the guardrails added | Design rationale |
| Procedure or cookbook | Step-by-step how-tos with verification steps | Rationale; link the decision record instead |
| User guides | Product-facing tasks published to end users | Generated reference tables, contributor procedures, decision history |
| Module or package contract | The per-module contract: configuration, semantics, limitations, and extension points | JSDoc restatement, generated-catalog restatement, other modules' concerns |
| Generated reference | Exhaustive truth regenerated from source | Hand edits |
| Skills and agent workflows | Reusable judgment and specialized standards | Product or runtime contracts |
| Task state | Ephemeral working state | Not a tier; see below |

## Placement

| Kind of fact | Home |
| --- | --- |
| Bug or incident story | Incident record |
| Design rationale and rejected alternatives | Decision record |
| Current explanation of a system | Subsystem page, or the architecture overview for the map |
| Procedure with verification | Cookbook |
| Product-facing task | User guide |
| Module contract | Module README |
| Exhaustive generated truth | Generated reference, never hand-edited |
| Rule an agent needs every session | Standing agent instructions |
| Reusable judgment | A skill |
| Task state | The conversation; a work record only when a handoff needs one |

## Adopting it

1. Inventory the project's existing documentation and map each role to an existing path. Adopt only the roles that are actually missing.
2. Create only the directories that a real document needs. Do not scaffold an empty tree.
3. Record the role-to-path mapping where contributors will look, such as the project's agent instructions or a `docs/README.md`; [an example tree](../templates/documentation-tree.md) shows the shape.
4. Declare adoption explicitly, for example in the agent instructions, so a mechanical check can apply the tier rules only to projects that opted in.

## Boundary

- The [decision record](../../decision-records/SKILL.md) owns rationale; the [incident record](incident-records.md) owns failure stories.
- Sentence-level prose is owned by [prose-standard](../../prose-standard/SKILL.md).
- [SKILL.md](../SKILL.md) owns the placement procedure and the choice to establish a structure; this file owns the taxonomy itself.
