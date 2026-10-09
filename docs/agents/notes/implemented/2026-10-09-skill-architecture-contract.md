# Skill architecture contract

**Status:** implemented
**Date:** 2026-10-09
**Owner:** [docs/skill-architecture.md](../../../skill-architecture.md)

## Problem

The suite's fourteen skills were host-agnostic but had no shared contract. Rules were duplicated across skills, nothing stated boundaries or authorization, and there was no way to adopt methodology from another collection (such as the DeepSeek Harness `.agents/skills/` set) without copying that repository's facts into skills meant to work everywhere. Nothing guarded the structure against drift.

## Decision

Adopt the contract in [docs/skill-architecture.md](../../../skill-architecture.md):

- Separate three content layers: **Method** (portable judgment, in `SKILL.md`), **Binding** (project facts, resolved from the project's existing documentation), and **Calibration** (examples, in `references/`).
- Split the suite into foundation skills and domain skills, and require domain skills to link foundations instead of restating them.
- Add four foundation skills: [prose-standard](../../../../skills/prose-standard/SKILL.md), [error-handling](../../../../skills/error-handling/SKILL.md), [trim-reasoning-leakage](../../../../skills/trim-reasoning-leakage/SKILL.md), and [skill-authoring](../../../../skills/skill-authoring/SKILL.md).
- Require every skill to carry a boundaries section, an inputs and authorization section, a method region, and a closing section, either `Validate and report` or a mode-specific closing.
- Do not mandate a project profile file. A skill names a binding by role, resolves it from existing project documentation, and stops to report a binding it cannot resolve.
- Move default record paths out of dot-directories: `docs/agents/notes/<status>/` and `docs/agents/work/`.
- Validate authored judgment with a failing baseline before the change and a post-change run before trusting a skill.

## Alternatives considered

- **Copy the DeepSeek Harness skills wholesale.** Rejected: they bind commands, paths, and gate names to one repository, which is exactly what breaks portability.
- **Mandate `.agents/project-profile.md`.** Rejected: it creates a second owner for facts the project already documents, so it drifts and violates one-owner. Raised during review and dropped.
- **Fold reasoning-leakage removal into `prose-standard`.** Rejected: it would lose the audit workflow, the leakage taxonomy, and the keep rules that separate durable references from transcripts.
- **Keep duplicated rules and rely on review.** Rejected: the duplication was the cause of the drift.
- **Force every skill into one flat checklist.** Rejected: a checklist invites mechanical application and hides the judgment.

## Consequences

- The suite grows from fourteen to eighteen skills, and each skill gains structure and length.
- Foundation skills form a dependency layer. Domain skills are shorter but require following links.
- Records now live under `docs/agents/`, which is writable and visible to search tools.
- Behavior tests cost subagent runs for each new judgment.

## Verification

- Structural validation over all eighteen skills: frontmatter, required sections, resolvable relative links, and no em dash.
- Before-and-after subagent runs for the four foundation skills:
  - `trim-reasoning-leakage`: the baseline deleted three durable facts and kept one dead citation; the change deleted none and resolved the citation.
  - `prose-standard`: the baseline strengthened a possibility ("may extend") into a certainty; the change preserved the modality.
  - `error-handling`: the baseline omitted reporting owners, an independent fallback, and the no-message-parsing rule; the change added them.
  - `skill-authoring`: the baseline summarized the workflow in the description; the change made the description trigger-only.
- Commits: `b5b5498`, `a7f5761`, `4e36f0d`.

## Evidence gaps

- The migrated domain skills were validated structurally, not behaviorally.
- `npx skills add` packaging was not exercised after adding `docs/`.
- No CI gate exists yet; the contract is enforced by convention. A mechanical check is the next phase.

## Conditions to reconsider

- Foundation and domain skills start duplicating rules again.
- Packaging or installation breaks on the new `docs/` tree.
- A project needs a binding source other than its existing documentation.
- Behavior tests show the contract does not change agent behavior.
