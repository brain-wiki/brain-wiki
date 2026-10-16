---
id: 01M3250V00YSCZJWGT8F3TW9RS
type: design
title: "Notes (Antigravity (desktop, IDE, CLI))"
tags: [agents]
source: "docs/design/agents/antigravity.md#notes"
---
# Notes (Antigravity (desktop, IDE, CLI))

- `agy` accepts the full Agent Plugins `plugin.json`, although its published
  schema lists only `name` and `description`, and loads the plugin's
  skills, MCP server, and rules (T-1).
- An `always_on` plugin rule reaches the model; a plugin-root `AGENTS.md`
  does not (T-4).
- No plugin-root variable is set for plugin commands (T-2), so the MCP
  entry uses none.
- MCP tools default to "Ask". A plugin's server is named
  `<plugin>_<server>`, so allow rules read
  `mcp(brain-wiki_brain-wiki/brain_search)`; the user guide shows how.
- The CLI declares MCP elicitation (`form` and `url`) but declines every
  request without showing the user, so the server treats a client named
  `antigravity…` as having no confirmation channel (T-8).
- The marketplace copy starts the MCP server through online `uvx`, which
  took 45 to 120 seconds in interactive sessions behind a slow package
  index (T-10); until it is ready the agent has no brain tools.
  `brain connect antigravity` writes the installed `brain` and avoids the
  wait.
- Session logs hold `transcript.jsonl`, which cuts long steps to about
  4 KB, and `transcript_full.jsonl`, which keeps them; the reader prefers
  the full one. The working directory comes from the app's
  `conversation_summaries.db`, which the CLI also writes since 1.3. Every
  MCP call appears as `call_mcp_tool` with `ServerName`; the reader renames
  it to `mcp_<server>_<tool>` before the untrusted-tool rules (T-3).
- Headless runs cannot drop tools, and a denied tool call ends the turn
  with no output, so the preset's prompt starts by saying not to use tools
  (T-5). `--json-schema` drops undeclared fields, so the preset never
  passes a schema.
