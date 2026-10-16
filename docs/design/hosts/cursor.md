# Cursor and other MCP clients

How brain-wiki integrates with Cursor, and with any other MCP client. The
cross-host mechanics are in [agent integrations](../agent-integrations.md).

| Surface | How brain-wiki uses it |
|---|---|
| Install | Cursor loads the repository's Agent Plugins bundle (`plugin.json`, `mcp.json`, `skills/`); or `brain connect cursor` |
| `brain connect` | Adds the server to `~/.cursor/mcp.json` (`.cursor/mcp.json` with `--scope project`) |
| MCP server | `mcp.json`; `brain connect` writes the installed `brain` with `--host cursor` |
| Instructions | Cursor keeps user rules in its settings, so `brain connect` prints the block for Settings → Rules; with `--scope project` it writes `.cursor/rules/brain-wiki.mdc` with `alwaysApply: true` |
| Skills | From the bundle |
| Harvest | Not yet: no session reader |
| Headless preset | `agent -p --output-format json`, never `--force`, so file changes are only proposed ([agent integrations §7](../agent-integrations.md#7-headless-presets)) |

## Notes

- Cursor does not expand the Agent Plugins `${PLUGIN_ROOT}` variables (it
  has its own), which does not matter because brain-wiki's MCP entry uses
  none.

## Other MCP clients

`brain connect generic --print` prints a stdio server entry (`command`,
`args`) to paste into the client's MCP configuration, and the instruction
block to add wherever the client reads instructions in every session.
Clients that pass MCP server instructions to the model get the same policy
without it. A client whose reported name contains `opencode` is
recorded as that host id
([agent integrations §2](../agent-integrations.md#2-host-ids)).
