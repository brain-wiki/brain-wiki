---
id: 01M3250V00CZVCDSACAH522D9D
type: decision
title: "D25: Static instructions, not session hooks"
aliases: ["D25"]
source: "docs/decision/d25-static-instructions.md"
---
# D25: Static instructions, not session hooks

Status: accepted.
Argued in: [[agent-integrations-32-the-static-instruction-block|agent integrations §3.2]].

Agents learn about brains from static instructions. `brain connect` puts them where each host reads them: a rule file, a block in `AGENTS.md`, or, for Codex, the MCP server's own instructions. They tell the agent to call `brain_list` and `brain_orient` when a task may depend on the user's knowledge. No session-start hook delivers a briefing ([[proposal-hooks|hooks proposal]]).

### Alternatives considered

- A session-start hook as the main path. Several hosts have no such event.
