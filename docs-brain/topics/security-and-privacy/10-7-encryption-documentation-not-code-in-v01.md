---
id: 01M3250V00YWKCBBP6C87JEA5T
type: design
title: "Encryption (documentation, not code, in v0.1)"
aliases: ["10 §7"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#7-encryption-documentation-not-code-in-v01"
---
# Encryption (documentation, not code, in v0.1)

| Need | Recommendation |
|---|---|
| Laptop theft | Full-disk encryption (the OS default on most platforms). |
| Hosting on a remote you do not fully trust | A remote helper that encrypts the whole git repository, or object storage with client-side encryption (future replicator option, [[03-66-future-object-storage-through-fsspec-gcs-s3\|03 §6.6]]). |
| Per-file encryption inside the brain | Not recommended: agents and editors cannot read encrypted files, and per-file git filters leak file names and cannot revoke access. |

## Relations
- part_of [[security-and-privacy]]
