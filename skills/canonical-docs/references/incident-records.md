# Incident records

A postmortem is documentation, not a decision record. The [decision record](../../decision-records/SKILL.md) owns the rationale and the rejected alternatives; the postmortem owns the failure story.

## When to write one

Write one when a defect reached a user, a merged change, or a release, and:

- the mechanism is **subtle**, so a careful engineer would re-derive it the hard way;
- the escape is **systemic**, a gap in tests, tooling, or conventions rather than a one-off slip;
- rediscovery is **costly**, measured in real debugging time.

Link the guardrails the incident motivated: the tests, rules, or decision records added so the same class fails loudly next time.

## Required shape

Open with an executive summary of one short paragraph: what broke, the cause in plain terms, why the safeguards missed it, and the durable lesson. Then the incident sequence, the evidence, the causal chain, the impact, and the prevention.
