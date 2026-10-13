---
id: 01M3250V00CCRRTCADSYQCPG8Y
type: design
title: "Session readers"
aliases: ["08 §6.4"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#64-session-readers"
bw-part_of:
  - "[[08-6-capture-and-harvest]]"
---
# Session readers

One reader per host lists sessions and yields normalized turns
(`index`, `role`, `text`, `tool_name`, `tool_args_summary`, `timestamp`).
Raw capture, harvest, origin lookup, and taint detection all use it.

| Host | Where sessions live (defaults) | Notes |
|---|---|---|
| Claude Code | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` (moves with `CLAUDE_CONFIG_DIR`) | The format is documented as internal and changes between versions. Entries carry `cwd`, `gitBranch`, `sessionId`, and `isSidechain` (subagents). Transcripts are deleted after 30 days by default (`cleanupPeriodDays`), so harvest should run at least weekly or the user should raise that setting. |
| Codex | `$CODEX_HOME/sessions/` (default `~/.codex/sessions/`) and `archived_sessions/` | JSONL rollout files; the hook payload's `transcript_path` points at the same files. Schema to confirm (T-6). |
| Antigravity | `<app dir>/brain/<conversation-id>/.system_generated/logs/`, where the app dir is the desktop, IDE, or CLI data folder under `~/.gemini/` | Holds `transcript.jsonl`, which cuts long steps to about 4 KB, and `transcript_full.jsonl` (the hook's `transcriptPath`), which keeps them; the full one is read when present. Line schema undocumented (T-3). The working directory comes from the app's `conversation_summaries.db`, which the CLI writes too since 1.3. |
| OpenClaw | The agent's session transcripts | After v0.1; location to confirm. |
| Cursor | Its own local state | After v0.1. |

Readers are versioned and tested against recorded fixtures from several
host versions. A line they cannot parse is skipped and counted; a session
with too many unparseable lines is reported as unreadable rather than
half-read. Readers never write to a host's files.
