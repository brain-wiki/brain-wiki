---
id: 01M3250V00CCV75DSHMGWJTW3S
type: decision
title: "D8: brain-wiki calls no model itself"
aliases: ["D8"]
source: "docs/decision/d08-no-model-calls.md"
---
# D8: brain-wiki calls no model itself

Status: accepted.
Argued in: [[write-path|write path]], [[agent-integrations-7-headless-presets|agent integrations §7]].

brain-wiki has no model client and needs no API keys. Work that needs a model runs in one of two places:

- The host agent, through MCP tools, prompts, and skills. Consolidation and the in-agent harvest recipe work this way.
- A headless preset, which runs an agent CLI the user already has (Claude Code, Codex, Antigravity, Cursor, or Ollama) as a subprocess. `brain harvest --apply` uses one to distill sessions into episodes.

### Alternatives considered

- Built-in provider SDKs. Users would manage API keys, and brain-wiki would track every provider's API.
