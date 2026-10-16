# D25: Static instructions, not session hooks

Status: accepted.
Argued in: [agent integrations §3.2](../design/agent-integrations.md#32-the-static-instruction-block).

Agents learn about brains from static instructions that `brain connect` puts where each host reads them (a rule file, an `AGENTS.md` block, or, for Codex, the MCP server's own instructions); they tell them to call `brain_list` and `brain_orient` when a task may depend on the user's knowledge. No session-start hook delivers the briefing ([proposal](../proposal/hooks.md)).

## Alternatives considered

A session-start hook as the main path (several hosts have no such event)
