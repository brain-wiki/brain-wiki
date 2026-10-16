---
id: 01M3250V00WP7XP2FMQ78RKT7G
type: design
title: "Inputs"
aliases: ["04 §6.1"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#61-inputs"
---
# Inputs

| Parameter | Default | Meaning |
|---|---|---|
| `query` | `""` | Free text. **Empty means browse**: no text matching, results ordered by `sort` (default `recent`) within the filters. |
| `limit` | 8 | Primary results, before expansion and guards. Max 50 (the CLI refuses more rather than clamping). |
| `topic` | all | Restrict to one or more topics, each with its sub-topics. Slugs match case-insensitively; an unknown slug is `not_found`, not an empty result. |
| `type` | any | Restrict to note types (`decision`, `release`, `person`…), as in frontmatter. |
| `tag` | any | Restrict to notes carrying all of these tags. |
| `where` | none | Frontmatter property equality, e.g. `{"stage": "open"}`; values compare as strings, case-insensitively, lists match any item. Keys the index keeps as columns match too: `tags` and `aliases` (any item), `title`, `id` (as written), `type`, `status` (or a custom `stage`), `topic`, `created`, `updated`. |
| `include_episodes` | on for a query, off when browsing | Pending episodes are searchable; a browse lists curated notes unless episodes are asked for. |
| `include_archived` | false | Also return notes with `status: archived`. |
| `include_archived_episodes` | false | Also return consolidated episodes (CLI `--include archived_episodes` only). |
| `intent` | `context` | Graph expansion, §6.4. |
| `since`, `until` | none | Only nodes updated on or after / on or before a date. Relative forms `7d`, `4w`, `3m` are accepted. |
| `sort` | `relevance` (`recent` when the query is empty) | `relevance`, `recent` (newest `updated` first), or `title` (CLI only, for listings). |
| `cursor` | none | Opaque handle from a previous result's `next_cursor`, for the next page. |
| `count_only` | false | Return only `total`: how many nodes match, before any limit. |
| `facets` | false | Add counts of the matching nodes by `type`, `topic`, and `tag` (top 10 each), so the caller can narrow before reading. |
| `format` | `text` | Text rendering style: `text` (default), or `paths` (one brain-relative path per line, for handing to file tools). The structured result is the same either way. |
