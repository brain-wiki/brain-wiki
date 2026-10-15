# Codex (CLI and ChatGPT desktop)

How brain-wiki integrates with Codex: the Codex CLI and Codex in the
ChatGPT desktop app. The cross-host mechanics are in
[08](../08-agent-integrations.md).

| Surface | How brain-wiki uses it |
|---|---|
| Install | `codex plugin marketplace add brain-wiki/brain-wiki`, then enable brain-wiki in the plugin browser; or `brain connect codex` |
| `brain connect` | Adds the materialized copy as a local marketplace (`codex plugin marketplace add <dir>`); without `codex` on `PATH`, prints the folder to add |
| MCP server | The portable `plugin.json` and `mcp.json` (Agent Plugins 1.0); `extensions["com.openai"]` supplies display metadata |
| Instructions | The MCP server's `instructions` field; no instruction file is written (§1) |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Rule confirmation | Elicitation support is not tested (T-8); without it, rules wait for `brain rules accept` |
| Harvest | JSONL rollout files in `$CODEX_HOME/sessions/` (default `~/.codex/sessions/`) and `archived_sessions/` |
| Headless preset | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file>` ([08 §7](../08-agent-integrations.md#7-headless-presets)) |

## 1. Instructions come from the MCP server

Codex reads the `instructions` field an MCP server returns during
initialization and uses it as guidance alongside the server's tools; its
documentation asks servers to keep the first 512 characters self-contained
([Codex MCP docs](https://learn.chatgpt.com/docs/extend/mcp)).
brain-wiki's server instructions are the static policy
([08 §3.2](../08-agent-integrations.md#32-the-static-instruction-block))
without the skill pointer. Its first bullet, which says to call
`brain_list` and `brain_orient` before work that may depend on the brain,
ends within those 512 characters, and a test keeps it there.

`brain connect codex` therefore writes no instruction file:

- **Codex reads exactly one global file**: `$CODEX_HOME/AGENTS.override.md`
  if it is non-empty, else `AGENTS.md`
  ([Codex AGENTS.md docs](https://learn.chatgpt.com/docs/agent-configuration/agents-md)).
  An override replaces `AGENTS.md` instead of adding to it, and users create
  and delete overrides as temporary swaps, so a block in either file can
  disappear without notice.
- **That file is often managed elsewhere**: a symlink into a dotfiles
  repository, or a file a script regenerates. Writing through the symlink
  puts brain-wiki's block into the user's dotfiles; a regeneration erases it.
- **A repository's `AGENTS.md` is shared with its team**, so project scope
  is no alternative.

Users who want the policy in their own instruction file can copy it from
`brain connect codex --print`.

## Notes

- Codex rewrites tool names to `[A-Za-z0-9_]`; brain-wiki's are snake case
  already.
- Codex reports web search as a hosted tool. The session reader treats a
  rollout's `web_search_call` items as untrusted, like web fetches.

## Verification

| Item | Status |
|---|---|
| The server instructions reach the model (T-15) | Open |
| Which marketplace file `codex plugin marketplace add` reads (T-7) | Open |
| Rollout line schema, session-to-file mapping, subagent marks (T-6) | Open; the reader is tested on synthetic rollouts |
| Elicitation for `brain_propose_rule` (T-8) | Not tested |
