---
id: 01M3250V00KR8GSN8TKRV79BAB
type: proposal
title: "Server mode reading object storage"
aliases: ["Remote sync and object storage §4"]
source: "docs/proposal/remote-sync.md#4-server-mode-reading-object-storage"
---
# Server mode reading object storage

A remote MCP server for chat apps ([[proposal-remote-mcp|remote MCP]]) could run
where there is no persistent disk (a container platform). Its brain is a
bucket prefix, so it has no local copy by design.

The engine reads and writes brain files through `LocalStore`
([[config-and-storage-64-file-access|config and storage §6.4]]). Server mode
puts a narrow interface in front of it:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

An `FsspecStore` would map `expect` to generation/ETag preconditions; GCS
and S3 are strongly consistent for read-after-write and listing, so no
extra consistency handling is needed. The index for a server would live on
local ephemeral disk and be rebuilt at startup. `LocalStore` already takes
an expected hash on writes, which is the "write only if unchanged" check
consolidation relies on ([[write-path-73-apply|write path §7.3]]),
so the interface adds little.
