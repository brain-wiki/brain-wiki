---
id: 01M3250V00XMC6QN1R5WFSR81P
type: design
title: "Hosts"
aliases: ["08 §4"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#4-hosts"
bw-part_of:
  - "[[agent-integrations]]"
---
# Hosts

Each host's integration (install, registration, MCP specifics, where the
instructions go, harvest, presets, and what was verified) has its own page
in agents/:

| Host | Instructions | Harvest | Page |
|---|---|---|---|
| Claude Code | `~/.claude/rules/brain-wiki.md`, brain-wiki's own file | yes | [[agent-claude-code\|claude-code.md]] |
| Codex CLI and ChatGPT desktop | MCP server instructions; no file is written | yes | [[agent-codex\|codex.md]] |
| Antigravity (desktop, IDE, CLI) | The plugin's `always_on` rule | yes | [[agent-antigravity\|antigravity.md]] |
| OpenClaw | Managed block in the workspace `AGENTS.md` | after v0.1 | [[agent-openclaw\|openclaw.md]] |
| Cursor and other MCP clients | Printed for the user; `.cursor/rules/` with `--scope project` | after v0.1 | [[agent-cursor\|cursor.md]] |
