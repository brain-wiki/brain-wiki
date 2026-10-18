# supersedes: replaced by a newer note

Status: built in format 4, 2026-10-18 ([D39](../../decision/d39-relation-fields.md)).
Study: [Typed relations](README.md).
Verdict: keep `bw-superseded_by` as it is, and give it the same field shape as the other relations.

Supersession is the one relation format 3 kept: an old note names its
replacement in `bw-superseded_by`, and retrieval never returns the old note
without the new one. It already has the shape this study arrived at: one
field, in one direction, on one side, with a guard. This analysis checks it
against the criteria and the other relations.

## At a glance

- **Already the target shape.** One field on the old note, links only, a guard the bench holds at 100% recall.
- **The old note is the right side.** Its status changes anyway, and its readers are the ones who must be redirected.
- **One inconsistency.** It holds exactly one link, while the other relation fields hold a list.

## 1. Definition

A superseded_by B: A was replaced by B; A is kept as history, and B is
current. The note carries `status: superseded`.

| Not supersession | Example | Where it belongs |
|---|---|---|
| No longer relevant, no replacement | A note about a retired tool | `status: archived` |
| Disagrees, unresolved | Two competing proposals | `bw-conflicts_with` |
| Builds on | A new study that extends an old one | `bw-depends_on`, or prose |

## 2. History

| When | What |
|---|---|
| Formats 1 and 2 | The lineage family: `supersedes` on the newer note, inverse `superseded_by` on the older, with aliases `replaces`, `obsoletes`, `replaced_by`, `obsoleted_by`. A guard, chains followed up to 5 hops |
| [D5](../../decision/d05-supersession-guard.md) | The supersession guard: a replaced note never comes back without its replacement |
| Format 3 (`4b25b37`) | Kept as metadata: only `bw-superseded_by` on the old note, with `status: superseded`. A format 2 `bw-supersedes` is converted onto the old note |

## 3. Use cases

| Kind | Example | What it gives |
|---|---|---|
| A decision reversed | "Use Ripgrep for Search" superseded by "Use SQLite FTS5 for Local Search" | A search for ripgrep returns the FTS5 decision with it |
| A policy revised | "SQLite Version Policy" superseded by "SQLite Version Policy 2027" | The old policy is history; notes resting on it are flagged ([depends_on](depends-on.md)) |
| A conflict resolved | The losing proposal superseded by the winning one | The conflict guard ends and supersession takes over ([conflicts_with](conflicts-with.md)) |

## 4. Behaviors

All exist today.

| Behavior | What it does |
|---|---|
| Guard | A hit on a superseded note returns its replacement, following the chain to the newest note, on top of the result limit |
| History | A hit on a newer note lists the notes it replaced |
| Ranking | Superseded notes rank ×0.35 |
| Lint | BW119 (malformed, unresolved, self, or set without `status: superseded`; the fix sets the status), BW307 (cycles) |
| Map | The `superseded` flag and its own link color |

## 5. Today without it

Not applicable: it exists. Gaps:

| Gap | What happens |
|---|---|
| Field shape | `bw-superseded_by` holds exactly one link; `bw-part_of`, `bw-depends_on`, and `bw-conflicts_with` hold one or more |
| A split | A note replaced by two notes can name only one of them |

## 6. Design questions

1. **Which side holds the field?** Settled by format 3 and kept: the old
   note. Its `status` must change anyway, so one edit does both, and its
   readers are the ones the guard redirects. The newer note declares
   nothing; "supersedes" is the backlink.
2. **Same field shape as the other relations?** Settled (2026-10-18): yes. Every
   relation field holds one or more quoted links, written as one value or
   a list, so people learn one shape. For supersession, more than one link
   means a split, and the guard returns every replacement.
3. **Is `status: superseded` a second concept for the same fact?** No.
   Status is the note's lifecycle and exists without the field: a note can
   be superseded with no known replacement. The field adds where to go,
   and BW119 keeps the two consistent.

## 7. Against the criteria

| Criterion | Result | Why |
|---|---|---|
| C1 engine behavior | pass | The guard, history, and ranking |
| C2 one distinct concept | pass | Nothing else redirects a reader from an old note to a new one |
| C3 declared by the author | pass | Written on the old note |
| C4 writable by direct edit | pass | One field and a status, fixed together by lint |
| C5 links only in frontmatter | pass | Quoted links only |
| C6 prose stays free | pass | Why it was replaced goes in prose, or nowhere |
| C7 one direction, safe chains | pass | One direction; chains are one kind, followed to the newest note, cycles are BW307 |
| C8 cost | low | Exists; the shape change is small |

## 8. Verdict

**Keep `bw-superseded_by` as it is, and give it the same field shape as
the other relations.**

```markdown
---
title: Use Ripgrep for Search
status: superseded
bw-superseded_by: ["[[Use SQLite FTS5 for Local Search]]"]
---
```

- **Change:** the field takes one or more links, like every relation
  field; the guard returns each replacement. A single value without
  brackets stays valid.
- **Out of scope:** a field on the newer note.
- **Evidence it works:** the retrieval bench's supersession cases, which
  pass today, and the test case below.

### Test case 1: a note split in two

```text
topics/Notes App/Sync Design.md              status: superseded
                                             bw-superseded_by: ["[[Sync Protocol]]", "[[Sync Conflict Rules]]"]
topics/Notes App/Sync Protocol.md
topics/Notes App/Sync Conflict Rules.md
```

- A search hit on Sync Design returns both replacements.
- Reading either replacement lists Sync Design as the note it replaced.

## 9. Open questions

None. Settled on 2026-10-18: `bw-superseded_by` takes one or more links,
like every relation field, so a split can name each replacement.

## Sources

- [brain format §6.3 and §7](../../design/brain-format.md#63-status-and-supersession).
- [D5](../../decision/d05-supersession-guard.md),
  [D32](../../decision/d32-format-3.md).
- [Background](background.md) for the format 2 lineage family.
