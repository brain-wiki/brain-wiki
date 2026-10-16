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

Agents learn about brains from static instructions that `brain connect` puts where each host reads them (a rule file, an `AGENTS.md` block, or, for Codex, the MCP server's own instructions); they tell them to call `brain_list` and `brain_orient` when a task may depend on the user's knowledge. No session-start hook delivers the briefing ([[proposal-hooks|proposal]]).

### Alternatives considered

A session-start hook as the main path (several hosts have no such event)
