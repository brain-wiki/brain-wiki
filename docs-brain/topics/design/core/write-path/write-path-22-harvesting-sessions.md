---
id: 01M3250V009JPTXJYCEPDPTMEG
type: design
title: "Harvesting sessions"
aliases: ["Write path §2.2"]
source: "docs/design/write-path.md#22-harvesting-sessions"
---
# Harvesting sessions

Harvest is consolidation whose input is a past session instead of an
episode. brain-wiki reads finished sessions from the hosts' own transcript
stores ([[d20-harvest-host-sessions|D20]]), and the agent
whose sessions they are files what they hold straight into notes
([[d36-harvest-into-notes|D36]]). Harvest writes no episodes.
It gives:

- knowledge from sessions before brain-wiki was installed, the fastest way
  to give a new brain real history;
- knowledge from sessions in which the agent logged nothing;
- exact inputs, because every tool call of the session is visible.

```
discover ─► filter ─► route ─► extract ─► (the agent files notes) ─► done ─► advance watermark
```

A per-host session reader lists sessions modified within `since` (default
`[harvest] since`, else `30d`)
([[agent-integrations-6-harvest|agent integrations §6.4]]).
The filter skips:

- subagent sessions, and headless sessions unless `[harvest]
  include_headless = true`;
- brain-wiki's own runs, whose working directory is in the state
  directory;
- sessions modified less than `[harvest] min_idle_minutes` ago (default
  60), which may still be running;
- sessions outside `project`, when given;
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

The recipe, in the host agent:

1. The user asks ("harvest my sessions"), or runs `/brain:harvest` (the
   `harvest` MCP prompt), or a scheduled run includes harvest
   (§4.8).
2. The agent calls `brain_harvest_prepare {since, max_sessions, project}`
   (defaults `7d`, 10). It returns that host's new sessions for the current
   brain as condensed, scrubbed turns, at most about 15k tokens, named
   `S1`, `S2`, and so on, with a count of the sessions `remaining`. Each
   session carries its `source`, a session URL, and its `inputs`.
3. The agent applies the consolidation patterns (§4.5) to each session:
   it edits or creates notes, cites the session's `source` in each note's
   `bw-sources`, and validates them.
4. Within one hour it calls `brain_harvest_done {run, sessions}` with one
   outcome per session: `{session, pattern, notes}`, or `{session,
   pattern: "skip", reason}`.
5. The server checks each outcome: each note exists and cites the
   session's URL, a skip has a reason, distill is used only for a session
   with `inputs: local`, and the session still routes to this brain. It
   advances the watermark of each session that passes, so the next harvest
   starts after its last handled turn. A session that fails stays where it
   was and comes back in the next packet. With nothing recorded, the call
   fails with `usage`.

A session URL is `session://<host>/<session id>#turns=A-B`
([[brain-format-6-notes|brain format §6.4]]). It holds no file path,
so it means the same on every machine. `brain origin` and
`brain_read_origin` accept it and show those turns when the transcript is
on this machine (§4.6). Provenance never comes from the model: the URL,
the turn range, and the inputs are brain-wiki's own reading of the
session, and `done` checks that the notes cite it.

`brain_harvest_prepare` needs the `harvest` capability and harvest turned
on for the host in the user config (`[harvest] enabled` and `hosts`, both
set by `brain harvest enable HOST`). `brain_harvest_done` also needs `edit`,
since the agent filed notes.

For hosts without a session reader (Cursor, OpenClaw), prepare returns
`unsupported_host`. The skill then lets the agent read its own history, at
the user's request, and file it the same way, citing
`session://<host>/<session id>`. brain-wiki cannot check those citations
and keeps no watermark for them, and the agent distills nothing about the
user from them.

A large backfill costs agent time in proportion to the sessions read. It
runs over several rounds (`remaining` counts what is left), or night by
night in a scheduled run.

`brain harvest` in a terminal is the user's command and needs neither the
capability nor the config switch. It writes nothing:

- Bare, it lists each session (host, full session id, folder, target
  brain, turn range, estimated tokens) or why it was skipped.
- `--status` shows, per host, whether harvest is on and how many sessions
  are left.
- `--from` with an unknown host, or one without a session reader, is a
  usage error, as it is for `brain harvest enable`.
- `enable`, `disable`, and `route` change the user config.

Earlier versions wrote harvested sessions as episodes, distilled in the
agent, by a headless model preset (`brain harvest --apply`), or raw
(`--raw`). Those are removed: the agent that reads a session can file it
where it belongs at once, and the episode step added a second pass without
adding provenance.
