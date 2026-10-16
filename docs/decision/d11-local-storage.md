# D11: A local folder, with optional git

Status: accepted.
Argued in: [config and storage §6](../design/config-and-storage.md#6-storage-and-sync).

A brain is a local folder, optionally a git repository. `brain commit` can fetch from, rebase onto, and push to the repository's own `origin` (D35). Other remote storage, such as managed git remotes and object stores through fsspec, is designed as replicators that keep a local working copy ([remote sync proposal](../proposal/remote-sync.md)). It is not built.

## Alternatives considered

- The engine reads object storage directly. Editors and Obsidian would have no local files to open.
- Git required for every brain.
