---
id: 01M3250V004G10ZVTP71QS58SX
type: proposal
title: "The replicator interface"
tags: [proposals]
source: "docs/proposals/remote-sync.md#1-the-replicator-interface"
---
# The replicator interface

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
the brain's state-dir lock, never concurrently with an apply; remote
correctness comes from per-object preconditions, with an optional remote
lease object for cross-device exclusion.

A sync component must treat a missing local file inside a known cloud-drive
folder as unknown, not deleted: online-only placeholders look like missing
files ([[03-63-coexisting-with-desktop-sync-tools|03 §6.3]]).
