---
id: 01M3250V0099E3S4X7D3SVZ942
type: design
title: "Schema"
aliases: ["04 §3"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#3-schema"
---
# Schema

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
  Links in other frontmatter properties (`up:`) are not edges (02 §4).
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
