---
id: 01M3250V009JPTXJYCEPDPTMEG
type: design
title: "Harvesting sessions"
aliases: ["Write path §2.2"]
source: "docs/design/write-path.md#22-harvesting-sessions"
---
# Harvesting sessions

`brain harvest` reads finished sessions from the hosts' own transcript
stores and turns them into episodes ([[d20-harvest-host-sessions|D20]]).
This gives:

- episodes for sessions from before brain-wiki was installed, the fastest
  way to give a new brain real history;
- episodes for sessions in which the agent logged nothing;
- exact inputs, because every tool call of the session is visible.

```
discover ─► filter ─► route ─► extract ─► distill (or raw) ─► write episodes ─► advance watermark
```

A per-host session reader lists sessions modified within `--since`
(default `[harvest] since`, else `30d`)
([[agent-integrations-64-session-readers|agent integrations §6.4]]).
The filter skips:

- subagent sessions, and headless sessions unless `[harvest]
  include_headless = true`;
- brain-wiki's own headless runs, whose working directory is in the state
  directory;
- sessions modified less than `[harvest] min_idle_minutes` ago (default
  60), which may still be running;
- sessions outside `--project`, when given;
- transcripts where half or more of the lines failed to parse;
- sessions with fewer than `[harvest] min_user_turns` new user turns
  (default 3).

Each session goes to the brain of its working directory, checked in order:

1. a project file (`.brain-wiki.toml`) in the folder or an ancestor;
2. the brain the folder is inside (a `brain.toml` above it, or a
   registered brain's path);
3. the first matching pattern in `[harvest.routes]`;
4. the host's default brain (`[hosts.<id>] brain`).

What the folder says comes before routes, so a catch-all such as `~/**`
never overrides a project's own brain. `brain harvest route PATTERN BRAIN`
adds a route and keeps longer patterns first. A session that resolves to no
brain is skipped, never sent to the user's default brain
([[config-and-storage-3-choosing-a-brain|config and storage §3]]).

Extraction keeps user text, assistant text, and tool calls by name with a
short argument summary. It drops tool output bodies and text the host
injected (reminders, command echoes), and scrubs secrets.

Distillation sends chunks of about 30k tokens, with `prompts/distill.md`,
to a model that returns
`{skip, reason, summary, claims[{text, turns}], negative_findings, open_questions, topics}`.
Each chunk becomes one episode, and each claim is written with its turn
range as `<text> (turns A-B)`. With `--raw`, no model is called and the
episode holds a condensed transcript excerpt for whoever consolidates it.
After writing, harvest records the last harvested turn in
`<state>/harvest/<host>/<hash of session id>.json`, so a long session is
harvested in increments.

The distill step reaches an LLM in one of three ways:

| Backend | How it runs | Best for |
|---|---|---|
| `agent` | Inside a host, through the in-agent recipe below | Regular use; no extra process or credentials |
| `preset` | `brain harvest --apply` runs the headless preset `[harvest] distill` (default `claude-code`) or `--distill` once per chunk ([[agent-integrations-7-headless-presets\|agent integrations §7]]) | Large backfills that would fill a chat session's context |
| `raw` | No model; `--raw` or `--distill raw` | No model available |

The in-agent recipe:

1. The user runs `/brain:harvest` (the `harvest` MCP prompt) in a host.
2. The agent calls `brain_harvest_prepare {since, max_sessions, project}`
   (defaults `7d`, 10). It returns that host's new sessions for the current
   brain as condensed, scrubbed turns, at most about 15k tokens, named
   `S1`, `S2`, and so on, with a count of the sessions `remaining`.
3. The agent distills each session and calls `brain_harvest_apply` within
   one hour with the run id and one entry per session: episode content, or
   `skip` with a reason.
4. The server checks shapes, lengths, claim turn ranges, and that each
   session still routes to the same brain. It sets every provenance field
   itself, writes the episodes, and advances the watermarks.

Both tools need the `harvest` capability and harvest turned on for the host
in the user config (`[harvest] enabled` and `hosts`, both set by `brain
harvest enable HOST`).

For hosts without a session reader (Cursor, OpenClaw), prepare returns
`unsupported_host`. The skill then lets the agent read its own history, at
the user's request, and log one episode per session with
`brain_log_episode`, passing `session` and `origin_turns` as hints. These
are `captured: mcp` with `inputs: unknown`, so they never feed rules.

Harvest runs only when the user asks. Scheduled harvest is a
[[proposal-scheduled-maintenance|proposal]].

`brain harvest` in a terminal is the user's command and needs neither the
capability nor the config switch.

- Without `--apply` it writes nothing. It lists each session (host, full
  session id, folder, target brain, turn range, estimated tokens) or why it
  was skipped.
- `--apply` writes episodes. `--apply --dry-run` lists the turn ranges it
  would write per session.
- `--status` shows, per host, whether harvest is on and how many sessions
  are left.
- `--from` with an unknown host, or one without a session reader, is a
  usage error, as it is for `brain harvest enable`.
