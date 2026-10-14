---
id: 01M3250V002QAYCTVS3M353J7C
type: proposal
title: "Capture"
tags: [proposals]
source: "docs/proposals/hooks.md#13-capture"
bw-part_of:
  - "[[proposal-hooks-1-what-was-built]]"
---
# Capture

```toml
# user config.toml
[capture]
enabled = true
hosts   = ["claude-code", "antigravity"]
mode    = "prompted"            # prompted | raw | both
min_turns = 5                   # prompted: only ask after this many turns
untrusted_tools = []            # extra tool-name patterns that taint a session
trusted_mcp_servers = ["brain-wiki"]
```

| Mode | How | Cost |
|---|---|---|
| `prompted` | At the first `stop` after `min_turns`, the hook asked the agent once, through the host's "continue with reason" output, to call `brain_log_episode` with durable learnings, or to do nothing | One short extra turn per session |
| `raw` | At `pre_compact` and `session_end` (and `stop` for Antigravity), the hook read the transcript since the last capture point and wrote one episode with `bw-captured: hook` | No model call; consolidation distills |

Capture points and taint were kept per session in
`<state>/sessions/<host>/<id>.json`. `BRAIN_WIKI_INTERNAL=1`, set for
brain-wiki's own headless runs, made every hook exit at once.
