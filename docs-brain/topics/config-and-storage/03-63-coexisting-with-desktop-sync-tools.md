---
id: 01M3250V009S782XRDSAVVRHM0
type: design
title: "Coexisting with desktop sync tools"
aliases: ["03 §6.3"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#63-coexisting-with-desktop-sync-tools"
---
# Coexisting with desktop sync tools

Many users will keep a brain in Dropbox, iCloud Drive, OneDrive, Google
Drive, Syncthing, or Obsidian Sync. brain-wiki supports this by staying out
of the way:

| Risk | Mitigation |
|---|---|
| SQLite or lock files corrupted by sync | None live in the brain (index in cache, locks in state). Lint flags `*.sqlite`, `*.db`, `*-wal`, `*-shm` found inside a brain. |
| Conflict copies (`… (conflicted copy …).md`, `.sync-conflict-…`, `name 2.md`, `name (1).md`, `-HOSTNAME.md`, `(Conflicted copy …)`) | Lint BW112 detects them with strict patterns, and with loose patterns only when the base file also exists and differs. Never auto-deleted. |
| Online-only placeholders look like missing files | v0.1 has no sync engine that could propagate a "delete". A future sync component must treat a missing local file as unknown, not deleted, inside known cloud-drive folders. |
| Temporary files from atomic writes | Prefix `.brain-tmp-`; dot files are ignored by brain-wiki and by most sync tools' default rules. |
| Two devices consolidating the same episodes | Possible across sync gaps; see [[05-9-concurrency-and-multiple-devices\|05 §9]]. |
