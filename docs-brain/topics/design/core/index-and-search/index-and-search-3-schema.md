---
id: 01M3250V00RHT9C1RMCVTVTZ0X
type: design
title: "Schema"
aliases: ["Index and search §3"]
source: "docs/design/index-and-search.md#3-schema"
---
# Schema

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
  ([[brain-format-8-topic-pages|brain format §8]]), whatever its
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
  from the folder name. See [[write-path-3-provenance-and-inputs|write path §3]].

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
edges ([[brain-format-4-common-file-conventions|brain format §4]]).

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
