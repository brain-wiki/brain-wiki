# D14: The repo root is the plugin root

Status: accepted.
Argued in: [agent integrations](../design/agent-integrations.md).

The repository root is also the plugin root for every host: it holds each host's manifest, the MCP entries, the skills, and the rules. `brain connect` wires a host to a local install instead. The plugin has no host lifecycle hooks ([hooks proposal](../proposal/hooks.md)).

## Alternatives considered

- A separate repository per host.
- The plugin in a subdirectory.
