"""Index schema. Bump SCHEMA_VERSION on any change; the index is rebuilt automatically."""

from __future__ import annotations

SCHEMA_VERSION = 12

DDL = """
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);

CREATE TABLE files (
  path         TEXT PRIMARY KEY,
  kind         TEXT NOT NULL,
  mtime_ns     INTEGER NOT NULL,
  size         INTEGER NOT NULL,
  sha256       TEXT NOT NULL,
  node_id      TEXT,
  parse_errors INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE nodes (
  id           TEXT PRIMARY KEY,
  path         TEXT NOT NULL UNIQUE,
  kind         TEXT NOT NULL,
  topic        TEXT,
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'note',
  status       TEXT NOT NULL DEFAULT 'active',
  stage        TEXT,
  created      TEXT,
  updated      TEXT,
  aliases      TEXT NOT NULL DEFAULT '[]',
  tags         TEXT NOT NULL DEFAULT '[]',
  props        TEXT NOT NULL DEFAULT '{}',
  line_count   INTEGER NOT NULL DEFAULT 0,
  fm_id        TEXT,
  agent        TEXT,
  session      TEXT,
  origin_turns TEXT,
  device       TEXT,
  origin       TEXT,
  inputs        TEXT,
  captured     TEXT
);
CREATE INDEX nodes_topic ON nodes(topic, kind, updated);
CREATE INDEX nodes_kind ON nodes(kind, status);
CREATE INDEX nodes_updated ON nodes(updated);
-- Covers the briefing's single pass over visible notes (orient.brief_stats).
CREATE INDEX nodes_brief ON nodes(kind, topic, type, updated);

CREATE TABLE names (
  key     TEXT NOT NULL,
  kind    TEXT NOT NULL,
  node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  PRIMARY KEY (key, kind, node_id)
);
CREATE INDEX names_node ON names(node_id);  -- lookups and ON DELETE CASCADE from nodes

CREATE TABLE path_history (
  node_id   TEXT NOT NULL,
  path      TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  PRIMARY KEY (node_id, path)
);

-- Where links point (02 §6.5): body links (`links_to`), plus the note links held in metadata,
-- `bw-superseded_by` (`superseded_by`) and `bw-sources` (`source`). `src` is always the note
-- that holds the link (`declared_in`); `dst` is the note it resolves to (`other`), or NULL.
CREATE TABLE edges (
  id          INTEGER PRIMARY KEY,
  src         TEXT,
  dst         TEXT,
  rel         TEXT NOT NULL,
  written     TEXT NOT NULL,
  declared_in TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  other       TEXT,
  line        INTEGER NOT NULL,
  raw_target  TEXT NOT NULL,
  ambiguous   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX edges_src ON edges(src, rel);
CREATE INDEX edges_dst ON edges(dst, rel);
CREATE INDEX edges_declared ON edges(declared_in);
CREATE INDEX edges_other ON edges(other);

CREATE TABLE docs (
  rowid    INTEGER PRIMARY KEY,
  node_id  TEXT NOT NULL UNIQUE REFERENCES nodes(id) ON DELETE CASCADE,
  title    TEXT NOT NULL,
  aliases  TEXT NOT NULL,
  tags     TEXT NOT NULL,
  headings TEXT NOT NULL,
  body     TEXT NOT NULL
);
CREATE VIRTUAL TABLE fts USING fts5(
  title, aliases, tags, headings, body,
  content='docs', content_rowid='rowid',
  tokenize='porter unicode61 remove_diacritics 2'
);

CREATE TABLE diagnostics (
  path     TEXT NOT NULL,
  line     INTEGER,
  code     TEXT NOT NULL,
  severity TEXT NOT NULL,
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

-- File-local lint results keyed by content hash, so whole-brain lint only re-checks changed files.
CREATE TABLE lint_cache (
  path     TEXT PRIMARY KEY,
  sha256   TEXT NOT NULL,
  problems TEXT NOT NULL
);
"""

TRIGRAM_DDL = """
CREATE VIRTUAL TABLE fts_tri USING fts5(
  title, body,
  content='docs', content_rowid='rowid',
  tokenize='trigram'
);
"""
