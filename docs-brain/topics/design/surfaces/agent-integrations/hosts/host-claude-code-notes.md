---
id: 01M3250V007Y4TCKWBY51C1FEK
type: design
title: "Notes (Claude Code)"
source: "docs/design/hosts/claude-code.md#notes"
---
# Notes (Claude Code)

- `brain connect claude-code` adds its plugin copy as the local
  marketplace `brain-wiki-local` and installs the plugin from it with
  `claude plugin install --scope <scope>`. Without `claude` on `PATH`, it
  prints the two slash commands instead.
- A marketplace install runs
  `uvx --from brain-wiki==<version> brain mcp --host auto`, and the server
  recognizes Claude Code by its client name or environment. `brain connect`
  writes the installed `brain` with `--host claude-code`.
- The instruction file belongs to brain-wiki: `connect` writes the whole
  file, with the block markers, and Claude Code loads it in every session.
  The MCP server instructions carry the same policy.
- Tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`,
  within Claude Code's limits. Tool descriptions and server instructions
  are cut past 2,048 characters, so the important sentence comes first.
- Tool results are capped at 25k tokens by default. Search and read stay
  well below. `brain_consolidate_prepare` and `brain_harvest_prepare` set
  `_meta["anthropic/maxResultSizeChars"]`, and their packets are budgeted
  at about 15k tokens.
- `brain_propose_rule` carries `_meta["anthropic/requiresUserInteraction"]`,
  so the user approves each call. The server asks for confirmation through
  elicitation when the client offers it; whether Claude Code does is not
  tested (T-8).
- Claude Code strips HTML comments before loading instructions, so the
  block's markers cost no tokens.
- The transcript format is documented as internal and changes between
  versions. Entries carry `cwd`, `gitBranch`, `sessionId`, and
  `isSidechain`. The reader treats sidechain sessions, and sessions under a
  `subagents` folder, as subagents, and SDK entry points (`sdk-cli`,
  `sdk-py`, `sdk-ts`) as headless.
- The session folder and the memory files move with `CLAUDE_CONFIG_DIR`.
- Claude Code deletes transcripts after 30 days by default
  (`cleanupPeriodDays`), so harvest at least weekly or raise that setting.
