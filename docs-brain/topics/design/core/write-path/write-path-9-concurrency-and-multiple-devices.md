---
id: 01M3250V00RVHHNS907AT2KX4X
type: design
title: "Concurrency and multiple devices"
aliases: ["Write path §9"]
source: "docs/design/write-path.md#9-concurrency-and-multiple-devices"
---
# Concurrency and multiple devices

| Situation | Behavior |
|---|---|
| Several agents log episodes at once | Unique ULID file names; no locks needed. |
| Consolidation while agents log | New episodes are simply not in the packet; `--done` archives only the episodes it names. |
| Two runs on one device | The second waits for the write lock (bounded), then applies or finds its files stale. |
| An agent or person edits a file while a run is pending | The hash check in §7.3 makes the run stale; nothing is overwritten. |
| Two agents edit the same note directly | No lock: the last write wins, as with any editor. Git snapshots (§5) keep both versions when they fall in different rounds. |
| `brain commit` while a run applies | Commit takes the write lock without waiting and skips the round. |
| Two devices consolidate the same episodes before syncing | Both edit notes and archive the episodes; after sync the notes may repeat a fact, which nothing detects. Mitigation: consolidate on one device. |
| Episode already archived by another device | Not pending, so prepare skips it and `--done` reports `not_found`. |
