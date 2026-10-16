---
id: 01M3250V00BKGT5CTTJGQ293G5
type: design
title: "Modes (Import)"
aliases: ["Import §2"]
source: "docs/design/import.md#2-modes"
---
# Modes (Import)

| Mode | Command | Result |
|---|---|---|
| Overlay | `brain import <folder> --overlay` | The folder becomes a brain; notes stay where they are |
| Into | `brain import <folder> --into <brain>` | Notes are copied into an existing brain as topics |
| To episodes | `brain import <path> --to-episodes` | Documents become episodes in the inbox |
| From an agent | `brain import [PATH] --from <host>` | The host's memory files become episodes (§6) |

Rules shared by every mode:

- A command picks exactly one mode.
- Every mode is a dry run unless `--apply` is given. `--dry-run` wins when
  both are given.
- A flag the chosen mode does not use is a usage error (exit 2), never
  dropped: `--agent` and `--untrusted` need `--to-episodes`, `--phase`
  needs `--overlay`, and `--topic` does not work with `--overlay`, whose
  top-level folders become the topics.
- `--overlay` and `--into` need a folder. A source path that does not
  exist is `not_found` (exit 3).
- `--to-episodes` and `--from` write into the brain chosen by the global
  `--brain`.
  For phase 0, `--brain NAME` sets the new brain's name; the default is
  the folder name.
