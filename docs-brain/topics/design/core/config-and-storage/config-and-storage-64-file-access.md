---
id: 01M3250V00ZFHWRXEEVNCSB0MC
type: design
title: "File access"
aliases: ["Config and storage §6.4"]
source: "docs/design/config-and-storage.md#64-file-access"
---
# File access

The engine reads and writes brain files only through `LocalStore`: paths are
resolved and checked to stay inside the brain root, writes are atomic
(temporary file, `fsync`, rename), new files are created with `O_EXCL`, and
a write can name the content hash it expects to replace, so a file changed
since it was read is never overwritten. Every run uses this, so a run never
overwrites a file someone edited after the run read it.
