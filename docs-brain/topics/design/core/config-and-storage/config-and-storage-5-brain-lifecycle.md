---
id: 01M3250V00J09N2837T5FHB4KV
type: design
title: "Brain lifecycle"
aliases: ["Config and storage §5"]
source: "docs/design/config-and-storage.md#5-brain-lifecycle"
---
# Brain lifecycle

| Action | Command |
|---|---|
| Create | `brain init [PATH] [--name NAME] [--git] [--no-register]` |
| Adopt an existing folder | `brain import <path> --overlay` ([[import\|import]]) |
| Register on another device | `brain brains add NAME PATH` |
| Move | Move the folder, then `brain brains add NAME NEW_PATH` |
| Rename | `brain brains rename OLD NEW` |
| Forget | `brain brains remove NAME [--purge-state]` |
| Commit direct edits | `brain commit`, or a job from `brain schedule add commit` (§6.2) |
| Check | `brain doctor` |

- `brain init` creates the folder; `brain.toml` with a new id; `AGENTS.md`,
  `rules.md`, `log.md`, and `.gitattributes`; and the `topics/`, `inbox/`,
  `archive/`, and `reports/` folders. It registers the brain (refusing a
  name or folder already registered to another brain) and makes it the
  default if it is the first. With `--git`, it runs `git init` and commits
  the new files, so a clone is a working brain.
- `brain brains add` validates `brain.toml`. It is for a brain that arrived
  by git clone or file sync, or one that moved. A name may be re-pointed to
  a new folder only when its old folder is no longer a brain or holds the
  same brain. Otherwise the name is refused. The same id means index and
  history carry over.
- `brain brains rename` changes only the config. `brain.toml`'s `name` is
  cosmetic. It is refused when NEW is already registered. Otherwise the
  entry and every reference to OLD (`default`, `[hosts.*] brain` and
  `brains`, harvest routes) change in one write, and the brain's commit job
  (found by id) is rewritten to the new name.
- `brain brains remove` changes only the config: the entry and every
  reference to it (§2). It removes the brain's commit job. `--purge-state`
  also deletes the brain's index and run history on this device. brain-wiki
  never deletes a brain folder.
- `brain doctor` checks the config (including a missing default and
  entries that name unregistered brains), each brain (format, note and
  pending-episode counts, open proposals), SQLite FTS5 and trigram support,
  host wiring, and commit jobs
  ([[write-path-52-brain-schedule|write path §5.2]]). It rolls back runs a
  crash left half-applied and lists runs whose git commit failed.
