---
id: 01M3250V00T1CCE4A47VX5X5F2
type: proposal
title: "Where content goes"
tags: [proposals]
source: "docs/proposals/privacy.md#2-where-content-goes"
---
# Where content goes

```
                               ┌──────────────► S1 model provider (host's, or local)
  brain ──► brain-wiki tools ──┤
    │       (search, read,     ├──────────────► S2 tools the agent calls
    │        orient, hooks)    │                (local: grep, tests; external: web, MCP
    │                          │                 servers, issue trackers, chat, email)
    └─► files (direct reads) ──┤
                               ├──────────────► S3 outputs others see
    host agent ◄───────────────┘                (commits, PRs, docs, messages)
        │
        ├─────────────────────────────────────► S4 host transcript store (later harvest)
        └─ automatic injection (session start,
           per-prompt recall) ────────────────► S5 context the agent never asked for

  consolidation / harvest backend ────────────► S1 model provider
  viz export, git remote, cloud sync ─────────► S6 copies outside the machine
```

Reading is one step. A privacy setting is only useful if it says which of
these sinks content may reach.
