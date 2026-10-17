# Antigravity (desktop, IDE, CLI)

How brain-wiki works with Antigravity: the desktop app, the IDE, and the
`agy` CLI. The mechanics shared by all hosts are in
[agent integrations](../agent-integrations.md). The behavior below was
verified with `agy` 1.3.3.

| Part | Antigravity |
|---|---|
| Install | `agy plugin install https://github.com/brain-wiki/brain-wiki` (repository root only), the plugin folder copied to `~/.gemini/config/plugins/brain-wiki/`, or `brain connect antigravity` |
| MCP server | `mcp_config.json`, `--host antigravity` |
| Instructions | The plugin's `rules/brain-wiki.md`, `trigger: always_on` |
| Skills | `brain`, `brain-setup`, `brain-maintain` from the plugin |
| Rule confirmation | None; `brain_propose_rule` saves a proposal |
| Harvest | `<app dir>/brain/<conversation-id>/.system_generated/logs/` |
| Memory files | `~/.gemini/AGENTS.md`, `~/.gemini/GEMINI.md`, `~/.gemini/config/rules/*.md`, which the agent files into notes when asked to import them ([import §6](../import.md#6-documents-and-memory-files)) |
| Unattended mode | Not built; headless runs deny tools that need approval (T-5) ([agent integrations §7](../agent-integrations.md#7-unattended-agent-mode)) |

## Notes

- `brain connect antigravity` symlinks
  `~/.gemini/config/plugins/brain-wiki` to its plugin copy. It edits no
  user file, and it has no project scope.
- `mcp_config.json` has no `type` field, because Antigravity's format has
  none.
- `agy` accepts the full Agent Plugins `plugin.json`, although its
  published schema lists only `name` and `description`, and loads the
  plugin's skills, MCP server, and rules (T-1).
- An `always_on` plugin rule reaches the model. A plugin-root `AGENTS.md`
  does not (T-4).
- No plugin-root variable is set for plugin commands (T-2), so the MCP
  entry uses none.
- MCP tools default to "Ask". A plugin's server is named
  `<plugin>_<server>`, so allow rules read
  `mcp(brain-wiki_brain-wiki/brain_search)`. The user guide shows how.
- The CLI declares MCP elicitation (`form` and `url`) but declines every
  request without showing the user. The server therefore treats a client
  whose name contains `antigravity` as having no way to confirm, and saves
  rules as proposals for `brain rules accept` (T-8).
- A marketplace install starts the MCP server through online `uvx`, which
  took 45 to 120 seconds in interactive sessions behind a slow package
  index (T-10). Until it is ready the agent has no brain tools.
  `brain connect antigravity` writes the installed `brain` and avoids the
  wait.
- The reader looks in every `~/.gemini/antigravity*` folder: the desktop
  app, the IDE, and the CLI each keep their own.
- Session logs hold `transcript.jsonl`, which cuts long steps to about
  4 KB, and `transcript_full.jsonl`, which keeps them up to about 49 KB.
  The reader prefers the full one.
- The working directory and subagent marks come from the app's
  `conversation_summaries.db`, which the CLI also writes since 1.3.
- Every MCP call appears as `call_mcp_tool` with `ServerName`. The reader
  renames it to `mcp_<server>_<tool>` before the untrusted-tool rules
  (T-3).
- Headless runs cannot drop tools, and a denied tool call ends the turn
  with no output, so the preset's prompt starts by saying not to use tools
  (T-5). `--json-schema` drops undeclared fields, so the preset never
  passes a schema.

## Verification

| Item | Status |
|---|---|
| Full `plugin.json` accepted; skills, MCP tools, and rules load (T-1) | Verified |
| Plugin-root variables and plugin command environment (T-2) | Verified: none set |
| Transcript line schema (T-3) | Verified for structure |
| `always_on` rule reaches the model; plugin `AGENTS.md` does not (T-4) | Verified |
| Headless runs restricted to no tools (T-5) | Not possible; prompt preamble instead |
| Elicitation (T-8) | Declared, then declined without showing the user |
