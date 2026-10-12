# brain-wiki

<!-- mcp-name: io.github.brain-wiki/brain-wiki -->

A local-first brain for you and your AI agents, kept as plain Markdown that
you own. A brain serves two uses, alone or together:

- **Your second brain, as context for agents.** Notes you write or already
  keep (an Obsidian vault, project notes) become context every agent can
  search and cite. Your words stay authoritative.
- **Your agents' own memory of the world.** What agents learn while working
  (how a codebase behaves, what a decision was, which API changed) is
  captured, checked, and consolidated into notes they recall later, with
  every claim traced to where it came from.

brain-wiki gives every agent you use (Claude Code, Codex and the ChatGPT
desktop app, Antigravity, OpenClaw, Cursor, and any MCP client) one shared,
durable brain:

- **Plain files.** A brain is a folder of Markdown notes you can read, edit,
  diff, and sync like any other folder. It opens in Obsidian.
- **Typed connections.** Notes relate through a small set of verbs
  (`part_of`, `depends_on`, `conflicts_with`, `supersedes`, `related_to`).
  When a note is superseded or contradicted, search returns the note that
  qualifies it together with it.
- **Safe writes.** Agents append raw observations to an inbox. Consolidation
  folds them into curated notes through small, validated operations. Every
  change is recorded and can be undone.
- **Your agents do the thinking.** Consolidation and harvesting run inside
  the agent you already use, or headless through its CLI. No API keys.

```
 agents ──log──► inbox/episodes ──consolidate (validated ops)──► topics/<topic>/*.md
   ▲                                                                    │
   └──────── orient · search · read (with supersede/conflict warnings) ─┘
```

## Status

Pre-release (0.1.0.dev). The design is in [`docs/design/`](docs/design/);
the user guide is in [`docs/user/`](docs/user/).

## Install

brain-wiki needs Python 3.11+ with SQLite FTS5 (python.org, uv, and most
distribution builds include it).

```sh
uv tool install brain-wiki        # or: pipx install brain-wiki
brain doctor                      # checks Python, SQLite, brains, and agents
```

Until the first release is on PyPI, install from a checkout:
`uv tool install --from . brain-wiki`.

## Quick start

```sh
brain init ~/brains/personal --name personal      # create a brain (registered as the default)
brain connect claude-code --dry-run               # see what connecting would change
brain connect claude-code                         # or codex, antigravity, openclaw, cursor
brain log "Decided to keep attachments next to notes; Obsidian expects relative paths."
brain search "attachments"
```

Or ask your agent: "set up brain-wiki". The `brain-setup` skill walks
through the same steps, showing a dry run before every change.

Then, from any connected agent:

- the agent gets an orientation at the start of a session (your rules,
  topics, recent changes);
- it searches the brain before answering about past decisions;
- it records what it learns with `brain_log_episode`;
- "consolidate my brain" folds the inbox into notes.

## Commands at a glance

| Task | Command |
|---|---|
| Create, adopt, list brains | `brain init`, `brain import PATH --overlay`, `brain brains` |
| Read | `brain orient`, `brain search`, `brain read` |
| Write | `brain log`, `brain rule add` |
| Curate | `brain consolidate`, `brain review`, `brain mv`, `brain undo` |
| Check | `brain lint [--fix]`, `brain report`, `brain doctor` |
| Agents | `brain connect`, `brain harvest`, `brain schedule`, `brain mcp` |
| See it | `brain viz` (a local 3D map of the brain) |

Every command takes `--json`, and every command that changes files has a
dry run.

## Documentation

- [User guide](docs/user/README.md): getting started, agents, maintenance,
  import, privacy.
- [Design](docs/design/README.md): format, index, write path, lint, MCP and
  CLI, host integrations, security, bench.
- [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) ·
  [Changelog](CHANGELOG.md)

## License

Apache License 2.0. See [LICENSE](LICENSE).
