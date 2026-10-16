---
id: 01M3250V00GHAY0MA0P7WA5X6Z
type: design
title: "Notes (Claude Code)"
tags: [agents]
source: "docs/design/agents/claude-code.md#notes"
---
# Notes (Claude Code)

- Tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`,
  well within Claude Code's limits. Tool descriptions and server
  instructions are cut past 2,048 characters, so the important sentence
  comes first.
- Tool results are capped at 25k tokens by default. Search and read stay
  well below; the consolidation packet sets
  `_meta["anthropic/maxResultSizeChars"]` and is budgeted at 15k tokens.
- Claude Code strips HTML comments before loading instructions, so the
  block's markers cost no tokens.
- The transcript format is documented as internal and changes between
  versions. Entries carry `cwd`, `gitBranch`, `sessionId`, and
  `isSidechain` (subagents). The folder moves with `CLAUDE_CONFIG_DIR`.
  Transcripts are deleted after 30 days by default (`cleanupPeriodDays`),
  so harvest at least weekly or raise that setting.
