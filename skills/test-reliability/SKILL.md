---
name: test-reliability
description: Use when designing or diagnosing tests involving concurrency, clocks, global state, subprocesses, shared resources, or asynchronous cleanup.
---

# Test Reliability

This skill is guidance, not a script. Make correctness depend on controlled conditions, not scheduling luck. A flaky test can expose a product defect or a broken fixture; distinguish them before adding compensation.

## When not to use

- Designing or reviewing a failure path in production code. Use [error-handling](../error-handling/SKILL.md).
- Writing the first test for a behavior with a clear interface. Use [tdd](../tdd/SKILL.md).

## Inputs and authorization

- **Required:** the test, fixture, or failing run in scope, and the real execution topology it runs under.
- **Authorization:** review and diagnosis alone do not authorize repairs or a redesign of the whole suite.

## Method

### Own the resource

Inspect the actual overlap: tests in one process, separate workers, independent commands, and jobs sharing a host. Process isolation does not isolate ports, fixed paths, databases, or surviving children.

For each acquired resource, identify its owner, atomic allocator, readiness signal, cleanup, and completion signal. Bind a server to port zero rather than finding a free port and claiming it later. Use private temporary directories and unique service namespaces. Register cleanup as soon as acquisition succeeds so assertions cannot bypass it.

Prefer instance-local dependencies. When changing environment variables, working directory, clocks, or global mocks, capture and restore the exact previous state, including absence. Keep the mutation narrow. Account for platform-owned semantics such as timestamp precision, case handling, signals, and delayed file-handle release.

### Synchronize on facts

Wait for readiness, a handshake, a state transition, or an owned promise. Sleep only makes time pass. Use a timeout to bound a wait, not to make the assertion true. When time itself is under test, control the clock and restore it afterward.

Cancellation starts cleanup; it does not prove completion. Await child exit, server close, and owned background work. Prove that late callbacks cannot mutate another test. Report cleanup failures rather than swallowing them or deleting resources owned by other work.

### Prove the mechanism

Match evidence to the failure:

- Global mutation needs exact restoration evidence.
- Lifecycle work needs completed teardown and absence of late side effects.
- A race needs controlled overlap, using barriers or equivalent synchronization.
- Shared host resources may need concurrent independent-process checks.
- A new guard needs a rejected case that demonstrably fails.

Stress runs supplement those observations. They do not replace them.

### Reject compensation without a reason

Retries, wider timeouts, and serialization need a reason tied to the actual constraint. A bounded external-service retry or legitimate exclusive resource can justify them; unexplained failure cannot. Preserve meaningful assertions and unexpected-error reporting.

## Validate and report

- Report the cause or fixture contract, focused evidence, environment limits, and cleanup result.
- Match the evidence to the risk: restoration, quiescent teardown, controlled overlap, or a concurrent independent-process check.
- Never describe a retry, a skipped test, or a pending run as passing.
