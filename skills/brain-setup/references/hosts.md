# Agent apps: connecting and permissions

`brain connect HOST` writes a copy of the plugin for that app, pointing at
the installed `brain` command, registers it the way the app expects, and
writes a short instruction block into the file the app loads in every
session, so agents know to call `brain_list` and `brain_orient`. Always run
it with `--dry-run` first. Every change is recorded with backups, so
`brain connect HOST --uninstall` undoes it, removing only brain-wiki's block
from shared instruction files.

Options: `--brain NAME` (pin this app to one brain), `--scope user|project`,
`--print` (show the MCP entry and the instruction block without changing
anything), `--force` (replace an instruction block the user edited).

Host ids: `claude-code`, `codex`, `antigravity`, `openclaw`, `cursor`,
`generic`.

| App | Tools | Instructions | Harvest |
|---|---|---|---|
| Claude Code | yes | `~/.claude/rules/brain-wiki.md` | yes |
| Codex / ChatGPT desktop | yes | from the MCP server; no file is written | yes |
| Antigravity | yes | always-on plugin rule | yes |
| OpenClaw | yes | block in the workspace `AGENTS.md` | not yet |
| Cursor | yes | printed for Settings → Rules; `.cursor/rules/` with `--scope project` | not yet |
| Other MCP apps | yes | printed by `--print` | no |

## Claude Code

- **Connect:** install from the brain-wiki plugin marketplace, or
  `brain connect claude-code`, which adds a local marketplace and installs
  the plugin from it.
- **Check:** in a new session, `/mcp` lists the `brain-wiki` server.
- **Permissions:** plugin tools are named
  `mcp__plugin_brain-wiki_brain-wiki__<tool>`. To stop prompts for the read
  tools, add `mcp__plugin_brain-wiki_brain-wiki__brain_search` (and
  `…__brain_list`, `…__brain_orient`, `…__brain_read`, `…__brain_neighbors`)
  to `permissions.allow` in the user's
  settings, or choose "always allow" when asked. `brain_propose_rule` always
  asks the user; that is intended.
- **Session history:** Claude Code deletes transcripts after 30 days by
  default, so harvest at least weekly.

## Codex (CLI and ChatGPT desktop)

- **Connect:** add the brain-wiki repository as a plugin marketplace and
  install the plugin, or `brain connect codex`, which runs
  `codex plugin marketplace add` on the local copy.
- **Permissions:** approval per tool is set in `~/.codex/config.toml` under
  `[plugins."brain-wiki".mcp_servers.brain-wiki.tools.<tool>]` with
  `approval_mode = "approve"`. Offer this for the read tools only.

## Antigravity (desktop, IDE, CLI)

- **Connect:** `agy plugin install <brain-wiki repository URL>`, or
  `brain connect antigravity`, which links the plugin into
  `~/.gemini/config/plugins/brain-wiki/`.
- **Permissions:** MCP tools ask by default. A plugin's server is named
  `<plugin>_<server>`, so allow the read tools with
  `mcp(brain-wiki_brain-wiki/brain_search)`,
  `mcp(brain-wiki_brain-wiki/brain_read)`, and
  `mcp(brain-wiki_brain-wiki/brain_orient)` under `permissions.allow` in the
  settings file (CLI: `~/.gemini/antigravity-cli/settings.json`).
- **Rules:** the Antigravity CLI declares MCP forms but declines them
  without showing the user, so `brain_propose_rule` saves a proposal in
  every Antigravity surface; the user accepts it with
  `brain rule accept <id>`.
- **MCP start-up:** the plugin starts the server through `uvx`, which checks
  the package index first and can take a minute on a slow network. If the
  tools are missing early in a session, install the command
  (`uv tool install brain-wiki`) and run `brain connect antigravity`.

## OpenClaw

- **Connect:** `openclaw plugins install brain-wiki --marketplace <repository>`,
  or `brain connect openclaw`, which runs `openclaw plugins install --link`
  on the local copy. Skills and tools work; harvest is not available yet.

## Cursor

- **Connect:** Cursor loads the brain-wiki plugin bundle, or
  `brain connect cursor` adds the server to Cursor's MCP config.

## Other MCP apps

`brain connect generic` prints a server entry (`command`, `args`) to paste
into the app's MCP settings, and the instruction block to add wherever the
app keeps instructions it loads in every session.
