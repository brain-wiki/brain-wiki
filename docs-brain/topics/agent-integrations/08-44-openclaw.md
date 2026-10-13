---
id: 01M3250V00D2KGX9N8KAWP8KJZ
type: design
title: "OpenClaw"
aliases: ["08 §4.4"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#44-openclaw"
bw-part_of:
  - "[[08-4-per-host-notes]]"
---
# OpenClaw

- Bundle mode: OpenClaw maps the plugin's skills and MCP servers. It
  detects but does not execute Claude-format `hooks/hooks.json`.
- Optional hook pack (`hooks/brain-wiki-capture/HOOK.md` plus a tiny
  `handler.js` that runs `brain hook openclaw <event>`) for
  `agent:bootstrap` (add the brain's orientation as a bootstrap file) and
  `session:compact:before` (capture). OpenClaw loads hook packs from Claude
  and Codex bundle formats; other hosts ignore the subdirectory.
- MCP tools are registered as `brain-wiki__brain_search` (server prefix and
  64-character cap respected).
- A native memory-provider plugin (taking OpenClaw's memory slot) is future
  work; it needs the OpenClaw SDK to build and test.
