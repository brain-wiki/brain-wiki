---
id: 01M3250V00SZ2GXWPQ87CZ9QAT
type: proposal
title: "Object storage through fsspec (GCS, S3)"
aliases: ["Remote sync and object storage §3"]
source: "docs/proposal/remote-sync.md#3-object-storage-through-fsspec-gcs-s3"
---
# Object storage through fsspec (GCS, S3)

For users who want a bucket instead of a git host (or a server deployment,
§4). `fsspec` provides one API over `gcsfs` (GCS) and `s3fs` (S3); the
replicator uses it **only for the remote side**. Local writes keep using
brain-wiki's atomic writer, because fsspec's local transactions commit
through the system temp directory and are not atomic across filesystems.
The dependencies ship as an extra: `brain-wiki[sync]` (`fsspec`, `gcsfs`,
`s3fs`, `google-cloud-storage`).

**Sync algorithm: three-way, manifest-based.** `fsspec.generic.rsync` is
one-way and compares sizes only, so it cannot be used for a brain.
Instead, modeled on rclone bisync:

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

**Content classes.**

- Episodes: uploaded create-only (GCS `ifGenerationMatch=0`, S3
  `If-None-Match: *`). A precondition failure means "already there"; the
  upload is idempotent and can never conflict.
- Curated notes: optimistic concurrency on the object token, three-way
  merge on conflict, conflict copy as a last resort.
- Deletes: tombstones kept 90 days so a device that was offline cannot
  resurrect deleted files; bucket versioning or soft delete recommended
  for recovery.

**Known gaps to close before building it** (from the research):

- `gcsfs` exposes create-only writes but not compare-and-swap on an
  existing object's generation. The GCS replicator needs the
  `google-cloud-storage` client (`if_generation_match`) for updates and
  conditional deletes.
- `s3fs` forwards extra arguments to `put_object`, so `IfMatch` should
  work, but this must be verified end to end; S3 conditional writes
  require SigV4 and current botocore.
- `DirFileSystem` only blocks `..` escapes on local filesystems; remote
  paths must be validated by brain-wiki.

**Credentials** come from the platform chains (Google application default
credentials, AWS profiles and environment), selected by name in the user
config. Optional end-to-end encryption would encrypt each object with
`age` in the replicator, store plaintext hashes in the manifest, and leave
the local copy in plain text (agents must read it). For a remote the user
does not fully trust, this client-side encryption is the recommendation
([[security-and-privacy-7-encryption-documentation-not-code-in-v01|security §7]]).
