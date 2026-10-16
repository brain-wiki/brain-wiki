---
id: 01M3250V004RN0TRM010FSWKQX
type: design
title: "Host ids"
aliases: ["08 §2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#2-host-ids"
---
# Host ids

Stable identifiers used in agent profiles, user config, episode
provenance, and `--host` flags:

`claude-code`, `codex`, `antigravity`, `openclaw`, `cursor`, `generic`.

`opencode` is also a recognized host id, from the MCP client's
self-reported name (below), so profiles and episode provenance can name it.
It has no `brain connect` writer, skill install, or session reader; it is
wired like other MCP clients ([Cursor and other MCP
clients](agents/cursor.md#other-mcp-clients)).

When the MCP server is started with `--host auto` (the plugin's `.mcp.json`
is read by Claude Code and, as a Claude-format bundle, by OpenClaw), the
host is detected in this order:

1. the MCP client's self-reported name, once the client connects;
2. the `BRAIN_WIKI_HOST` environment variable;
3. `PLUGIN_ROOT` together with `CLAUDE_PLUGIN_ROOT` is Codex, which sets
   both for compatibility; `CLAUDE_PLUGIN_ROOT` alone, or `CLAUDECODE=1`, is
   Claude Code.

An undetectable host is `generic`.
