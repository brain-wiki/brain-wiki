---
id: 01M3250V007NWHB7ATV8RCRWK6
type: design
title: "Inputs"
aliases: ["Index and search §6.1"]
source: "docs/design/index-and-search.md#61-inputs"
---
# Inputs

| Parameter | Default | Meaning |
|---|---|---|
| `query` | `""` | Free text. Empty means browse. |
| `limit` | 8 | Results per page, 1 to 50 |
| `topic` | all | Topic slugs, each with its sub-topics |
| `type` | any | Note types; a note of any of them matches |
| `tag` | any | Tags; a note must carry all of them |
| `where` | none | Frontmatter equality, e.g. `{"stage": "open"}` |
| `include_episodes` | on for a query, off when browsing | Pending episodes |
| `include_archived` | false | Notes with `status: archived` |
| `include_archived_episodes` | false | Consolidated episodes (CLI only) |
| `since`, `until` | none | Updated on or after, on or before |
| `sort` | `relevance`, or `recent` when browsing | `relevance`, `recent`, or `title` (CLI only) |
| `cursor` | none | `next_cursor` from the previous page |
| `count_only` | false | Return only `total` |
| `facets` | false | Counts of the matches by type, topic, and tag |
| `format` | `text` | `text`, or `paths` for one path per line |

- A query with no word characters browses, ordered by `sort` within the
  filters.
- A `limit` above 50 is refused by the CLI and the MCP schema. The MCP
  `query` is at most 500 characters.
- Topic slugs match case-insensitively. An unknown slug is `not_found`,
  listing the known topics, rather than an empty result.
- Tags ignore case and a leading `#`, and match sub-tags (`project`
  matches `project/lumen`).
- `where` values compare as case-insensitive strings, and a list matches
  when any item does. Besides frontmatter properties, keys can be the
  indexed columns `title`, `type`, `topic`, `created`, `updated`, `stage`,
  `status` (also matching a custom stage), `tags`, `aliases`, and `id` (as
  written). `bw-` fields other than `bw-stage` cannot be filtered.
- `since` and `until` take `YYYY-MM-DD`, or `7d`, `4w`, `3m` (30 days), or
  `1y` (365 days), and compare the date part of `updated`.
- `facets` counts the top 10 values of each.
- CLI spellings: `--where KEY=VALUE`, `--count`, `--paths`,
  `--no-episodes`, and `--include archived,episodes,archived_episodes`.
