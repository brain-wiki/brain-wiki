---
id: 01M3250V0088Y0MZZGSR2ZMDYF
type: hub
title: "Remote sync and object storage"
source: "docs/proposal/remote-sync.md"
---
# Remote sync and object storage

`brain sync` with conflict copies, then GCS and S3, then a server that reads a brain from a bucket

Status: designed, not scheduled. `brain commit` already syncs a git brain
with origin. Extends
[[config-and-storage-6-storage-and-sync|config and storage §6]].

Today a brain is a local folder, optionally a git work tree
([[config-and-storage-62-local-folder-with-optional-git|config and storage §6.2]]).
When the branch of a git brain tracks a branch on `origin`, `brain commit`
fetches, rebases, and with `--push` pushes
([[write-path-5-committing-direct-edits|write path §5]]). A
private git remote already works as a replica.

This proposal adds the rest, built in this order:

1. `brain sync` and `brain remote`, to set up and inspect a git remote and
   to keep both versions when a rebase conflicts.
2. Object storage (GCS, S3).
3. A server mode that reads a brain from object storage, with no local copy.

The local working copy stays the only thing the engine reads and writes
([[config-and-storage-61-model-a-local-working-copy-always|config and storage §6.1]]).
A sync component keeps each replica up to date.

Generated from `docs/proposal/remote-sync.md`.

## Notes
- [[proposal-remote-sync-1-the-replicator-interface]]: The replicator interface
- [[proposal-remote-sync-2-private-git-remote]]: Private git remote
- [[proposal-remote-sync-3-object-storage-through-fsspec-gcs-s3]]: Object storage through fsspec (GCS, S3)
  - [[proposal-remote-sync-31-sync-algorithm]]: Sync algorithm
  - [[proposal-remote-sync-32-content-classes]]: Content classes
  - [[proposal-remote-sync-33-gaps-to-close-before-building]]: Gaps to close before building
  - [[proposal-remote-sync-34-credentials-and-encryption]]: Credentials and encryption
- [[proposal-remote-sync-4-server-mode-reading-object-storage]]: Server mode reading object storage
- [[proposal-remote-sync-5-what-leaves-the-machine]]: What leaves the machine
