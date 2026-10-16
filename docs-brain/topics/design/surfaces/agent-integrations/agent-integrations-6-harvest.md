---
id: 01M3250V00KGAQHD9FJBTGQRDQ
type: design
title: "Harvest"
aliases: ["Agent integrations §6"]
source: "docs/design/agent-integrations.md#6-harvest"
---
# Harvest

Harvest turns finished sessions into episodes by reading the host's own
session store ([[write-path-22-harvesting-sessions|write path §2.2]]).
It is **off by default** and enabled per host.

```toml
# user config.toml
[harvest]
enabled = false
hosts   = ["claude-code", "codex", "antigravity"]
since   = "30d"                 # how far back the first run looks
min_idle_minutes = 60           # skip sessions still in progress
min_user_turns   = 3
include_headless = false        # also harvest non-interactive sessions
distill = "claude-code"         # preset for CLI harvest; "raw" for no model (the in-agent recipe needs neither)
[harvest.routes]                # optional: working-directory globs → brain
"~/work/**" = "work"
```

## Subsections
- [[agent-integrations-61-what-gets-skipped]]: What gets skipped
- [[agent-integrations-62-modes]]: Modes (Agent integrations)
- [[agent-integrations-63-detecting-external-inputs]]: Detecting external inputs
- [[agent-integrations-64-session-readers]]: Session readers
