---
id: 01M3250V00JW3FWDM7RJ28BXX6
type: design
title: "Future: server mode reading object storage"
aliases: ["03 §6.7"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#67-future-server-mode-reading-object-storage"
bw-part_of:
  - "[[03-6-storage-and-sync]]"
---
# Future: server mode reading object storage

A remote MCP server for chat apps ([[08-9-future-remote-mcp-for-chat-apps|08 §9]])
could run where there is no persistent disk (a container platform). Its
brain is a bucket prefix.

To keep that possible without complicating v0.1, the engine reads and
writes brain files through a narrow internal interface:

```python
class BrainStore(Protocol):
    def list(self) -> Iterator[FileStat]: ...            # path, size, mtime_ns or token
    def read(self, path: str) -> bytes: ...
    def write(self, path: str, data: bytes, *, expect: Token | None, create_only: bool) -> Token: ...
    def move(self, src: str, dst: str, *, expect: Token | None) -> None: ...
    def delete(self, path: str, *, expect: Token | None) -> None: ...
```

v0.1 ships only `LocalStore` (atomic writes, `O_EXCL` creates, hash
tokens). An `FsspecStore` would map `expect` to generation/ETag
preconditions; GCS and S3 are strongly consistent for read-after-write and
listing, so no extra consistency handling is needed. The index for a
server would live on local ephemeral disk and be rebuilt at startup.

Building every engine operation on `BrainStore`, including the "write only
if unchanged" checks consolidation already does
([[05-73-apply|05 §7.3]]), costs little now
and is what keeps this future cheap.
