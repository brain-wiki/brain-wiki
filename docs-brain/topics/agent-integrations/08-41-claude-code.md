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
  `brain connect claude-code`. The plugin contributes the skills and the
  MCP server.
- MCP tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`
  (well within limits). Tool descriptions and server instructions are
  truncated past 2,048 characters, so the important sentence comes first.
- Tool results are capped (25k tokens by default). Search and read stay
  well below; the consolidation packet sets
  `_meta["anthropic/maxResultSizeChars"]` and is budgeted at 15k tokens.
- `brain_propose_rule` carries `_meta["anthropic/requiresUserInteraction"]`
  so the user approves each call.
- Instructions: `~/.claude/rules/brain-wiki.md` (§3.2).
- The headless preset uses `claude -p` with JSON output (§7).
