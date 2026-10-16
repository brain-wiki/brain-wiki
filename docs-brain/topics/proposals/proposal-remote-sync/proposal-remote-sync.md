---
id: 01M3250V0088Y0MZZGSR2ZMDYF
type: hub
title: "Remote sync and object storage"
source: "docs/proposals/remote-sync.md"
---
# Remote sync and object storage

`brain sync` to a private git remote, then GCS and S3; a store interface for a server with no local copy

Status: designed, not scheduled; the git case is partly covered by `brain commit` · Extends [[03-6-storage-and-sync|03 §6]]

Today a brain is a local folder, optionally a git work tree
([[03-62-v01-local-folder-with-optional-git|03 §6.2]]).
For a git brain whose branch tracks a branch on `origin`, `brain commit`
fetches and rebases, and with `--push` pushes
([[05-5-committing-direct-edits|05 §5]]),
so a private git remote already works as a replica. This proposal adds the
rest, built in order: `brain sync` and `brain remote` for setting up and
inspecting a git remote, then object storage (GCS, S3), then a server mode
that reads a brain from object storage with no local copy.

The local working copy stays the only thing the engine reads and writes
([[03-61-model-a-local-working-copy-always|03 §6.1]]);
a replica is kept in step by a sync component.

Generated from `docs/proposals/remote-sync.md`.

## Notes
- [[proposal-remote-sync-1-the-replicator-interface]]: The replicator interface
- [[proposal-remote-sync-2-private-git-remote]]: Private git remote
- [[proposal-remote-sync-3-object-storage-through-fsspec-gcs-s3]]: Object storage through fsspec (GCS, S3)
- [[proposal-remote-sync-4-server-mode-reading-object-storage]]: Server mode reading object storage
- [[proposal-remote-sync-5-what-leaves-the-machine]]: What leaves the machine
- [[proposal-remote-sync-6-alternatives-considered]]: Alternatives considered (Remote sync and object storage)
