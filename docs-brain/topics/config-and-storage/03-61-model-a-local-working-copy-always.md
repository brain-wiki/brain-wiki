---
id: 01M3250V00RQ7PJV6RAWY26YA9
type: design
title: "Model: a local working copy, always"
aliases: ["03 §6.1"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#61-model-a-local-working-copy-always"
bw-part_of:
  - "[[03-6-storage-and-sync]]"
---
# Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a **local working copy**: a normal folder. That
folder is the only thing the engine reads and writes.

Remote storage, when added, is a **replica** of that folder, kept in step
by a sync component. The engine never reads from a network filesystem on
the hot path.

```
   engine (index, search, consolidate) ──reads/writes──► local working copy
                                                             │
                                          ┌──────────────────┼──────────────────┐
                                          ▼                  ▼                  ▼
                                   v0.1: nothing,      future: git        future: object
                                   or the user's own   remote replicator  store replicator
                                   sync tool / git                        (fsspec: GCS, S3)
```

The exception is a future stateless server ([[03-67-future-server-mode-reading-object-storage|§6.7]]),
which has no local copy by design.
