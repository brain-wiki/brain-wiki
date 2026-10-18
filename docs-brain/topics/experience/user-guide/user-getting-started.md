---
id: 01M3250V00C2YQ4AM0KPJJWWWF
type: guide
title: "Getting started"
source: "docs/user/getting-started.md"
---
# Getting started

## Set up from your agent (recommended)

Install the command, then paste one sentence into your agent:

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
```

> Set up brain-wiki by running `brain setup --guide` and following it.

`brain setup --guide` prints setup steps for the agent. The agent walks you
through the choices below, explains each one, and shows every change before
it makes it. Connecting an agent app gives it brain-wiki's tools, plus its
skills where the app takes plugins. They load in a new session. See
[[user-agents|Agents]] for each app.

You can rerun setup at any time. It offers only what is missing. If the
plugin is already installed from your agent's marketplace, ask the agent:
*Set up brain-wiki.*

| Choice | What to know |
|---|---|
| Where the brain lives | Any folder you own, such as `~/brains/personal`, outside code repositories |
| Git | Strongly recommended |
| Commit job | With git: runs `brain commit` every 15 minutes |
| Other agents | Which agent apps on this machine to connect |
| What agents may do | Log and edit by default; rules and harvest when you allow them |
| Harvest | Whether your agents may file their past sessions into notes, and into which brain |

- You can also adopt an existing Obsidian vault in place. See
  [[user-import|Import]].
- Agents edit notes directly, and git is how you see and revert those edits.
  Without git, `brain undo` still reverses brain-wiki's own changes on this
  machine, but not direct edits.
- To use the brain on another machine, push it to a private git remote. Do
  not sync a git brain with a sync tool. See
  [[user-maintenance|Maintenance]].
- The commit job does not push unless you say so. Setup asks only when the
  brain has a git remote.


## Or from a terminal

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
├── topics/<topic>/     notes; each topic has a page (index.md)
├── inbox/episodes/     raw observations from agents and from you
├── inbox/proposals/    rules agents proposed, waiting for you
├── archive/            consolidated episodes, kept as sources
└── reports/            generated pages: stale links, orphans, inbox, lint
```

A git brain also gets a `.gitattributes` file, so `log.md` merges without
conflicts.


## First steps

```sh
brain search "attachments"
brain orient
brain rules add "Prefer pytest for new tests." --quote "from now on use pytest"
```

- Your agents record what they learn as **episodes** in the inbox, with the
  MCP tool `brain_log_episode`. An episode is an observation nobody has
  organized yet, and it is never edited afterwards. To have something
  remembered, tell an agent "remember that …".
- **Notes** hold the knowledge. You and your agents write them directly.
  **Consolidation** folds the inbox into notes when you ask. See
  [[user-maintenance|Maintenance]].
- **Rules** are your standing instructions. Only you add them, from the CLI
  or by accepting an agent's proposal.


## What a note looks like

A note is a Markdown page in `topics/<topic>/`. Frontmatter holds metadata
only. What the note knows, and how it connects to other notes, goes in the
body:

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: decision
title: Use SQLite FTS5 for local search
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
updated: 2026-10-09
---
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- `status` (`active`, `superseded`, or `archived`) and `bw-superseded_by`
  mark a note that a newer one replaced. Search then shows the newer note
  first.
- `bw-sources` lists where the note's knowledge came from.
- `bw-part_of`, `bw-depends_on`, and `bw-conflicts_with` link the note to
  a whole it belongs to, a note it rests on, or a note it disagrees with.
  Each holds links only; say why in the body.
- brain-wiki reads the body's headings and links, never its meaning. The
  suggested shape (a summary paragraph, one fact per bullet, links inside
  sentences) is a convention, not a rule.

Edit notes in any editor, then check them:

- `brain validate` checks the frontmatter of the notes git sees as changed,
  or of the paths you name. It reports a missing `id` and gives one to add.
- `brain lint` checks the whole brain.
- `brain lint --fix` repairs what is safe to repair, as one undoable run.

Notes from older versions (formats 1 to 3) still work, and
`brain lint --fix` converts them. See
[[user-maintenance|Maintenance]].


## Next

- [[user-agents|Connect your agents]].
- Open the map: `brain viz`.
