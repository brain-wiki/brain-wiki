# Agents

## Connect

```sh
brain connect <host> --dry-run    # show every change first
brain connect <host>              # claude-code, codex, antigravity, openclaw, cursor
brain connect generic             # a config snippet and instructions for any MCP client
brain connect <host> --uninstall  # undo it
```

`brain connect` writes a copy of the plugin for that host under brain-wiki's
data folder, pointing at your installed `brain` command, and registers it.
It also writes a short instruction block into the file the host loads in
every session, telling agents to call `brain_list` and `brain_orient` when a
task may depend on what you know, and how to explore and write:

| Host | Instructions |
|---|---|
| Claude Code | `~/.claude/rules/brain-wiki.md` (`.claude/rules/` with `--scope project`) |
| Codex / ChatGPT desktop | A block in `~/.codex/AGENTS.md`, or in `AGENTS.override.md` if you use one |
| Antigravity | An always-on rule inside the plugin |
| OpenClaw | A block in the workspace `AGENTS.md` |
| Cursor | Printed for Settings → Rules; `.cursor/rules/brain-wiki.mdc` with `--scope project` |

Blocks in shared files sit between `<!-- brain-wiki:begin v1 -->` and
`<!-- brain-wiki:end -->`; `--uninstall` removes only that block. If you edit
the block, `brain connect` will not overwrite it without `--force`.

The plugin is registered this way:

| Host | How it is registered |
|---|---|
| Claude Code | A local marketplace, then the plugin is installed from it |
| Codex / ChatGPT desktop | A local marketplace; enable brain-wiki in the plugin browser |
| Antigravity | A link in `~/.gemini/config/plugins/brain-wiki/` |
| OpenClaw | `openclaw plugins install --link` |
| Cursor | An entry in `~/.cursor/mcp.json` (`--scope project` for `.cursor/mcp.json`) |

You can also install the plugin straight from this repository's
marketplace in Claude Code or Codex, or with `agy plugin install` in
Antigravity; those installs run brain-wiki through `uvx`, which can take a
minute to start the server in each new session on a slow network. With
the command installed (`uv tool install brain-wiki`), `brain connect`
starts it at once.

### Antigravity notes

- To skip the approval prompt for read tools, add them to
  `permissions.allow` in `~/.gemini/antigravity-cli/settings.json`:
  `"mcp(brain-wiki_brain-wiki/brain_search)"`,
  `"mcp(brain-wiki_brain-wiki/brain_read)"`,
  `"mcp(brain-wiki_brain-wiki/brain_orient)"`.
- Antigravity cannot show brain-wiki's confirmation form, so a rule an
  agent proposes waits for you: `brain rule list`, then
  `brain rule accept <id>`.

## What agents get

| Tool | Does |
|---|---|
| `brain_list` | Which brains this agent may use, what each holds, which is the default here |
| `brain_orient` | One brain's briefing: rules, what it holds, topics, recent changes, inbox, example queries |
| `brain_search` | Search, or browse with filters (type, tag, property, date) and `sort: recent`; warnings when a hit is superseded or contradicted |
| `brain_read` | Read a note, hub, or episode, with the path of every related note |
| `brain_neighbors` | Follow a note's relations: what a release shipped, what depends on a decision |
| `brain_check` | Validate and record notes the agent edited directly (needs `edit`) |
| `brain_log_episode` | Record durable learnings in the inbox |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare` / `_apply` | Fold the inbox into notes |
| `brain_harvest_prepare` / `_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

Agents fetch the briefing when they need it, guided by the instruction
block. To inject it at the start of every session instead, connect with
`--briefing-hook` (Claude Code, Codex, Antigravity). The plugin also ships
three skills: `brain` (everyday use), `brain-setup`, and `brain-maintain`.

## Direct edits

An agent whose profile includes `edit` may correct a note directly (a
person's new role, a wrong fact) and then run `brain_check`. The check
compares the file with the note's last recorded version and refuses deleted
or reworded claims (claims change only by superseding), protected files,
and large removals. A clean check is recorded as a run, so
`brain undo` reverses it; claims the agent added are marked unverified.
Per topic, `agent_edits = "review"` sends agent edits to you
(`brain review accept`), and `"deny"` refuses them.

Your own edits in Obsidian or an editor are never blocked. `brain check`
lists notes that differ from their recorded version, `brain check --adopt
PATH` records one as yours (with an undo point), and `brain restore PATH`
puts a note back.

## Which agent may do what

Each agent acts with a **profile** in `brain.toml`. Every agent reads the
whole brain; by default it may log episodes and correct notes it checks with
`brain check`. Grant more per host:

```toml
[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "consolidate", "harvest"]
read_origin = true
```

See [Privacy and safety](privacy.md).

## Capture (off by default)

Capture saves what you learn in a session as it ends.

```toml
# ~/.config/brain-wiki/config.toml
[capture]
enabled = true
hosts = ["claude-code"]
mode = "prompted"   # prompted: the agent is asked once to log an episode; raw: a transcript excerpt
min_turns = 5
```

Then reconnect with capture hooks: `brain connect claude-code --capture`.

## Harvest (off by default)

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is the way to give a new brain real history.

```toml
[harvest]
enabled = true
hosts = ["claude-code", "codex", "antigravity"]
```

```sh
brain harvest --status           # per host: sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with your configured agent CLI
brain harvest --apply --raw      # no model: excerpts that consolidation distills later
```

Inside an agent, "harvest my recent sessions" runs the same steps with the
agent itself doing the distilling (the host's profile needs `harvest`).
Sessions are routed to the brain their working directory belongs to; a
session that belongs to no brain is skipped, never filed into your default
brain. Claude Code deletes transcripts after 30 days by default, so harvest
at least weekly.
