---
id: 01M3250V0010XBN85AK3BQ6K80
type: design
title: "Storage and sync"
aliases: ["Config and storage §6"]
source: "docs/design/config-and-storage.md#6-storage-and-sync"
---
# Storage and sync

### 6.1 Model: a local working copy, always

Agents read brain files directly (instruction files, skills, editors,
Obsidian), and the index needs local files to stay fast. So every device
that uses a brain has a local working copy, a normal folder. That folder is
the only thing the engine reads and writes.

Today a brain moves between devices through git or the user's own sync
tool. Any remote brain-wiki adds will be a replica of that folder, kept
current by a sync component. The engine never reads a network filesystem on
the hot path. Git and object-storage replicas, and a server mode with no
local copy, are a [[proposal-remote-sync|proposal]].


### 6.2 Local folder with optional git

When the brain is a git repository and `[git] mode` in `brain.toml` is
`"auto"` (the default), or the brain is inside a git work tree and the mode
is `"on"`, every brain-wiki run is committed as it applies
([[write-path-7-runs|write path §7.3]]). `auto` leaves a brain inside
someone else's repository alone, so a run never commits into a repository
that did not ask for it; `brain import --overlay` follows the same rule.

- exactly the files the run touched are staged, so the user's unrelated
  work in progress is never swept in;
- the message names the operation, with `Brain-Run:` and `Brain-Agent:`
  trailers;
- the user's own git identity and hooks are used;
- a run never pushes, pulls, or changes branches.

Direct edits by agents and people are not runs. `brain commit` snapshots
them, by hand or from an OS job that `brain schedule` installs, and is the
only command that talks to a remote. Episodes are not committed one at a
time; the next snapshot picks them up, as does the `consolidate --done` run
that archives them. See
[[write-path-5-committing-direct-edits|write path §5]] for the snapshot,
sync, conflict handling, and job details.

Git is driven through the `git` command line with porcelain output. The CLI
is the reference implementation, honors the user's hooks and credential
helpers, and keeps no long-running library state in the MCP server. Without
a `git` binary, no brain counts as a git work tree, so runs are not
committed and `brain commit` refuses.

`brain init` writes this `.gitattributes`:

```gitattributes
log.md merge=union
reports/** -diff
```

`log.md` is appended to from several devices, and a union merge avoids
conflicts. Reports are generated. Episodes need no merge rule, because each
is a new, uniquely named file. Notes keep git's normal three-way merge, and
lint catches leftover conflict markers (BW114).

Share a git brain through origin, not a sync tool. Two machines committing
into one `.git` folder that a sync tool copies between them can corrupt the
repository.


### 6.3 Coexisting with desktop sync tools

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


### 6.4 File access

The engine reads and writes brain files only through `LocalStore`:

- paths are resolved, symlinks included, and must stay inside the brain
  root;
- writes are atomic (temporary file, `fsync`, rename);
- new files can be created with `O_EXCL`;
- a write can name the content hash it expects to replace, so a file
  changed since it was read is never overwritten.

Every run uses the expected-hash write.
