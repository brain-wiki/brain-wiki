---
id: 01M3250V00SWXGPABZ3BEXZDK6
type: hub
title: "Config and storage"
source: "docs/design/03-config-and-storage.md"
---
# Config and storage

User config, multiple brains, brain selection, machine state, git, sync, future backends

Generated from `docs/design/03-config-and-storage.md`.

## Notes
- [[03-1-requirements]]: Requirements (Config and storage)
- [[03-2-user-config]]: User config
- [[03-3-choosing-a-brain]]: Choosing a brain
- [[03-4-machine-state]]: Machine state
- [[03-5-brain-lifecycle]]: Brain lifecycle
- [[03-6-storage-and-sync]]: Storage and sync
  - [[03-61-model-a-local-working-copy-always]]: Model: a local working copy, always
  - [[03-62-v01-local-folder-with-optional-git]]: v0.1: local folder with optional git
  - [[03-63-coexisting-with-desktop-sync-tools]]: Coexisting with desktop sync tools
  - [[03-64-future-the-replicator-interface]]: Future: the replicator interface
  - [[03-65-future-private-git-remote]]: Future: private git remote
  - [[03-66-future-object-storage-through-fsspec-gcs-s3]]: Future: object storage through fsspec (GCS, S3)
  - [[03-67-future-server-mode-reading-object-storage]]: Future: server mode reading object storage
- [[03-7-concurrency-and-locking-summary]]: Concurrency and locking summary
- [[03-8-failure-modes]]: Failure modes (Config and storage)
- [[03-9-alternatives-considered]]: Alternatives considered (Config and storage)
