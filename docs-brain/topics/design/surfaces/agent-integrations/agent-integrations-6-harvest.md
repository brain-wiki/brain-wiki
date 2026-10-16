---
id: 01M3250V00KGAQHD9FJBTGQRDQ
type: design
title: "Harvest (Agent integrations)"
aliases: ["Agent integrations §6"]
source: "docs/design/agent-integrations.md#6-harvest"
---
# Harvest (Agent integrations)

Harvest turns finished sessions into episodes by reading the host's own
session store ([[write-path-22-harvesting-sessions|write path §2.2]],
[[d20-harvest-host-sessions|D20]]). It is off by default and
turned on per host (`brain harvest enable HOST`).

```toml
# user config.toml
[harvest]
enabled = true
hosts   = ["claude-code", "codex"]   # harvest is on for these
since   = "30d"                      # how far back to look (default 30d)
min_idle_minutes = 60                # skip sessions still in progress (default 60)
min_user_turns   = 3                 # default 3
include_headless = false             # also harvest non-interactive sessions
distill = "claude-code"              # preset for CLI harvest (default claude-code)
[harvest.routes]                     # optional: working-directory patterns to brains
"~/work/**" = "work"
```

Harvest is on for a host only when `enabled` is true and the host is in
`hosts`. `brain harvest enable` and `disable` update both. Without
`--from`, `brain harvest` reads the hosts in `hosts`, or `claude-code`,
`codex`, and `antigravity` when none are set.

## Subsections
- [[agent-integrations-61-what-gets-skipped]]: What gets skipped
- [[agent-integrations-62-modes]]: Modes (Agent integrations)
- [[agent-integrations-63-detecting-external-inputs]]: Detecting external inputs
- [[agent-integrations-64-session-readers]]: Session readers
