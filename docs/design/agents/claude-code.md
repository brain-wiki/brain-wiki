# Claude Code

How brain-wiki integrates with Claude Code. The cross-host mechanics (the
plugin bundle, the instruction block, harvest, `brain connect`) are in
[08](../08-agent-integrations.md).

| Surface | How brain-wiki uses it |
|---|---|
| Install | This repository as a plugin marketplace (`/plugin marketplace add brain-wiki/brain-wiki`, then `/plugin install brain-wiki@brain-wiki`), or `brain connect claude-code` |
| `brain connect` | Adds the materialized copy as the local marketplace `brain-wiki-local` and installs the plugin from it with the `claude` CLI; without `claude` on `PATH`, prints the two slash commands |
| MCP server | `.mcp.json`. Marketplace installs run `uvx --from brain-wiki==<version> brain mcp --host auto`; `brain connect` writes the installed `brain` with `--host claude-code` |
| Instructions | brain-wiki's own file, `~/.claude/rules/brain-wiki.md` (`.claude/rules/brain-wiki.md` with `--scope project`), which Claude Code loads in every session; also the MCP server instructions |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Rule confirmation | `brain_propose_rule` carries `_meta["anthropic/requiresUserInteraction"]`, so the user approves each call; elicitation support is not tested (T-8) |
| Harvest | `~/.claude/projects/<working-dir slug>/<session-id>.jsonl` |
| Headless preset | `claude --bare -p --output-format json` ([08 §7](../08-agent-integrations.md#7-headless-presets)) |

## Notes

- Tool names appear as `mcp__plugin_brain-wiki_brain-wiki__brain_search`,
  well within Claude Code's limits. Tool descriptions and server
  instructions are cut past 2,048 characters, so the important sentence
  comes first.
- Tool results are capped at 25k tokens by default. Search and read stay
  well below; `brain_consolidate_prepare` and `brain_harvest_prepare` set
  `_meta["anthropic/maxResultSizeChars"]`, and the consolidation packet is
  budgeted at 15k tokens.
- Claude Code strips HTML comments before loading instructions, so the
  block's markers cost no tokens.
- The transcript format is documented as internal and changes between
  versions. Entries carry `cwd`, `gitBranch`, `sessionId`, and
  `isSidechain` (subagents). The folder moves with `CLAUDE_CONFIG_DIR`.
  Transcripts are deleted after 30 days by default (`cleanupPeriodDays`),
  so harvest at least weekly or raise that setting.

## Verification

| Item | Status |
|---|---|
| Plugin loads; MCP tools listed and callable | By hand before a release |
| Elicitation for `brain_propose_rule` (T-8) | Not tested |
| Transcript format across versions (T-11) | Open; the reader is tested on synthetic sessions |
