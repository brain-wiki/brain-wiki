---
id: 01M3250V00PQATX18HZPN2M32P
type: design
title: "Location and lifecycle"
aliases: ["04 §2"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#2-location-and-lifecycle"
---
# Location and lifecycle

- Path: `<cache_dir>/brain-wiki/brains/<brain-id>/index.sqlite`, where
  `cache_dir` is the user cache directory ([[03-4-machine-state|03 §4]]).
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
