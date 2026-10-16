---
id: 01M3250V00KR8GSN8TKRV79BAB
type: proposal
title: "Server mode reading object storage"
aliases: ["Remote sync and object storage §4"]
source: "docs/proposal/remote-sync.md#4-server-mode-reading-object-storage"
---
# Server mode reading object storage

A remote MCP server for chat apps ([[proposal-remote-mcp|remote MCP]]) could run
where there is no persistent disk, such as a container platform. Its brain
is a bucket prefix, so it has no local copy.

The engine reads and writes brain files through `LocalStore`
([[config-and-storage-64-file-access|config and storage §6.4]]).
Server mode puts a narrow interface in front of it:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

- An `FsspecStore` would map `expect` to generation or ETag preconditions.
  GCS and S3 are strongly consistent for read-after-write and listing, so no
  extra consistency handling is needed.
- The server's index would live on local temporary disk and be rebuilt at
  startup.
- `LocalStore.write_bytes` already takes an expected hash and refuses a
  file that changed, and runs use it when they apply
  ([[write-path-73-apply|write path §7.3]]). The interface adds
  little.
