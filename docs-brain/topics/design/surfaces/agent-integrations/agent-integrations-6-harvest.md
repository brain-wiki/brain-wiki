---
id: 01M3250V00KGAQHD9FJBTGQRDQ
type: design
title: "Harvest"
aliases: ["Agent integrations §6"]
source: "docs/design/agent-integrations.md#6-harvest"
---
# Harvest

Harvest reads finished sessions from the host's own session store, and the
agent whose sessions they are files them into notes
([[write-path-22-harvesting-sessions|write path §2.2]],
[[d20-harvest-host-sessions|D20]],
[[d36-harvest-into-notes|D36]]). It is off by default and
turned on per host (`brain harvest enable HOST`).

```toml
# user config.toml
[harvest]
enabled = true
hosts   = ["claude-code", "codex"]   # harvest is on for these
since   = "30d"                      # how far back to look (default 30d)
min_idle_minutes = 60                # skip sessions still in progress (default 60)
min_user_turns   = 3                 # default 3
include_headless = false             # also harvest non-interactive sessions
[harvest.routes]                     # optional: working-directory patterns to brains
"~/work/**" = "work"
```

Harvest is on for a host only when `enabled` is true and the host is in
`hosts`. `brain harvest enable` and `disable` update both. Without
`--from`, `brain harvest` reads the hosts in `hosts`, or `claude-code`,
`codex`, and `antigravity` when none are set.


### 6.1 What gets skipped

Harvest looks only at sessions modified within `since`, and skips:

- subagent sessions, where the host marks them;
- non-interactive (headless) sessions, unless `include_headless = true`;
- sessions whose working directory is under brain-wiki's state directory,
  where brain-wiki's own runs happen;
- sessions modified less than `min_idle_minutes` ago;
- sessions outside `--project`, when given;
- sessions whose working directory routes to no brain, or to a brain other
  than the one being harvested;
- unreadable transcripts (§6.4);
- sessions with fewer than `min_user_turns` new user turns since the last
  harvest.


### 6.2 How it runs

The `brain-maintain` skill, or the `harvest` MCP prompt, drives
`brain_harvest_prepare`, the agent's note edits, and `brain_harvest_done`,
in the host agent. A scheduled run can include it
([[write-path-48-scheduled-consolidation|write path §4.8]]). The packet keeps user and
assistant text and tool names with a short argument summary, but no tool
output. The readers strip text the host injected (reminders, command
echoes), and secrets are scrubbed before turns reach the agent. A
per-session watermark in brain-wiki's state records the last handled turn,
and `brain_harvest_done` advances it only for sessions whose notes cite
them.


### 6.3 Detecting external inputs

A session has external inputs once it runs an untrusted tool:

- web fetch and search tools, and browser tools;
- MCP tools from servers other than brain-wiki;
- shell commands that mention `curl`, `wget`, `http`, `https`, or a URL.

Harvest scans the transcript and marks each session in the packet
`inputs: external` or `local`; consolidation packets give the same reading
as `session_inputs` for an episode whose transcript is on this machine.
Episodes written over MCP are `unknown`, because the server cannot see the
rest of the session.

| Host | Untrusted tools |
|---|---|
| Claude Code | `WebFetch`, `WebSearch`, `mcp__*` |
| Codex | `web_search`, `web_fetch`, `mcp__*`, `web_search_call` items |
| Antigravity | `search_web`, `read_url_content`, `read_browser_page`, `browser_*`, `mcp_*`, and the matching steps |


### 6.4 Session readers

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
