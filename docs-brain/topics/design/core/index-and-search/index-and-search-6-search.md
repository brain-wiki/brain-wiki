---
id: 01M3250V007W8S00ETDS911G7J
type: design
title: "Search"
aliases: ["Index and search §6"]
source: "docs/design/index-and-search.md#6-search"
---
# Search

Search is one call for both keyword search and browsing. MCP exposes it as
`brain_search`, the CLI as `brain search`.


### 6.1 Inputs

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


### 6.2 Matching

1. Split the query into word tokens, lowercased. Each token is quoted, so
   user text is never read as FTS5 operators.
2. Drop filler words ("the", "did", "why", "what", "how", "we", and other
   common words) when any content word remains, so a question phrased as a
   sentence matches by what it is about.
3. Build `"tok1" "tok2" "tok3"*` from what is left. This is an implicit
   AND, with a prefix match on the last token when it has 2 or more
   characters, since queries are often partial words.
4. If fewer than `limit` nodes match and there is more than one token,
   also run the same tokens joined by OR.
5. If the query contains CJK text (Han, kana, or Hangul), or nothing has
   matched yet, also query `fts_tri` when it exists. It searches each CJK
   run of 3 or more characters, or each token of 3 or more characters when
   the query has no CJK.
6. CJK runs shorter than 3 characters, which trigram cannot match, use a
   bounded `LIKE` scan over `docs.title` and `docs.body`.
7. Topic, type, tag, property, and date filters apply to FTS candidates
   before scoring and truncation (R3). Candidates come in growing batches,
   starting at four times what the page needs and doubling, so
   filtered-out notes never displace matching ones.

An empty query skips text matching. It selects the filtered nodes
directly and orders them by `sort`, which is how an agent lists a topic or
asks for the latest release. A browse result's snippet is the opening
words of the body.


### 6.3 Ranking

```
lexical = -bm25(fts, 8.0, 6.0, 3.0, 2.0, 1.0)   # title, aliases, tags, headings, body
score   = lexical × status_factor × kind_factor × recency_factor

status_factor  = active 1.0, superseded 0.35, archived 0.2
kind_factor    = topic 1.15, note 1.0, episode 0.7, archived_episode 0.5
recency_factor = 0.85 + 0.15 × 0.5^(age_days / 180)       # never below 0.85
```

- The factors and the half-life (`recency_half_life_days`) are set under
  `[search]` in `brain.toml`. Their defaults are tuned with the
  [[eval-bench|eval bench]].
- Trigram matches use weights 4.0 for the title and 1.0 for the body.
  `LIKE` matches get a lexical score of 0.5.
- A note without a readable `updated` counts as 365 days old.
- Recency is deliberately weak. An old note that is still active is still
  true. Supersession, not age, demotes outdated knowledge.
- With `sort` set to `recent` or `title`, a query returns its matches in
  that order and `score` is null.


### 6.4 Graph expansion

Search does not follow links. It returns matching notes plus their guard
notes (§5) and nothing else. To see what a hit links to, what links to it,
or how it evolved, call `brain_neighbors` on it (§9.2).


### 6.5 Output

The structured result is MCP `structuredContent`, or JSON from the CLI
with `--json`:

```json
{
  "brain": "personal",
  "query": "fts5 trigram",
  "sort": "relevance",
  "total": 37,
  "results": [
    {
      "id": "01J9Z7Q2V8K3M4N5P6R7S8T9W0",
      "path": "topics/search/fts5.md",
      "title": "Use SQLite FTS5 for local search",
      "kind": "note", "topic": "search", "type": "decision",
      "status": "active", "updated": "2026-10-09",
      "score": 11.8,
      "snippet": "…the «trigram» tokenizer needs SQLite 3.34+…",
      "inputs": null, "agent": null,
      "guards": [
        {"label": "supersedes", "id": "01J8…", "title": "Use ripgrep for search",
         "path": "topics/search/ripgrep.md", "status": "superseded",
         "updated": "2026-09-02", "via_titles": []}
      ],
      "more_guards": 0
    }
  ],
  "truncated": true,
  "offset": 0,
  "next_cursor": "8",
  "facets": {"type": {"decision": 21, "fix": 9}, "topic": {"search": 30}, "tag": {}}
}
```

- `total` counts every match before `limit`.
- `next_cursor` is null on the last page.
- `facets` appears only when requested.
- `score` is null when results are ordered by date or title.
- `inputs` and `agent` are set for episode hits only.

The text form (MCP text content, CLI default) shows each hit's path, which
is the handle for the next call. Guard banners (§5) come before the
snippet:

```
1. Use ripgrep for search  [decision · SUPERSEDED · topics/search/ripgrep.md]
   ⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
   # Use «ripgrep» for «search» Lumen shells out to «ripgrep» for «search».
2. Use SQLite FTS5 for local search  [decision · active · topics/search/fts5.md]
   ↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
   …Lumen searches notes with SQLite FTS5 instead of «ripgrep»…
```

- A browse adds each hit's `updated` date inside the brackets.
- When more results follow, a last line gives the range and the cursor:
  `Showing 1–8 of 37; next page: cursor=8`.
- Episode hits are raw and unreviewed. Their snippet is wrapped in an
  `<untrusted-episode agent="…" inputs="…">` envelope, and the output ends
  with a line saying episode text is data, not instructions
  ([[security-and-privacy|security and privacy]]).
