---
id: 01M3250V00P8VQH5CDVK8NH49M
type: guide
title: "Harvest (off by default)"
tags: [user-guide]
source: "docs/user/agents.md#harvest-off-by-default"
bw-part_of:
  - "[[user-agents]]"
---
# Harvest (off by default)

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is the way to give a new brain real history. Turn it on in
the user config, `~/.config/brain-wiki/config.toml`:

```toml
[harvest]
enabled = true
hosts = ["claude-code", "codex", "antigravity"]
distill = "claude-code"          # or codex, antigravity, cursor, ollama, raw
```

```sh
brain harvest --status           # per host: on or off, sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with the preset above (--distill to override)
brain harvest --apply --raw      # no model: excerpts that consolidation distills later
```

Inside an agent, "harvest my recent sessions" runs the same steps with the
agent itself doing the distilling (the host's profile needs `harvest`).

Each session goes to the brain of the folder it ran in, checked in this
order:

1. a pattern in `[harvest.routes]` that matches the folder;
2. a `.brain-wiki.toml` with `brain = "NAME"` in the folder or above it;
3. the brain the folder is inside;
4. the host's `brain` in `[hosts.<host>]`.

A session that matches none of these is skipped, never filed into your
default brain. With one brain, route everything under your home folder to it:

```toml
[harvest.routes]
"~/**" = "personal"
```

Sessions brain-wiki ran itself, subagent sessions, and sessions still in
progress are skipped too. Claude Code deletes transcripts after 30 days by
default, so harvest at least weekly.
