---
id: 01M3250V00MXM7XDNCSRSTBY3Z
type: design
title: "Outputs"
aliases: ["08 §5.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#52-outputs"
---
# Outputs

| Event | Claude Code / Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` with up to 3 recalled notes and their guards (≤ 600 tokens), only above a score threshold | — |
| `tool_used` | nothing (records session taint in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session; otherwise nothing | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing; raw capture runs as an async hook so it never eats the host's short session-end budget | — |

Injected text is wrapped in markers
(`<brain-wiki-context>` … `</brain-wiki-context>`) so capture can strip it
([[05-33-invariants|05 §3.3]]).

## Relations
- part_of [[08-5-hooks]]
