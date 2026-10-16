---
id: 01M3250V00GWARKTMSH5ME5KPG
type: design
title: "Modes (Agent integrations)"
aliases: ["Agent integrations §6.2"]
source: "docs/design/agent-integrations.md#62-modes"
---
# Modes (Agent integrations)

| Mode | How | Cost |
|---|---|---|
| In the agent | The `brain-maintain` skill drives `brain_harvest_prepare` and `brain_harvest_apply`; the agent distills | The session's context |
| Headless | `brain harvest --apply` runs a model preset (§7) once per chunk of about 30k tokens | One CLI model call per chunk |
| Raw | `brain harvest --apply --raw` writes one episode per chunk without a model | None; consolidation distills later |

Raw episodes keep user and assistant text and tool names with a short
argument summary, but no tool output. The readers strip text the host
injected (reminders, command echoes), and secrets are scrubbed before turns
go to a model or into an episode. A per-session
watermark in brain-wiki's state records the last harvested turn, and
episode `dedupe` keys make retries harmless.
