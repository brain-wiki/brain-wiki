---
id: 01M3250V00W9X4V8CABRG4S0M5
type: design
title: "Hosts"
aliases: ["Agent integrations §4"]
source: "docs/design/agent-integrations.md#4-hosts"
---
# Hosts

Each host's page covers install, registration, MCP details, where the
instructions go, harvest, presets, and what was verified. Every host gets
the MCP server.

| Host | Install | Instructions | Skills | Harvest | Page |
|---|---|---|---|---|---|
| Claude Code | Plugin marketplace, or `brain connect` | `~/.claude/rules/brain-wiki.md` | yes | yes | [[host-claude-code\|claude-code.md]] |
| Codex CLI and ChatGPT desktop | Plugin marketplace, or `brain connect` | MCP server instructions | yes | yes | [[host-codex\|codex.md]] |
| Antigravity (desktop, IDE, CLI) | `agy plugin install`, or `brain connect` | The plugin's always-on rule | yes | yes | [[host-antigravity\|antigravity.md]] |
| OpenClaw | `openclaw plugins install`, or `brain connect` | Managed block in the workspace `AGENTS.md` | yes | no | [[host-openclaw\|openclaw.md]] |
| Cursor | The bundle, or `brain connect` | Printed; `.cursor/rules/` with `--scope project` | bundle only | no | [[host-cursor\|cursor.md]] |
| Other MCP clients | `brain connect generic` prints an entry | Printed | no | no | [[host-cursor-other-mcp-clients\|cursor.md]] |
