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
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Use SQLite FTS5 for local search
status: active
privacy: default
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-10-07
updated: 2026-10-09
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict`, minted by `lint --fix` | ULID | |
| `type` | no (default `note`) | lowercase string | Open vocabulary. Suggested: `note`, `hub`, `concept`, `decision`, `howto`, `reference`, `person`, `project`, `source`, `meeting`. |
| `title` | no | string | Default: first `# ` heading, else file name without `.md`. |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set; the retrieval engine only reasons about these three. |
| `stage` | no | string | Free workflow state (`draft`, `shipped`, `abandoned`…). Importers move non-standard `status` values here. |
| `privacy` | no (inherits) | one of `privacy.levels` | MAY raise the level above the topic's, MUST NOT lower it. |
| `aliases` | no | list of strings | Same meaning as in Obsidian; used for link resolution and search. |
| `tags` | no | list of strings | Without `#`. |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` when they change a note. |

Any other scalar or list property MAY be present and is preserved and
stored (for example `source`, `url`, `author`). Fields reserved for future
use: `valid_from`, `valid_until`, `confidence`.

## Relations
- part_of [[02-6-notes]]
