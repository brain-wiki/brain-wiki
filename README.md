# brain-wiki

<!-- mcp-name: io.github.brain-wiki/brain-wiki -->

**One long-term memory for all your AI agents, kept as plain Markdown that you own.**

[![CI](https://github.com/brain-wiki/brain-wiki/actions/workflows/ci.yml/badge.svg)](https://github.com/brain-wiki/brain-wiki/actions/workflows/ci.yml)
[![PyPI](https://img.shields.io/pypi/v/brain-wiki)](https://pypi.org/project/brain-wiki/)
[![Python](https://img.shields.io/pypi/pyversions/brain-wiki)](https://pypi.org/project/brain-wiki/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/brain-wiki/brain-wiki/blob/main/LICENSE)

brain-wiki gives Claude Code, Codex and the ChatGPT desktop app, Antigravity,
OpenClaw, Cursor, and any MCP client one shared brain: a folder of Markdown
notes they search before answering, cite when they rely on it, and keep up to
date as they work. It runs on your machine, needs no server or API keys, and
the brain opens in Obsidian.

[Getting started](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/getting-started.md) ·
[Connecting agents](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/agents.md) ·
[User guide](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/README.md) ·
[Design](https://github.com/brain-wiki/brain-wiki/blob/main/docs/design/README.md) ·
[Changelog](https://github.com/brain-wiki/brain-wiki/blob/main/CHANGELOG.md)

## Why brain-wiki

- **Plain files you own.** A brain is a folder of Markdown notes you can
  read, edit, diff, back up, and sync like any other folder. Bring an
  existing Obsidian vault as it is.
- **Every agent, one brain.** What you teach one agent, the others know. A
  short instruction block tells each agent the brain is there, and a
  briefing gives it your standing rules and what the brain holds.
- **Answers that know what changed.** Notes connect through typed relations
  (`part_of`, `depends_on`, `conflicts_with`, `supersedes`, `related_to`).
  When a note has been replaced or contradicted, search returns the note
  that qualifies it together with it.
- **Safe changes.** Agents log what they learn to an inbox and fold it into
  notes through small validated operations. When they correct a note
  directly, `brain check` refuses lost or reworded facts before recording
  it. Every change is recorded, committed to git if the brain is a
  repository, and can be undone.
- **Your agent does the thinking.** Consolidation and harvesting run inside
  the agent you already use. brain-wiki makes no network calls of its own.

## Get started

brain-wiki needs Python 3.11 or newer with SQLite FTS5, which the python.org,
uv, Homebrew, and most Linux builds include, and [uv](https://docs.astral.sh/uv/).

**1. Add brain-wiki to your agent.**

| Agent | Install the plugin |
|---|---|
| Claude Code | `/plugin marketplace add brain-wiki/brain-wiki`, then `/plugin install brain-wiki@brain-wiki` |
| Codex / ChatGPT desktop | `codex plugin marketplace add brain-wiki/brain-wiki`, then enable brain-wiki in the plugin browser |
| Antigravity | `agy plugin install https://github.com/brain-wiki/brain-wiki` |
| OpenClaw, Cursor, other MCP clients | Install the command, then `brain connect openclaw`, `brain connect cursor`, or `brain connect generic --print` (see below) |

No plugin yet, or an agent not listed? Ask any agent that can run commands:

> Install brain-wiki with `uv tool install brain-wiki`, then run
> `brain setup --guide` and follow it.

**2. Ask your agent to set it up.**

> Set up brain-wiki.

The `brain-setup` skill (or the guide `brain setup --guide` prints, which
holds the same steps) explains each choice, lets you decide, and shows every
change before making it:

- where your brain lives (a new folder, or an Obsidian vault adopted in
  place) and whether to track it with git;
- which other agents on this machine to connect;
- what each agent may do: log what it learns and correct notes (on by
  default), consolidate the inbox, and propose rules that you confirm;
- whether to turn past sessions into episodes (harvest).

**3. Use it.**

> Remember that Lumen keeps attachments next to their notes, because
> Obsidian expects relative paths.

> What did we decide about attachments?

> Consolidate my brain.

### From a terminal

```sh
uv tool install brain-wiki      # or: pipx install brain-wiki
brain setup                     # step by step: create a brain, connect your agents, harvest
brain log "Lumen keeps attachments next to their notes; Obsidian expects relative paths."
brain search "attachments"
brain viz                       # a local 3D map of the brain
```

Or do the steps yourself: `brain doctor` (checks SQLite, your brains, and
the agents on this machine), `brain init ~/brains/personal --name personal
--git`, and `brain connect claude-code` (or codex, antigravity, openclaw,
cursor; try `--dry-run` first).

Keep brains outside your code repositories. Agents may log and correct
notes by default; `brain setup` asks whether each app may also consolidate
and propose rules, or grant it yourself:

```sh
brain agents grant claude-code consolidate propose_rules
```

Marketplace installs start the server with `uvx`. With the command
installed, `brain connect` starts it at once, and `--uninstall` reverses it.

## How it works

```text
 agents ──log · harvest────────────────────────► inbox/episodes/
  │  ▲                                                │
  │  │                                                │ consolidate, when you ask:
  │  │                                                │ your agent proposes ops,
  │  │                                                │ brain-wiki validates them
  │  │                                                ▼
  │  └── orient · search · read · neighbors ─── topics/**/*.md ◄── you, in Obsidian
  │      (with the notes that supersede or conflict)      ▲
  └── edit, then brain check ─────────────────────────────┘
```

- **Agents write in two ways.** They log what they learn as episodes in
  `inbox/episodes/`, and `brain harvest` adds more from their past
  sessions. To fix a note, such as a person's new role, an agent edits
  the file and runs `brain check`, which refuses deleted or reworded facts.
- **Consolidation runs in your agent, when you ask.** brain-wiki packages
  the pending episodes, your agent proposes small operations (add a claim,
  supersede one, link two notes, create a note), and brain-wiki validates
  and applies them, then moves the episodes to `archive/episodes/`.
  brain-wiki never consolidates on its own.
- **Every change is a run.** Consolidation and checked edits are locked,
  validated, logged in `log.md`, committed to git if the brain is a
  repository, and reversible with `brain undo`.
- **The brain** is a folder: `topics/` holds curated notes, one folder per
  topic and nested to any depth, each with a hub (`index.md`); `rules.md`
  holds standing rules that only you add; `AGENTS.md` tells agents that only
  read files how to use the brain.
- **The index** is a SQLite FTS5 database outside the brain, kept current
  as files change and rebuilt from the brain when it is missing.
- **Agents** connect through an MCP server with thirteen tools, a plugin
  with three skills, and an instruction block that tells them when to use
  the brain.

| Agent | Tools | Instructions | Harvest |
|---|---|---|---|
| Claude Code | yes | yes | yes |
| Codex / ChatGPT desktop | yes | yes | yes |
| Antigravity | yes | yes | yes |
| OpenClaw | yes | yes | no |
| Cursor | yes | yes | no |
| Any MCP client | yes | printed | no |

## Documentation

| Goal | Start here |
|---|---|
| Install and create a brain | [Getting started](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/getting-started.md) |
| Connect agents and harvest | [Agents](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/agents.md) |
| Consolidate, review, lint, and undo | [Maintenance](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/maintenance.md) |
| Bring an existing vault | [Import](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/import.md) |
| What agents may read and change | [Privacy and safety](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/privacy.md) |
| Commands, MCP tools, and files | [Reference](https://github.com/brain-wiki/brain-wiki/blob/main/docs/user/reference.md) |
| How it is built | [Design](https://github.com/brain-wiki/brain-wiki/blob/main/docs/design/README.md) · [Proposals](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposals/README.md) |

## Status

brain-wiki is alpha software at its first release. Its known limitations:

- There are no privacy levels inside a brain: every agent that may use a
  brain reads all of it. Keep separate parts of your life in separate brains.
- Maintenance runs when you ask your agent; there is no scheduler.
- Chat apps that need a remote MCP server (ChatGPT, claude.ai, the Gemini
  app) are not supported yet.

Plans for each are in [docs/proposals](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposals/README.md).

## Contributing

```sh
git clone https://github.com/brain-wiki/brain-wiki.git
cd brain-wiki
uv sync
uv run scripts/check.py         # everything CI runs
```

See
[CONTRIBUTING.md](https://github.com/brain-wiki/brain-wiki/blob/main/CONTRIBUTING.md).
The visualizer's source is in
[brain-wiki-viz](https://github.com/brain-wiki/brain-wiki-viz).

## Security

Report vulnerabilities privately, as described in
[SECURITY.md](https://github.com/brain-wiki/brain-wiki/blob/main/SECURITY.md).

## License

[Apache License 2.0](https://github.com/brain-wiki/brain-wiki/blob/main/LICENSE).
The bundled visualizer's third-party licenses are in
[THIRD_PARTY_NOTICES.txt](https://github.com/brain-wiki/brain-wiki/blob/main/src/brainwiki/viz/app/THIRD_PARTY_NOTICES.txt).
