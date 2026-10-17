---
id: 01M3250V00JMHKK13VGWMXDT8Y
type: design
title: "How it runs"
aliases: ["Agent integrations §6.2"]
source: "docs/design/agent-integrations.md#62-how-it-runs"
---
# How it runs

The `brain-maintain` skill, or the `harvest` MCP prompt, drives
`brain_harvest_prepare`, the agent's note edits, and `brain_harvest_done`,
in the host agent. A scheduled run can include it
([[write-path-48-scheduled-consolidation|write path §4.8]]). The packet keeps user and
assistant text and tool names with a short argument summary, but no tool
output. The readers strip text the host injected (reminders, command
echoes), and secrets are scrubbed before turns reach the agent. A
per-session watermark in brain-wiki's state records the last handled turn,
and `brain_harvest_done` advances it only for sessions whose notes cite
them.
