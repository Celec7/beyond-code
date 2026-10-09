# Test design

Details for the red, green, and refactor steps in [SKILL.md](../SKILL.md#method).

## Expected results need an independent basis

An assertion is only as good as its expected value. Derive it from the requirement, a worked example, or known-good data. Reimplementing the production calculation inside the assertion can reproduce the same mistake and pass.

```ts
// Weak: repeats the implementation's formula.
expect(total(cart)).toBe(items.reduce((s, i) => s + i.price * i.qty, 0))

// Strong: a worked example with a hand-computed expectation.
expect(total(cart)).toBe(42)
```

## Test through a stable interface

Assert on the caller-visible result. Assert on internal calls only when those calls carry a real contract, such as limiting billable requests. Otherwise the test breaks on a behavior-preserving refactor.

```ts
// Coupled to internals: fails when the cache is refactored away.
expect(spy).toHaveBeenCalledTimes(1)

// Behavior: fails only when the observed result is wrong.
expect(load('key')).toEqual(expected)
```

## Doubles control dependencies, not the behavior under test

Replace the external boundary, then exercise the real logic behind it. To test retry behavior, control the service responses and let the real retry loop run; do not replace the retry loop.

## A worked cycle

1. Red: write one test for one caller-visible result. Run it and confirm it fails for the intended reason, not an import error or a broken fixture.
2. Green: implement only what the test requires. Run the same test.
3. Refactor: improve names and remove duplication within scope, keeping the test green.
4. Repeat vertically. Do not write a batch of tests before the first implementation.

If the test passes immediately, the behavior may already exist, or the test may miss it. Do not manufacture a failure by changing an expected value arbitrarily.
