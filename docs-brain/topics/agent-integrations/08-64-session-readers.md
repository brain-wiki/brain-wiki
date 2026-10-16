---
id: 01M3250V00CCRRTCADSYQCPG8Y
type: design
title: "Session readers"
aliases: ["08 §6.4"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#64-session-readers"
---
# Session readers

One reader per host lists sessions and yields normalized turns
(`index`, `role`, `text`, `tool_name`, `tool_args_summary`, `timestamp`).
Harvest, origin lookup, and input detection all use it.

| Host | Where sessions live (defaults) |
|---|---|
| Claude Code | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` ([[agent-claude-code\|details]]) |
| Codex | `$CODEX_HOME/sessions/` and `archived_sessions/` ([[agent-codex\|details]]) |
| Antigravity | `<app dir>/brain/<conversation-id>/.system_generated/logs/` ([[agent-antigravity\|details]]) |
| OpenClaw, Cursor | No reader yet |

Readers are tested against synthetic sessions in each host's format;
fixtures recorded from real host versions are open items (T-6, T-11). A
line they cannot parse is skipped and counted; a session
with too many unparseable lines is reported as unreadable rather than
half-read. Readers never write to a host's files.
