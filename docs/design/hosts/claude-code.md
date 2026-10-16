# Claude Code

How brain-wiki works with Claude Code. The mechanics shared by all hosts
are in [agent integrations](../agent-integrations.md).

| Part | Claude Code |
|---|---|
| Install | `/plugin marketplace add brain-wiki/brain-wiki`, then `/plugin install brain-wiki@brain-wiki`; or `brain connect claude-code` |
| MCP server | `.mcp.json` |
| Instructions | `~/.claude/rules/brain-wiki.md`, or `.claude/rules/brain-wiki.md` with `--scope project` |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Harvest | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` |
| Memory import | `~/.claude/projects/*/memory/*.md` and `~/.claude/CLAUDE.md` ([import §6](../import.md#6-to-episodes-and-from-agents)) |
| Headless preset | `claude --bare -p --output-format json` ([agent integrations §7](../agent-integrations.md#7-headless-presets)) |

## Notes

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

## Verification

| Item | Status |
|---|---|
| Plugin loads; MCP tools listed and callable | By hand before a release |
| Elicitation for `brain_propose_rule` (T-8) | Not tested |
| Transcript format across versions (T-11) | Open; the reader is tested on synthetic sessions |
