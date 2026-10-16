---
id: 01M3250V002K6GVMDT84Y96S36
type: design
title: "Coexisting with desktop sync tools"
aliases: ["Config and storage §6.3"]
source: "docs/design/config-and-storage.md#63-coexisting-with-desktop-sync-tools"
---
# Coexisting with desktop sync tools

Users may keep a brain in Dropbox, iCloud Drive, OneDrive, Google Drive,
Syncthing, or Obsidian Sync. brain-wiki supports this by staying out of the
way:

| Risk | Mitigation |
|---|---|
| SQLite or lock files corrupted by sync | None live in the brain. Lint BW115 flags `*.sqlite`, `*.sqlite3`, `*.db`, `*-wal`, and `*-shm` files inside one. |
| Conflict copies | Lint BW112 (below). Never deleted automatically. |
| Online-only placeholders look like missing files | brain-wiki has no sync engine that could spread a deletion. A future sync component must treat a missing file in a cloud-drive folder as unknown, not deleted. |
| Temporary files from atomic writes | Named `.brain-tmp-…`. brain-wiki ignores dot files, as do most sync tools' defaults. |
| Two devices consolidating the same episodes | Possible across sync gaps ([[write-path-9-concurrency-and-multiple-devices\|write path §9]]). |
| A synced `.git` folder while two machines commit | Not mitigated; the repository can be corrupted. Share git brains through origin (§6.2). |

BW112 matches names such as `(conflicted copy …)`, `.sync-conflict-…`,
`.conflict-<host>-<time>.md`, `.conflictN`, and `..path1`. It matches
`name (1).md` and `name 2.md` only when `name.md` also exists and differs.
