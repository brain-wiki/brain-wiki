---
id: 01M3250V003YS64ZYNPR0B97X3
type: design
title: "Frontmatter"
aliases: ["02 §6.1"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#61-frontmatter"
---
# Frontmatter

```yaml
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9W0
type: decision
title: Use SQLite FTS5 for local search
status: active
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-10-07
updated: 2026-10-09
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "https://sqlite.org/fts5.html"
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict`, minted by `lint --fix` | ULID | Unique in the brain (§5). |
| `type` | no (default `note`) | lowercase string | Open vocabulary. Suggested: `note`, `hub`, `concept`, `decision`, `howto`, `reference`, `person`, `project`, `source`, `meeting`. |
| `title` | no | string | Default: first `# ` heading, else file name without `.md`. |
| `aliases` | no | list of strings | Same meaning as in Obsidian; used for link resolution and search. |
| `tags` | no | list of strings | Without `#`. |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set; the retrieval engine only reasons about these three (§6.3). |
| `bw-superseded_by` | only with `status: superseded` | one link, `"[[note]]"` | The note that replaced this one (§6.3). |
| `bw-sources` | no | list of `"[[note or episode]]"` links or URLs | Where the note's knowledge came from (§6.4). |
| `bw-stage` | no | string | Free workflow state (`draft`, `shipped`, `abandoned`…). Importers move non-standard `status` values here. |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` when they change a note. |

- Any other scalar or list property MAY be present (for example `source`,
  `url`, `author`). It is the user's: preserved, indexed for `--where`
  filters, never validated. Fields reserved for future use: `valid_from`,
  `valid_until`, `confidence`.
- Any other `bw-` field on a note is an error (BW118).
- Format 2 fields (`bw-claims`, `bw-claims-superseded`, `bw-<verb>`
  relations, and `bw-superseded_by` written as a list) are reported as
  BW117, with the command that converts them (§13).
- `brain validate` checks these rules for the files an agent changed;
  `brain lint` checks them for the whole brain
  ([[lint-and-reports|06]]).
