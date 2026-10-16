---
id: 01M3250V00W3ZBQ24X4BTX6F62
type: proposal
title: "Sync algorithm"
aliases: ["Remote sync and object storage §3.1"]
source: "docs/proposal/remote-sync.md#31-sync-algorithm"
---
# Sync algorithm

The sync is three-way and based on a manifest, modeled on rclone bisync.
`fsspec.generic.rsync` cannot be used for a brain: it is one-way, compares
sizes only, and has no conflict handling.

```
state/sync/<brain-id>/<remote>.sqlite   manifest: path, base_sha256, base_size,
                                         local_mtime_ns, local_size,
                                         remote_token (GCS generation / S3 ETag),
                                         state (live | tombstone), deleted_at
state/sync/<brain-id>/base/<sha256>     content of each file at the last sync

sync:
  1 scan local (stat; hash only when stat changed)
  2 list remote once: find(detail=True) gives token + size per object
  3 per path, compare both sides with the base:
      changed locally only   → upload with precondition (token == base token; create-only if new)
      changed remotely only  → download, atomic local write
      changed on both        → identical? record. Else three-way merge with the base;
                               if hunks overlap, keep remote, write local as a conflict copy
      deleted on one side    → delete the other with a precondition; tombstone
      deleted vs changed     → the edit wins; log it
  4 precondition failed (412) → re-list that path and re-classify (bounded retries)
  5 abort before applying if deletes exceed max_delete (default 50%) or a side lists empty
  6 commit manifest rows only for transfers that succeeded
```
