---
id: 01M3250V0055SNX4CDPECSWNJ4
type: guide
title: "Harvest (Agents)"
source: "docs/user/agents.md#harvest"
---
# Harvest (Agents)

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is off until you turn it on, and it is the way to give a
new brain real history.

```sh
brain harvest enable claude-code codex   # or disable; also: antigravity
brain harvest --status           # per app: on or off, sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with the configured preset
brain harvest --apply --raw      # no model: excerpts to distill when consolidating
```

- Harvest reads Claude Code, Codex, and Antigravity sessions.
- Inside an agent, "harvest my recent sessions" runs the same steps with the
  agent itself distilling. Run `brain agents grant claude-code harvest`
  first.
- On the command line, the model is `distill` in `[harvest]` of the user
  config, `~/.config/brain-wiki/config.toml`: `claude-code` (the default),
  `codex`, `antigravity`, `cursor`, `ollama`, or `raw`. `--distill PRESET`
  overrides it.

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
