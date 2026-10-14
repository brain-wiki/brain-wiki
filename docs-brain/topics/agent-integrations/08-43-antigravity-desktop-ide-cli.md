---
id: 01M3250V00BY17J0S1XG84FS29
type: design
title: "Antigravity (desktop, IDE, CLI)"
aliases: ["08 §4.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#43-antigravity-desktop-ide-cli"
bw-part_of:
  - "[[08-4-per-host-notes]]"
---
# Antigravity (desktop, IDE, CLI)

- Install with `agy plugin install https://github.com/<owner>/brain-wiki`
  (repository root only), by placing the plugin in
  `~/.gemini/config/plugins/brain-wiki/` (desktop and IDE), or with
  `brain connect antigravity`.
- No plugin-root variable is set for plugin commands (T-2), so the MCP
  entry in `mcp_config.json` uses none.
- Every MCP call appears in transcripts as `call_mcp_tool` with
  `ServerName`, which the session reader renames to `mcp_<server>_<tool>`
  before the taint rules (§6.3).
- Plugin rules load: an `always_on` plugin rule reached the model. The
  plugin-root `AGENTS.md` does not (T-4). The rule file carries the static
  instruction block (§3.2) with `trigger: always_on`.
- MCP tools default to "Ask". A plugin's server is named
  `<plugin>_<server>`, so allow rules read
  `mcp(brain-wiki_brain-wiki/brain_search)`. The user guide shows how.
- The CLI declares MCP elicitation (`form` and `url`) but declines every
  request without showing the user, so the server treats a client named
  `antigravity…` as having no confirmation channel: `brain_propose_rule`
  saves a proposal for `brain rule accept` (T-8).
- The plugin's MCP server starts through online `uvx`, which took 45 to 120
  seconds in interactive sessions behind a slow index; until it is ready
  the agent has no brain tools. `brain connect antigravity` (installed
  `brain`) avoids the wait.
