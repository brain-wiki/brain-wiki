---
id: 01M3250V005CQQYWQDP4P86ZMK
type: design
title: "Freshness"
aliases: ["Index and search §4"]
source: "docs/design/index-and-search.md#4-freshness"
---
# Freshness

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
- The topic tree comes from the folders under `topics/` and the hub files
  the scan saw ([[brain-format-2-directory-layout|brain format §2.1]]).
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
  [[ideas|ideas list]].
