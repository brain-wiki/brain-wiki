---
id: 01M3250V00CDDHFFJ9DRBY6Z14
type: design
title: "Converting format 1 and 2 notes (BW117)"
aliases: ["Lint and reports §5.1"]
source: "docs/design/lint-and-reports.md#51-converting-format-1-and-2-notes-bw117"
---
# Converting format 1 and 2 notes (BW117)

The BW117 fix rewrites a note in format 3 and raises `brain.toml`'s
`format` to 3 in the same run:

| Format 1 or 2 | Format 3 |
|---|---|
| `bw-claims` (or a format-1 `## Claims` section) | `## Facts` bullets, text only; claim metadata is dropped |
| `bw-claims-superseded` | `## History` bullets, `- ~~text~~ (reason)` |
| Claim `src` file paths | `bw-sources` links: inbox paths mapped to `archive/`, `.md` dropped, deduplicated and merged with existing items; URLs kept; conversation refs (`host:session#T…`) dropped |
| `bw-<verb>` relations (or format-1 `## Relations` items) | `## Related` bullets, e.g. `- Depends on [[sqlite-version-policy]] — needs the trigram tokenizer`; a `part_of` to the note's own hub is dropped; a relation item that does not parse moves unchanged to `## Related` |
| `bw-superseded_by` relation | the `bw-superseded_by` field and `status: superseded` |
| `bw-supersedes: X` | a second fix on note X: `status: superseded` and `bw-superseded_by` linking back by the shortest unique name |
| Unprefixed `stage:` | `bw-stage` |

Items are appended to an existing `## Facts`, `## History`, or `## Related`
section rather than duplicating it. Episodes are never converted. Until a
note is converted, its claim text stays searchable
([[index-and-search-3-schema|index and search §3]]). Run `brain lint --fix
--dry-run` first to see the diff; `brain undo` reverses the whole
conversion.
