---
id: 01M3250V00VPS0NMCXDVD84KP6
type: design
title: "Identifiers"
aliases: ["Brain format §5"]
source: "docs/design/brain-format.md#5-identifiers"
---
# Identifiers

| Thing | Form | Example |
|---|---|---|
| brain, note, episode | ULID: 26 characters, Crockford base32, uppercase | `01J9Z7Q2V8K3M4N5P6R7S8T9W0` |
| rule | `r-` + ULID | `r-01JA0C5D8E2F4G6H8J0K2M4N6P` |
| run | `run-` + ULID | `run-01JA0D7F9G1H3J5K7M9N1P3Q5R` |

- ULIDs sort by creation time, which keeps episode folders ordered and
  gives every id a timestamp without a separate field
  ([[d12-ulids|D12]]).
- Ids are permanent. Renaming or moving a file never changes its id.
- Ids MUST be unique within a brain. Lint reports duplicates (BW105),
  usually a copied file, and `--fix` mints a new id for each newer copy
  of a note or topic page.
- Format 2 also gave each claim a `c-` id. The conversion drops them
  (§13).
