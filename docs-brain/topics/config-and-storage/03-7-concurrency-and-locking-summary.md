---
id: 01M3250V008Q6XHVEXFG1RM6KR
type: design
title: "Concurrency and locking summary"
aliases: ["03 §7"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#7-concurrency-and-locking-summary"
---
# Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | `O_EXCL` create of a unique name; no lock |
| Curated writes (apply, fix, rule, review accept, mv) | Per-brain advisory file lock in the state dir (`filelock`), held only during apply |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, busy timeout |

Lock files never live inside the brain: sync tools replicate them as
ordinary files and do not carry the lock across machines.
