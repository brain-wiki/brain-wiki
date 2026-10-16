---
id: 01M3250V00SWXGPABZ3BEXZDK6
type: hub
title: "Config and storage"
source: "docs/design/03-config-and-storage.md"
---
# Config and storage

User config, multiple brains, brain selection, machine state, git, desktop sync tools

Status: draft for review

Generated from `docs/design/03-config-and-storage.md`.

## Notes
- [[03-1-requirements]]: Requirements (Config and storage)
  - [[c1]]: C1: Source code and brains are separate
  - [[c2]]: C2: A user can have several named brains and pick one per call, per…
  - [[c3]]: C3: Moving a brain folder, or opening it on another device, needs at most…
  - [[c4]]: C4: Nothing that sync tools or git would corrupt lives in the brain
  - [[c5]]: C5: v0.1 needs nothing but a local folder
  - [[c6]]: C6: Remote storage can be added later without changing the format or the…
- [[03-2-user-config]]: User config
- [[03-3-choosing-a-brain]]: Choosing a brain
- [[03-4-machine-state]]: Machine state
- [[03-5-brain-lifecycle]]: Brain lifecycle
- [[03-6-storage-and-sync]]: Storage and sync
  - [[03-61-model-a-local-working-copy-always]]: Model: a local working copy, always
  - [[03-62-v01-local-folder-with-optional-git]]: v0.1: local folder with optional git
  - [[03-63-coexisting-with-desktop-sync-tools]]: Coexisting with desktop sync tools
  - [[03-64-file-access]]: File access
- [[03-7-concurrency-and-locking-summary]]: Concurrency and locking summary
- [[03-8-failure-modes]]: Failure modes (Config and storage)
- [[03-9-alternatives-considered]]: Alternatives considered (Config and storage)
