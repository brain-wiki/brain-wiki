---
id: 01M3250V008Q6XHVEXFG1RM6KR
type: design
title: "Concurrency and locking summary"
aliases: ["03 §7"]
source: "docs/design/03-config-and-storage.md#7-concurrency-and-locking-summary"
---
# Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | `O_EXCL` create of a unique name; no lock |
| brain-wiki's runs (`consolidate --done`, fix, rule, review accept, grant, mv, import) | Per-brain advisory file lock in the state dir (`filelock`), held only while the run commits |
| `brain commit` | The same lock, taken without waiting; a held lock skips the round |
| Direct edits by agents and people | No lock: files are the user's |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, busy timeout |

Lock files never live inside the brain: sync tools replicate them as
ordinary files and do not carry the lock across machines.
