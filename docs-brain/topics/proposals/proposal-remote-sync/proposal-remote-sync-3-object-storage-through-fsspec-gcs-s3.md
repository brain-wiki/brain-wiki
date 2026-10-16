---
id: 01M3250V00SZ2GXWPQ87CZ9QAT
type: proposal
title: "Object storage through fsspec (GCS, S3)"
aliases: ["Remote sync and object storage §3"]
source: "docs/proposal/remote-sync.md#3-object-storage-through-fsspec-gcs-s3"
---
# Object storage through fsspec (GCS, S3)

Object storage is for users who want a bucket instead of a git host, and
for a server deployment (§4). `fsspec` provides one API over `gcsfs` (GCS)
and `s3fs` (S3). The replicator uses it only for the remote side.

- Local writes keep using brain-wiki's atomic writer. fsspec's local
  transactions commit through the system temp folder and are not atomic
  across filesystems.
- The dependencies ship as an extra: `brain-wiki[sync]` (`fsspec`, `gcsfs`,
  `s3fs`, `google-cloud-storage`).

## Subsections
- [[proposal-remote-sync-31-sync-algorithm]]: Sync algorithm
- [[proposal-remote-sync-32-content-classes]]: Content classes
- [[proposal-remote-sync-33-gaps-to-close-before-building]]: Gaps to close before building
- [[proposal-remote-sync-34-credentials-and-encryption]]: Credentials and encryption
