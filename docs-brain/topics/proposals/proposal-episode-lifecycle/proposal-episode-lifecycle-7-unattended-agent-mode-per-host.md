---
id: 01M3250V00DA49PFERFFG8SB09
type: proposal
title: "Unattended agent mode, per host"
aliases: ["Episodes: quick capture, per-agent consolidation §7"]
source: "docs/proposal/episode-lifecycle.md#7-unattended-agent-mode-per-host"
---
# Unattended agent mode, per host

Scheduled consolidation needs a host CLI that runs an agent without a
person: tools on, limited to the brain folder, with an MCP server. The
existing presets run with tools off, so they cannot do this.

| Host | Candidate | To verify |
|---|---|---|
| Claude Code | `claude -p` with `--mcp-config`, `--allowedTools`, and an edit-only permission mode | Tool scoping to one folder; MCP tool approval without a prompt |
| Codex | `codex exec` with `--sandbox workspace-write` in the brain folder | MCP servers in exec mode; no approval prompts |
| Antigravity | `agy` headless mode | Whether a headless run can use tools at all (T-5 says denied tools end the turn) |
| Cursor | `cursor-agent -p` | Availability and tool scoping |
| OpenClaw | Gateway automations | Whether automations can be created from outside |

A host without a verified mode consolidates in sessions only. If it never
does, its pending episodes show in orientation, and the user can ask
another agent to take them (§3.2).
