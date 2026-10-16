---
id: 01M3250V00P8VQH5CDVK8NH49M
type: guide
title: "Harvest (off by default)"
tags: [user-guide]
source: "docs/user/agents.md#harvest-off-by-default"
---
# Harvest (off by default)

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is the way to give a new brain real history.

```sh
brain harvest enable claude-code codex   # or disable; also: antigravity
brain harvest --status           # per host: on or off, sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with the preset above (--distill to override)
brain harvest --apply --raw      # no model: excerpts that consolidation distills later
```

Inside an agent, "harvest my recent sessions" runs the same steps with the
agent itself doing the distilling (`brain agents grant claude-code harvest`
first). The model the command line distills with is `distill` in
`[harvest]` of the user config, `~/.config/brain-wiki/config.toml`
(`claude-code`, `codex`, `antigravity`, `cursor`, `ollama`, or `raw`).

Each session goes to the brain of the folder it ran in, checked in this
order:

1. a `.brain-wiki.toml` with `brain = "NAME"` in the folder or above it;
2. the brain the folder is inside;
3. a pattern in `[harvest.routes]` that matches the folder;
4. the host's `brain` in `[hosts.<host>]`.

A session that matches none of these is skipped, never filed into your
default brain. With one brain, route everything under your home folder to it:

```sh
brain harvest route "~/**" personal
brain harvest route "~/work/**" work     # more specific patterns are checked first
```

Routes are the fallback: a project's own `.brain-wiki.toml` still wins over
a catch-all such as `~/**`.

Sessions brain-wiki ran itself, subagent sessions, and sessions still in
progress are skipped too. Claude Code deletes transcripts after 30 days by
default, so harvest at least weekly.
