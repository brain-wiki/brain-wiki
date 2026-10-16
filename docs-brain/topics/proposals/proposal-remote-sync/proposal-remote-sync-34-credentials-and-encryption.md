---
id: 01M3250V00XJTNY5CH7QNCR2C3
type: proposal
title: "Credentials and encryption"
aliases: ["Remote sync and object storage §3.4"]
source: "docs/proposal/remote-sync.md#34-credentials-and-encryption"
---
# Credentials and encryption

Credentials come from the platform chains (Google application default
credentials, AWS profiles and environment), selected by name in the user
config.

Optional end-to-end encryption would encrypt each object with `age` in the
replicator, keep plaintext hashes in the manifest, and leave the local copy
in plain text, because agents must read it. This client-side encryption is
the recommendation for a remote the user does not fully trust
([[security-and-privacy-7-encryption|security §7]]).
