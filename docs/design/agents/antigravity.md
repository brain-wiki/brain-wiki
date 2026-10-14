# Antigravity (desktop, IDE, CLI)

How brain-wiki integrates with Antigravity: the desktop app, the IDE, and
the `agy` CLI. The cross-host mechanics are in
[08](../08-agent-integrations.md). Everything below was verified with
`agy` 1.3.3.

| Surface | How brain-wiki uses it |
|---|---|
| Install | `agy plugin install https://github.com/brain-wiki/brain-wiki` (repository root only), the plugin folder copied into `~/.gemini/config/plugins/brain-wiki/`, or `brain connect antigravity` |
| `brain connect` | Links the materialized copy into `~/.gemini/config/plugins/brain-wiki/` |
| MCP server | `mcp_config.json` (no `type` field in this format), `--host antigravity` |
| Instructions | The plugin's `rules/brain-wiki.md` with `trigger: always_on`; no user file is edited |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Rule confirmation | None: `brain_propose_rule` saves a proposal for `brain rule accept` |
| Harvest | `<app dir>/brain/<conversation-id>/.system_generated/logs/`, where the app dir is the desktop, IDE, or CLI data folder under `~/.gemini/` |
| Headless preset | `agy --input-format stream-json --output-format stream-json --effort medium` ([08 §7](../08-agent-integrations.md#7-headless-presets)) |

## Notes

- `agy` accepts the full Agent Plugins `plugin.json`, although its published
  schema lists only `name` and `description`, and loads the plugin's
  skills, MCP server, and rules (T-1).
- An `always_on` plugin rule reaches the model; a plugin-root `AGENTS.md`
  does not (T-4).
- No plugin-root variable is set for plugin commands (T-2), so the MCP
  entry uses none.
- MCP tools default to "Ask". A plugin's server is named
  `<plugin>_<server>`, so allow rules read
  `mcp(brain-wiki_brain-wiki/brain_search)`; the user guide shows how.
- The CLI declares MCP elicitation (`form` and `url`) but declines every
  request without showing the user, so the server treats a client named
  `antigravity…` as having no confirmation channel (T-8).
- The marketplace copy starts the MCP server through online `uvx`, which
  took 45 to 120 seconds in interactive sessions behind a slow package
  index (T-10); until it is ready the agent has no brain tools.
  `brain connect antigravity` writes the installed `brain` and avoids the
  wait.
- Session logs hold `transcript.jsonl`, which cuts long steps to about
  4 KB, and `transcript_full.jsonl`, which keeps them; the reader prefers
  the full one. The working directory comes from the app's
  `conversation_summaries.db`, which the CLI also writes since 1.3. Every
  MCP call appears as `call_mcp_tool` with `ServerName`; the reader renames
  it to `mcp_<server>_<tool>` before the untrusted-tool rules (T-3).
- Headless runs cannot drop tools, and a denied tool call ends the turn
  with no output, so the preset's prompt starts by saying not to use tools
  (T-5). `--json-schema` drops undeclared fields, so the preset relies on
  the prompt and the validator.

## Verification

| Item | Status |
|---|---|
| Full `plugin.json` accepted; skills, MCP tools, and rules load (T-1) | Verified |
| Plugin-root variables and plugin command environment (T-2) | Verified: none set |
| Transcript line schema (T-3) | Verified for structure |
| `always_on` rule reaches the model; plugin `AGENTS.md` does not (T-4) | Verified |
| Headless runs restricted to no tools (T-5) | Not possible; prompt preamble instead |
| Elicitation (T-8) | Declared, then declined without showing the user |
