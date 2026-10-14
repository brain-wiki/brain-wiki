# Getting started

## Set up from your agent (recommended)

Install the plugin in your agent (the README lists the command for each),
then ask it:

> Set up brain-wiki.

The `brain-setup` skill installs the `brain` command if needed, then walks
you through the choices below, explaining each and showing every change
before it makes it. You can rerun it at any time; it offers only what is
missing.

| Choice | What to know |
|---|---|
| Where the brain lives | An ordinary folder of Markdown you own, such as `~/brains/personal`. Keep it outside code repositories; a synced folder works. Or adopt an existing Obsidian vault in place ([Import](import.md)). |
| Git | Recommended. Every change becomes a commit you can see and revert, and you can push the brain to a private remote to use it on another machine. Without git, `brain undo` still works on this machine. |
| Other agents | Which agent apps on this machine to connect ([Agents](agents.md)). |
| What agents may do | Log what they learn and correct notes: on by default. Consolidate the inbox and propose rules: off until you turn them on for an app. |
| Harvest | Whether to turn past sessions into episodes, and which brain each project's sessions go to. |

## Or from a terminal

```sh
uv tool install brain-wiki     # or: pipx install brain-wiki
brain doctor
brain init ~/brains/personal --name personal --git
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

Already have notes? See [Import](import.md) to adopt an Obsidian vault in
place.

## First steps

```sh
brain log "Lumen stores attachments next to notes; Obsidian expects relative paths."
brain search "attachments"
brain orient
brain rule add "Prefer pytest for new tests." --quote "from now on use pytest"
```

- `brain log` writes an **episode** to the inbox. Episodes are never edited
  afterwards.
- **Consolidation** turns episodes into **claims** on notes, with sources,
  and records how notes relate. See [Maintenance](maintenance.md).
- **Rules** are your standing instructions. Only you add them: from the
  CLI, or by confirming an agent's proposal.

## What a note looks like

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
title: Use SQLite FTS5 for local search
bw-part_of: "[[search]]"
bw-supersedes: "[[ripgrep]]"
bw-conflicts_with: "[[vector-only]] (unless: embeddings enabled)"
bw-claims:
  - "SQLite FTS5 is the default search backend. {id: c-…; src: inbox/episodes/2026/10/….md#L11-L12; at: 2026-10-07}"
bw-claims-superseded:
  - "Search shells out to ripgrep. {id: c-…; by: c-…}"
---
# Use SQLite FTS5 for local search

Free prose. brain-wiki never rewrites it.
```

Claims and relations are frontmatter fields named `bw-…`, so Obsidian shows
them as properties, and its links work. The body stays yours.

You can edit notes by hand in any editor. `brain lint` tells you if
something no longer follows the format, and `brain lint --fix` repairs what
is safe to repair, as one undoable run.

## Next

- [Connect your agents](agents.md).
- Open the map: `brain viz`.
