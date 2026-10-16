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
| `active`, `superseded`, `archived` | unchanged | — |
| `draft`, `wip`, `in progress`, `in-progress`, `todo`, `review`, `in review`, `published`, `done`, `complete`, `completed`, `approved`, `shipped`, `evergreen`, `seed`, `sprout` | `active` | the original value |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value (add `bw-superseded_by` to name the replacement) |
| anything else | `active` | the original value |

The original string is always preserved in `bw-stage`, so no information is
lost and users can map it back.
