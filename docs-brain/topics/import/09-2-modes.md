---
id: 01M3250V00QWXYXDETX1DHZ6JZ
type: design
title: "Modes (Import)"
aliases: ["09 §2"]
tags: [import]
source: "docs/design/09-import.md#2-modes"
---
# Modes (Import)

| Mode | Command | Result |
|---|---|---|
| **Overlay** | `brain import <folder> --overlay` | The folder itself becomes a brain. brain-wiki adds its own files; notes stay where they are. |
| **Into** | `brain import <folder> --into <brain>` | Files are copied into an existing brain as one or more topics; links are rewritten; the source folder is untouched. |
| **To episodes** | `brain import <path> --to-episodes` | Documents are split into episodes in the inbox, for consolidation to fold into notes. |
| **From an agent** | `brain import --from <host>` | The host's own memory files become episodes attributed to that host (§6). |

All modes default to `--dry-run`; `--apply` executes.

## Relations
- part_of [[import]]
