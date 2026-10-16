# D8: brain-wiki calls no model itself

Status: accepted.
Argued in: [write path](../design/write-path.md), [agent integrations §7](../design/agent-integrations.md#7-headless-presets).

brain-wiki has no model client and needs no API keys. Work that needs a model runs in one of two places:

- The host agent, through MCP tools, prompts, and skills. Consolidation and the in-agent harvest recipe work this way.
- A headless preset, which runs an agent CLI the user already has (Claude Code, Codex, Antigravity, Cursor, or Ollama) as a subprocess. `brain harvest --apply` uses one to distill sessions into episodes.

## Alternatives considered

- Built-in provider SDKs. Users would manage API keys, and brain-wiki would track every provider's API.
