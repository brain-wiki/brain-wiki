---
id: 01M3250V00D4JX0K7BDG2CGVQ5
type: design
title: "Identifiers"
aliases: ["02 §5"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#5-identifiers"
---
# Identifiers

| Thing | Form | Example |
|---|---|---|
| brain, note, episode | ULID: 26 characters, Crockford base32, uppercase | `01J9Z7Q2V8K3M4N5P6R7S8T9U0` |
| claim | `c-` + ULID | `c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C` |
| rule | `r-` + ULID | `r-01JA0C5D8E2F4G6H8J0K2M4N6P` |
| run | `run-` + ULID | `run-01JA0D7F9G1H3J5K7M9N1P3Q5R` |

- ULIDs sort by creation time, which keeps episode folders and claim lists
  naturally ordered and makes ids carry a timestamp without a separate field.
- Ids are permanent. Renaming or moving a file never changes its id.
- Ids MUST be unique within a brain. Lint reports duplicates (usually a
  copied file) and `--fix` re-mints the id of the newer copy.

## Relations
- part_of [[brain-format]]
