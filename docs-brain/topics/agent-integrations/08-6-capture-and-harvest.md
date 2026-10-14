---
id: 01M3250V0098CEZG0JM5S9F9T2
type: design
title: "Capture and harvest"
aliases: ["08 §6"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#6-capture-and-harvest"
bw-part_of:
  - "[[agent-integrations]]"
---
# Capture and harvest

Capture turns sessions into episodes as they happen, through hooks.
Harvest turns them into episodes afterwards, by reading the host's own
session store ([[05-22-harvesting-sessions|05 §2.2]]).
Harvest's distillation can run inside the host itself (the `/brain:harvest`
recipe over MCP), headless from the CLI, or not at all (`raw`). Both
capture and harvest are **off by default** and enabled per host, and both
use the same session readers (§6.4), skip rules, taint detection, and
dedupe keys, so a session is never captured twice.

```toml
# user config.toml
[capture]
enabled = true
hosts   = ["claude-code", "antigravity"]
mode    = "prompted"            # prompted | raw | both
min_turns = 5                   # prompted: only ask after this many turns
untrusted_tools = []            # extra tool-name patterns that taint a session
trusted_mcp_servers = ["brain-wiki"]

[recall]                        # only used by a UserPromptSubmit hook wired by hand (§5)
on_prompt = false               # inject top matches on every prompt (costs tokens)
min_score = 0.3

[harvest]
enabled = false
hosts   = ["claude-code", "codex", "antigravity"]
since   = "30d"                 # how far back the first run looks
min_idle_minutes = 60           # skip sessions still in progress
min_user_turns   = 3
distill = "claude-code"         # preset for CLI harvest; "raw" for no model (the in-agent recipe needs neither)
[harvest.routes]                # optional: working-directory globs → brain
"~/work/**" = "work"
```

## Subsections
- [[08-61-what-gets-skipped]]: What gets skipped
- [[08-62-modes]]: Modes (Agent integrations)
- [[08-63-taint-detection]]: Taint detection
- [[08-64-session-readers]]: Session readers
