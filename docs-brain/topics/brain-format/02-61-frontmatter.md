---
id: 01M3250V003YS64ZYNPR0B97X3
type: design
title: "Frontmatter"
aliases: ["02 §6.1"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#61-frontmatter"
bw-part_of:
  - "[[02-6-notes]]"
---
# Frontmatter

```yaml
---
id: 01J9Z7Q2V8K3M4N5P6R7S8T9U0
type: decision
title: Use SQLite FTS5 for local search
status: active
aliases: [FTS5 decision]
tags: [search, storage]
created: 2026-10-07
updated: 2026-10-09
bw-privacy: default
bw-part_of: "[[search]]"
bw-depends_on:
  - "[[SQLite version policy]] — needs the trigram tokenizer"
bw-conflicts_with:
  - "[[Vector-only search proposal]] (unless: embeddings enabled)"
bw-supersedes:
  - "[[Use ripgrep for search]]"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; src: inbox/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7.md#L4-L6; origin: agent; at: 2026-10-07}"
  - "Trigram search needs SQLite 3.34 or newer."
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-01J8XQ4R6S8T0V2W4X6Y8Z0A2B; by: c-01J9Z8A3QK7T0V5W2X4Y6Z8B1C; at: 2026-10-07}"
---
```

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes in `strict`, minted by `lint --fix` | ULID | |
| `type` | no (default `note`) | lowercase string | Open vocabulary. Suggested: `note`, `hub`, `concept`, `decision`, `howto`, `reference`, `person`, `project`, `source`, `meeting`. |
| `title` | no | string | Default: first `# ` heading, else file name without `.md`. |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set; the retrieval engine only reasons about these three. |
| `aliases` | no | list of strings | Same meaning as in Obsidian; used for link resolution and search. |
| `tags` | no | list of strings | Without `#`. |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` when they change a note. |
| `bw-stage` | no | string | Free workflow state (`draft`, `shipped`, `abandoned`…). Importers move non-standard `status` values here. |
| `bw-privacy` | no (inherits) | one of `privacy.levels` | MAY raise the level above the topic's, MUST NOT lower it. |
| `bw-<verb>` | no | string or list of strings | Relations, one field per canonical verb (§6.4). |
| `bw-claims`, `bw-claims-superseded` | no | list of strings | Current claims, and claims that were superseded or retracted (§6.3). |

Any other scalar or list property MAY be present and is preserved and
stored (for example `source`, `url`, `author`). Fields reserved for future
use: `valid_from`, `valid_until`, `confidence`.
