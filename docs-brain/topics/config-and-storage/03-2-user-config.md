---
id: 01M3250V00MC5KE3ACXVKCC1AX
type: design
title: "User config"
aliases: ["03 §2"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#2-user-config"
bw-part_of:
  - "[[config-and-storage]]"
---
# User config

One TOML file per user:

| Platform | Path |
|---|---|
| Linux, macOS | `$XDG_CONFIG_HOME/brain-wiki/config.toml`, default `~/.config/brain-wiki/config.toml` |
| Windows | `%APPDATA%\brain-wiki\config.toml` |

macOS uses the XDG layout like other developer CLIs (git, uv), because the
file is meant to be found and edited by hand. `BRAIN_WIKI_CONFIG` overrides
the path.

```toml
default = "personal"                 # brain used when nothing else selects one
device  = "laptop"                   # optional name for this machine (default: hostname)

[brains.personal]
path = "~/brains/personal"

[brains.work]
path = "~/work/brain"

[hosts.claude-code]                  # optional per-host settings
brain  = "work"                      # default brain for this host
brains = ["work", "personal"]        # brains this host may select (default: all)

[hosts.openclaw]
brains = ["personal"]

[harvest]                            # opt-in reading of host session stores (08 §6)
enabled = false
hosts   = ["claude-code"]
```

- The config holds **locations and per-user choices only**. Everything that
  must travel with a brain (topics, agent profiles, budgets) is in
  that brain's `brain.toml` ([[02-3-braintoml|02 §3]]).
- No credentials are ever stored here. Proposed remote backends use the
  platform's own credential chains ([[proposal-remote-sync|remote sync]]).
- The file is created by `brain init` and edited by `brain brains add |
  remove | rename | default | limit`, which preserve comments and formatting.
  `add` and `rename` take names of lowercase letters, digits, and hyphens.
  An edit that fails changes nothing.
