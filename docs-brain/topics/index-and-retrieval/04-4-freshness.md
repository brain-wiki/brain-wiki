---
id: 01M3250V00TRR1A139QY4VBGKR
type: design
title: "Freshness"
aliases: ["04 §4"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#4-freshness"
bw-part_of:
  - "[[index-and-retrieval]]"
---
# Freshness

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
          else                              -> re-parse, replace node/claims/edges/docs
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
  local SSD. Network file systems and very large brains can opt into a file
  watcher later (§13).
