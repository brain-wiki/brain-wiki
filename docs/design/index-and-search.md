# Index and search

Status: draft for review

## 1. Requirements

| # | Requirement | Why |
|---|---|---|
| R1 | The index is derived entirely from the brain directory and can be deleted at any time. | D1: files are the truth. Users never repair an index; they rebuild it. |
| R2 | Results reflect edits made a moment ago by any tool (Obsidian, git pull, another agent). | Agents act on what they retrieve; stale results cause wrong actions. |
| R3 | Filters (topic, type, tag, property, date) are applied before ranking, never after. | Filtering after top-k can starve results; filtering before is simpler to prove correct. |
| R4 | A superseded note is always returned with the note that replaced it (brain format §7). | Correctness about change is the core retrieval promise (G5). |
| R5 | Fast enough to call on every turn: search p95 < 50 ms, freshness check < 150 ms at 10k notes. | Agents search and read many times in one task (G7). |
| R6 | Lexical search works with zero models; embeddings are optional and later. | G6: no required services. |

## 2. Location and lifecycle

- Path: `<cache_dir>/brain-wiki/brains/<brain-id>/index.sqlite`, where
  `cache_dir` is the user cache directory ([config and storage §4](config-and-storage.md#4-machine-state)).
  Never inside the brain: SQLite files in synced folders get corrupted or
  duplicated by sync tools, and the index is device-specific anyway.
- `meta.brain_root` stores the absolute path the index was built from. If a
  brain directory is copied (two folders, same `id`), the second one gets an
  index and state keyed by `<brain-id>-<hash of path>`, so the copies never
  share machine state. Nothing reports the duplicate id.
- Opening the index checks `meta.schema_version`, `meta.brain_id`, and
  `meta.config_hash` (a hash of the `brain.toml` settings that affect
  indexing: layout and topics). A mismatch triggers a full rebuild. So does
  a database file SQLite cannot open. Rebuilds are logged, never prompted.
- Pragmas: `journal_mode=WAL`, `synchronous=NORMAL`, `foreign_keys=ON`,
  `busy_timeout=5000`.

## 3. Schema

`src/brainwiki/index/_schema.py` is authoritative; this copy matches
`SCHEMA_VERSION` 12. Any schema change bumps the version, and an index with
another version is rebuilt (§2). Values in comments are what the code
writes; the schema itself has no CHECK constraints.

```sql
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
-- keys: schema_version, brain_id, brain_root, config_hash, engine_version,
--       last_scan_ns, fts_trigram

-- Every file seen in the brain (knowledge or not), for change detection.
CREATE TABLE files (
  path         TEXT PRIMARY KEY,    -- brain-relative, '/' separators
  kind         TEXT NOT NULL,       -- note, hub, episode, archived_episode, agent_file, proposal,
                                    -- rules, archived_rules, agents_md, log, manifest, report, attachment
  mtime_ns     INTEGER NOT NULL,
  size         INTEGER NOT NULL,
  sha256       TEXT NOT NULL,
  node_id      TEXT,                -- set for files that are nodes
  parse_errors INTEGER NOT NULL DEFAULT 0
);

-- Notes, hubs, and episodes (files in inbox/agents/ are stored as kind 'episode').
CREATE TABLE nodes (
  id           TEXT PRIMARY KEY,    -- ULID from frontmatter, or 'path:' || path when absent
  path         TEXT NOT NULL UNIQUE,
  kind         TEXT NOT NULL,       -- note, hub, episode, archived_episode
  topic        TEXT,                -- slug of the nearest enclosing topic, NULL outside topics
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'note',
  status       TEXT NOT NULL DEFAULT 'active',   -- active, superseded, archived
  stage        TEXT,
  created      TEXT,
  updated      TEXT,                -- frontmatter 'updated', else file mtime (ISO 8601)
  aliases      TEXT NOT NULL DEFAULT '[]',   -- JSON array
  tags         TEXT NOT NULL DEFAULT '[]',   -- JSON array
  props        TEXT NOT NULL DEFAULT '{}',   -- all other frontmatter, JSON object
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

-- Keys used to resolve link targets (02 §6.5).
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

-- Where links point (02 §6.5): body links, plus the links in bw-superseded_by and bw-sources.
CREATE TABLE edges (
  id          INTEGER PRIMARY KEY,
  src         TEXT,                 -- node id of the note that holds the link (= declared_in)
  dst         TEXT,                 -- node id the link resolves to (= other), NULL when unresolved
  rel         TEXT NOT NULL,        -- links_to (body), superseded_by, source (bw-sources)
  written     TEXT NOT NULL,        -- link form: wiki, md, embed; 'field' for metadata links
  declared_in TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  other       TEXT,                 -- the resolved node at the far end, NULL when unresolved
  line        INTEGER NOT NULL,
  raw_target  TEXT NOT NULL,
  ambiguous   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX edges_src      ON edges(src, rel);
CREATE INDEX edges_dst      ON edges(dst, rel);
CREATE INDEX edges_declared ON edges(declared_in);
CREATE INDEX edges_other    ON edges(other);

-- Full-text search: an external-content table plus FTS5 views over it.
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

-- Parse-level problems found while indexing (full lint is computed on demand).
CREATE TABLE diagnostics (
  path     TEXT NOT NULL,
  line     INTEGER,
  code     TEXT NOT NULL,           -- e.g. BW102
  severity TEXT NOT NULL,           -- error, warning, info
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

Notes on the schema:

- **Node ids for notes without frontmatter ids** use `path:<path>`. They are
  stable as long as the file does not move. This keeps imported vaults
  fully searchable before anyone runs `lint --fix`.
- **Edges keep the direction they were written in.** `src` is always the
  note that holds the link and `dst` the note it points to: a
  `bw-superseded_by: "[[A]]"` on B is stored as `src=B, dst=A,
  rel='superseded_by'`. Each end reads an edge with its own label:

  | `rel` | Seen from `src` | Seen from `dst` |
  |---|---|---|
  | `links_to` | `links_to` | `linked_from` |
  | `superseded_by` | `superseded_by` | `supersedes` |
  | `source` | `cites` | `cited_by` |

  Reads, `brain_neighbors`, and backlinks use these labels (§7, §9.2).
  Links in other frontmatter properties (`up:`) are not edges (brain format §4).
- **FTS sync.** The engine writes `docs` and the FTS tables in the same
  transaction. For a changed row it first issues the FTS5 external-content
  delete command (`INSERT INTO fts(fts, rowid, ...) VALUES('delete', ...)`)
  with the old values read from `docs` in that transaction (FTS5 requires
  them to match exactly what was indexed), then updates `docs`, then
  inserts the new values. No triggers, because every write already goes
  through one code path. If the index is ever suspected inconsistent,
  `INSERT INTO fts(fts) VALUES('rebuild')` repairs it from `docs`.
- **SQLite capabilities are probed, not assumed.** On open, the engine
  creates a temporary FTS5 table with the trigram tokenizer. No FTS5 is a
  fatal error with a clear message; no trigram sets `meta.fts_trigram = 0`.
  Trigram options that only newer releases accept (such as
  `remove_diacritics`) are not used.
- **Body text is indexed as written.** A struck-through history bullet is
  ordinary text: it is found, and ranks by the same body weight as the
  rest. Superseded notes, not superseded lines, are what ranking demotes
  (§6.3).

## 4. Freshness

Every command that reads the index first makes it fresh. There is no
daemon in v0.1.

```
scan(brain):
  if now - meta.last_scan_ns < freshness_ms (default 1000) and same process: return
  walk the brain with os.scandir, skipping ignored paths       # stat only
  for each file:
    row = files[path]
    if row is None:                         -> parse and insert
    elif (mtime_ns, size) == row:           -> unchanged
    else: hash it; if sha256 == row.sha256  -> update mtime only
          else                              -> re-parse, replace node/edges/docs
  for each row not seen:                    -> delete (cascade), remember (id, path) in path_history
  ids that disappeared at one path and appeared at another are renames
  re-resolve edges whose raw_target matched a changed name key
  one IMMEDIATE transaction for all writes; update meta.last_scan_ns
```

- **Write-through.** When brain-wiki writes a file itself (episode,
  consolidation, fix), it updates the index in the same step, so the next
  scan sees no change.
- **Concurrent processes.** Several MCP servers (one per host) and CLI
  calls may scan at the same time. Scans read without locks, then write in
  a single `BEGIN IMMEDIATE` transaction; WAL lets readers continue. Two
  processes doing the same work is harmless: each write is idempotent.
- **Link re-resolution.** When a name key changes (file added, renamed,
  alias edited), edges whose `raw_target` matches the old or new key are
  re-resolved, so dangling links heal without a full rebuild.
- **Cost.** A stat-only walk of 10k files takes tens of milliseconds on a
  local SSD. A file watcher for network file systems and very large brains
  is in the [backlog](../roadmap/ideas.md).

## 5. Supersession guard

Given the set of hit node ids `H` (notes and hubs only), the guard reads the
`superseded_by` edges that touch them:

```sql
SELECT src, dst FROM edges
WHERE rel = 'superseded_by' AND src IS NOT NULL AND dst IS NOT NULL AND src != dst
  AND (src IN (H) OR dst IN (H));
```

Then, in code:

| Hit is | Label shown on the hit | Meaning for the agent |
|---|---|---|
| `src` (the hit names a replacement) | `superseded_by` | The hit is outdated. The neighbor is current. |
| `dst` (other notes name the hit) | `supersedes` | The hit replaced the neighbor (history). |

- **Chains.** From a hit's replacement, `superseded_by` is followed up to 5
  hops so the agent always gets the newest note; the notes passed on the way
  are listed in `via_titles` (`superseded by C (via B)`). Cycles are a lint
  error (BW307) and are cut at the first repeat.
- **Budget.** Guard notes are added on top of the result limit. Each is
  returned compactly (label, id, title, path, status, updated,
  `via_titles`); the agent can `read` it. Each hit carries at most
  `search.max_guards_per_hit` guards (default 10), ordered newest successor
  first, then the notes it replaced, most recently updated first. The rest
  are counted (`more_guards: n`) so the agent knows to look.
- **Ranking.** Superseded notes still match, but `status_factor` ranks them
  lower (§6.3).
- **Banners.** Text output turns guards into one line each, the first
  three in full, then a count:

  ```
  ⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
  ↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
  … 4 more replaced notes; brain_neighbors("topics/search/fts5.md", direction="in") lists them.
  ```

  A chain adds ` (via B)` before the colon. Search results (§6.5) and reads
  (§7) render banners the same way.

## 6. Search

### 6.1 Inputs

| Parameter | Default | Meaning |
|---|---|---|
| `query` | `""` | Free text. **Empty means browse**: no text matching, results ordered by `sort` (default `recent`) within the filters. |
| `limit` | 8 | Results per page; guard notes come on top. Max 50 (the CLI refuses more rather than clamping). |
| `topic` | all | Restrict to one or more topics, each with its sub-topics. Slugs match case-insensitively; an unknown slug is `not_found`, not an empty result. |
| `type` | any | Restrict to note types (`decision`, `release`, `person`…), as in frontmatter. |
| `tag` | any | Restrict to notes carrying all of these tags. |
| `where` | none | Frontmatter property equality, e.g. `{"stage": "open"}`; values compare as strings, case-insensitively, lists match any item. Keys the index keeps as columns match too: `tags` and `aliases` (any item), `title`, `id` (as written), `type`, `status` (or a custom `stage`), `topic`, `created`, `updated`. |
| `include_episodes` | on for a query, off when browsing | Pending episodes are searchable; a browse lists curated notes unless episodes are asked for. |
| `include_archived` | false | Also return notes with `status: archived`. |
| `include_archived_episodes` | false | Also return consolidated episodes (CLI `--include archived_episodes` only). |
| `since`, `until` | none | Only nodes updated on or after / on or before a date. Relative forms `7d`, `4w`, `3m` are accepted. |
| `sort` | `relevance` (`recent` when the query is empty) | `relevance`, `recent` (newest `updated` first), or `title` (CLI only, for listings). |
| `cursor` | none | Opaque handle from a previous result's `next_cursor`, for the next page. |
| `count_only` | false | Return only `total`: how many nodes match, before any limit. |
| `facets` | false | Add counts of the matching nodes by `type`, `topic`, and `tag` (top 10 each), so the caller can narrow before reading. |
| `format` | `text` | Text rendering style: `text` (default), or `paths` (one brain-relative path per line, for handing to file tools). The structured result is the same either way. |

### 6.2 Matching

1. Tokenize the query with the same Unicode rules as the index; drop FTS5
   syntax characters so user text can never be interpreted as operators.
2. Drop filler words ("the", "did", "why", "what", "how", "we"…) when any
   content word remains, so a question phrased as a sentence matches by what
   it is about. Build `"tok1" "tok2" "tok3"*` from what is left (implicit
   AND, prefix match on the last token, since queries are often partial
   words).
3. If fewer than `limit` nodes match, retry with OR between the same
   tokens.
4. If the query contains CJK or other unsegmented script, or the token
   query found nothing, also query `fts_tri` (trigram) with each run of 3+
   characters. Shorter runs fall back to a bounded `LIKE` scan over
   `docs.title` and `docs.body` (trigram cannot match fewer than 3
   characters).
5. Topic, type, tag, property, and date filters are applied to FTS
   candidates before scoring and truncation (R3). Candidates are fetched in
   growing batches, so filtered-out notes never displace matching ones.
6. An empty query skips steps 1–4: it selects the filtered nodes directly and
   orders them by `sort`, which is how an agent lists a topic or asks for the
   latest release.

### 6.3 Ranking

```
lexical = -bm25(fts, 8.0, 6.0, 3.0, 2.0, 1.0)   # title, aliases, tags, headings, body
score   = lexical × status_factor × kind_factor × recency_factor

status_factor  = active 1.0 · superseded 0.35 · archived 0.2
kind_factor    = hub 1.15 · note 1.0 · episode 0.7 · archived_episode 0.5
recency_factor = 0.85 + 0.15 × 0.5^(age_days / 180)       # mild; never below 0.85
```

The factors are configurable under `[search]` in `brain.toml`, and their
defaults are tuned with the bench ([eval bench](eval-bench.md)). Recency is
deliberately weak: an old note that is still active is still true.
Supersession, not age, is what demotes outdated knowledge.

### 6.4 Graph expansion

Removed in format 3. Search returns matching notes plus their guard notes
(§5) and nothing else: there is no `intent` parameter and no expansion
along links. To see what a hit links to, what links to it, or how it
evolved, follow it with `brain_neighbors` (§9.2).

### 6.5 Output

Structured result (MCP `structuredContent`; JSON from the CLI with
`--json`):

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

`total` counts every match before `limit`. `next_cursor` is present when
more results follow. `facets` appears only when requested. `score` is null
when results are ordered by date or title instead of relevance. `inputs`
and `agent` are set for episode hits only.

The text form (MCP text content, CLI default) shows each hit's path, which is
the handle for the next call, and puts guard banners (§5) before the
snippet:

```
1. Use ripgrep for search  [decision · SUPERSEDED · topics/search/ripgrep.md]
   ⚠ SUPERSEDED by "Use SQLite FTS5 for local search" (topics/search/fts5.md): prefer it.
   # Use «ripgrep» for «search» Lumen shells out to «ripgrep» for «search».
2. Use SQLite FTS5 for local search  [decision · active · topics/search/fts5.md]
   ↳ supersedes "Use ripgrep for search" (topics/search/ripgrep.md).
   …Lumen searches notes with SQLite FTS5 instead of «ripgrep»…
```

Episode hits are raw and unreviewed. Their text is wrapped in an
`<untrusted-episode agent="…" inputs="…">` envelope with a one-line
reminder that it is data, not instructions ([security](security-and-privacy.md)).

## 7. Read

`read(target, mode)` resolves `target` by id, path, file name, alias, or
title (brain format §6.5); an ambiguous target returns the candidates instead of
guessing.

| Mode | Returns |
|---|---|
| `outline` (default for hubs) | The summary (the first paragraph, up to 600 characters), headings, links, and backlinks |
| `full` (default for notes) | The body without frontmatter or HTML comments, then the "Links:" and "Linked from:" handle lists below a `---` line |
| `section` | One heading's content, matched by heading text, case-insensitively. Asking for a `section` implies this mode; the mode without a section, or a section with another mode, is a usage error |
| `raw` | The file exactly as on disk, for agents about to edit it; an episode stays in its untrusted envelope |

Every mode except `raw` starts with the banners from §5 (a `raw` read still
carries them in the structured result, but its text is the file alone). An
outline:

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

Every link and backlink carries its handle: the path after the title in
the text, and in the structured result:

| Field | Items | Order and limit |
|---|---|---|
| `links` | `{relation, target, id, title, path, resolved}`; `relation` is `superseded_by`, `cites`, or `links_to`; `target` is the link as written; `id`, `title`, and `path` are null when it does not resolve | Metadata links first, then body links in file order; one entry per target. Text shows 20, then a pointer to `brain_neighbors("<path>", direction="out")` |
| `backlinks` | `{id, title, path, relation}`; `relation` is `supersedes`, `cited_by`, or `linked_from` | Supersession first, then most recently updated; one entry per note; at most 10, with `backlinks_total` and a pointer to `brain_neighbors("<path>", direction="in")` |

`full` mode carries the same `links` and `backlinks`; it appends the handle
lists to notes and hubs, since the file's own wikilinks carry no paths. An
episode's result adds its `agent`, `inputs`, `origin`, `session`, and
`origin_turns`.

## 8. Orientation (the briefing)

`orient()` returns one brain's briefing. Agents fetch it with
`brain_orient` when a task may depend on the user's knowledge (the static
instruction block tells them to, [agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block)).
It is cut to `budgets.orient_max_tokens` (default 1,500, estimated as
characters / 4, so about 6,000 characters). Sections, in output order:

1. Header: brain name, date, note count, the span of `updated` dates, and
   pending episodes.
2. `rules.md`, all of it (budgeted separately, so it always fits).
3. **What's in this brain:** note counts by type (largest first), the
   largest topics, and the topics that hold people or meetings when notes
   of those types exist.
4. Topic table: the top-level topics, each with slug, title, one-line
   description, note count (sub-topics included; a hub is the topic's index
   and is not counted, here or in any other note count), last update, and
   its sub-topics (count, and the most recently active few by slug). Most
   recently active first; truncated with a pointer to browsing
   (`brain_search("", topic=["<slug>"])`).
5. Recent changes: the last 5 `log.md` entries, one line each, and the number
   of notes updated in the last 7 days.
6. Inbox status: pending episode count, oldest pending age, rule proposals
   awaiting `brain rules accept`, and a hint to consolidate
   (`brain_consolidate_prepare`) when 20 or more episodes are pending or the
   oldest is more than 7 days old.
7. How to query: three example calls built from this brain's own topics and
   types (a keyword search, a typed "latest" lookup, and `brain_neighbors`
   on a hub).
8. **Writing notes**, only when the calling profile has `edit`: where files
   go (`topics/<topic>/<slug>.md`, with the existing top-level topics), the
   frontmatter fields and `status` values (brain format §6.1), the body conventions
   (brain format §6.2), and "run `brain_validate` on the files you changed".

Every section except the topic table and recent changes is always
included. Recent changes are dropped first when the budget is tight, the
topic table takes the room that is left, and the text as a whole is cut at
the budget.

The managed block of `AGENTS.md` is built from the same topic rows
(brain format §11).

## 9. Other queries

| Query | Used by | Notes |
|---|---|---|
| Notes within filters, newest first | `brain_search("")`, `brain search ""` (e.g. `--since 7d`, `--topic T`) | The search path without text matching (§6.1); there is no separate listing command |
| Headings and links of a note | read (`outline`), `brain read TARGET --mode outline` | §7 |
| Links as written in a file, and in other files | `brain links`, `brain backlinks` | Edges by the file that declares them (`declared_in`): body links, `bw-superseded_by`, and `bw-sources`, resolved or not; `brain neighbors` follows resolved edges by depth (§9.2) |
| Backlinks of a node | read (`outline`), neighbors, lint orphans | All edges with `dst = node` |
| Facet counts | orientation, search `facets`, `brain tags`, `brain types` | Counts by type, topic, tag, and property |
| Orphans, dead ends, unresolved links | `brain orphans`, `brain unresolved`, reports | Nodes without incoming edges; nodes without outgoing edges; links that resolve to nothing |
| Neighborhood graph | visualizer | Nodes plus edges; see [visualizer](visualizer.md) |
| Stale links | the `stale` report, the visualizer's `stale` flag | Active notes (not hubs) that link to a superseded or archived note, except a link from a note to the note it replaced (`index.stale_links`) |
| Pending episodes | `brain consolidate --prepare`, orientation | `kind = 'episode'`, ordered by id |

### 9.1 Brain list

`brain_list` (CLI `brain brains`) answers "which brains exist, and what is
each for?" for the calling host:

| Field | Source |
|---|---|
| `name`, `description` | Registration, and the optional one-line `description` in `brain.toml` |
| `default_here` | Brain resolution for the current project and host ([config and storage §3](config-and-storage.md#3-choosing-a-brain)) |
| `topics`, `notes`, `updated`, `pending` | The index |
| `path` | The brain folder, so the host can read its files directly |

Brains outside the host's limits ([config and storage §3](config-and-storage.md#3-choosing-a-brain)) are not listed.

### 9.2 Neighbors

`neighbors(target, direction, depth, limit)` follows a node's resolved
edges without reading bodies: `direction` is `out` (what it links to),
`in` (what links to it), or `both` (default), `depth` is 1–3 (default 1),
and `limit` caps nodes (default 30, max 100). There is no filter by
relation. It returns a small subgraph:

```json
{"brain": "personal", "root": "01J9…", "direction": "both", "depth": 1,
 "nodes": [{"id": "01J9…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "active", "depth": 0},
           {"id": "01J8…", "path": "…", "title": "…", "type": "decision",
            "topic": "search", "status": "superseded", "depth": 1,
            "via": {"from": "01J9…", "relation": "supersedes"}}],
 "edges": [{"rel": "superseded_by", "src": "01J8…", "dst": "01J9…"}],
 "truncated": false}
```

The root comes first, at depth 0. `via.relation` reads from the node it was
reached from, with the labels in §3: an outgoing body link reads
`links_to` and an incoming one `linked_from`; `superseded_by` reads
`supersedes` from the newer note; a `bw-sources` link reads `cites` or
`cited_by`. `edges` keep the stored direction. Within a depth, supersession
comes first, then body links, then citations, each newest first, so
`limit` keeps what matters.

Typical uses: what a hub lists (`out`), what refers to a decision (`in`),
how a note evolved (`both`, depth 3; supersession edges are listed
first at each depth).

## 10. Performance budgets

Measured by the bench performance suite on generated brains of 1k and 10k
notes (5 prose links and a `## Related` list each), warm cache, local SSD:

| Operation | Budget at 10k |
|---|---|
| Freshness check, nothing changed | < 150 ms |
| Search (with guards) | p95 < 50 ms |
| Read | p95 < 20 ms |
| Orientation | p95 < 30 ms |
| Full rebuild | < 30 s |
| Incremental update, one changed file | < 50 ms |

## 11. Failure modes

| Failure | Behavior |
|---|---|
| Index missing, corrupt, wrong schema or config | Rebuild automatically; log one line. |
| A file fails to parse (bad YAML, bad encoding) | The file is indexed as plain text with `parse_errors=1` and a diagnostic; search still finds it; lint reports it. |
| Two files share an id | Both indexed; the newer file gets `path:` as its node id until fixed; lint error. |
| Link target ambiguous | Edge stored with `dst = NULL`; lint error lists candidates. |
| SQLite busy beyond timeout | After `busy_timeout` (5 s) the call fails with SQLite's lock error; retrying works once the other writer finishes. |
| SQLite lacks trigram | `meta.fts_trigram = 0`; CJK queries use the `LIKE` fallback; `brain doctor` reports it. |

## 12. Alternatives considered

| Option | Why not (for v0.1) |
|---|---|
| Scan files with ripgrep at query time | No ranking, no graph, no field weights; cost grows with the brain on every query. |
| Vector database / embeddings only | Misses exact terms and identifiers, needs a model, is opaque, and still needs the link graph for the guard. Planned as an optional hybrid signal. |
| Tantivy or Whoosh | An extra dependency for little gain over FTS5 at this scale. |
| DuckDB | Strong for analytics, weaker and heavier for incremental full-text search. |
| In-memory index per process | Parsing 10k notes on every CLI call costs seconds. |
| Index inside the brain | Breaks under sync tools, is device-specific, and clutters git. |
