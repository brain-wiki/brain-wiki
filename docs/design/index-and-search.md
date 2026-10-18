# Index and search

The index is a SQLite database derived from a brain's files. Search, read,
neighbors, orientation, lint, and the visualizer all query it. The code is
in `src/brainwiki/index/`.

## 1. Requirements

| # | Requirement | Why |
|---|---|---|
| R1 | The index is derived entirely from the brain folder and can be deleted at any time. | Files are the truth ([D1](../decision/d01-source-of-truth.md)). Users rebuild an index, never repair it. |
| R2 | Results reflect edits made a moment ago by any tool (Obsidian, git pull, another agent). | Agents act on what they retrieve. Stale results cause wrong actions. |
| R3 | Filters (topic, type, tag, property, date) apply before ranking. | Filtering after top-k can starve results. |
| R4 | A superseded note always comes with the note that replaced it, and an active note with the active notes it conflicts with ([brain format §7](brain-format.md#7-guards)). | Correctness about change and disagreement is the core retrieval promise (G5). |
| R5 | Search p95 under 50 ms and a freshness check under 150 ms at 10k notes. | Agents search and read many times in one task (G7). |
| R6 | Lexical search works without any model. | No required services (G6). |

## 2. Location and lifecycle

Each brain has one index per device, in brain-wiki's cache directory.

- The path is `<cache>/brains/<key>/index.sqlite`. `<cache>` is
  `~/.cache/brain-wiki` on Linux, and `BRAIN_WIKI_CACHE_DIR` overrides it
  ([config and storage §4](config-and-storage.md#4-machine-state)).
- The index is never inside the brain. Sync tools corrupt or duplicate
  SQLite files, and the index is device-specific anyway.
- `<key>` is the brain id. A copy of the brain at another path, while the
  first folder still exists, gets `<id>-<8 hex digits of a path hash>`, so
  copies never share machine state. Nothing reports the duplicate id.
- Opening the index checks `meta.schema_version`, `meta.brain_id`, and
  `meta.config_hash` (a hash of `[layout]` and `[topics]`). A mismatch, or
  a file SQLite cannot open, rebuilds the index with one log line. If that
  fails too, for example because SQLite lacks FTS5, the command fails with
  `cannot open index at <path>`.
- The MCP server reloads `brain.toml` before each use and reopens the
  index when the layout or topics changed.
- `brain index` rescans and shows counts. `--rebuild` starts from
  scratch.
- Pragmas: `journal_mode=WAL`, `synchronous=NORMAL`, `foreign_keys=ON`,
  `busy_timeout=5000`, `cache_size=-65536` (64 MB), `temp_store=MEMORY`.

## 3. Schema

`src/brainwiki/index/_schema.py` is authoritative. This copy matches
`SCHEMA_VERSION` 15. Any schema change bumps the version, and an index with
another version is rebuilt (§2). Values in comments are what the code
writes. The schema itself has no CHECK constraints.

```sql
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
-- keys: schema_version, brain_id, brain_root, config_hash, engine_version,
--       last_scan_ns, fts_trigram, topic_tree, last_lint_ns

-- Every file seen in the brain (knowledge or not), for change detection.
CREATE TABLE files (
  path         TEXT PRIMARY KEY,    -- brain-relative, '/' separators
  kind         TEXT NOT NULL,       -- note, topic, episode, archived_episode, agent_file, proposal,
                                    -- rules, archived_rules, agents_md, log, manifest, report, attachment
  mtime_ns     INTEGER NOT NULL,
  size         INTEGER NOT NULL,
  sha256       TEXT NOT NULL,
  node_id      TEXT,                -- set for files that are nodes
  parse_errors INTEGER NOT NULL DEFAULT 0
);

-- Notes, topic pages, and episodes (files in inbox/agents/ are stored as kind 'episode').
CREATE TABLE nodes (
  id           TEXT PRIMARY KEY,    -- ULID from frontmatter, or 'path:' || path
  path         TEXT NOT NULL UNIQUE,
  kind         TEXT NOT NULL,       -- note, topic (a topic page), episode, archived_episode
  topic        TEXT,                -- slug of the nearest enclosing topic, NULL outside topics
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'note',
  status       TEXT NOT NULL DEFAULT 'active',   -- active, superseded, archived
  stage        TEXT,
  created      TEXT,
  updated      TEXT,                -- frontmatter 'updated', else 'created', else file mtime
  aliases      TEXT NOT NULL DEFAULT '[]',   -- JSON array
  tags         TEXT NOT NULL DEFAULT '[]',   -- JSON array
  props        TEXT NOT NULL DEFAULT '{}',   -- other frontmatter, JSON object
  line_count   INTEGER NOT NULL DEFAULT 0,
  fm_id        TEXT,                -- the frontmatter id as written, even when not used as `id`
  -- episode-only columns (NULL for notes)
  agent        TEXT,
  session      TEXT,
  origin_turns TEXT,                -- e.g. '12-48'
  device       TEXT,
  origin       TEXT,                -- owner, agent, import, system
  inputs       TEXT,                -- local, external, unknown
  captured     TEXT                 -- mcp, harvest, cli, import, file
);
CREATE INDEX nodes_topic   ON nodes(topic, kind, updated);
CREATE INDEX nodes_kind    ON nodes(kind, status);
CREATE INDEX nodes_updated ON nodes(updated);
CREATE INDEX nodes_brief   ON nodes(kind, topic, type, updated);   -- the briefing's single pass

-- Keys used to resolve link targets (brain format §6.5).
CREATE TABLE names (
  key     TEXT NOT NULL,            -- casefolded
  kind    TEXT NOT NULL,            -- path, stem, alias, title, id
  node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  PRIMARY KEY (key, kind, node_id)
);
CREATE INDEX names_node ON names(node_id);

-- Previous locations of each id, for link repair after renames.
CREATE TABLE path_history (
  node_id   TEXT NOT NULL,
  path      TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  PRIMARY KEY (node_id, path)
);

-- Where links point: body links, plus the links in the relation fields and bw-sources.
CREATE TABLE edges (
  id          INTEGER PRIMARY KEY,
  src         TEXT,                 -- node id of the note that holds the link (= declared_in)
  dst         TEXT,                 -- node id the link resolves to (= other), NULL when unresolved
  rel         TEXT NOT NULL,        -- links_to (body), a relation field's (part_of, depends_on,
                                    -- conflicts_with, superseded_by), source (bw-sources)
  written     TEXT NOT NULL,        -- link form: wiki, md, embed; 'field' for metadata links
  declared_in TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  other       TEXT,                 -- the resolved node at the far end, NULL when unresolved
  line        INTEGER NOT NULL,
  raw_target  TEXT NOT NULL,
  ambiguous   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX edges_src      ON edges(src, rel);
CREATE INDEX edges_dst      ON edges(dst, rel);
CREATE INDEX edges_rel      ON edges(rel);
CREATE INDEX edges_declared ON edges(declared_in);
CREATE INDEX edges_other    ON edges(other);

-- Full-text search: an external-content table plus FTS5 tables over it.
CREATE TABLE docs (
  rowid    INTEGER PRIMARY KEY,
  node_id  TEXT NOT NULL UNIQUE REFERENCES nodes(id) ON DELETE CASCADE,
  title    TEXT NOT NULL,
  aliases  TEXT NOT NULL,           -- space-joined
  tags     TEXT NOT NULL,           -- space-joined
  headings TEXT NOT NULL,           -- all headings, newline-joined
  body     TEXT NOT NULL            -- the body without frontmatter or HTML comments; for an
                                    -- unconverted format 2 note, plus the text of its bw-claims
);
CREATE VIRTUAL TABLE fts USING fts5(
  title, aliases, tags, headings, body,
  content='docs', content_rowid='rowid',
  tokenize='porter unicode61 remove_diacritics 2'
);
-- Created only when the SQLite library supports it (3.34+); recorded in meta.fts_trigram.
CREATE VIRTUAL TABLE fts_tri USING fts5(
  title, body,
  content='docs', content_rowid='rowid',
  tokenize='trigram'
);

-- Parse problems found while indexing (BW101, BW111); full lint is computed on demand.
CREATE TABLE diagnostics (
  path     TEXT NOT NULL,
  line     INTEGER,
  code     TEXT NOT NULL,
  severity TEXT NOT NULL,           -- always 'error'
  message  TEXT NOT NULL
);
CREATE INDEX diagnostics_path ON diagnostics(path);

-- First hash seen for each episode id; a later different hash is BW501 unless a run wrote it.
CREATE TABLE episode_hashes (
  episode_id TEXT PRIMARY KEY,
  sha256     TEXT NOT NULL,
  path       TEXT NOT NULL,
  first_seen TEXT NOT NULL
);

-- File-local lint results keyed by content hash, so whole-brain lint re-checks only changes.
CREATE TABLE lint_cache (
  path     TEXT PRIMARY KEY,
  sha256   TEXT NOT NULL,
  problems TEXT NOT NULL
);
```

How files become rows:

- A note without a ULID `id` gets the node id `path:<path>`. It is stable
  while the file does not move, so an imported vault is searchable before
  anyone runs `lint --fix`. A note whose id is already taken by another
  indexed file gets a `path:` id too.
- A file is kind `topic` only when it is a topic page by its path
  ([brain format §8](brain-format.md#8-topic-pages)), whatever its
  `type`. `type` defaults to `topic`, `episode`, or `note` by kind.
- A `status` outside the three values is indexed as `active`, and the
  value goes to `stage` when the note has no `bw-stage`.
- `props` holds every frontmatter key except the standard ones (`id`,
  `type`, `title`, `status`, `aliases`, `tags`, `created`, `updated`) and
  the `bw-` fields.
- A file over 2 MiB is indexed with empty text.
- Episode provenance columns are trusted only for an episode this device
  wrote through `write_episode()`, which leaves a marker holding the
  episode's content hash in the state directory. Any other episode file is
  indexed with `inputs = unknown` and `captured = file`, and a claimed
  `origin = owner` becomes `agent`. Files in `inbox/agents/<agent>/` get
  `origin = agent`, `inputs = unknown`, `captured = file`, and the agent
  from the folder name. See [write path §3](write-path.md#3-provenance-and-inputs).

Edges keep the direction they were written in. `src` is always the note
that holds the link and `dst` the note it points to. A
`bw-superseded_by: "[[A]]"` on B is stored as `src=B, dst=A,
rel='superseded_by'`. Each end reads an edge with its own label:

| `rel` | Seen from `src` | Seen from `dst` |
|---|---|---|
| `superseded_by` | `superseded_by` | `supersedes` |
| `conflicts_with` | `conflicts_with` | `conflicts_with` |
| `depends_on` | `depends_on` | `depended_on_by` |
| `part_of` | `part_of` | `has_part` |
| `links_to` | `links_to` | `linked_from` |
| `source` | `cites` | `cited_by` |

The rows are in priority order: lists of links and neighbors put
supersession first, then the other relations, then body links, then
citations.

Read, neighbors, `brain links`, and `brain backlinks` use these labels
(§7, §9.2). Links in other frontmatter properties, such as `up:`, are not
edges ([brain format §4](brain-format.md#4-common-file-conventions)).

Full-text details:

- The engine writes `docs` and the FTS tables in one transaction. To
  replace a row it issues the FTS5 `'delete'` command with the old values
  from `docs` (FTS5 needs exactly what was indexed), then writes the new
  values. Every write goes through one code path, so there are no
  triggers. `INSERT INTO fts(fts) VALUES('rebuild')` repairs a suspect FTS
  table from `docs`.
- SQLite capabilities are probed, not assumed. A new index tries to create
  `fts_tri` and sets `meta.fts_trigram = 0` when that fails. Trigram
  options that only newer releases accept, such as `remove_diacritics`,
  are not used.
- Body text is indexed as written. A struck-through history bullet is
  ordinary text that ranks with the same body weight as the rest. Ranking
  demotes superseded notes, not superseded lines (§6.3).

## 4. Freshness

Every command that reads the index first brings it up to date. There is no
daemon.

```
scan(brain):
  if this process scanned less than freshness_ms ago (default 1000): return
  walk the brain, skipping ignored paths                     # stat only
  for each file:
    row = files[path]
    if row is None:                         -> parse and insert
    elif (mtime_ns, size) == row:           -> unchanged
    else: hash it; if sha256 == row.sha256  -> update mtime and size only
          else                              -> re-parse, replace node, edges, docs
  for each row not seen:                    -> delete (cascade), record (id, old path) in path_history
  if the topic tree changed:                -> re-index the notes whose topic changed
  if any name key changed:                  -> re-resolve every edge
  else:                                     -> resolve the edges of re-parsed notes
                                               and the edges that pointed at deleted nodes
  one BEGIN IMMEDIATE transaction for all writes; update meta.last_scan_ns
```

- An id that disappears at one path and appears at another is a rename.
  `path_history` keeps the old path so `brain lint --fix` can repair links
  that still use it.
- A name key changes when a file is added, removed, or renamed, or a
  title or alias is edited. Re-resolving every edge then heals dangling
  links without a full rebuild.
- The topic tree comes from the folders under `topics/` and the topic
  pages the scan saw ([brain format §2.1](brain-format.md#21-topics)).
- When brain-wiki writes files, it rescans only those paths in the same
  step. A run's rescan also records the new hash of any episode it
  rewrote, so that change is not BW501.
- `brain lint` forces a full scan regardless of `freshness_ms`.
- Several MCP servers (one per host) and CLI calls may scan at the same
  time. Scans read without locks, then write in one `BEGIN IMMEDIATE`
  transaction. WAL lets readers continue. Two processes doing the same
  work is harmless, because each write is idempotent.
- A stat-only walk of 10k files takes tens of milliseconds on a local SSD.
  A file watcher for network file systems and very large brains is in the
  [ideas list](../roadmap/ideas.md).

## 5. Guards

The guards add, to every note or topic page a search or read returns, the
notes that replaced it, the notes it conflicts with, and the notes it
replaced ([brain format §7](brain-format.md#7-guards)). Given the hit node
ids `H`, they read the `superseded_by` and `conflicts_with` edges that
touch them:

```sql
SELECT src, dst FROM edges
WHERE rel = 'superseded_by' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
  AND (src IN (H) OR dst IN (H));
```

The same query with `rel = 'conflicts_with'` finds the conflicts. Then, in
code:

| Hit is | Label shown on the hit | Meaning for the agent |
|---|---|---|
| `src` of `superseded_by` (the hit names a replacement) | `superseded_by` | The hit is outdated. The neighbor is current. |
| Either end of `conflicts_with`, both notes active | `conflicts_with` | The two notes disagree. Read both before acting. |
| `dst` of `superseded_by` (other notes name the hit) | `supersedes` | The hit replaced the neighbor (history). |

- From a hit's replacement, `superseded_by` is followed up to 5 more hops,
  so the agent gets the newest note. The notes passed on the way are listed
  in `via_titles`. A cycle is a lint error (BW307), and the walk stops at
  the first repeat.
- A conflict is one hop, never followed further. It needs both notes
  `active`, so it ends when either is superseded or archived.
- Guard notes come on top of the result limit. Each is compact: `label`,
  `id`, `title`, `path`, `status`, `updated`, and `via_titles`. The agent
  reads one with `brain_read`.
- Guards come in the table's order, each group most recently updated
  first. A hit carries every replacement and conflict, and at most
  `search.max_guards_per_hit` (default 10) notes it replaced. The rest are
  counted in `more_guards`, so the agent knows to look.
- Superseded notes still match a query, but `status_factor` ranks them
  lower (§6.3).

Text output turns guards into banners: every replacement and conflict in
full, then the notes it replaced up to three lines in all, then a count:

```
⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
⚠ CONFLICTS with "Vector-only search proposal" (topics/search/vector-only.md): read both before acting.
↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
… 4 more replaced notes; brain_neighbors("topics/search/fts5.md", direction="in") lists them.
```

A chain adds ` (via B)` before the colon. Search results (§6.5) and reads
(§7) show banners the same way.

## 6. Search

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
| `within` | none | A whole, by any target `read` accepts: only the notes that name it in `bw-part_of` |
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
- `within` goes one level: the parts of the whole, not their parts. A
  whole that does not resolve is `not_found`. To search a topic's folder,
  use `topic`; `within` on a topic page finds only the notes elsewhere
  that name it.
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
7. Topic, type, tag, property, date, and `within` filters apply to FTS candidates
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
  [eval bench](eval-bench.md).
- Trigram matches use weights 4.0 for the title and 1.0 for the body.
  `LIKE` matches get a lexical score of 0.5.
- A note without a readable `updated` counts as 365 days old.
- Recency is deliberately weak. An old note that is still active is still
  true. Supersession, not age, demotes outdated knowledge.
- With `sort` set to `recent` or `title`, a query returns its matches in
  that order and `score` is null.

### 6.4 Graph expansion

Search does not follow links. It returns matching notes plus their guard
notes (§5) and the wholes each names in `bw-part_of`, and nothing else. To see what a hit links to, what links to it,
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
      "more_guards": 0,
      "wholes": [
        {"id": "01JA…", "title": "App v2 Launch", "path": "topics/company/launch.md",
         "summary": "Ship the second version of the app by December."}
      ]
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
- `wholes` are the notes and topic pages the hit names in `bw-part_of`,
  by title, each with the opening words of its body (at most 160
  characters) as context. A search `within` a whole leaves that whole out.
  `within` echoes the whole as `{id, title, path}`.

The text form (MCP text content, CLI default) shows each hit's path, which
is the handle for the next call. Guard banners (§5), then the wholes, come
before the snippet:

```
1. Use ripgrep for search  [decision · SUPERSEDED · topics/search/ripgrep.md]
   ⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
   # Use «ripgrep» for «search» Lumen shells out to «ripgrep» for «search».
2. Use SQLite FTS5 for local search  [decision · active · topics/search/fts5.md]
   ↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
   ↑ part of "App v2 Launch" (topics/company/launch.md): Ship the second version of the app by December.
   …Lumen searches notes with SQLite FTS5 instead of «ripgrep»…
```

- A browse adds each hit's `updated` date inside the brackets.
- When more results follow, a last line gives the range and the cursor:
  `Showing 1–8 of 37; next page: cursor=8`.
- Episode hits are raw and unreviewed. Their snippet is wrapped in an
  `<untrusted-episode agent="…" inputs="…">` envelope, and the output ends
  with a line saying episode text is data, not instructions
  ([security and privacy](security-and-privacy.md)).

## 7. Read

`read(target, mode)` returns one note, topic page, or episode. The target is
matched by node id, path, or frontmatter id, then by the link resolution
order of [brain format §6.5](brain-format.md#65-links). An ambiguous target
is an error that lists the candidates instead of guessing.

| Mode | Returns |
|---|---|
| `outline` (default for topic pages) | Summary, headings, links, and backlinks |
| `full` (default for notes and episodes) | The body, then link and backlink lists |
| `section` | One section's content |
| `raw` | The file exactly as on disk, for an agent about to edit it |

- The outline summary is the first paragraph that is not a heading, up to
  600 characters.
- `full` returns the body without frontmatter or HTML comments. For notes
  and topic pages it appends "Links:", "Parts:", and "Linked from:" lists
  below a `---` line, since the file's own wikilinks carry no paths.
- `section` matches a heading's text, case-insensitively. Passing a
  section implies this mode. The mode without a section, or a section with
  another mode, is a usage error.
- An episode's content, in every mode, is wrapped in the
  `<untrusted-episode>` envelope.

Every mode except `raw` starts with the banners from §5. A `raw` read
still carries them in the structured result, but its text is the file
alone. An outline:

```
↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).

# Use SQLite FTS5 for local search
decision · active · topics/search/fts5.md

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

Sections: Use SQLite FTS5 for local search

Links:
- links_to "SQLite version policy" (topics/search/sqlite-versions.md)
Linked from:
- supersedes "Use ripgrep for search" (topics/search/ripgrep.md)
- linked_from "Search" (topics/search/index.md)
```

Every link and backlink carries its handle, the path after the title. In
the structured result, `outline` and `full` include:

- `links`: items `{relation, target, id, title, path, resolved}`.
  `relation` is the label seen from the note (§3), such as `depends_on`,
  `cites`, or `links_to`. `target` is the link as written. `id`, `title`,
  and `path` are null when it does not resolve. Metadata links come first,
  then body links in file order, one entry per target, so a field wins
  over a body link to the same note. Text shows 20, then a pointer to
  `brain_neighbors("<path>", direction="out")`.
- `parts`: items `{id, title, path}`, the notes that name this one in
  `bw-part_of`, sorted by title with the numbers in titles compared as
  numbers, so "2 Design" comes before "10 Rollout" and dated titles sort
  by date. The result keeps 50 and `parts_total` gives the full count.
  Text shows 20, then a pointer to `brain_search("", within="<path>")`. A
  part names its wholes in `links`, where `part_of` comes before body
  links.
- `backlinks`: items `{id, title, path, relation}`, where `relation` is
  the label seen from the target (§3), such as `supersedes` or
  `linked_from`. Parts are left out, since `parts` lists them. They come in
  the priority order of §3, the most recently updated first within each,
  one entry per note, at most 10. `backlinks_total` gives the full count,
  and text points to `brain_neighbors("<path>", direction="in")` for the
  rest.

An episode's result adds `agent`, `inputs`, `origin`, `session`, and
`origin_turns`.

## 8. Orientation (the briefing)

`orient()` returns one brain's briefing. Agents fetch it with
`brain_orient` when a task may depend on the user's knowledge, as the
static instruction block tells them to
([agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block)).
It is cut to `budgets.orient_max_tokens` (default 1,500), estimated as
characters divided by 4, so about 6,000 characters.

Sections, in output order:

1. Header: brain name, date, note count, the span of `updated` dates, and
   pending episodes.
2. Rules: the text of every rule in `rules.md`. Its own budget keeps it
   short enough to always fit.
3. What's in this brain: note counts by type (up to 8, largest first), the
   5 largest topics, and up to two topics that hold `person` or `meeting`
   notes when notes of those types exist. When any exist, one line counts
   open conflicts and notes resting on an outdated note (§9) and points to
   `reports/stale.md`.
4. Topics: the top-level topics, most recently active first. Each line
   gives the slug, title, description, note count including sub-topics,
   last update, and the number of sub-topics with the 4 most recently
   active. A pointer to `brain_search("", topic=["<slug>"])` replaces the
   topics that do not fit.
5. Recent changes: the last 5 `log.md` entries, newest first, and the
   number of notes updated in the last 7 days.
6. Inbox: pending episode count, the oldest pending age, the pending
   episodes per owner with the oldest one's date (the caller marked
   "(you)"), each agent's last consolidation from `log.md` with its summary
   ([write path §4.7](write-path.md#47-who-the-inbox-is-waiting-on)), rule
   proposals awaiting `brain rules accept`, and a hint to consolidate
   (`brain_consolidate_prepare`) when the caller's own pending episodes
   reach 20 or the oldest is more than 7 days old.
7. How to query: up to three example calls built from this brain's own
   topics and types (a keyword search, a typed "latest" lookup, and
   `brain_neighbors` on a topic page).
8. Writing notes, only when the calling profile has `edit`: where files go
   (`topics/<topic>/<slug>.md`, with the existing top-level topics), the
   frontmatter fields and `status` values
   ([brain format §6.1](brain-format.md#61-frontmatter)), the relation
   fields ([brain format §6.6](brain-format.md#66-relations)), the body
   conventions ([brain format §6.2](brain-format.md#62-body)), and "run
   `brain_validate` on the files you changed".

Note counts never include topic pages. A topic page describes its topic
and only dates it.

Every section except topics and recent changes is always included. When
the budget is tight, recent changes go first, the topic list takes the
room left, and the whole text is cut at the budget.

The structured result has `brain`, `text`, `rules`, `topics` (every topic
of the tree with its counts and parent), `contents`, `pending_episodes`,
`pending_by_agent` (owner to `{count, oldest}`), `open_proposals`,
`needs_review` (`{open_conflicts, stale_dependents}`), and `notes`.

The managed block of `AGENTS.md` is built from the same topic rows
([brain format §11](brain-format.md#11-agentsmd)).

## 9. Other queries

| Query | Used by | Notes |
|---|---|---|
| Notes within filters, newest first | `brain_search("")`, `brain search ""` | The search path without text matching (§6.1). There is no separate listing command. |
| Headings and links of a note | `brain read TARGET --mode outline` | §7 |
| Links as written in a file | `brain links` | Every edge the file declares, resolved or not, with its line |
| Backlinks | `brain backlinks`, read, BW406 | Edges from other nodes that resolve to the note |
| Topic tree | `brain topics` | Each topic with its own and total note counts |
| Tag and type counts | `brain tags`, `brain types`, search `facets`, orientation | — |
| Orphans | `brain orphans`, BW406, `reports/orphans.md` | Notes no other node links to |
| Unresolved links | `brain unresolved`, BW119, BW122, BW124, BW310 | Edges with no target |
| Stale dependents, open conflicts, stale links | `reports/stale.md`, orientation, the visualizer's `stale` flag | `stale_dependents`, `open_conflicts`, and `stale_links`, defined below |
| Neighborhood graph | visualizer | Nodes plus edges; see [visualizer](visualizer.md) |
| Pending episodes | `brain consolidate --prepare`, orientation | `kind = 'episode'`, ordered by id |

Three queries find notes that may need review, listed in this order in
`reports/stale.md`:

- A stale dependent is an active note or topic page whose `bw-depends_on`
  names a superseded or archived note. It rests on something outdated.
- An open conflict is a pair of active notes in a `bw-conflicts_with`
  relation, listed once whichever note holds the field.
- A stale link is a body link from an active note (not a topic page) to a
  superseded or archived note. A link from a note to the note it replaced
  is not stale, and neither is a link from a note that already depends on
  its target, which is listed as a dependent instead.

### 9.1 Brain list

`brain_list` (CLI `brain brains`) answers "which brains exist, and what is
each for?" for the calling host.

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([config and storage §3](config-and-storage.md#3-choosing-a-brain)) |
| `topics`, `notes`, `updated`, `pending` | The index |
| `path` | The brain folder, so the host can read its files directly |
| `ok`, `error` | Whether the brain opened, and why not |

- A brain found from the working directory but not registered is listed
  too.
- Brains outside the host's allowed list
  ([config and storage §3](config-and-storage.md#3-choosing-a-brain)) are
  not listed.
- For the owner, each entry also has `default`, whether it is the user's
  default brain.
- The text of `brain_list` gives each brain's description, so an agent can
  pick the right one. `brain brains` in a terminal leaves it out, so the
  counts and path fit on one line; `--json` has every field.

### 9.2 Neighbors

`neighbors(target, direction, depth, limit, relations)` follows a node's resolved
edges without reading bodies, and returns a small subgraph.

- `direction` is `out` (what it links to), `in` (what links to it), or
  `both` (default).
- `depth` is 1 to 3 (default 1).
- `limit` caps the nodes returned besides the root (default 30, at most
  100). The engine clamps out-of-range values, and the CLI rejects values
  below 1.
- `relations` limits the edges followed to the `rel` values listed, from
  §3 (`superseded_by`, `conflicts_with`, `depends_on`, `part_of`,
  `links_to`, `source`); the default is all. With `direction`, it answers
  questions such as "what rests on this note"
  (`relations=["depends_on"], direction="in"`). An unknown value is a usage
  error that lists the valid ones. The CLI spelling is `--relation`,
  repeatable.

```json
{"brain": "personal", "root": "01J9…", "direction": "both", "depth": 1, "relations": null,
 "nodes": [{"id": "01J9…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "active", "depth": 0},
           {"id": "01J8…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "superseded", "depth": 1,
            "via": {"from": "01J9…", "relation": "supersedes"}}],
 "edges": [{"rel": "superseded_by", "src": "01J8…", "dst": "01J9…"}],
 "truncated": false}
```

- The root comes first, at depth 0.
- `via.relation` uses the labels in §3, read from the node it was reached
  from. `edges` keep the stored direction.
- Within a depth, edges come in the priority order of §3, each newest
  first, so `limit` keeps what matters.

Typical uses: what a topic page lists (`out`), what refers to a decision (`in`),
and how a note evolved (`both`, depth 3).

## 10. Performance budgets

The bench performance suite measures these on generated brains of 1k and
10k notes (5 prose links and a `## Related` list each), with a warm cache
on a local SSD.

| Operation | Budget at 10k |
|---|---|
| Freshness check, nothing changed | < 150 ms |
| Search (with guards) | p95 < 50 ms |
| Read | p95 < 20 ms |
| Orientation | p95 < 30 ms |
| Full rebuild | < 30 s |
| Incremental update, one changed file | < 50 ms |
| Whole-brain lint, warm cache | < 1 s |

## 11. Failure modes

| Failure | Behavior |
|---|---|
| Index missing, corrupt, wrong schema or config | Rebuilt automatically, with one log line |
| A file fails to parse (bad YAML, bad encoding) | Indexed as text with a diagnostic, still searchable, reported by lint |
| Two files share an id | Both indexed; the one indexed later gets a `path:` id; lint error BW105 |
| Link target ambiguous | Edge stored with `dst = NULL` and `ambiguous = 1`; lint lists the candidates |
| SQLite busy beyond the timeout | The call fails with SQLite's lock error after 5 s; a retry works once the other writer finishes |
| SQLite lacks trigram | `meta.fts_trigram = 0`; `brain doctor` reports it |

Without trigram, CJK runs shorter than 3 characters still use the `LIKE`
fallback. Longer runs get no fallback and rely on the `unicode61` token
match alone.

## 12. Alternatives considered

| Option | Why not |
|---|---|
| Scan files with ripgrep at query time | No ranking, no graph, no field weights, and the cost grows with the brain on every query |
| Vector database or embeddings only | Misses exact terms and identifiers, needs a model, and still needs the link graph for the guard |
| Tantivy or Whoosh | An extra dependency for little gain over FTS5 at this scale |
| DuckDB | Strong for analytics, weaker and heavier for incremental full-text search |
| In-memory index per process | Parsing 10k notes on every CLI call costs seconds |
| Index inside the brain | Breaks under sync tools, is device-specific, and clutters git |
