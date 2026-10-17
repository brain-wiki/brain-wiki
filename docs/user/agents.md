# Agents

## Connect

```sh
brain connect <host> --dry-run    # show every change first
brain connect <host>              # claude-code, codex, antigravity, openclaw, cursor
brain connect generic             # a config snippet and instructions for any MCP client
brain connect <host> --uninstall  # undo it
```

`brain connect` writes a copy of the plugin for that agent app under
brain-wiki's data folder, pointing at your installed `brain` command, and
registers it with the app. It also gives the app short instructions. They
tell agents to call `brain_list` and `brain_orient` when a task may depend
on what you know, and how to explore and write. They go where the app reads
instructions in every session:

| App | Instructions |
|---|---|
| Claude Code | `~/.claude/rules/brain-wiki.md`, or `.claude/rules/` with `--scope project` |
| Codex and ChatGPT desktop | None written; Codex gets them from the MCP server |
| Antigravity | An always-on rule inside the plugin |
| OpenClaw | A block in `~/.openclaw/workspace/AGENTS.md` |
| Cursor | Printed for Settings → Rules; `.cursor/rules/brain-wiki.mdc` with `--scope project` |

- `brain connect codex --print` shows the instructions if you want a copy in
  your own `AGENTS.md`.
- A block in a shared file sits between `<!-- brain-wiki:begin v1 -->` and
  `<!-- brain-wiki:end -->`. `--uninstall` removes only that block.
- If you edit the block, `brain connect` does not overwrite it without
  `--force`.
- `--scope project` (Claude Code and Cursor) is separate from the user-level
  connection. Undo it with `brain connect <host> --scope project --uninstall`
  in that project.
- `--uninstall` puts a config file such as `~/.cursor/mcp.json` back as it
  was. If you changed the file since, it removes only brain-wiki's entry and
  keeps your changes.

The plugin is registered this way:

| App | How it is registered |
|---|---|
| Claude Code | `claude plugin marketplace add`, then `claude plugin install` |
| Codex and ChatGPT desktop | `codex plugin marketplace add`; then enable brain-wiki in the plugin browser |
| Antigravity | A link at `~/.gemini/config/plugins/brain-wiki` |
| OpenClaw | `openclaw plugins install --link` |
| Cursor | An entry in `~/.cursor/mcp.json`, or `.cursor/mcp.json` with `--scope project` |

When the app's command is not on your PATH, `brain connect` prints the steps
to do in the app instead.

You can also install the plugin from this repository's marketplace in
Claude Code or Codex, or with `agy plugin install` in Antigravity. Those
installs run brain-wiki through `uvx`, which can take a minute to start the
server in each new session on a slow network. With the command installed
(`uv tool install brain-wiki`), `brain connect` starts the server at once.

### Antigravity

- To skip the approval prompt for read tools, add them to
  `permissions.allow` in `~/.gemini/antigravity-cli/settings.json`:
  `"mcp(brain-wiki_brain-wiki/brain_search)"`,
  `"mcp(brain-wiki_brain-wiki/brain_read)"`,
  `"mcp(brain-wiki_brain-wiki/brain_orient)"`.
- Antigravity cannot show brain-wiki's confirmation form, so a rule an agent
  proposes waits for you. Run `brain review list`, then
  `brain review accept <id>`.

## What agents get

| Tool | Does |
|---|---|
| `brain_list` | Which brains this agent may use, what each holds, which is the default here |
| `brain_orient` | One brain's briefing: rules, contents, topics, recent changes, inbox, example queries |
| `brain_search` | Search, or browse with filters and `sort: recent` |
| `brain_read` | Read a note, hub, or episode, with the paths of its links and backlinks |
| `brain_neighbors` | Follow a note's links and backlinks, up to 3 hops |
| `brain_validate` | Check the frontmatter of notes the agent changed |
| `brain_log_episode` | Record a learning in the inbox when no note fits yet |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare`, `brain_consolidate_done` | Gather episodes, then archive them once the notes are edited |
| `brain_harvest_prepare`, `brain_harvest_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

- Search filters by type, tag, property, and date. A superseded hit comes
  with a warning and the note that replaced it.
- Agents fetch the briefing when they need it, as the instructions tell
  them.
- The plugin also ships three skills: `brain` for everyday use,
  `brain-setup`, and `brain-maintain`.

Which capability each tool needs is in the
[Reference](reference.md#mcp-tools).

## Direct edits

An agent whose profile includes `edit` writes knowledge into notes with its
own file tools. It updates a note (a person's new role, a wrong fact) or
creates one under `topics/<topic>/`, then runs `brain_validate` and fixes
what it reports. Orientation shows such an agent the frontmatter fields and
the suggested body shape.

- Agents never edit `rules.md`, `brain.toml`, `log.md`, `AGENTS.md`, or
  anything under `inbox/`, `archive/`, or `reports/`. `brain validate`
  reports an error for any of them it checks.
- Direct edits are not runs, so `brain undo` does not reverse them. In a git
  brain, `brain commit` or its scheduled job records them, and git reverts
  them. See [Maintenance](maintenance.md#commit-direct-edits). Without git
  there is no record of them.
- Your own edits in Obsidian or an editor work the same way.

## Which agent may do what

Each agent acts with a **profile** in `brain.toml`. Every agent reads the
whole brain. Every agent may log episodes, and by default it may edit
notes. Grant more per
agent app:

```sh
brain agents                                       # what each app may do
brain agents grant claude-code propose_rules --dry-run
brain agents grant claude-code propose_rules
brain agents revoke claude-code propose_rules
```

- Each change is a run that `brain undo` reverses. It applies from the
  agent's next tool call.
- When an agent asks for something its profile does not allow, brain-wiki
  refuses and names the `brain agents grant` command that allows it.

The capabilities, and how to limit which brains an agent may use, are in
[Privacy and safety](privacy.md).

## Harvest

Harvest reads your agents' own session history and turns finished sessions
into episodes. It is off until you turn it on, and it is the way to give a
new brain real history.

```sh
brain harvest enable claude-code codex   # or disable; also: antigravity
brain harvest --status           # per app: on or off, sessions not yet harvested
brain harvest                    # dry run: sessions, target brain, token estimate
brain harvest --apply            # distill with the configured preset
brain harvest --apply --raw      # no model: excerpts to distill when consolidating
```

- Harvest reads Claude Code, Codex, and Antigravity sessions.
- Inside an agent, "harvest my recent sessions" runs the same steps with the
  agent itself distilling. Run `brain agents grant claude-code harvest`
  first.
- On the command line, the model is `distill` in `[harvest]` of the user
  config, `~/.config/brain-wiki/config.toml`: `claude-code` (the default),
  `codex`, `antigravity`, `cursor`, `ollama`, or `raw`. `--distill PRESET`
  overrides it.

Each session goes to the brain of the folder it ran in. brain-wiki checks,
in order:

1. A `.brain-wiki.toml` with `brain = "NAME"` in the folder or above it.
2. The brain the folder is inside.
3. A pattern in `[harvest.routes]` that matches the folder.
4. The app's `brain` in `[hosts.<host>]`.

A session that matches none of these is skipped, never filed into your
default brain. With one brain, route everything under your home folder to
it:

```sh
brain harvest route "~/**" personal
brain harvest route "~/work/**" work     # more specific patterns are checked first
```

Routes are the fallback, so a project's own `.brain-wiki.toml` still wins
over a catch-all such as `~/**`.

Harvest also skips:

- sessions brain-wiki ran itself, subagent sessions, and headless sessions;
- sessions still in progress (changed in the last 60 minutes);
- sessions with fewer than 3 new turns from you.

Claude Code deletes transcripts after 30 days by default, so harvest at
least weekly.
