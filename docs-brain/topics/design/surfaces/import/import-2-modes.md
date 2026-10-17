---
id: 01M3250V00BKGT5CTTJGQ293G5
type: design
title: "Modes"
aliases: ["Import §2"]
source: "docs/design/import.md#2-modes"
---
# Modes

| Mode | Command | Result |
|---|---|---|
| Overlay | `brain import <folder> --overlay` | The folder becomes a brain; notes stay where they are |
| Into | `brain import <folder> --into <brain>` | Notes are copied into an existing brain as topics |
| Documents and memory files | Ask an agent | The agent files them into notes (§6) |

Rules shared by every mode:

- A command picks exactly one mode.
- Every mode is a dry run unless `--apply` is given. `--dry-run` wins when
  both are given.
- A flag the chosen mode does not use is a usage error (exit 2), never
  dropped: `--phase` needs `--overlay`, and `--topic` does not work with
  `--overlay`, whose top-level folders become the topics.
- Both modes need a folder. A source path that does not exist is
  `not_found` (exit 3).
- For phase 0, `--brain NAME` sets the new brain's name; the default is
  the folder name.
