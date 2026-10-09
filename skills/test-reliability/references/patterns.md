# Test reliability patterns

Concrete patterns for the decisions in [SKILL.md](../SKILL.md). Adapt them to the project's test runner; the shapes matter more than the exact API.

## Allocate resources atomically

Claim the resource with its owner's allocator, never by checking availability and binding later.

```ts
// Bind to an ephemeral port and read the assigned address.
const server = createServer(handler)
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address() as AddressInfo

// A private, per-test root; the OS guarantees uniqueness.
const root = await mkdtemp(join(tmpdir(), 'suite-'))
```

Do not scan for a free port. Do not use a predictable shared path. Give a shared service a per-test namespace, and use exclusive creation when a path must not already exist.

## Contain process-global state

Treat `process.env`, `cwd`, fake timers, locale, module mocks, and global interception as exclusive mutable resources.

```ts
const had = Object.prototype.hasOwnProperty.call(process.env, 'HTTP_PROXY')
const prior = process.env.HTTP_PROXY
try {
  process.env.HTTP_PROXY = 'http://127.0.0.1:1'
  // exercise the behavior
} finally {
  if (had) process.env.HTTP_PROXY = prior
  else delete process.env.HTTP_PROXY
}
```

Capture absence as well as presence, restore the exact state, and register restoration immediately. Keep an `afterEach` fallback when failure before the local `finally` is plausible.

## Synchronize on facts

Wait for a readiness event, handshake, state transition, or owned promise. A sleep only makes time pass.

```ts
const ready = deferred<void>()
server.on('listening', () => ready.resolve())
await Promise.race([ready.promise, timeout(5_000)])
```

Use a timeout to bound the wait, never to make the assertion true. To place a race at a deterministic point, use a barrier or deferred promise rather than repetition.

## Dispose to quiescence

Register cleanup immediately after acquisition so an assertion failure still releases the resource. Calling `close()` or `kill()` is not complete teardown; await the owned completion signal.

```ts
try {
  // use the resource
} finally {
  await server.close()
  await Promise.all(children.map((child) => once(child, 'exit')))
}
```

When late completion is possible, prove that disposal prevents it from mutating another test.

## Respect platform-owned semantics

- A restored `mtime` may not equal the value written (filesystem timestamp precision). Take the expected value from a fresh read when the assertion depends on it.
- Environment variable names are case-insensitive on Windows, so two casings are one entry.
- File handles release asynchronously on Windows; a rename or remove may need a bounded retry.
- POSIX permissions and signals have no Windows equivalent; skip such a case explicitly with the reason rather than weakening it everywhere.

## Prove the mechanism

- Global mutation: show exact restoration.
- Lifecycle: show completed teardown and the absence of late side effects.
- A race: show controlled overlap with a barrier.
- A shared host resource: run independent processes concurrently when cross-process isolation is the fix.
- A new guard: introduce the rejected case and observe the intended failure.

Stress runs supplement these observations; they do not replace them.
