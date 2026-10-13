---
id: 01M3250V00CPMAJP5BKJCZWD3Z
type: design
title: "Relations"
aliases: ["02 §6.4"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#64-relations"
bw-part_of:
  - "[[02-6-notes]]"
---
# Relations

A relation is one string in a `bw-<verb>` field, one field per canonical
verb:

```yaml
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-conflicts_with: "[[Vector-only search proposal]] (unless: embeddings enabled)"
```

```text
field      = "bw-" verb ": " ( relation | list of relation )
verb       = canonical | alias                       ; table below
relation   = target [ " " qualifiers ] [ " " sep " " note ]
target     = "[[" link "]]" | "[" label "](" path ")"
qualifiers = "(" qualifier *( ", " qualifier ) ")"
qualifier  = word | key ( "=" | ": " ) value         ; e.g. supplies_to, weight=0.7, unless: x
sep        = "—" | "–" | "--" | "-"
```

**Canonical vocabulary.** Five families, eight verbs. The verb is always
written from the point of view of the note that holds the field.

| Family | Field on note A | Meaning | Inverse (on B) | Stored as | Guard |
|---|---|---|---|---|---|
| Containment | `bw-part_of: "[[B]]"` | A is a part, child, or member of B | `bw-has_part: "[[A]]"` | `A part_of B` | no |
| Dependency | `bw-depends_on: "[[B]]"` | A requires, builds on, or is caused by B | `bw-enables: "[[A]]"` | `A depends_on B` | no |
| Conflict | `bw-conflicts_with: "[[B]]"` | A contradicts B, or B is an exception that defeats A | `bw-conflicts_with: "[[A]]"` (symmetric) | `A conflicts_with B` | **yes** |
| Lineage | `bw-supersedes: "[[B]]"` | A replaces B; B is outdated | `bw-superseded_by: "[[A]]"` | `A supersedes B` | **yes** |
| Peer | `bw-related_to: "[[B]]"` | A and B are related without a stronger claim | `bw-related_to: "[[A]]"` (symmetric) | `A related_to B` | no |

Choices behind the table:

- **Explicit verbs, not positions.** Earlier designs used compass-style
  poles (up, down, same…). "Down" ended up meaning both "child" and
  "downstream effect", which sent propagation the wrong way. Plain verbs
  make direction obvious to people and models without reading a spec.
- **One canonical direction per family.** Either side may declare a
  relation; the index stores it once in canonical direction. This is what
  makes guard retrieval work no matter which note the author edited.
- **Domain meaning lives in qualifiers.** A finance note might write
  `bw-enables: "[[Cloud capex]] (supplies_to, weight=0.6, lag=1Q)"`, a legal
  note `bw-conflicts_with: "[[Clause 7.2]] (exception)"`, a research note
  `bw-depends_on: "[[Prior result]] (replicates)"`. The family drives retrieval
  and lint; the qualifier and note are stored and displayed but never
  change engine behavior. No vocabulary file to load, no compiler.
- **Guards are the reason typed relations exist.** See §7.

**Aliases.** The parser accepts alias fields (`bw-requires`, `bw-contains`…)
so people can write naturally, normalizes them, and records the alias as
the first qualifier. Lint (`migrate` profile: info; `strict`: warning)
suggests the canonical field, and `--fix` moves the item there.

| Alias | Canonical |
|---|---|
| `parent`, `child_of`, `member_of`, `in` | `part_of` |
| `contains`, `parent_of` | `has_part` |
| `requires`, `builds_on`, `uses`, `caused_by` | `depends_on` |
| `drives`, `causes`, `supports`, `unblocks` | `enables` |
| `contradicts`, `unless`, `invalidated_by`, `refutes`, `exception` | `conflicts_with` |
| `replaces`, `obsoletes` | `supersedes` |
| `replaced_by`, `obsoleted_by` | `superseded_by` |
| `related`, `see_also`, `similar_to`, `analogous_to` | `related_to` |

**Attributes.** `key=value` qualifiers are stored as attributes. Reserved
keys with defined types: `weight` (number in [-1, 1]), `sign` (`+`/`-`),
`lag` (string), `since`, `until` (dates), `unless` (string). Plugins MAY
interpret attributes (for example signed propagation over `depends_on`);
the core does not.

**Implicit containment.** A sub-topic's hub is `part_of` its parent
topic's hub because of where its folder sits (§2). The index stores this
like a written relation, so retrieval, `brain_neighbors`, and the map see the
topic tree; it has no line in any file, and writing it explicitly changes
nothing.

**Consistency rules** enforced by lint ([[lint-and-reports|06]]):

- If A `supersedes` B, then B's `status` SHOULD be `superseded`.
- A note MUST NOT supersede itself or form a supersession cycle.
- Contradictory declarations (A `part_of` B and B `part_of` A) are errors.
