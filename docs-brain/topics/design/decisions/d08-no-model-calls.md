---
id: 01M3250V00CCV75DSHMGWJTW3S
type: decision
title: "D8: brain-wiki calls no model itself"
aliases: ["D8"]
source: "docs/decision/d08-no-model-calls.md"
---
# D8: brain-wiki calls no model itself

Status: accepted.
Argued in: [[write-path|write path]], [[agent-integrations-7-unattended-agent-mode|agent integrations §7]].

brain-wiki has no model client and needs no API keys. Work that needs a model runs in one of two places:

- The host agent, through MCP tools, prompts, and skills. Consolidation, harvest, and import work this way.
- An agent CLI the user already has, started as a subprocess the way a person would run it. Scheduled consolidation starts one unattended (`brain consolidate --run`); until harvest began filing notes ([[d36-harvest-into-notes|D36]]), `brain harvest --apply` ran one with tools off to distill sessions.

### Alternatives considered

- Built-in provider SDKs. Users would manage API keys, and brain-wiki would track every provider's API.

## Related
- [[d36-harvest-into-notes]]: D36: Harvest and import file into notes, not episodes
