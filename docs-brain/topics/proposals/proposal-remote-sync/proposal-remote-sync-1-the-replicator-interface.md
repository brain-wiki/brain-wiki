---
id: 01M3250V00CY9Z1XPSC2AFZWD3
type: proposal
title: "The replicator interface"
aliases: ["Remote sync and object storage §1"]
source: "docs/proposal/remote-sync.md#1-the-replicator-interface"
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

- `brain sync [--dry-run]` and `brain sync status` drive it.
- Sync takes the brain's write lock, the same lock runs and `brain commit`
  take, so it never runs during a write.
- Remote correctness comes from per-object preconditions. An optional lease
  object on the remote can keep two devices from syncing at once.
- A missing local file inside a known cloud-drive folder counts as unknown,
  not deleted, because online-only placeholders look like missing files
  ([[config-and-storage-63-coexisting-with-desktop-sync-tools|config and storage §6.3]]).
