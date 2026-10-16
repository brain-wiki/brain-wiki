---
id: 01M3250V00SW339ENDEGYNPJ9M
type: design
title: "Concurrency and locking summary"
aliases: ["Config and storage §7"]
source: "docs/design/config-and-storage.md#7-concurrency-and-locking-summary"
---
# Concurrency and locking summary

| Resource | Mechanism |
|---|---|
| Episode creation | A unique ULID file name; dedupe markers created with `O_EXCL`; no lock |
| brain-wiki's runs | Per-brain advisory file lock in the state directory (`filelock`), held while the run commits; waits up to 30 seconds |
| `brain commit` | The same lock, taken without waiting; a held lock skips the round |
| Direct edits by agents and people | No lock |
| Index writes | SQLite WAL, `BEGIN IMMEDIATE`, 5-second busy timeout |

Lock files never live inside the brain. Sync tools copy them as ordinary
files and do not carry the lock across machines.
