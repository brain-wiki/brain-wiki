---
id: 01M3250V00ZVTNWQDEA5KZT530
type: design
title: "Relations"
aliases: ["Brain format §6.6"]
source: "docs/design/brain-format.md#66-relations"
---
# Relations

A relation is a typed link from one note to another, held in a
frontmatter field. The body may explain it, in a `## Relations` section or
anywhere else, but brain-wiki reads only the field
([[d39-relation-fields|D39]]).

```yaml
bw-part_of: "[[App v2 Launch]]"
bw-depends_on:
  - "[[SQLite Version Policy]]"
  - "[[Build Server Setup]]"
bw-conflicts_with: "[[Vector-Only Search Proposal]]"
```

| Field | On which note | Means | The other note sees |
|---|---|---|---|
| `bw-part_of` | The part | It belongs to a whole: a project, a document, a series, a team | `has_part` |
| `bw-depends_on` | The dependent | It holds only while the target does; when the target is superseded or archived, it needs review | `depended_on_by` |
| `bw-conflicts_with` | Either note, once | Reading one without the other misleads | `conflicts_with` |
| `bw-superseded_by` | The old note | It was replaced by the target (§6.3) | `supersedes` |

- A field holds one or more quoted links, written as one value or a
  list. An item holds a link and nothing else (BW119 for
  `bw-superseded_by`, BW123 for the others). The order of items means
  nothing; where order matters, titles carry it.
- Each relation has one field, on one side, and the other note sees the
  relation as a backlink, so there are no inverse fields.
  `bw-conflicts_with` is symmetric: written once on either note, it
  applies to both.
- There are no alias fields. `bw-requires` is an unknown field (BW118).
- A target that does not resolve is BW124 (BW119 for
  `bw-superseded_by`), and a note naming itself is BW312 (BW119).
- A note's folder already says which topic it is part of (§2.1), so
  `bw-part_of` does not name the page of the note's own topic (BW313,
  fixed by removing the item). Naming another topic's page makes the note
  part of that topic too, without changing its folder. part_of cycles are
  BW315.
- `## Relations` in the body is free prose. It may explain the fields, say
  something else, or be absent. brain-wiki reads its links as ordinary
  body links and checks nothing against the fields.
- "Caused by" and "related to" have no field. A sentence with a plain link
  says them.

What the engine does with each relation:

| Relation | Behavior |
|---|---|
| `bw-part_of` | Reading a whole lists its parts by title; a search hit names its wholes; search can be scoped to a whole ([[index-and-search-6-search\|index and search §6, §7]]) |
| `bw-depends_on` | A note resting on a superseded or archived note is listed for review ([[index-and-search-9-other-queries\|index and search §9]]) |
| `bw-conflicts_with` | The conflict guard (§7), and open conflicts listed for review |
| `bw-superseded_by` | The supersession guard (§7) |
