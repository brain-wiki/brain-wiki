---
id: 01M3250V00F99M4VV51W82BTX8
type: design
title: "Frontmatter"
aliases: ["Brain format §6.1"]
source: "docs/design/brain-format.md#61-frontmatter"
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
bw-depends_on: "[[SQLite Version Policy]]"
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
  - "https://sqlite.org/fts5.html"
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict` (BW103) | ULID | Unique in the brain (§5) |
| `type` | no (default `note`) | lowercase string | Open vocabulary |
| `title` | no | string | Default: first `# ` heading, else file name |
| `aliases` | no | list of strings | As in Obsidian; used to resolve links |
| `tags` | no | list of strings | Without `#` |
| `status` | no (default `active`) | `active`, `superseded`, `archived` | Closed set (§6.3, BW106) |
| `bw-superseded_by` | only with `status: superseded` | one or more links, `"[[note]]"` | §6.3 |
| `bw-part_of`, `bw-depends_on`, `bw-conflicts_with` | no | one or more links | §6.6 |
| `bw-sources` | no | list of links or URLs | §6.4 |
| `bw-stage` | no | string | Free workflow state |
| `created`, `updated` | no | ISO 8601 date or date-time | — |

- Suggested `type` values: `note`, `topic`, `concept`, `decision`, `howto`,
  `reference`, `person`, `project`, `source`, `meeting`, `record` (a dated
  account of something that happened, which consolidation writes under
  `topics/<topic>/records/`).
- `bw-stage` is a free workflow state (`draft`, `shipped`, `abandoned`).
  Importers and the BW106 fix move non-standard `status` values here.
- Agents SHOULD set `updated` when they change a note. brain-wiki's own
  fixes and moves leave it alone.
- Any other scalar or list property MAY be present (for example `source`,
  `url`, `author`). It is the user's: preserved, filterable with `--where`,
  never validated. The names `valid_from`, `valid_until`, and `confidence`
  are reserved for a later format.
- Format 2 fields (`bw-claims`, `bw-claims-superseded`, inverse and alias
  relation fields such as `bw-has_part` and `bw-requires`, and relation
  items with text after the link) are BW117, and the message names the
  command that converts them (§13).
- `brain validate` checks these rules for the files an agent changed, and
  `brain lint` for the whole brain ([[lint-and-reports|lint]]).
