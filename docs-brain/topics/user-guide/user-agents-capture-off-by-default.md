---
id: 01M3250V00N8613Y939HXH4V2N
type: guide
title: "Capture (off by default)"
tags: [user-guide]
source: "docs/user/agents.md#capture-off-by-default"
bw-part_of:
  - "[[user-agents]]"
---
# Capture (off by default)

Capture saves what you learn in a session as it ends.

```toml
# ~/.config/brain-wiki/config.toml
[capture]
enabled = true
hosts = ["claude-code"]
mode = "prompted"   # prompted: the agent is asked once to log an episode; raw: a transcript excerpt
min_turns = 5
```

Then reconnect with capture hooks: `brain connect claude-code --capture`.
