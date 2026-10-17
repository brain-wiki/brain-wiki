---
id: 01M3250V00GVT9F94GEZ1A1CD0
type: design
title: "Encryption"
aliases: ["Security and privacy §7"]
source: "docs/design/security-and-privacy.md#7-encryption"
---
# Encryption

brain-wiki has no encryption code. The recommendations:

| Need | Recommendation |
|---|---|
| Laptop theft | Full-disk encryption, the OS default on most platforms. |
| Hosting on a remote you do not fully trust | A git remote helper that encrypts the whole repository, or object storage with client-side encryption ([[proposal-remote-sync\|remote sync proposal]]). |
| Per-file encryption inside the brain | Not recommended. Agents and editors cannot read encrypted files, and per-file git filters leak file names and cannot revoke access. |
