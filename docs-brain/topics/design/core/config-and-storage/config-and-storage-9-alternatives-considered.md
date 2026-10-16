---
id: 01M3250V00BQ3ASNTXFQ1PF4K8
type: design
title: "Alternatives considered (Config and storage)"
aliases: ["Config and storage §9"]
source: "docs/design/config-and-storage.md#9-alternatives-considered"
---
# Alternatives considered (Config and storage)

| Option | Why not |
|---|---|
| Brains inside the source repository | Mixes user data with code ([[d02-code-and-brains-apart\|D2]]). |
| A single brain per user | Forces work and personal knowledge together. |
| Index and run state inside the brain (`.brain/`) | Sync tools corrupt SQLite, and device state conflicts across machines. |
| The engine reading object storage on every call | Hosts and editors need local files; every call gets slower; offline breaks. |
| Requiring git | Many users sync with cloud drives ([[d11-local-storage\|D11]]). |
| A git library (GitPython, dulwich) instead of the CLI | GitPython is in maintenance mode and leaks resources in long-running processes, and dulwich lacks some porcelain. The CLI honors user hooks and credentials. dulwich remains an option where no git binary exists. |
