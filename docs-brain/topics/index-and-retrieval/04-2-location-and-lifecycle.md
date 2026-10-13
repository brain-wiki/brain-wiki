---
id: 01M3250V00PQATX18HZPN2M32P
type: design
title: "Location and lifecycle"
aliases: ["04 §2"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#2-location-and-lifecycle"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Location and lifecycle

- Path: `<cache_dir>/brain-wiki/brains/<brain-id>/index.sqlite`, where
  `cache_dir` is the user cache directory ([[03-4-machine-state|03 §4]]).
  Never inside the brain: SQLite files in synced folders get corrupted or
  duplicated by sync tools, and the index is device-specific anyway.
- `meta.brain_root` stores the absolute path the index was built from. If a
  brain directory is copied (two folders, same `id`), the second one gets an
  index keyed by `<brain-id>-<hash of path>` and lint warns about the
  duplicate id.
- Opening the index checks `meta.schema_version` and `meta.config_hash`
  (a hash of the `brain.toml` settings that affect indexing: layout and
  topics). A mismatch triggers a full rebuild. So does an
  integrity error (`PRAGMA quick_check`). Rebuilds are logged, never
  prompted.
- Pragmas: `journal_mode=WAL`, `synchronous=NORMAL`, `foreign_keys=ON`,
  `busy_timeout=5000`.
