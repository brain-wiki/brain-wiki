---
id: 01M3250V00XX5W345ATVZMK1GF
type: design
title: "Codex (CLI and ChatGPT desktop)"
aliases: ["08 §4.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#42-codex-cli-and-chatgpt-desktop"
---
# Codex (CLI and ChatGPT desktop)

- Install by adding this repository as a marketplace, or with
  `brain connect codex`. Codex reads the portable `plugin.json` and
  `mcp.json`; `extensions["com.openai"]` supplies display metadata.
- Hooks (only from `brain connect --briefing-hook` or `--capture`) use the
  same event schema as Claude Code, from `hooks/hooks.json`, which the
  materialized `plugin.json` names in `extensions["com.openai"].hooks`.
  In the ChatGPT desktop app they run only for manually installed plugins
  and must be trusted by the user; plugins with hooks are not eligible for
  the public plugin directory, which is acceptable for v0.1.
- Codex rewrites tool names to `[A-Za-z0-9_]`, so names are snake case
  already.
- `SessionEnd` hooks get 1 second by default (3 at most), so capture hooks
  run with `async: true`. Codex saves `additionalContext` above a
  configurable limit to disk and sends a preview, so orientation stays
  compact.
- Hook payloads carry `session_id` (`thr_…`) and a `transcript_path` to the
  session's rollout file.

## Relations
- part_of [[08-4-per-host-notes]]
