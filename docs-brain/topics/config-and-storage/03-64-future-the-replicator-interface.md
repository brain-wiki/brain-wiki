---
id: 01M3250V00QTQ4A6R5T2FC8D6N
type: design
title: "Future: the replicator interface"
aliases: ["03 §6.4"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#64-future-the-replicator-interface"
---
# Future: the replicator interface

Remote backends plug in behind one small interface, so the engine and the
format never change:

```python
class Replicator(Protocol):
    name: str                                # "git", "gcs", "s3", ...
    def status(self, brain: Brain) -> SyncStatus: ...      # ahead/behind/conflicts, no changes made
    def sync(self, brain: Brain, *, dry_run: bool) -> SyncReport: ...
```

```toml
# user config.toml (credentials are never stored here)
[brains.personal.remote]
type   = "git"                        # or "gcs", "s3"
url    = "git@example.com:me/brain.git"
# type = "gcs"; url = "gs://my-bucket/brains/personal"; project = "my-project"
# type = "s3";  url = "s3://my-bucket/brains/personal"; profile = "personal"
auto   = "after-write"                # off | after-write | interval
```

`brain sync [--dry-run]` and `brain sync status` drive it. Sync runs under
the brain's state-dir lock, never concurrently with an apply.

## Relations
- part_of [[03-6-storage-and-sync]]
