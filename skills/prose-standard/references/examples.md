# Worked examples

Adapted for this suite from the DeepSeek Harness calibration. Use each case to find the governing principle, not as text to copy. "Balanced" preserves every load-bearing proposition with the least explanation needed at that location.

## Preserve every factual clause

**Original:** "The coordinator serializes writes per session, flushes buffered events before disposal resolves, and reports backend failures to the caller."

**Over-trimmed:** "The coordinator serializes persistence."

**Balanced:** keep the original.

Remove decoration and repetition, not propositions. Actor, per-session scope, disposal ordering, and failure visibility are separate facts.

## Preserve ownership and timing

**Original:** "Provider work is cancelled during teardown."

**Balanced:** "The runtime requests provider cancellation before releasing the child scope; the provider remains responsible for joining its workers before disposal resolves."

**Over-detailed:** a chronological account of every promise and callback used to implement teardown.

The actor, the ordering, the point where ownership changes, and the completion guarantee are separate factual clauses.

## Public JSDoc includes failures

**Original:** "Returns the realm global."

**Balanced:** "Returns the initialized realm global. Throws if initialization has not completed or the realm has already been disposed."

**Over-detailed:** the internal state-machine branches and helper calls that lead to each throw.

Throws and state preconditions are caller-visible contract facts.

## Orient complicated code without narrating it

**Original:** "Worker realm support."

**Balanced:** "Owns the worker realm and its host bridge. Realm initialization is single-shot; disposal terminates the worker and rejects later calls. See the worker-isolation decision record for the protocol rationale."

**Over-detailed:** a paragraph-by-paragraph preview of the classes and helpers below.

Keep the module's role, dependencies, responsibilities, and non-obvious lifecycle behavior. Link architecture rationale and let the code show local control flow.

## Link rationale while keeping the local contract

**Original:** "Disposal is documented in the lifecycle decision record."

**Balanced:** "Disposal aborts the run and waits for provider quiescence. See the lifecycle decision record for ownership and race handling."

**Over-detailed:** repeating the record's promise choreography beside every disposer.

Keep the behavior and completion guarantee where callers need them. Link aggressively for the algorithm and rationale; a link cannot replace the local contract.

## Delete reasoning transcripts

**Over-detailed:** "First the loop checks whether the value is absent. If it is absent, the next branch returns early. Otherwise it continues, which is why the final assertion is safe."

**Balanced:** no comment when the code already expresses those branches. If the early return protects a non-obvious invariant, state only that invariant.

Do not compress a reasoning transcript into shorter narration; remove it.

## Configuration comments explain what the tree cannot

**Over-detailed:** "This entry loads the local filesystem provider, followed by the policy plugin, followed by the read, write, and edit tools", when the adjacent entries already show that order.

**Balanced:** "Load policy before the model-facing tools so their write and edit calls pass through the read-before-mutation gate."

Keep the consequence of order, a surprising scope rule, or a security boundary. Let the configuration show its own inventory.

## Do not trim for word count alone

**Current:** "The adapter converts provider errors into the shared error type so callers can handle authentication, rate-limit, and transient failures uniformly."

**Shorter but worse:** "The adapter normalizes provider errors."

**Balanced decision:** keep the current sentence unless a link or surrounding contract already lists the failure categories. The shorter version loses the consequence and the distinctions without improving structure.

## Model-visible text follows ownership

**Over-trimmed:** "The tool returns errors when a call fails."

**Over-detailed:** copying another component's schema and renderer strings into this component's README.

**Balanced:** quote stable prompt, result, and error text owned here. Link the generated catalog for schemas and the consumer README for text another component owns; state only this component's conditions or deltas locally.

Wording that reaches a model is behavior, but duplication still drifts. Exactness belongs at the owner. A prose-only audit may identify suspect wording but must not silently change it when no owning runnable snapshot exists; leave it unchanged and report the deferral.

## Generated summaries must stand alone

**Over-trimmed:** "Approval request and policy service." The owner explains policy order and audit logging later, but the catalog exports only its first sentence.

**Balanced:** "Approval service that applies session policy before answerers and logs every ask and outcome pair to the requesting session." Keep non-catalog detail in later sentences.

Know what the generator extracts. That fragment must preserve the contract needed on its generated output.

## Limitations are contracts, not debt inventories

**Over-trimmed:** omitting a process-lifetime cache that makes configuration changes require a plugin reload.

**Over-detailed:** listing private helper cleanup and unused test-only accessors with no caller or maintainer consequence.

**Balanced:** "Provider selection is cached for the plugin lifetime; installing or repairing a provider requires a reload." Keep ordinary cleanup in its `TODO` or decision record.

Retain gaps and non-obvious constraints that affect use or safe maintenance. A README is not a backlog dump.

## Overcorrection traps

Enumerate the propositions before trimming. Each trap below is a real caught regression.

### Modality strengthened or weakened

**Original:** "Clients must honor Retry-After; retrying sooner may extend the block."

**Over-trimmed:** "Honor that value, since retrying sooner extends the block."

**Balanced:** "Clients must honor Retry-After; retrying sooner may extend the block."

"May" is a possibility the reader must budget for; turning it into "extends" claims certainty, and dropping "must" turns an obligation into advice.

### A negative guarantee dropped

**Original:** "The cache never returns a record from a later generation."

**Over-trimmed:** "The cache returns the current generation."

**Balanced:** keep the negative guarantee. "Never returns a later generation" and "returns the current generation" are different promises at a boundary.

### Ownership lost

**Original:** "The caller owns the returned buffer; the library must not retain it."

**Over-trimmed:** "Returns a buffer."

**Balanced:** keep the ownership clause. A consumer that frees or mutates it without knowing ownership introduces a use-after-free.

### Measured bound detached from its source

**Original:** "The 4 MiB ceiling is measured: the largest generated module is 3.1 MiB."

**Over-trimmed:** "The ceiling is 4 MiB; the largest module is 3.1 MiB."

**Balanced:** keep "measured". Without it, nobody re-measures before raising the ceiling.
