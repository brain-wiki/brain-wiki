---
id: 01M3250V00XG9GQTT9TZC4WEZ8
type: design
title: "Triggers"
aliases: ["05 §4.2"]
source: "docs/design/05-write-path-and-consolidation.md#42-triggers"
---
# Triggers

| Trigger | How |
|---|---|
| User asks their agent ("consolidate my brain") | The skill, or the `consolidate` MCP prompt, drives `brain_consolidate_prepare`, direct edits, `brain_validate`, and `brain_consolidate_done`, repeating while episodes remain. |
| User drives it from a terminal | `brain consolidate --prepare` prints the guidance followed by the packet (`--json` prints the packet alone; `--out FILE` writes `{guidance, packet}` as JSON); any model or person edits the notes; `brain consolidate --done EPISODE…` archives the episodes handled. |

brain-wiki never consolidates on its own in the background. Running an LLM
costs money and attention, and the user should choose when. Scheduled,
headless consolidation was removed before 0.1
([[proposal-scheduled-maintenance|proposal]]).
