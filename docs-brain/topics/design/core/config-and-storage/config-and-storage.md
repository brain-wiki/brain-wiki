---
id: 01M3250V00SWXGPABZ3BEXZDK6
type: hub
title: "Config and storage"
source: "docs/design/config-and-storage.md"
---
# Config and storage

The user config, several brains, choosing a brain, machine state, git, sync tools

Status: draft for review

Generated from `docs/design/config-and-storage.md`.

## Notes
- [[config-and-storage-1-requirements]]: Requirements (Config and storage)
  - [[c1]]: C1: Source code and brains are separate
  - [[c2]]: C2: A user can have several named brains and pick one per call, per…
  - [[c3]]: C3: Moving a brain folder, or opening it on another device, needs at most…
  - [[c4]]: C4: Nothing that sync tools or git would corrupt lives in the brain
  - [[c5]]: C5: v0.1 needs nothing but a local folder
  - [[c6]]: C6: Remote storage can be added later without changing the format or the…
- [[config-and-storage-2-user-config]]: User config
- [[config-and-storage-3-choosing-a-brain]]: Choosing a brain
- [[config-and-storage-4-machine-state]]: Machine state
- [[config-and-storage-5-brain-lifecycle]]: Brain lifecycle
- [[config-and-storage-6-storage-and-sync]]: Storage and sync
  - [[config-and-storage-61-model-a-local-working-copy-always]]: Model: a local working copy, always
  - [[config-and-storage-62-v01-local-folder-with-optional-git]]: v0.1: local folder with optional git
  - [[config-and-storage-63-coexisting-with-desktop-sync-tools]]: Coexisting with desktop sync tools
  - [[config-and-storage-64-file-access]]: File access
- [[config-and-storage-7-concurrency-and-locking-summary]]: Concurrency and locking summary
- [[config-and-storage-8-failure-modes]]: Failure modes (Config and storage)
- [[config-and-storage-9-alternatives-considered]]: Alternatives considered (Config and storage)
