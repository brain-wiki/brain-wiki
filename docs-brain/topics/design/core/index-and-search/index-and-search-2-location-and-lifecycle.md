---
id: 01M3250V00VNM4E46B24QMTASS
type: design
title: "Location and lifecycle"
aliases: ["Index and search §2"]
source: "docs/design/index-and-search.md#2-location-and-lifecycle"
---
# Location and lifecycle

Each brain has one index per device, in brain-wiki's cache directory.

- The path is `<cache>/brains/<key>/index.sqlite`. `<cache>` is
  `~/.cache/brain-wiki` on Linux, and `BRAIN_WIKI_CACHE_DIR` overrides it
  ([[config-and-storage-4-machine-state|config and storage §4]]).
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
