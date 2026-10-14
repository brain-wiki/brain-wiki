---
id: 01M3250V006Q4P5V62TKWA0DXY
type: design
title: "Harvesting sessions"
aliases: ["05 §2.2"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#22-harvesting-sessions"
bw-part_of:
  - "[[05-2-the-write-paths]]"
---
# Harvesting sessions

Every supported host keeps its own transcripts on disk. `brain harvest`
reads finished sessions from those stores and turns them into episodes,
which gives:

- episodes for sessions that happened before brain-wiki was installed
  (backfill, the fastest way to give a new brain real history);
- episodes for sessions in which the agent logged nothing;
- exact inputs, because every tool call of the session is visible.

```
discover ─► filter ─► route ─► extract ─► distill (or raw) ─► write episodes ─► advance watermark
```

| Step | What happens |
|---|---|
| Discover | A per-host session reader lists sessions with id, working directory, start and last-modified time, size, and whether it is a subagent ([[08-64-session-readers\|08 §6.4]]). |
| Filter | Skip subagent sessions, brain-wiki's own headless runs, sessions idle for less than `min_idle_minutes` (still in progress), and sessions with fewer than `min_user_turns` user messages. |
| Route | Each session belongs to the brain its working directory resolves to, using the same project files and host defaults as brain selection ([[03-3-choosing-a-brain\|03 §3]]) plus optional path rules in `[harvest.routes]`. Sessions that resolve to no brain are skipped, never sent to the default brain. |
| Extract | Normalize turns (user text, assistant text, tool calls by name and short argument summary). Tool output bodies are dropped. Injected brain-wiki context is stripped. Secrets are scrubbed. Inputs are computed from the tool calls. |
| Distill | One call to the configured headless preset ([[08-7-headless-presets\|08 §7]]) with the distill instructions (`prompts/distill.md`): the model returns `{skip, summary, claims[{text, turns}], negative_findings, open_questions, topics}`. Long sessions are split into chunks of at most 30k tokens, one episode per chunk. With `--raw`, no model is called and the episode holds a condensed transcript excerpt instead; consolidation distills it later. |
| Write | Episodes with `bw-captured: harvest`, `bw-agent`, `bw-session`, `bw-turns`, `bw-device`, and the computed `bw-inputs`. The dedupe key `<host>:<session>:<turn range>` makes a repeated harvest write nothing new. |
| Watermark | `<state>/harvest/<host>/<session>.json` records the last harvested turn, so a long-running session is harvested in increments. |

**Who distills.** The distill step reaches an LLM the same three ways as
consolidation:

| Backend | How | Best for |
|---|---|---|
| `agent` (in-session recipe) | The user runs `/brain:harvest` (the `harvest` MCP prompt, or the skill's harvest section) inside a host. The agent calls `brain_harvest_prepare`; brain-wiki discovers, filters, routes, extracts, and scrubs that host's new sessions and returns a packet of condensed turns (at most 15k tokens; call again for more). The agent distills and calls `brain_harvest_apply` with one entry per session (episode content, or `skip` with a reason). The server validates turn ranges and lengths, sets every provenance field itself (including inputs computed from the parsed tool calls), writes the episodes, and advances watermarks. | Regular use: the agent the user already runs does the thinking, no extra process or credentials |
| `command` (headless) | `brain harvest --apply` calls the configured preset per chunk. | Large backfills, which would exhaust a chat session's context |
| `raw` | No model: the episode is a condensed transcript excerpt; consolidation distills later. | No model available |

**Fallback for hosts without a reader.** For hosts brain-wiki cannot read
yet (Cursor, OpenClaw, new hosts), `brain_harvest_prepare` returns
`unsupported_host`, and the skill's recipe lets the agent read its own
session history with its own tools, at the user's request, and log one
episode per session with `brain_log_episode`, passing `session` and
`origin_turns` as hints. Those episodes are `bw-captured: mcp` with
`bw-inputs: unknown`, because neither routing nor tool use was checked by
brain-wiki. They are usable knowledge but can never feed rules.

**When it runs.** When the user asks: the recipe in a session, or
`brain harvest --apply` in a terminal. Scheduled harvest was removed before
0.1 ([[proposal-scheduled-maintenance|proposal]]).

The in-agent recipe is off by default and enabled per host (`[harvest]
enabled` and `hosts` in the user config, plus `harvest` in the host's
profile `write` list). `brain harvest` in a terminal is the owner's
command and needs neither; every CLI run starts as a dry run that lists the sessions
it would read, the brain each routes to, and an estimate of tokens for
distillation; `--apply` executes. A backend only receives sessions routed
to a brain; unrouted sessions are skipped.
