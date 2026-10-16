---
id: 01M3250V00X9VAQ9WC0JZY8PZD
type: design
title: "Session readers"
aliases: ["Agent integrations §6.4"]
source: "docs/design/agent-integrations.md#64-session-readers"
---
# Session readers

One reader per host lists sessions and yields normalized turns with
`index`, `role`, `text`, `tools` (each "name: short argument summary"), and
`timestamp`. Harvest, origin lookup, and input detection all use it.

| Host | Where sessions live (defaults) |
|---|---|
| Claude Code | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` ([[host-claude-code\|details]]) |
| Codex | `$CODEX_HOME/sessions/` and `archived_sessions/` ([[host-codex\|details]]) |
| Antigravity | `<app dir>/brain/<conversation-id>/.system_generated/logs/` ([[host-antigravity\|details]]) |
| OpenClaw, Cursor | No reader |

- A line a reader cannot parse is skipped and counted.
- A session with half or more of its lines unparseable, or a transcript
  over 20 MiB, is unreadable rather than half-read.
- Readers never write to a host's files.
- Readers are tested against synthetic sessions in each host's format.
  Fixtures recorded from real host versions are open (T-6, T-11).
