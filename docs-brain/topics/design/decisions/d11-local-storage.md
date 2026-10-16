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

A brain is a local folder, optionally a git repository. `brain commit` can fetch from, rebase onto, and push to the repository's own `origin` (D35). Other remote storage, such as managed git remotes and object stores through fsspec, is designed as replicators that keep a local working copy ([[proposal-remote-sync|remote sync proposal]]). It is not built.

### Alternatives considered

- The engine reads object storage directly. Editors and Obsidian would have no local files to open.
- Git required for every brain.

## Related
- [[d35-git-history]]: D35: Git is the history of direct edits
