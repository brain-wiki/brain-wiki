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

The repo root is also the plugin root for every host; `brain connect` wires local installs; no host lifecycle hooks in v0.1 ([[proposal-hooks|proposal]]).

### Alternatives considered

Separate repos per host; plugin in a subdirectory
