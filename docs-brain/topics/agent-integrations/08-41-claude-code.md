---
id: 01M3250V00VY0FZ2WJJW3ZX24F
type: design
title: "Claude Code"
aliases: ["08 §4.1"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#41-claude-code"
bw-part_of:
  - "[[08-4-per-host-notes]]"
---
# Claude Code

- Install from this repository as a marketplace, or with
  `brain connect claude-code`. The plugin contributes the skill, the MCP
  server, and hooks.
- MCP tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`
  (well within limits). Tool descriptions and server instructions are
  truncated past 2,048 characters, so the important sentence comes first.
- Tool results are capped (25k tokens by default). Search and read stay
  well below; the consolidation packet sets
  `_meta["anthropic/maxResultSizeChars"]` and is budgeted at 15k tokens.
- `brain_propose_rule` carries `_meta["anthropic/requiresUserInteraction"]`
  so the user approves each call.
- Instructions: `~/.claude/rules/brain-wiki.md` (§3.2). Optional hooks: §5.
  Claude Code caps each `additionalContext` string at 10,000 characters; the
  briefing stays under 6,000. All `SessionEnd`
  hooks share a 1.5-second budget, so capture hooks run with `async: true`.
  The `Stop` payload includes `stop_hook_active` and
  `last_assistant_message`; its "block with reason" output is how prompted
  capture asks the agent to log an episode (§6.2).
- The headless preset uses `claude -p` with JSON output (§7).
