---
id: 01M3250V00E0E7V7BCR15PDFD7
type: guide
title: "Or from a terminal"
tags: [user-guide]
source: "docs/user/getting-started.md#or-from-a-terminal"
bw-part_of:
  - "[[user-getting-started]]"
---
# Or from a terminal

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
brain setup
```

`brain setup` goes step by step: create a brain (or adopt a vault) and choose
git, connect the agent apps it finds, choose what each may do, and turn on
harvest. It shows every change before making it, and ends with what to try
next.

Every step is also a command of its own, which is what an agent following
`brain setup --guide` runs:

```sh
brain doctor
brain init ~/brains/personal --name personal --git
brain connect claude-code --dry-run            # then without --dry-run
brain agents grant claude-code consolidate propose_rules
brain harvest enable claude-code
brain harvest route "~/**" personal
```

`brain doctor` reports its version and SQLite, your brains, and which agents
it found on this machine. It changes nothing (except rolling back a run that
a crash left half-applied). `brain init --git` also makes a first commit.

```text
~/brains/personal/
├── brain.toml          settings that travel with the brain
├── AGENTS.md           how agents that only read files should use it
├── rules.md            your standing rules, part of every briefing
├── log.md              a readable history of changes brain-wiki made
├── topics/<topic>/     curated notes; each topic has a hub (index.md)
├── inbox/episodes/     raw observations from agents and from you
├── archive/            consolidated episodes, kept as provenance
└── reports/            generated pages: contradictions, stale notes, lint
```

Already have notes? See [[user-import|Import]] to adopt an Obsidian vault in
place.
