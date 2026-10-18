---
id: 01M3250V0061YFSEB7TWFWTHAD
type: design
title: "Status and supersession"
aliases: ["Brain format §6.3"]
source: "docs/design/brain-format.md#63-status-and-supersession"
---
# Status and supersession

`status` says whether a note is current.

| `status` | Meaning | In retrieval |
|---|---|---|
| `active` | Current knowledge | Ranked normally |
| `superseded` | Replaced by a newer note, kept as history | Ranked lower, with a banner naming its replacement ([[index-and-search-5-guards\|index and search §5]]) |
| `archived` | No longer relevant, kept | Left out of search unless asked for |

When a newer note replaces an older one, the older note gets
`status: superseded` and names its replacement:

```yaml
status: superseded
bw-superseded_by: "[[Use SQLite FTS5 for local search]]"
```

- `bw-superseded_by` holds one or more quoted links, like every relation
  field (§6.6): a note split in two names both replacements. It MUST
  appear only with `status: superseded` (BW119). `lint --fix` sets the
  status.
- The target MUST resolve to a note and MUST NOT be the note itself
  (BW119). Notes MUST NOT form a supersession cycle (BW307).
- Chains are allowed. If B replaces A and C replaces B, A and B each name
  their direct replacement, and readers follow the chain to the newest
  note (§7).
- `status: superseded` without `bw-superseded_by` is valid. The note
  ranks lower, but no guard points anywhere.
- The newer note declares nothing. The index derives the reverse
  direction ("supersedes") from the older note's field. The newer note MAY
  mention its predecessor in a sentence with a link.

Supersession is a field on the old note, so the guard has one direction to
follow whichever note an author edits
([[d05-supersession-guard|D5]]).
