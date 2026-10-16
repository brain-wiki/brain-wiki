# Codex (CLI and ChatGPT desktop)

How brain-wiki works with Codex: the Codex CLI and Codex in the ChatGPT
desktop app. The mechanics shared by all hosts are in
[agent integrations](../agent-integrations.md).

| Part | Codex |
|---|---|
| Install | `codex plugin marketplace add brain-wiki/brain-wiki`, then enable brain-wiki in the plugin browser; or `brain connect codex` |
| MCP server | `plugin.json` and `mcp.json` (Agent Plugins 1.0) |
| Instructions | The MCP server's `instructions` field; no file is written (§1) |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Rule confirmation | Elicitation when Codex offers it (not tested, T-8); otherwise a proposal |
| Harvest | `rollout-*.jsonl` files under `$CODEX_HOME/sessions/` and `archived_sessions/` (default `~/.codex/`) |
| Memory import | `$CODEX_HOME/memories/**/*.md` and `$CODEX_HOME/AGENTS.md` ([import §6](../import.md#6-to-episodes-and-from-agents)) |
| Headless preset | `codex exec - --json --ephemeral --skip-git-repo-check --sandbox read-only -o <file>` ([agent integrations §7](../agent-integrations.md#7-headless-presets)) |

## 1. Instructions come from the MCP server

Codex reads the `instructions` field an MCP server returns at
initialization and uses it as guidance alongside the server's tools. Its
documentation asks servers to keep the first 512 characters
self-contained ([Codex MCP docs](https://learn.chatgpt.com/docs/extend/mcp)).
brain-wiki's server instructions are the instruction block
([agent integrations §3.2](../agent-integrations.md#32-the-static-instruction-block))
without the skill pointer. Its first bullet, which says to call
`brain_list` and `brain_orient` before work that may depend on the brain,
ends within those 512 characters, and a test keeps it there.

`brain connect codex` therefore writes no instruction file:

- Codex reads exactly one global file: `$CODEX_HOME/AGENTS.override.md` if
  it is not empty, else `AGENTS.md`
  ([Codex AGENTS.md docs](https://learn.chatgpt.com/docs/agent-configuration/agents-md)).
  An override replaces `AGENTS.md` instead of adding to it, and users
  create and delete overrides as temporary swaps, so a block in either file
  can disappear without notice.
- That file is often managed elsewhere: a symlink into a dotfiles
  repository, or a file a script regenerates. Writing through the symlink
  puts brain-wiki's block into the user's dotfiles, and a regeneration
  erases it.
- A repository's `AGENTS.md` is shared with its team, so project scope is
  no alternative. `brain connect codex` has no project scope.

Users who want the policy in their own instruction file can copy it from
`brain connect codex --print`.

## Notes

- `brain connect codex` runs `codex plugin marketplace add <dir>` on its
  plugin copy, and the user then enables brain-wiki in Codex's plugin
  browser. Without `codex` on `PATH`, it prints the folder to add. The copy
  runs the installed `brain` with `--host codex`.
- A marketplace install runs `--host auto`. The server recognizes Codex by
  its client name, or by `PLUGIN_ROOT` and `CLAUDE_PLUGIN_ROOT` both being
  set.
- `extensions["com.openai"]` in `plugin.json` supplies the display name,
  descriptions, category, default prompts, and `brain-setup` as the
  onboarding skill.
- Codex rewrites tool names to `[A-Za-z0-9_]`. brain-wiki's are snake case
  already.
- Codex reports web search as a hosted tool. The reader treats a rollout's
  `web_search_call` items as untrusted, like web fetches.
- The reader treats a session with a parent thread, or a subagent source,
  as a subagent, and a session whose source is `exec` as headless.

## Verification

| Item | Status |
|---|---|
| The server instructions reach the model (T-15) | Open |
| Which marketplace file `codex plugin marketplace add` reads (T-7) | Open |
| Rollout line schema, session-to-file mapping, subagent marks (T-6) | Open; the reader is tested on synthetic rollouts |
| Elicitation for `brain_propose_rule` (T-8) | Not tested |
