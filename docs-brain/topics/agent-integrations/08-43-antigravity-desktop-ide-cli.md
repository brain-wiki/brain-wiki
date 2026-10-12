---
id: 01M3250V00BY17J0S1XG84FS29
type: design
title: "Antigravity (desktop, IDE, CLI)"
aliases: ["08 §4.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#43-antigravity-desktop-ide-cli"
---
# Antigravity (desktop, IDE, CLI)

- Install with `agy plugin install https://github.com/<owner>/brain-wiki`
  (repository root only), by placing the plugin in
  `~/.gemini/config/plugins/brain-wiki/` (desktop and IDE), or with
  `brain connect antigravity`.
- There is no session-start event. The `PreInvocation` hook returns
  orientation as an ephemeral message only when `invocationNum == 0`, and
  returns `{}` on later calls. It still runs before every model call (24
  times in one observed turn), and hooks run one after another, so a slow
  or hung hook delays each call by up to its timeout; ephemeral messages
  are cut at about 49 KB.
- Hooks run through a shell with the plugin folder as working directory,
  stdin closed after the payload, the host's environment inherited, and
  `ANTIGRAVITY_CONVERSATION_ID` set; no plugin-root variable is set (T-2).
  The payload's `workspacePaths[0]` is the project, used to choose the
  brain.
- `PostToolUse` records taint for the conversation when an untrusted tool
  ran (§6.3); its payload carries `toolCall {name, args}`. Every MCP call
  arrives as `call_mcp_tool` with `ServerName`, which readers and hooks
  rename to `mcp_<server>_<tool>` before the taint rules. `Stop` performs
  capture (§6).
- Plugin rules load: an `always_on` plugin rule reached the model. The
  plugin-root `AGENTS.md` does not (T-4). The rule file carries the static
  instruction block (§3.2) with `trigger: always_on`.
- MCP tools default to "Ask". A plugin's server is named
  `<plugin>_<server>`, so allow rules read
  `mcp(brain-wiki_brain-wiki/brain_search)`. The user guide shows how.
- The CLI declares MCP elicitation (`form` and `url`) but declines every
  request without showing the user, so the server treats a client named
  `antigravity…` as having no confirmation channel: `brain_propose_rule`
  saves a proposal for `brain rule accept` (T-8).
- The plugin's MCP server starts through online `uvx`, which took 45 to 120
  seconds in interactive sessions behind a slow index; until it is ready
  the agent has no brain tools. `brain connect antigravity` (installed
  `brain`) avoids the wait.

## Relations
- part_of [[08-4-per-host-notes]]
