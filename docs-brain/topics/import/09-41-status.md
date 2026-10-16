---
id: 01M3250V00CYA9J63BW8J0ECBR
type: design
title: "Status"
aliases: ["09 §4.1"]
tags: [import]
source: "docs/design/09-import.md#41-status"
---
# Status

| Original value (case-insensitive) | `status` | `bw-stage` |
|---|---|---|
| `active`, `superseded`, `archived` | unchanged | — |
| `draft`, `wip`, `in progress`, `in-progress`, `todo`, `review`, `in review`, `published`, `done`, `complete`, `completed`, `approved`, `shipped`, `evergreen`, `seed`, `sprout` | `active` | the original value |
| `abandoned`, `paused`, `on hold`, `cancelled`, `canceled`, `inactive` | `archived` | the original value |
| `deprecated`, `obsolete`, `replaced`, `outdated` | `superseded` | the original value (lint then asks for a `superseded_by` relation) |
| anything else | `active` | the original value |

The original string is always preserved in `bw-stage`, so no information is
lost and users can map it back.
