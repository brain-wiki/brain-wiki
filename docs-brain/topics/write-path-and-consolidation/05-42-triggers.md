---
id: 01M3250V00XG9GQTT9TZC4WEZ8
type: design
title: "Triggers"
aliases: ["05 §4.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#42-triggers"
---
# Triggers

| Trigger | Backend | How |
|---|---|---|
| User asks their agent ("consolidate my brain") | `agent` | The skill drives `brain_consolidate_prepare` / `brain_consolidate_apply` over MCP. |
| User drives it from a terminal | `agent` | `brain consolidate --prepare` prints the instructions and packet (`--out FILE` writes the same JSON document `--json` prints: `run`, `instructions`, `packet`); any model or person produces the ops; `brain consolidate --apply OPS.json --run RUN` validates and applies them. Exit codes follow [[07-23-exit-codes\|07 §2.3]]: 0 applied or dry run, 1 invalid ops (including a file that is not JSON) or routed to review, 4 stale (prepare again). |

v0.1 never consolidates on its own in the background. Running an LLM costs
money and attention, and the user should choose when. Scheduled, headless
consolidation was removed before 0.1 ([[proposal-scheduled-maintenance|proposal]]).
