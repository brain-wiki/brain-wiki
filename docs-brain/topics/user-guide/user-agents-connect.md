---
id: 01M3250V00VZ1F7Z6YH6132KHH
type: guide
title: "Connect"
tags: [user-guide]
source: "docs/user/agents.md#connect"
bw-part_of:
  - "[[user-agents]]"
---
# Connect

```sh
brain connect <host> --dry-run    # show every change first
brain connect <host>              # claude-code, codex, antigravity, openclaw, cursor
brain connect generic             # a config snippet and instructions for any MCP client
brain connect <host> --uninstall  # undo it
```

`brain connect` writes a copy of the plugin for that host under brain-wiki's
data folder, pointing at your installed `brain` command, and registers it.
It also gives the host short instructions, telling agents to call
`brain_list` and `brain_orient` when a task may depend on what you know, and
how to explore and write. They go where that host reads instructions in
every session:

| Host | Instructions |
|---|---|
| Claude Code | `~/.claude/rules/brain-wiki.md` (`.claude/rules/` with `--scope project`) |
| Codex / ChatGPT desktop | None written: Codex reads them from brain-wiki's MCP server (`brain connect codex --print` shows them if you want a copy in your own `AGENTS.md`) |
| Antigravity | An always-on rule inside the plugin |
| OpenClaw | A block in the workspace `AGENTS.md` |
| Cursor | Printed for Settings → Rules; `.cursor/rules/brain-wiki.mdc` with `--scope project` |

Blocks in shared files sit between `<!-- brain-wiki:begin v1 -->` and
`<!-- brain-wiki:end -->`; `--uninstall` removes only that block. If you edit
the block, `brain connect` will not overwrite it without `--force`.

`--scope project` (Claude Code and Cursor) is separate from the user-level
connection: undo it with `brain connect <host> --scope project --uninstall`
in that project. `--uninstall` puts a config file such as
`~/.cursor/mcp.json` back exactly as it was, unless you changed it since;
then it removes only brain-wiki's entry and keeps your changes.

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

## Subsections
- [[user-agents-antigravity-notes]]: Antigravity notes
