---
id: 01M3250V00VZ1F7Z6YH6132KHH
type: guide
title: "Connect"
source: "docs/user/agents.md#connect"
---
# Connect

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

## Subsections
- [[user-agents-antigravity]]: Antigravity
