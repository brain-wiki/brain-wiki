---
id: 01M3250V005XNK8T8GJDR87S9Z
type: design
title: "Data that leaves the machine"
aliases: ["Security and privacy §5"]
source: "docs/design/security-and-privacy.md#5-data-that-leaves-the-machine"
---
# Data that leaves the machine

brain-wiki itself contacts only the user's own git remote, through `git`,
when `brain commit` syncs. There is no telemetry. Other data leaves through
the hosts and presets the user runs:

| Operation | What is sent | To whom |
|---|---|---|
| Agent tool calls (orient, search, read) | Results, to the host | The host's model provider, as part of the conversation |
| Consolidation in the agent | The packet, and the notes the agent reads | The host's model provider |
| Harvest | Condensed turns of the selected sessions, without tool output and with secrets scrubbed, and the notes the agent reads | The host's model provider |
| `brain commit` | Brain files fetched from origin, and pushed with `--push` | The user's git remote |
