---
id: 01M3250V0008PNCPSZNRRQ1BH9
type: design
title: "User config"
aliases: ["Config and storage §2"]
source: "docs/design/config-and-storage.md#2-user-config"
---
# User config

One TOML file per user holds where brains live and per-user choices.

| Platform | Path |
|---|---|
| Linux, macOS | `$XDG_CONFIG_HOME/brain-wiki/config.toml`, default `~/.config/brain-wiki/config.toml` |
| Windows | `%APPDATA%\brain-wiki\config.toml` |

macOS uses the XDG layout, like git and uv, because the file is meant to be
found and edited by hand. `BRAIN_WIKI_CONFIG` overrides the path.

```toml
default = "personal"                 # brain used when nothing else selects one
device  = "laptop"                   # name for this machine (default: hostname)

[brains.personal]
path = "~/brains/personal"

[brains.work]
path = "~/work/brain"

[hosts.claude-code]                  # optional per-host settings
brain  = "work"                      # default brain for this host
brains = ["work", "personal"]        # brains this host may select (default: all)

[hosts.openclaw]
brains = ["personal"]

[harvest]                            # reading host session stores (write path §2.2)
enabled = true
hosts   = ["claude-code"]
distill = "claude-code"              # headless preset for `brain harvest --apply`

[harvest.routes]                     # session folder pattern -> brain, longest first
"~/work/**" = "work"
"~/**"      = "personal"
```

- Everything that must travel with a brain (topics, agent profiles,
  budgets) is in that brain's `brain.toml`
  ([[brain-format-3-braintoml|brain format §3]]), not here.
- No credentials are stored here.
- `brain init` creates the file. `brain brains add`, `remove`, `rename`,
  `default`, `limit`, and `unlimit` edit it, and `brain harvest enable`,
  `disable`, and `route` edit `[harvest]`. These keep comments and
  formatting.
- Brain names are lowercase letters, digits, and hyphens. An edit that
  fails changes nothing.
- `brain brains remove NAME` drops every reference to the brain in the same
  write: `default`, a `[hosts.*] brain` that names it, its entry in each
  `[hosts.*] brains` list, and `[harvest.routes]` entries that route to it.
  A host list that becomes empty stays empty, so removing a brain never
  widens a host's access.
- No schedule settings live here. The OS scheduler holds the commit jobs
  ([[write-path-52-brain-schedule|write path §5.2]]).

Other `[harvest]` keys (`since`, `min_idle_minutes`, `min_user_turns`,
`include_headless`) are described in
[[write-path-22-harvesting-sessions|write path §2.2]].
