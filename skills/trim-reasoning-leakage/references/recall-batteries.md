# Recall batteries

Probes for the taxonomy in [SKILL.md](../SKILL.md#taxonomy). Every hit needs semantic judgment: the batteries over-match by design and under-match by nature. Pair them with an unpatterned read of the densest prose in scope.

## Invocation rules

- Add `--hidden --glob '!.git/**'` so dot-directories are searched; ripgrep skips them by default.
- Put exclusions last so a later include cannot re-admit them: `--glob '!<vendor>/**' --glob '!<generated>/**' --glob '!<frozen-records>/**' --glob '!<this-skill>/**'`. This file quotes leaked wording as calibration, so it self-hits; judge those hits as evidence.
- Use `-i` on natural-language probes so sentence-initial capitals hit. Keep the code-pattern probe case-sensitive.
- Bound complete phrases. `\bthis PR\b` must not match "this project" or "this provider".
- A zero-hit pattern proves nothing until it matches a known positive; a noisy pattern proves nothing until it rejects a near-miss negative. Calibrate both before trusting a corpus result.
- Target authoring-language probes at the opposite-language surface: search working-language residue in otherwise-English files, and change narration inside translated counterparts.

## English battery

```sh
rg -n --hidden '\(decision \d+\)?|\(audit [A-Z]\d|design §|\bplan §|\bT\d\b|\bW\d\b|\bP-I\b' <scope>
rg -n --hidden -i '\bthis PR\b|\bthis branch\b|\bthis stack\b|\blater PRs?\b|\bprevious commits?\b|\bthis commit\b' <scope>
rg -n --hidden -i '\bused to\b|\bno longer\b|\bpreviously\b|\bthe old\b|\bwas renamed\b|\bwas moved\b' <scope>
rg -n --hidden -i '\bv1\b|this cut|\bcut \d|\bfor now\b|roadmap' <scope>
rg -n --hidden -i 'rejected in review|review round|reviewer|as of v\d' <scope>
rg -n --hidden -i 'probably |should be enough|should suffice|it simply|is safe' <scope>
rg -n --hidden '§\d' <scope>
```

## Chinese battery

```sh
# Change or review narration in Chinese counterparts.
rg -n --hidden '评审|上一?轮|旧版|老的|不再|以前|本版|遗留' --glob '*.zh.md' <scope>

# Chinese authoring-language slips in otherwise-English Markdown.
rg -n --hidden '设计稿|评审|上一?轮|旧版|老的|不再|以前|本版|遗留|私有|(^|[^a-zA-Z])端([^a-zA-Z]|$)' --glob '*.md' --glob '!*.zh.md' <scope>

# The same slips inside code comments and JSDoc.
rg -n --hidden '(^[[:space:]]*(//|/\*|\*)|//|/\*)[^\r\n]*(设计稿|评审|上一?轮|旧版|老的|不再|以前|本版|遗留|私有|端)' --glob '*.{ts,tsx,js,jsx,mjs,cjs,css}' <scope>
```

## Known false-positive families

Judged and kept during calibration; expect them again.

- **Instrumental "used to"**: "the key used to sign requests" is instrumental, not temporal. The temporal form has a state before it ("colors used to come from").
- **Runtime old/new**: "the old connection drains before the new one accepts" names live objects during handover.
- **"This PR" in process docs**: documentation about PR workflow may legitimately say "PR"; the ban is on a document adopting one PR's vantage about the code.
- **`v1` as protocol or path segment**: `/v1/chat` endpoints and wire-format names are identifiers, not version stamps.
- **`§N` with a committed owner**: external standards and committed documents that own their numbering stay citable by section.
- **Runtime "today" and recorded timestamps**: prompts or tests that ask for the current date use natural time, not a repository stamp.
- **Alternatives-considered sections**: "rejected" inside a decision record's genre slot is the sanctioned home, not review choreography.
