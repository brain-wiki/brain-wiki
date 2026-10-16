---
id: 01M3250V00TYHS61N0VCPT6KZ8
type: design
title: "Status and supersession"
aliases: ["02 §6.3"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#63-status-and-supersession"
---
# Status and supersession

`status` says whether a note is current:

| `status` | Meaning | In retrieval |
|---|---|---|
| `active` | Current knowledge | Ranked normally |
| `superseded` | Replaced by a newer note; kept as history | Ranked lower; carries a banner naming its replacement ([[04-5-supersession-guard\|04 §5]]) |
| `archived` | No longer relevant; kept | Left out of search unless asked for |

When a newer note replaces an older one, the older note gets
`status: superseded` and names its replacement:

```yaml
status: superseded
bw-superseded_by: "[[Use SQLite FTS5 for local search]]"
```

- `bw-superseded_by` MUST be one quoted link, and MUST appear only with
  `status: superseded` (BW119; `lint --fix` sets the status).
- The target MUST resolve to a note (BW119) and MUST NOT be the note itself
  (BW119). Notes MUST NOT form a supersession cycle (BW307).
- Chains are allowed: if B replaces A and C replaces B, A and B each name
  their direct replacement, and readers follow the chain to the newest
  note (§7).
- `status: superseded` without `bw-superseded_by` is valid: the note is
  ranked lower, but no guard points anywhere.
- The newer note declares nothing. The index derives the reverse direction
  ("supersedes") from the older note's field. The newer note MAY mention
  its predecessor in a sentence with a link.

Why metadata and not a relation: lifecycle is a property of the old note,
and one field written in one place gives the guard (§7) a single direction
to follow, whichever note an author edits.
