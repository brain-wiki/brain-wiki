---
id: 01M3250V0055SNX4CDPECSWNJ4
type: guide
title: "Harvest (Agents)"
source: "docs/user/agents.md#harvest"
---
# Harvest (Agents)

Harvest reads your agents' own session history, and the agent files what
finished sessions hold into notes, each citing the session it came from. It
is off until you turn it on, and it is the way to give a new brain real
history.

```sh
brain harvest enable claude-code codex   # or disable; also: antigravity
brain agents grant claude-code harvest   # let the agent harvest in a conversation
brain harvest --status           # per app: on or off, sessions not yet harvested
brain harvest                    # sessions waiting, target brain, token estimate
```

- Harvest reads Claude Code, Codex, and Antigravity sessions.
- In the agent, say "harvest my recent sessions". It reads up to 10
  sessions at a time, files them into notes, and marks them harvested. A
  note cites a session as `session://claude-code/<session id>#turns=12-48`;
  `brain origin` with that URL shows the turns, on the machine that has the
  transcript.
- A large backfill takes several rounds. The agent says how many sessions
  remain.

Each session goes to the brain of the folder it ran in. brain-wiki checks,
in order:

1. A `.brain-wiki.toml` with `brain = "NAME"` in the folder or above it.
2. The brain the folder is inside.
3. A pattern in `[harvest.routes]` that matches the folder.
4. The app's `brain` in `[hosts.<host>]`.

A session that matches none of these is skipped, never filed into your
default brain. With one brain, route everything under your home folder to
it:

```sh
brain harvest route "~/**" personal
brain harvest route "~/work/**" work     # more specific patterns are checked first
```

Routes are the fallback, so a project's own `.brain-wiki.toml` still wins
over a catch-all such as `~/**`.

Harvest also skips:

- sessions brain-wiki ran itself, subagent sessions, and headless sessions;
- sessions still in progress (changed in the last 60 minutes);
- sessions with fewer than 3 new turns from you.

Claude Code deletes transcripts after 30 days by default, so harvest at
least weekly.
