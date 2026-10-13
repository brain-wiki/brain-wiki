---
id: 01M3250V00B1BYKEVNJA7Z41DG
type: design
title: "Hooks"
aliases: ["08 §5"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#5-hooks"
bw-part_of:
  - "[[agent-integrations]]"
---
# Hooks

One entry point: `brain hook <host|auto> <event>`, reading the host's JSON
payload on stdin and writing the host's expected JSON on stdout. Every hook
is opt-in: `session_start` with `brain connect --briefing-hook`, the others
with `--capture`. Without hooks, agents rely on the static instruction block
(§3.2).

## Subsections
- [[08-51-normalized-events]]: Normalized events
- [[08-52-outputs]]: Outputs
- [[08-53-rules-for-every-hook]]: Rules for every hook
