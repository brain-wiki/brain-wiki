---
id: 01M3250V00WCC47EB65WT6J627
type: design
title: "Data that leaves the machine"
aliases: ["10 §5"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#5-data-that-leaves-the-machine"
---
# Data that leaves the machine

brain-wiki sends nothing anywhere except to the user's own git remote,
through `git`, when `brain commit` syncs. There is no telemetry, and no
other network access in the core.

| Operation | What is sent | To whom |
|---|---|---|
| Agent tool calls (orient, search, read) | Results, to the host | The host's model provider, as part of the conversation |
| Consolidation in the agent | The packet, and the notes the agent reads | The host's model provider |
| Harvest with distillation | Condensed turns of the selected sessions (no tool output, secrets scrubbed) | The distill preset's service (CLI), or the host's model provider (in-agent recipe); `--raw` sends nothing |
| `brain commit` | Committed brain files: fetched from origin, and pushed with `--push` | The user's git remote |
