---
id: 01M3250V00AS6H0K2XBNWEKY5C
type: guide
title: "Convert notes from brain-wiki 0.1"
tags: [user-guide]
source: "docs/user/maintenance.md#convert-notes-from-brain-wiki-01"
---
# Convert notes from brain-wiki 0.1

brain-wiki 0.1 kept facts and relations in `bw-claims` and `bw-<verb>`
fields (format 2) or in `## Claims` and `## Relations` sections (format 1).
Those notes still work and stay searchable; lint reports them as BW117.
Convert them in one undoable run:

```sh
brain lint --fix --dry-run       # the diff
brain lint --fix
```

| Before | After |
|---|---|
| `bw-claims` | `## Facts` bullets (the text only) |
| `bw-claims-superseded` | `## History` bullets, struck through |
| Claim sources | `bw-sources` links; inbox paths point to `archive/` |
| `bw-depends_on`, `bw-related_to`, … | `## Related` bullets, such as `- Depends on [[x]]` |
| `bw-supersedes` / `bw-superseded_by` | `status: superseded` and `bw-superseded_by` on the older note |

Episodes are not converted.
