---
id: 01M3250V00TDV7HNQJ3PVJHW8V
type: design
title: "Modes (Agent integrations)"
aliases: ["08 §6.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#62-modes"
bw-part_of:
  - "[[08-6-harvest]]"
---
# Modes (Agent integrations)

| Mode | How | Cost |
|---|---|---|
| In the agent | The user asks their agent to harvest; the `brain-maintain` skill drives `brain_harvest_prepare` and `brain_harvest_apply` over MCP, and the agent distills | The session's context window |
| Headless | `brain harvest --apply` runs a model preset (§7) once per chunk | One CLI model call per chunk |
| `raw` | `brain harvest --apply --raw` keeps user and assistant text (no tool output bodies), strips injected markers, scrubs secrets, and writes one episode per chunk | No model call; consolidation distills |

A per-session watermark in brain-wiki's state records the last harvested
turn, and episode `dedupe` keys make retries harmless.
