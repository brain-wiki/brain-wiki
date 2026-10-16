# Cursor and other MCP clients

How brain-wiki works with Cursor and with any other MCP client. The
mechanics shared by all hosts are in
[agent integrations](../agent-integrations.md).

| Part | Cursor |
|---|---|
| Install | The repository's Agent Plugins bundle (`plugin.json`, `mcp.json`, `skills/`); or `brain connect cursor` |
| MCP server | `mcp.json` in the bundle; `brain connect` edits `~/.cursor/mcp.json`, or `.cursor/mcp.json` with `--scope project` |
| Instructions | Printed for Settings → Rules; `.cursor/rules/brain-wiki.mdc` with `--scope project` |
| Skills | From the bundle only |
| Harvest | None: no session reader |
| Headless preset | `agent -p --output-format json` ([agent integrations §7](../agent-integrations.md#7-headless-presets)) |

## Notes

- `brain connect cursor` adds a `brain-wiki` server, running the installed
  `brain` with `--host cursor`, to Cursor's MCP config. A config that is
  not plain JSON is refused with a `format` error.
- `brain connect cursor` registers no skills. The skills reach Cursor only
  when it loads the bundle.
- Cursor keeps user rules in its settings, so user-scope `connect` prints
  the block to paste. With `--scope project`, it writes
  `.cursor/rules/brain-wiki.mdc` with `alwaysApply: true`.
- Cursor does not expand the Agent Plugins `${PLUGIN_ROOT}` variables (it
  has its own). brain-wiki's MCP entry uses none.
- The headless preset never passes `--force`, so file changes are only
  proposed.

## Other MCP clients

`brain connect generic` (with or without `--print`) prints a stdio server
entry (`type`, `command`, `args`) to paste into the client's MCP
configuration, and the instruction block to add wherever the client reads
instructions in every session. Clients that pass MCP server instructions
to the model get the same policy without it. A client whose reported name
contains `opencode` is recorded as that host id
([agent integrations §2](../agent-integrations.md#2-host-ids)).
