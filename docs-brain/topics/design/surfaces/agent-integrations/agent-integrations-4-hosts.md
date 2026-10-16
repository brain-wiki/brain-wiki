---
id: 01M3250V00W9X4V8CABRG4S0M5
type: design
title: "Hosts"
aliases: ["Agent integrations §4"]
source: "docs/design/agent-integrations.md#4-hosts"
---
# Hosts

Each host's integration (install, registration, MCP specifics, where the
instructions go, harvest, presets, and what was verified) has its own page
in `hosts/`:

| Host | Instructions | Harvest | Page |
|---|---|---|---|
| Claude Code | `~/.claude/rules/brain-wiki.md`, brain-wiki's own file | yes | [[host-claude-code\|claude-code.md]] |
| Codex CLI and ChatGPT desktop | MCP server instructions; no file is written | yes | [[host-codex\|codex.md]] |
| Antigravity (desktop, IDE, CLI) | The plugin's `always_on` rule | yes | [[host-antigravity\|antigravity.md]] |
| OpenClaw | Managed block in the workspace `AGENTS.md` | after v0.1 | [[host-openclaw\|openclaw.md]] |
| Cursor and other MCP clients | Printed for the user; `.cursor/rules/` with `--scope project` | after v0.1 | [[host-cursor\|cursor.md]] |
