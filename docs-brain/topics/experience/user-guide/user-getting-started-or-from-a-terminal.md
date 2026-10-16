---
id: 01M3250V00E0E7V7BCR15PDFD7
type: guide
title: "Or from a terminal"
source: "docs/user/getting-started.md#or-from-a-terminal"
---
# Or from a terminal

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
brain setup
```

`brain setup` goes step by step. It creates a brain (or adopts a vault),
sets up git and the commit job, connects the agent apps it finds, sets what
each may do, and turns on harvest. It shows every change before making it,
and ends with what to try next.

Each step is also a command of its own. These are the commands an agent
following `brain setup --guide` runs:

```sh
brain doctor
brain init ~/brains/personal --name personal --git
brain schedule add commit --dry-run            # then without --dry-run; --push to push too
brain connect claude-code --dry-run            # then without --dry-run
brain agents grant claude-code propose_rules
brain harvest enable claude-code
brain harvest route "~/**" personal
```

- `brain doctor` reports its version, SQLite, your brains, and the agent apps
  it found on this machine. It changes nothing, except that it rolls back a
  run that a crash left half-applied.
- `brain init --git` runs `git init` and makes a first commit.

A new brain looks like this:

```text
~/brains/personal/
├── brain.toml          settings that travel with the brain
├── AGENTS.md           how agents that only read files should use it
├── rules.md            your standing rules, part of every briefing
├── log.md              a readable history of changes brain-wiki made
├── topics/<topic>/     notes; each topic has a hub (index.md)
├── inbox/episodes/     raw observations from agents and from you
├── inbox/proposals/    rules agents proposed, waiting for you
├── archive/            consolidated episodes, kept as sources
└── reports/            generated pages: stale links, orphans, inbox, lint
```

A git brain also gets a `.gitattributes` file, so `log.md` merges without
conflicts.
