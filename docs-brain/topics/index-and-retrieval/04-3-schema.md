---
id: 01M3250V0099E3S4X7D3SVZ942
type: design
title: "Schema"
aliases: ["04 §3"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#3-schema"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Schema

```sql
CREATE TABLE meta (
  key   TEXT PRIMARY KEY,           -- schema_version, brain_id, brain_root, config_hash,
  value TEXT NOT NULL               -- engine_version, last_scan_ns, fts_trigram
);

-- Every file seen in the brain (knowledge or not), for change detection.
CREATE TABLE files (
  path         TEXT PRIMARY KEY,    -- brain-relative, '/' separators
  kind         TEXT NOT NULL CHECK (kind IN
               ('note','hub','episode','archived_episode','agent_file',
                'rules','archived_rules','agents_md','log','attachment','other')),
  mtime_ns     INTEGER NOT NULL,
  size         INTEGER NOT NULL,
  sha256       TEXT NOT NULL,
  node_id      TEXT,                -- set for note, hub, episode kinds
  parse_errors INTEGER NOT NULL DEFAULT 0
);

-- Notes, hubs, and episodes.
CREATE TABLE nodes (
  id           TEXT PRIMARY KEY,    -- ULID from frontmatter, or 'path:' || path when absent
  path         TEXT NOT NULL UNIQUE,
  kind         TEXT NOT NULL CHECK (kind IN ('note','hub','episode','archived_episode')),
  topic        TEXT,                -- slug of the nearest enclosing topic, NULL outside topics
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'note',
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','superseded','archived')),
  stage        TEXT,
  created      TEXT,
  updated      TEXT,                -- frontmatter 'updated', else file mtime (ISO 8601)
  aliases      TEXT NOT NULL DEFAULT '[]',   -- JSON array
  tags         TEXT NOT NULL DEFAULT '[]',   -- JSON array
  props        TEXT NOT NULL DEFAULT '{}',   -- all other frontmatter, JSON object
  line_count   INTEGER NOT NULL,
  -- episode-only columns (NULL for notes)
  agent        TEXT,
  session      TEXT,
  origin_turns TEXT,                -- e.g. '12-48'
  device       TEXT,
  origin       TEXT CHECK (origin IN ('owner','agent','import','system')),
  taint        TEXT CHECK (taint IN ('true','false','unknown')),
  captured     TEXT CHECK (captured IN ('hook','mcp','harvest','cli','import','file'))
);
CREATE INDEX nodes_topic   ON nodes(topic);
CREATE INDEX nodes_kind    ON nodes(kind, status);
CREATE INDEX nodes_updated ON nodes(updated);

-- Keys used to resolve link targets (02 §6.5).
CREATE TABLE names (
  key     TEXT NOT NULL,            -- casefolded
  kind    TEXT NOT NULL CHECK (kind IN ('path','stem','alias','title','id')),
  node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  PRIMARY KEY (key, kind, node_id)
);

-- Previous locations of each id, for link repair after renames.
CREATE TABLE path_history (
  node_id   TEXT NOT NULL,
  path      TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  PRIMARY KEY (node_id, path)
);

CREATE TABLE claims (
  id            TEXT PRIMARY KEY,   -- c-ULID; human claims without ids are not stored here
  node_id       TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  line          INTEGER NOT NULL,
  text          TEXT NOT NULL,
  status        TEXT NOT NULL CHECK (status IN ('active','superseded','retracted')),
  superseded_by TEXT,
  origin        TEXT,
  taint         TEXT,
  asserted_at   TEXT,
  sources       TEXT NOT NULL DEFAULT '[]'  -- JSON array of 'path#Lx-Ly' or URLs
);
CREATE INDEX claims_node ON claims(node_id);

-- Typed relations (canonical direction) and untyped body links.
CREATE TABLE edges (
  id          INTEGER PRIMARY KEY,
  src         TEXT NOT NULL,        -- node id
  dst         TEXT,                 -- node id, NULL when unresolved
  rel         TEXT NOT NULL CHECK (rel IN
              ('part_of','depends_on','conflicts_with','supersedes','related_to','links_to')),
  is_guard    INTEGER NOT NULL,     -- 1 for conflicts_with, supersedes
  symmetric   INTEGER NOT NULL,     -- 1 for conflicts_with, related_to
  verb        TEXT NOT NULL,        -- as written: enables, superseded_by, drives, ...
  qualifier   TEXT,                 -- first bare qualifier word
  attrs       TEXT NOT NULL DEFAULT '{}',   -- key=value qualifiers, JSON
  note        TEXT,                 -- free text after the separator
  declared_in TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  line        INTEGER NOT NULL,
  raw_target  TEXT NOT NULL
);
CREATE INDEX edges_src   ON edges(src, rel);
CREATE INDEX edges_dst   ON edges(dst, rel);
CREATE INDEX edges_guard ON edges(src, dst) WHERE is_guard = 1;

-- Full-text search: an external-content table plus FTS5 views over it.
CREATE TABLE docs (
  rowid    INTEGER PRIMARY KEY,
  node_id  TEXT NOT NULL UNIQUE REFERENCES nodes(id) ON DELETE CASCADE,
  title    TEXT NOT NULL,
  aliases  TEXT NOT NULL,           -- space-joined
  tags     TEXT NOT NULL,           -- space-joined
  headings TEXT NOT NULL,           -- all headings, newline-joined
  body     TEXT NOT NULL,           -- prose without frontmatter or metadata, plus the
                                    -- text of current claims
  history  TEXT NOT NULL            -- superseded claims, for low-weight matching
);
CREATE VIRTUAL TABLE fts USING fts5(
  title, aliases, tags, headings, body, history,
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
  severity TEXT NOT NULL CHECK (severity IN ('error','warning','info')),
  message  TEXT NOT NULL
);
CREATE INDEX diagnostics_path ON diagnostics(path);
```

Notes on the schema:

- **Node ids for notes without frontmatter ids** use `path:<path>`. They are
  stable as long as the file does not move. This keeps imported vaults
  fully searchable before anyone runs `lint --fix`.
- **Edges store the canonical direction** (02 §6.4): a `superseded_by [[A]]`
  line on B is stored as `src=A, dst=B, rel='supersedes', verb='superseded_by',
  declared_in=B`. If both sides declare the same relation, the two rows are
  kept (each has its own `declared_in` and line) and de-duplicated at query
  time.
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
- **Why `history` is a separate column.** Text that was superseded should
  still be findable ("what did we used to think about X?"), but must not
  outrank current text or appear in snippets. A separate column with a low
  bm25 weight does both.
