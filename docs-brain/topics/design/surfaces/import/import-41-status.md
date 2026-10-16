---
id: 01M3250V00BCR5HQ1V8EWKW8W0
type: design
title: "Status"
aliases: ["Import §4.1"]
source: "docs/design/import.md#41-status"
---
# Status

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
