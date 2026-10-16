---
id: 01M3250V00WKM7Z5G98NY79CVJ
type: proposal
title: "Content classes"
aliases: ["Remote sync and object storage §3.2"]
source: "docs/proposal/remote-sync.md#32-content-classes"
---
# Content classes

- Episodes are uploaded create-only (GCS `ifGenerationMatch=0`, S3
  `If-None-Match: *`). A failed precondition means the episode is already
  there, so the upload is idempotent and never conflicts.
- Notes use optimistic concurrency on the object token, a three-way merge on
  conflict, and a conflict copy as a last resort.
- Deletes leave tombstones for 90 days, so a device that was offline cannot
  bring deleted files back. Bucket versioning or soft delete is recommended
  for recovery.
