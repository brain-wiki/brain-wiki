---
id: 01M3250V000WFC5NPQSX412GAG
type: proposal
title: "Where content goes"
aliases: ["Privacy §2"]
source: "docs/proposal/privacy.md#2-where-content-goes"
---
# Where content goes

```
                               ┌──────────────► S1 model provider (host's, or local)
  brain ──► brain-wiki tools ──┤
    │       (search, read,     ├──────────────► S2 tools the agent calls
    │        orient)           │                (local: grep, tests; external: web, MCP
    │                          │                 servers, issue trackers, chat, email)
    └─► files (direct reads) ──┤
                               ├──────────────► S3 outputs others see
    host agent ◄───────────────┘                (commits, PRs, docs, messages)
        │
        ├─────────────────────────────────────► S4 host transcript store (later harvest)
        └─ automatic injection (only if host
           hooks return) ─────────────────────► S5 context the agent never asked for

  consolidation / harvest by a model ─────────► S1 model provider
  viz export, git remote, cloud sync ─────────► S6 copies outside the machine
```

Reading is one step. A privacy setting is useful only if it says which of
these destinations content may reach. Automatic injection (S5) does not
exist today; it comes back only with [[proposal-hooks|host hooks]].
