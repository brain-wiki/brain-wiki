# Agents

## Connect

```sh
brain connect <host> --dry-run    # show every change first
brain connect <host>              # claude-code, codex, antigravity, openclaw, cursor
brain connect generic --print     # a config snippet for any MCP client
brain connect <host> --uninstall  # restore what was there
```

`brain connect` writes a copy of the plugin for that host under brain-wiki's
data folder, pointing at your installed `brain` command, and registers it:

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
- A `/schedule` made in the CLI (`agy`) stops when that session exits.

## What agents get

| Tool | Does |
|---|---|
| `brain_orient` | Your rules, topics, recent changes, inbox status |
| `brain_search` | Search, with warnings when a hit is superseded or contradicted |
| `brain_read` | Read a note, hub, or episode |
| `brain_log_episode` | Record durable learnings in the inbox |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare` / `_apply` | Fold the inbox into notes |
| `brain_harvest_prepare` / `_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

Agents get orientation at the start of a session through a hook (Claude
Code, Codex, Antigravity). The plugin also ships three skills: `brain`
(everyday use), `brain-setup`, and `brain-maintain`.

## Which agent may do what

Each agent acts with a **profile** in `brain.toml`. By default an agent may
read notes up to the `default` privacy level and write episodes, nothing
more. Grant more per host:

```toml
[agents.claude-code]
max_privacy = "sensitive"
write = ["episodes", "propose_rules", "consolidate", "harvest"]
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

## Scheduled routines

```sh
brain schedule show brain-maintenance --for claude-code   # fields for the desktop app's routines
brain schedule show brain-harvest --for antigravity       # a /schedule line to run in the brain folder
brain schedule install brain-maintenance --for openclaw --apply
brain schedule install brain-maintenance --via cron --apply   # or launchd, systemd
brain schedule remove brain-maintenance
```

Routines: `brain-maintenance` (daily: harvest, then consolidate when at
least 5 episodes are pending), `brain-harvest` (daily, harvest only, for
your other agents), `brain-health` (weekly, read-only summary). Set
`[consolidate] device = "<this machine>"` in `brain.toml` so consolidation
runs on one machine only.
