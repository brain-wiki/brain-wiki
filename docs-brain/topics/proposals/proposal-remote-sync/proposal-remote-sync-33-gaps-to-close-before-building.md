---
id: 01M3250V00EABR13J347FQS1XJ
type: proposal
title: "Gaps to close before building"
aliases: ["Remote sync and object storage §3.3"]
source: "docs/proposal/remote-sync.md#33-gaps-to-close-before-building"
---
# Gaps to close before building

- `gcsfs` supports create-only writes but not compare-and-swap on an
  existing object's generation. The GCS replicator needs the
  `google-cloud-storage` client (`if_generation_match`) for updates and
  conditional deletes.
- `s3fs` forwards extra arguments to `put_object`, so `IfMatch` should work,
  but this needs an end-to-end test. S3 conditional writes need SigV4 and a
  current botocore.
- `DirFileSystem` blocks `..` escapes only on local filesystems, so
  brain-wiki must validate remote paths itself.
