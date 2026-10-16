---
id: 01M3250V009S08WBH5EYJVARZR
type: design
title: "Encryption (documentation, not code, in v0.1)"
aliases: ["Security and privacy §7"]
source: "docs/design/security-and-privacy.md#7-encryption-documentation-not-code-in-v01"
---
# Encryption (documentation, not code, in v0.1)

| Need | Recommendation |
|---|---|
| Laptop theft | Full-disk encryption (the OS default on most platforms). |
| Hosting on a remote you do not fully trust | A remote helper that encrypts the whole git repository, or object storage with client-side encryption (a proposed replicator option, [[proposal-remote-sync-3-object-storage-through-fsspec-gcs-s3\|remote sync]]). |
| Per-file encryption inside the brain | Not recommended: agents and editors cannot read encrypted files, and per-file git filters leak file names and cannot revoke access. |
