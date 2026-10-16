# D14: The repo root is the plugin root

Status: accepted.
Argued in: [agent integrations](../design/agent-integrations.md).

The repo root is also the plugin root for every host; `brain connect` wires local installs; no host lifecycle hooks in v0.1 ([proposal](../proposal/hooks.md)).

## Alternatives considered

Separate repos per host; plugin in a subdirectory
