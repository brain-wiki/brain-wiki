---
id: 01M3250V009HE0BRQ0HDCW6MD2
type: guide
title: "Convert notes from older versions"
source: "docs/user/maintenance.md#convert-notes-from-older-versions"
---
# Convert notes from older versions

brain-wiki 0.1 kept facts and relations in `bw-claims` and `bw-<verb>`
fields (format 2), or in `## Claims` and `## Relations` sections (format
1). brain-wiki 0.2.0 to 0.3.2 wrote relations as `## Related` bullets (format 3).
Those notes still work and stay searchable. Lint reports them as BW117.
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
| `bw-part_of`, `bw-depends_on`, `bw-conflicts_with` with text after the link | The link in the field, the text as a `## Relations` bullet |
| `bw-has_part`, `bw-enables` | `bw-part_of` or `bw-depends_on` on the note they name |
| `bw-supersedes`, `bw-superseded_by` | `status: superseded` and `bw-superseded_by` on the older note |
| `bw-related_to`, `bw-caused_by`, and other verbs | `## Relations` bullets with plain links |
| Format 3 "Part of", "Depends on", and "Conflicts with" bullets | The same link in the field; the bullet stays |

Episodes are not converted.
