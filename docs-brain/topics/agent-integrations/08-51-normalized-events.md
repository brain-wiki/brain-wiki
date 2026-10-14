---
id: 01M3250V004EABFCCZSMTV4QZ8
type: design
title: "Normalized events"
aliases: ["08 §5.1"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#51-normalized-events"
bw-part_of:
  - "[[08-5-hooks]]"
---
# Normalized events

| Normalized | Claude Code | Codex | Antigravity | OpenClaw (accepted; nothing installs it) |
|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `agent:bootstrap` |
| `prompt` (recall; wired by hand) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | — |
| `tool_used` (taint) | `PostToolUse` | `PostToolUse` | `PostToolUse` | — |
| `stop` | `Stop` | `Stop` | `Stop` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `command:reset` |

Event names for Codex are taken from its documentation's statement that
plugin hooks share Claude Code's event schema; confirmed by host fixtures
in M7.
