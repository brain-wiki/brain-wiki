# D23: Plugin MCP entries stay plain uvx

Status: accepted.
Argued in: [agent integrations §3](../design/agent-integrations.md#3-the-plugin-bundle).

The plugin's MCP entry is a plain `uvx --from brain-wiki==<version> brain mcp` command, which works on every platform. Behind a slow package index the first start is slow, and that is accepted. `brain connect` is the fast path: it points the host at the installed `brain` command.

## Alternatives considered

- Wrapping the entry in `sh -c` to try the installed command and an offline `uvx` first. It breaks on Windows.
