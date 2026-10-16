---
id: 01M3250V00RZKHYQB7YTA2RTAS
type: design
title: "Alternatives considered (Config and storage)"
aliases: ["03 §9"]
source: "docs/design/03-config-and-storage.md#9-alternatives-considered"
---
# Alternatives considered (Config and storage)

| Option | Why not |
|---|---|
| Brains inside the source repo | Mixes user data with code; impossible to open-source cleanly. |
| A single brain per user | Forces work and personal knowledge together, or one tool install per sphere. |
| Index and run state inside the brain (`.brain/`) | Sync tools corrupt SQLite; device-specific state conflicts across machines. |
| The engine reading object storage directly on every call | Hosts and editors need local files; latency on every call; offline breaks. |
| Requiring git | Many users sync with cloud drives; git stays optional. |
| A git library (GitPython, dulwich) instead of the CLI | GitPython is in maintenance mode and leaks resources in long-running processes; dulwich lacks some porcelain; the CLI honors user hooks and credentials. dulwich remains an option where no git binary exists. |
