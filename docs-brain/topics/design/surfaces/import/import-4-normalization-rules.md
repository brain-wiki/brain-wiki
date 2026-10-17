---
id: 01M3250V00D9B08GTT20RGDDK7
type: design
title: "Normalization rules"
aliases: ["Import §4"]
source: "docs/design/import.md#4-normalization-rules"
---
# Normalization rules

### 4.1 Status

| Original value (case-insensitive) | `status` | `bw-stage` |
|---|---|---|
| `active`, `superseded`, `archived` | the value, lowercased | — |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value |
| anything else (`draft`, `wip`, `done`, `evergreen`, …) | `active` | the original value |

The original string is kept in `bw-stage`, so no information is lost and
users can map it back. An existing `bw-stage` is not overwritten. A note
mapped to `superseded` still needs `bw-superseded_by` to name its
replacement.


### 4.2 Link properties

Properties that hold wikilinks (`up`, `parent`, `related`, `see_also`,
`next`, `source`) are left as they are. Format 3 has no typed relations to
convert them into ([[d33-no-meaning-extraction|D33]]), and
brain-wiki indexes links from the body only, so these properties do not
appear in backlinks or neighbors. They can still be filtered with
`--where`. A user who wants them in the link graph can move them into the
body.


### 4.3 Other fixes

- `tags` written as a string becomes a list, split on commas, with
  leading `#` removed (phase 1).
- `aliases` written as a string becomes a list, split on commas
  (phase 1).
- Nested frontmatter mappings are only reported (BW102). Flattening them
  would guess at meaning.
