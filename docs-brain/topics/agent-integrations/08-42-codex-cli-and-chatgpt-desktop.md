---
id: 01M3250V00XX5W345ATVZMK1GF
type: design
title: "Codex (CLI and ChatGPT desktop)"
aliases: ["08 §4.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#42-codex-cli-and-chatgpt-desktop"
bw-part_of:
  - "[[08-4-per-host-notes]]"
---
# Codex (CLI and ChatGPT desktop)

- Install by adding this repository as a marketplace, or with
  `brain connect codex`. Codex reads the portable `plugin.json` and
  `mcp.json`; `extensions["com.openai"]` supplies display metadata.
- Codex rewrites tool names to `[A-Za-z0-9_]`, so names are snake case
  already.
