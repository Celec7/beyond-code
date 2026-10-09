# Anti-patterns and worked cases

Adapted for this suite from the DeepSeek Harness error-handling discipline. Each case names the failure and the safer disposition.

## Swallowing an unexpected failure

**Pattern:** `catch (e) { console.log(e) }` on a write, then returning normally.

**Problem:** A caller cannot tell whether the write committed, partially committed, or did nothing. Logging is not recovery, and the defect has been converted into apparent success.

**Safer:** Declare the outcome. If the operation cannot continue, stop dependent work, discard invalid state, or escalate. If the caller can recover, report the failure and the resulting state.

## Catch and continue without a safety claim

**Pattern:** A loop catches each item's failure and continues, returning a count of successes.

**Problem:** The caller may read a partial import as a complete one. Unless the operation is defined as best-effort, partial effects are an unstated guarantee.

**Safer:** Either define the operation as best-effort in its contract and return the failures, or make it atomic and roll back. Name the guarantee.

## Unbounded retry

**Pattern:** `while (true) { try { return await fetch(url) } catch { /* retry */ } }`

**Problem:** No budget, no cancellation, no owner, and no classification of retryable versus permanent failures. A permanent 404 loops forever.

**Safer:** Retry only safe, idempotent operations; classify the failure; bound the attempts or total time; honor cancellation; and give the retry an explicit owner.

## Retry without safe repetition

**Pattern:** Retrying a non-idempotent create after a timeout.

**Problem:** The first request may have committed. A retry can duplicate the effect.

**Safer:** Use an idempotency key, check state before retrying, or make the operation idempotent. State which precondition makes repetition safe.

## Containing a defect into success

**Pattern:** A top-level catch returns a default value for any `Error`, including `assertNever`.

**Problem:** A programming defect now looks like normal operation.

**Safer:** Contain only expected failures. Let unexpected defects fail loudly or escalate them; never translate them into a success result.

## Routing by message parsing

**Pattern:** `if (e.message.includes('timeout'))`

**Problem:** Machine identity is being read from display text. A wording change silently breaks handling.

**Safer:** Use a declared error type and a stable discriminant. Keep display text separate.

## Reporting without a next action

**Pattern:** "Something went wrong."

**Problem:** The reader cannot tell what failed, what is now true, or what to do.

**Safer:** Name the affected operation, the observed state and its uncertainty, and the safe next action. Localize through the application's mechanism; keep internal details out.

## Hiding an unknown outcome

**Pattern:** A failed delete shows an error toast while the row disappears.

**Problem:** The user cannot tell whether the delete took effect. Reporting must not imply a guarantee the system does not have.

**Safer:** Keep the data visible on failure. State the uncertainty and the safe next step on a persistent surface until the outcome is known.

## A reporting failure with no fallback

**Pattern:** The only failure report goes through a channel that can itself fail.

**Problem:** The user learns nothing when reporting fails.

**Safer:** Provide an independent fallback, such as default-enabled accessible logs. Persistent invalid state needs persistent visibility.
