---
id: 01M3250V00NASSC1JBZSXZ3V8T
type: proposal
title: "Lifecycle (Episodes: quick capture, per-agent consolidation)"
aliases: ["Episodes: quick capture, per-agent consolidation §1"]
source: "docs/proposal/episode-lifecycle.md#1-lifecycle"
---
# Lifecycle (Episodes: quick capture, per-agent consolidation)

```
   during work (fast)                      off-peak (thorough)
 ┌──────────────────────┐              ┌────────────────────────────────┐
 │ an agent, on its own │              │ the agent that wrote it        │
 │ or asked by the user │  inbox/      │ reads the episode, its origin  │
 │   └─ brain_log_      ├─────────────►│ conversation, and the brain    │
 │      episode         │  episodes/   │   └─ record / playbook / file  │
 │      (raw, one call) │  bw-agent=X  │      / distill / skip          │
 └──────────────────────┘              │   └─ validate, done, commit    │
                                       └────────────────────────────────┘
```

| Stage | Who | When | Cost to the agent |
|---|---|---|---|
| Capture | The working agent, on its own or because the user asked | Mid-task, when something is worth keeping | One call, no search, no organizing |
| Consolidate | The agent that captured it. Another agent only when the user asks | On a schedule, or when the user asks | A full session: search, read, edit, validate |
| Harvest, import | The agent whose sessions they are, or the agent the user asks to import | On a schedule (harvest), or when the user asks | The same as consolidation, with no episode in between |
