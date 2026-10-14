---
id: 01M3250V00MZBJQEZA6A3XS2TN
type: design
title: "Brain lifecycle"
aliases: ["03 §5"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#5-brain-lifecycle"
bw-part_of:
  - "[[config-and-storage]]"
---
# Brain lifecycle

| Action | Command | What happens |
|---|---|---|
| Create | `brain init <path> [--name n]` | Creates the folder, `brain.toml` with a new id, `AGENTS.md`, `rules.md`, `log.md`, the inbox and topics folders; registers it in the config (refusing a name or folder already registered to another brain); makes it the default if it is the first. With `--git`, runs `git init` and commits the new files, so a clone is a working brain. |
| Adopt an existing folder | `brain import --overlay <path>` | See [[import\|09]]. Adds `brain.toml` and the generated files without moving anything. |
| Register on another device | `brain brains add <name> <path>` | For a brain that arrived by git clone or file sync. Validates `brain.toml`. |
| Move | move the folder, then `brain brains add <name> <new path>` | Same id, so index and history carry over. The name may be re-pointed because its old folder is no longer a brain (or holds the same brain); otherwise the name is refused. |
| Rename | `brain brains rename <old> <new>` | Config only; `brain.toml` `name` is cosmetic. |
| Forget | `brain brains remove <name>` | Config only. The folder, index, and state stay until `--purge-state` deletes the last two. The brain folder is never deleted by brain-wiki. |
| Check | `brain doctor` | Config, brain, index, SQLite features (trigram), git status, host wiring, pending crashed runs. |
