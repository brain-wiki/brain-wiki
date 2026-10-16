---
id: 01M3250V00MZBJQEZA6A3XS2TN
type: design
title: "Brain lifecycle"
aliases: ["03 §5"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#5-brain-lifecycle"
---
# Brain lifecycle

| Action | Command | What happens |
|---|---|---|
| Create | `brain init <path> [--name n]` | Creates the folder, `brain.toml` with a new id, `AGENTS.md`, `rules.md`, `log.md`, the inbox and topics folders; registers it in the config (refusing a name or folder already registered to another brain); makes it the default if it is the first. With `--git`, runs `git init` and commits the new files, so a clone is a working brain. |
| Adopt an existing folder | `brain import --overlay <path>` | See [[import\|09]]. Adds `brain.toml` and the generated files without moving anything. |
| Register on another device | `brain brains add <name> <path>` | For a brain that arrived by git clone or file sync. Validates `brain.toml`. |
| Move | move the folder, then `brain brains add <name> <new path>` | Same id, so index and history carry over. The name may be re-pointed because its old folder is no longer a brain (or holds the same brain); otherwise the name is refused. |
| Rename | `brain brains rename <old> <new>` | Config only; `brain.toml` `name` is cosmetic. Refused when `<new>` is already registered; otherwise the entry and every reference to `<old>` (`default`, `[hosts.*] brain` and `brains`, harvest routes) change in one write. The brain's commit job (found by id) is rewritten to the new name. |
| Forget | `brain brains remove <name>` | Config only: the entry and every reference to it (§2). The brain's commit job is removed. The folder, index, and state stay until `--purge-state` deletes the last two. The brain folder is never deleted by brain-wiki. |
| Commit direct edits | `brain commit`, or a job from `brain schedule add commit` | See §6.2. |
| Check | `brain doctor` | Config (including brains registered with no default), brain, index (note counts as in `brain brains`), SQLite features (trigram), git status, host wiring, pending crashed runs; commit jobs whose brain is no longer registered, brains that have not synced with origin for a day, and git brains with uncommitted changes older than a day and no commit job. |
