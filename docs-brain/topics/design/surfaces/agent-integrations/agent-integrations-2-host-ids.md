---
id: 01M3250V00G9KA4X2EAH731YH7
type: design
title: "Host ids"
aliases: ["Agent integrations §2"]
source: "docs/design/agent-integrations.md#2-host-ids"
---
# Host ids

Host ids name a host in agent profiles, the user config, episode
provenance, and `--host` flags: `claude-code`, `codex`, `antigravity`,
`openclaw`, `cursor`, and `generic`.

`opencode` is also recognized, from the MCP client's self-reported name,
so profiles and episode provenance can name it. It has no `brain connect`
writer and no session reader; it is set up like other MCP clients
([[host-cursor-other-mcp-clients|Cursor and other MCP clients]]).

The MCP server finds its host in this order:

1. `--host <id>`, when it is not `auto`.
2. The MCP client's self-reported name, read on the first tool call. A
   name containing `claude`, `codex`, `antigravity` or `agy`, `openclaw`,
   `cursor`, or `opencode` maps to that host.
3. The `BRAIN_WIKI_HOST` environment variable.
4. `PLUGIN_ROOT` together with `CLAUDE_PLUGIN_ROOT` means Codex, which sets
   both. `CLAUDE_PLUGIN_ROOT` alone, or `CLAUDECODE=1`, means Claude Code.
5. Otherwise the host is `generic`.

The client name matters because the plugin's `.mcp.json` passes
`--host auto` and is read by both Claude Code and OpenClaw, and the
environment cannot tell those two apart.
