---
id: 01M3250V00FC627BHSS1YN4CYC
type: proposal
title: "Events"
aliases: ["Host hooks: briefing, capture, and recall §1.1"]
source: "docs/proposal/hooks.md#11-events"
---
# Events

| Normalized | Claude Code | Codex | Antigravity | OpenClaw (accepted; nothing installed it) |
|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `agent:bootstrap` |
| `prompt` (recall) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | — |
| `tool_used` (inputs) | `PostToolUse` | `PostToolUse` | `PostToolUse` | — |
| `stop` | `Stop` | `Stop` | `Stop` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `command:reset` |
