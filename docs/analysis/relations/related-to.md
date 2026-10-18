# related_to: related, without a stronger claim

Status: concluded.
Study: [Typed relations](README.md).
Verdict: drop; a plain link already says it.

Format 2's peer family said two notes are related and nothing more. This
analysis asks whether that needs a typed relation.

## At a glance

- **A plain link already means "related".** It gives backlinks, neighbors, and a line on the map, which is everything related_to gave.
- **No behavior of its own.** related_to had no guard, and its one consumer, the `related` search intent, read plain links too.
- **Dropping it removes a concept.** "See also" stays what it is in every wiki: links in the body.

## 1. Definition

A related_to B: A and B are related, without a claim that one is part of,
rests on, replaces, or conflicts with the other.

| Stronger claim | Where it belongs |
|---|---|
| Part of | `bw-part_of` |
| Rests on | `bw-depends_on` |
| Replaced by | `bw-superseded_by` |
| Read both | `bw-conflicts_with` |

## 2. History

| When | What |
|---|---|
| Formats 1 and 2 | The peer family: `related_to`, symmetric, with aliases `related`, `see_also`, `similar_to`, `analogous_to`. No guard |
| Format 2 consumers | The `related` search intent, which added `related_to` and plain-link neighbors alike; `neighbors` by relation; a dock chip on the map |
| Format 3 (`4b25b37`) | Removed. Each relation became a plain link |

## 3. Use cases

| Kind | Example | What covers it |
|---|---|---|
| See also | "Search Benchmarks" from "Use SQLite FTS5 for Local Search" | A link in the body or in `## Relations` |
| Similar | Two notes on similar designs in different topics | A link in a sentence that says how they are similar |

## 4. Behaviors

None beyond what a plain link gives: backlinks, `brain_neighbors`, and the
map.

## 5. Today without it

A plain link covers every use case. There is no gap.

## 6. Design questions

1. **Is "see also" worth a field, for people who want structure?**
   Settled (2026-10-18): no. A field with no behavior is a second way to write a link,
   which the [fewer concepts](../README.md#principle-fewer-concepts)
   principle rules out. People who want a list write one under
   `## Relations`.

## 7. Against the criteria

| Criterion | Result | Why |
|---|---|---|
| C1 engine behavior | fail | Nothing the engine would do differs from a plain link |
| C2 one distinct concept | fail | It duplicates the plain link |
| C3 to C8 | n/a | Not reached: a fail on C1 or C2 ends the analysis |

## 8. Verdict

**Drop.** related_to stays a plain link. `bw-related_to` is an unknown
field (BW118), and the converter for the new format writes a format 2
`bw-related_to` as plain links under `## Relations`.

### Test case 1: an old field converts to links

```text
topics/Search/Use SQLite FTS5 for Local Search.md   format 2: bw-related_to: ["[[Search Benchmarks]]"]
```

- After conversion the note has no `bw-related_to`, and its `## Relations`
  section holds a plain link to Search Benchmarks, which shows as a
  backlink on that note.

## 9. Open questions

None. Settled on 2026-10-18: drop.

## Sources

- [Background](background.md) for the format 2 peer family and the
  `related` intent.
