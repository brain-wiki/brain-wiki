---
id: 01M3250V005AFXV3YM3NZA37TW
type: design
title: "File access"
aliases: ["03 §6.4"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#64-file-access"
bw-part_of:
  - "[[03-6-storage-and-sync]]"
---
# File access

The engine reads and writes brain files only through `LocalStore`: paths are
resolved and checked to stay inside the brain root, writes are atomic
(temporary file, `fsync`, rename), new files are created with `O_EXCL`, and
a write can name the content hash it expects to replace, so a file changed
since it was read is never overwritten. Consolidation's "write only if
unchanged" check uses this ([[05-73-apply|05 §7.3]]).
