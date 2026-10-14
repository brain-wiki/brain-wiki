---
id: 01M3250V00MXM7XDNCSRSTBY3Z
type: design
title: "Outputs"
aliases: ["08 §5.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#52-outputs"
bw-part_of:
  - "[[08-5-hooks]]"
---
# Outputs

| Event | Claude Code / Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | With `[recall] on_prompt = true` and a prompt of at least three words: `additionalContext` listing up to 3 notes scoring at least `[recall] min_score` (default 0.3), each with up to 3 guards, cut to 2,400 characters; otherwise nothing | — |
| `tool_used` | nothing (records session taint in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session; otherwise nothing | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing; raw capture runs as an async hook so it never eats the host's short session-end budget | — |

Injected text is wrapped in markers
(`<brain-wiki-context>` … `</brain-wiki-context>`) so capture can strip it
([[05-33-invariants|05 §3.3]]).
