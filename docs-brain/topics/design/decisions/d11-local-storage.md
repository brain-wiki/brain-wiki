---
id: 01M3250V0029DHBZD49GXT51JE
type: decision
title: "D11: A local folder, with optional git"
aliases: ["D11"]
source: "docs/decision/d11-local-storage.md"
---
# D11: A local folder, with optional git

Status: accepted.
Argued in: [[config-and-storage-6-storage-and-sync|config and storage §6]].

v0.1 storage is a local directory with optional git integration. Remote storage is added later as replicators (git remote, fsspec object stores), keeping a local working copy.

### Alternatives considered

Engine reads object storage directly; required git
