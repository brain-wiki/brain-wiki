# Getting started

## Set up from your agent (recommended)

Install the command, then paste one sentence into your agent:

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
```

> Set up brain-wiki by running `brain setup --guide` and following it.

`brain setup --guide` prints the setup steps for the agent, which walks you
through the choices below, explaining each and showing every change before
it makes it. Connecting your agent gives it brain-wiki's tools, and its
skills where the app takes plugins; they load in a new session (details per
app in [Agents](agents.md)). You can rerun setup at any time; it offers only
what is missing.

If the plugin is already installed from your agent's marketplace
([Agents](agents.md)), just ask: *Set up brain-wiki.*

| Choice | What to know |
|---|---|
| Where the brain lives | An ordinary folder of Markdown you own, such as `~/brains/personal`. Keep it outside code repositories. Or adopt an existing Obsidian vault in place ([Import](import.md)). |
| Git | Strongly recommended. Agents edit notes directly, and git is how you see and revert those edits. To use the brain on another machine, push it to a private remote; do not sync a git brain with a sync tool ([Maintenance](maintenance.md#share-a-brain-between-machines)). Without git, `brain undo` still reverses brain-wiki's own changes on this machine, but not direct edits. |
| Commit job | With git: a job that runs `brain commit` every 15 minutes, so agents' edits land in history; whether it also pushes (off by default). |
| Other agents | Which agent apps on this machine to connect ([Agents](agents.md)). |
| What agents may do | Log what they learn and edit notes: on by default. Propose rules and harvest their own sessions: off until you turn them on for an app. |
| Harvest | Whether to turn past sessions into episodes, and which brain each project's sessions go to. |

## Or from a terminal

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
brain setup
```

`brain setup` goes step by step: create a brain (or adopt a vault) and choose
git, schedule commits, connect the agent apps it finds, choose what each may do, and turn on
harvest. It shows every change before making it, and ends with what to try
next.

Every step is also a command of its own, which is what an agent following
`brain setup --guide` runs:

```sh
brain doctor
brain init ~/brains/personal --name personal --git
brain schedule add commit --dry-run            # then without --dry-run; --push to push too
brain connect claude-code --dry-run            # then without --dry-run
brain agents grant claude-code propose_rules
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
├── archive/            consolidated episodes, kept as sources
└── reports/            generated pages: stale links, orphans, inbox, lint
```

Already have notes? See [Import](import.md) to adopt an Obsidian vault in
place.

## First steps

```sh
brain log "Lumen stores attachments next to notes; Obsidian expects relative paths."
brain search "attachments"
brain orient
brain rules add "Prefer pytest for new tests." --quote "from now on use pytest"
```

- `brain log` writes an **episode** to the inbox: something nobody has
  organized yet. Episodes are never edited afterwards.
- **Notes** are where knowledge lives. You and your agents write them
  directly; **consolidation** is an optional helper for folding the inbox
  into notes. See [Maintenance](maintenance.md).
- **Rules** are your standing instructions. Only you add them: from the
  CLI, or by confirming an agent's proposal.

## What a note looks like

A note is an ordinary Markdown page in `topics/<topic>/`. Frontmatter holds
metadata only; what the note knows, and how it connects to other notes, is
in the body:

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

- `status` (`active`, `superseded`, `archived`) and `bw-superseded_by`
  mark a note that a newer one replaced; search then shows the newer note
  first. `bw-sources` lists where the note's knowledge came from.
- brain-wiki reads only the body's headings and links, never its meaning.
  The suggested shape (a summary paragraph, one fact per bullet, links
  inside sentences) is a convention, not a rule.

Edit notes in any editor, then run `brain validate` (it checks the notes git
sees as changed, or the paths you name). `brain lint` checks the whole
brain, and `brain lint --fix` repairs what is safe to repair, as one
undoable run. Notes from brain-wiki 0.1 (format 1 or 2) still work;
`brain lint --fix` converts them ([Maintenance](maintenance.md#convert-notes-from-brain-wiki-01)).

## Next

- [Connect your agents](agents.md).
- Open the map: `brain viz`.
