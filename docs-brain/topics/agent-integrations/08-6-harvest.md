---
id: 01M3250V00VBE1464MA78XKKD3
type: design
title: "Harvest"
aliases: ["08 §6"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#6-harvest"
bw-part_of:
  - "[[agent-integrations]]"
---
# Harvest

Harvest turns finished sessions into episodes by reading the host's own
session store ([[05-22-harvesting-sessions|05 §2.2]]).
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
- [[08-61-what-gets-skipped]]: What gets skipped
- [[08-62-modes]]: Modes (Agent integrations)
- [[08-63-detecting-external-inputs]]: Detecting external inputs
- [[08-64-session-readers]]: Session readers
