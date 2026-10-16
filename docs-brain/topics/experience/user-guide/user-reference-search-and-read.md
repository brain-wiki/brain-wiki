---
id: 01M3250V00XQ7AEKBYN43GEM0F
type: guide
title: "Search and read"
source: "docs/user/reference.md#search-and-read"
---
# Search and read

- `brain search` options: `--topic T` and `--type T` (repeatable, any
  match), `--tag T` (repeatable, all must match), `--where KEY=VALUE` (any
  frontmatter key; a list matches any item), `--since D` and `--until D`
  (`YYYY-MM-DD`, or `7d`, `4w`, `3m`), `--sort relevance|recent|title`,
  `--limit N` (1 to 50, default 8), `--cursor C`, `--include
  archived,episodes,archived_episodes`, `--no-episodes`, `--count`,
  `--facets`, and `--paths`.
- With an empty query, `brain search` browses, newest first:
  `brain search "" --since 7d` lists recent notes. An unknown `--topic` is
  not found (exit 3).
- `brain read --mode outline` shows the summary, headings, links, and
  backlinks. It is the default for hubs. `--mode raw` prints the file byte
  for byte. `--section H` alone implies `--mode section`.
- `brain neighbors` puts a superseded note's replacement first. `--depth`
  is 1 to 3, `--limit` 1 to 100.
- `brain links` lists what a note links to as written in its file: body
  links, `bw-superseded_by`, and `bw-sources`. `brain backlinks` lists what
  links to it from other files.
- `links`, `backlinks`, `tags`, `types`, `orphans`, and `unresolved` take
  `--limit`, `--cursor`, `--count`, and `--paths`. For `tags` and `types`,
  `--paths` prints one name per line.
