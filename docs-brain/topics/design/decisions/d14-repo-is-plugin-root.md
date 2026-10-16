---
id: 01M3250V00H3X4RD1F4QYGZ2H7
type: decision
title: "D14: The repo root is the plugin root"
aliases: ["D14"]
source: "docs/decision/d14-repo-is-plugin-root.md"
---
# D14: The repo root is the plugin root

Status: accepted.
Argued in: [[agent-integrations|agent integrations]].

The repository root is also the plugin root for every host: it holds each host's manifest, the MCP entries, the skills, and the rules. `brain connect` wires a host to a local install instead. The plugin has no host lifecycle hooks ([[proposal-hooks|hooks proposal]]).

### Alternatives considered

- A separate repository per host.
- The plugin in a subdirectory.
