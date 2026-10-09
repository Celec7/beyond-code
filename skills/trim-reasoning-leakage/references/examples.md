# Worked examples

Adapted for this suite from the DeepSeek Harness calibration. Use each case to identify the governing principle, not as text to copy. This file quotes leaked wording on purpose; the recall batteries exclude this directory.

## Dead citations

### Decision ordinal with a committed owner

**Leaked:** "Slash input resolves against the visible catalog (decision 21)."

**Fixed:** "Slash input resolves against the visible catalog: the plain-text-reference decision, owned by <path>."

The ordinal resolves nowhere at HEAD; the decision's name and owning file do. Name the owner at least once per file.

### Decision ordinal without an owner

**Leaked:** "The registry rejects duplicate names (decision 7: names are flat, no namespacing)."

**Fixed:** "The registry rejects duplicate names; names are flat, with no namespacing."

No committed artifact owns "decision 7", so the citation is deleted but its factual clause is restated.

### Audit item codes

**Leaked:** "Rendering is pure: same snapshot, same string (audit R3)."

**Fixed:** "Rendering is pure: same snapshot, same string."

### Section numbers of uncommitted drafts

**Leaked:** "Layering follows the design (v2 §3.2): `src/core/` is the pure core."

**Fixed:** "Layering: `src/core/` is the pure core."

Contrast: "escapes per RFC 9110 §10.1.5" stays. An external standard resolves outside the repository by design, and a committed document may be cited by section.

### Plan-phase labels

**Leaked:** "`src/client/` is the shell (T4); the P-I migration owns the adapters."

**Fixed:** "`src/client/` is the shell; the adapters live in `src/client/adapters/`."

## Stack and PR vantage

### Stack position in durable prose

**Leaked:** "A future remote backend implements this interface (the sandbox backend is a later PR in this stack)."

**Fixed:** "A remote backend can implement this interface without changing the render layer."

Durable prose cannot see the stack. The pending work lives in the PR, a `TODO`, or an issue.

### "This PR" in a README

**Leaked:** "This PR adds cursor-based pagination to the session list."

**Fixed:** "The session list paginates by cursor."

## Change narration and version stamps

### War story with a PR number

**Leaked:** "Colors used to come from `--widget-*` tokens, which nothing defined, so it always rendered the fallbacks; the alias tokens fixed that (PR #88)."

**Fixed:** "Colors come from the alias tokens; an undefined token renders the fallbacks."

Both live facts survive: the current mechanism and the standing failure behavior. The bug's biography belongs to the PR and its decision record.

### Removal narration

**Leaked:** "The `probe` field is gone with the removal cut; badges ride the generic projection pair now."

**Fixed:** "Badges use the generic projection pair."

Readers who never saw `probe` learn nothing from its absence. "Now" contrasting with a deleted past is a version stamp.

### Fixed regression becomes counterfactual present

**Leaked:** "This used to double-encode multibyte labels."

**Fixed:** "Without the byte-length guard, multibyte labels double-encode."

The regression pin survives as a present-tense counterfactual that names the guard.

### Indexical version stamps

**Leaked:** "Batch rendering is synchronous this cut; the async path is roadmap work."

**Fixed:** "Batch rendering is synchronous." The deferral lives in `TODO(widget-batch):` at the call site.

## Review choreography

### Review verdicts as prose

**Leaked:** "Rejected in review: caching the resolved spec. We keep resolution per-call."

**Fixed (in an alternatives-considered section):** "**Caching the resolved spec.** Rejected: the spec depends on per-call cwd, so a cache keyed by request would serve stale roots."

The alternatives genre is the sanctioned home; the reviewer and the round are not part of the rationale.

### Draft ordinals

**Leaked:** "As of v5 of this note, the loader also validates manifests."

**Fixed:** "The loader validates manifests."

## Reviewer-addressed justification

### Arguing a cast

**Leaked:** "The cast is safe: the SDK constructed the object, it just does not declare the optionals strictly enough."

**Fixed:** "The SDK constructs this object with every optional populated; the declared type is looser than the runtime guarantee."

State the invariant a maintainer must not break. If the invariant is visible in the code, delete the comment instead.

### Appeal to review authority

**Leaked:** "This is correct because the reviewer confirmed the wrapping order."

**Fixed:** deleted; the wrapping order is stated in the function's `@returns`.

## Restatement and derivation

### Control-flow narration

**Leaked:** "First we normalize the label, then we truncate it, then we wrap it."

**Fixed:** deleted. The lines below say the same thing in code.

### Test walkthrough

**Leaked:** "This test creates a session, sends two messages, waits for the second reply, and then asserts the log has four entries."

**Fixed:** "Two round-trips must produce exactly four log entries; the projection dedupes the shared prefix."

## Hedges and planning residue

### Unmarked deferral

**Leaked:** "Probably fine to render eagerly for now."

**Fixed:** deleted; the deferral already has its `TODO(widget-batch):` marker. If no marker exists, write one instead of keeping the hedge.

### Vague sizing

**Leaked:** "A 64 KiB buffer should be enough for most cases."

**Fixed:** "64 KiB holds the largest observed frame (48 KiB) with headroom; a larger frame fails loudly in `decode`."

## Authoring-language slips

### Outside a code fence

**Leaked:** "The renderer runs on the client 端; see the 设计稿 for spacing. ---- 私有 ----"

**Fixed:** "The renderer runs on the client side; spacing follows the Figma frame `widget-badges`."

### Inside a paired fence

**Leaked in both files:** `// 更新这里 before returning` inside a verbatim code block.

**Fixed in both files:** `// Update this before returning.`

Fix the block once and copy the byte-exact fence into both language files; translating one side differently breaks the pairing contract.

## Behavior-visible candidates

**Suspect:** an exported JSDoc sentence says "available for now", and a generator copies it into a model-visible catalog.

**Wrong:** rewrite only the source, or hand-edit only the generated catalog.

**Right:** trace the generator's fan-out, update the owner, regenerate every derivative, and update the owning snapshot. If the authorized scope has no owning scenario, leave the wording and report the deferral.

## Keeps

### Issue references are durable on every surface

**Keep:** "The cap applies to the complete rendered value, wrappers included (issue #1470 owns the follow-up)."

An unaided pass deleted this as "issue citations belong in notes". Wrong: issues resolve at HEAD from any surface, and "#N owns the follow-up" is the sanctioned home for deferred work.

### Dead name-drops are not owners

**Delete:** "Badge renderer over the widget seam (see the widget-rendering RFC)."

No committed file answers to "the widget-rendering RFC", so the pointer is dead. Retarget it to the committed owner if one exists.

### Suppression justifications

**Keep (after fixing):** `// oxlint-disable-next-line no-non-null-assertion -- the one-element literal guarantees index 0.`

The justification clause is required prose. If the stated reason is false, fix the reason; never delete it.

### Measured bounds

**Keep:** "Depth cap (measured: 512 nests ≈ 0.15s synchronous; 4096 blocks the loop)."

The measurement pins the constant against uninformed retuning, and "measured" marks data rather than a guess.

### Runtime old/new is not change history

**Keep:** "The old connection drains before the new one accepts."

"Old" and "new" name live runtime objects during handover, not repository states.

### Runtime natural time is not a version stamp

**Keep:** "What is today's date?"

The prompt asks about the runtime clock; "today" does not contrast repository states.

## Overcorrection traps

Enumerate a passage's propositions before trimming it. Every trap below is a real caught regression.

### Flipping an obligation into an endorsement

**Original:** "These direct registrations are exceptions pending migration to slots."

**Overcorrected:** "These direct registrations are sanctioned exceptions."

**Right:** keep "pending migration"; "sanctioned" blesses the status quo.

### Promoting a hypothetical to a shipped feature

**Original:** "A future IPC-based shell subclasses the executor and overrides `spawn`."

**Overcorrected:** "An IPC-based shell subclasses the executor and overrides `spawn`."

**Right:** "A hypothetical IPC-based shell, which does not exist, would subclass the executor and override `spawn`."

### Deleting a true fact with the transcript around it

**Original:** "The gate notice narrates the check order; the notice text is also what `verify-doc-typecheck` compiles against."

**Overcorrected:** deleted the whole sentence as narration.

**Right:** "The notice text is what `verify-doc-typecheck` compiles against."

### Dropping the measurement source while keeping the number

**Original:** "The 4 MiB ceiling is measured: the largest generated `py-types` module is 3.1 MiB."

**Overcorrected:** "The ceiling is 4 MiB; the largest generated `py-types` module is 3.1 MiB."

**Right:** keep "measured", or nobody re-measures before raising the ceiling.
