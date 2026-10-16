# D11: A local folder, with optional git

Status: accepted.
Argued in: [config and storage §6](../design/config-and-storage.md#6-storage-and-sync).

v0.1 storage is a local directory with optional git integration. Remote storage is added later as replicators (git remote, fsspec object stores), keeping a local working copy.

## Alternatives considered

Engine reads object storage directly; required git
