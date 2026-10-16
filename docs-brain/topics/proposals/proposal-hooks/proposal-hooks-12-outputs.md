---
id: 01M3250V00033J2E3BV6ZDRTB1
type: proposal
title: "Outputs"
aliases: ["Host hooks: briefing, capture, and recall §1.2"]
source: "docs/proposal/hooks.md#12-outputs"
---
# Outputs

| Event | Claude Code / Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` listing up to 3 notes scoring at least `[recall] min_score` (default 0.3), each with up to 3 guards, cut to 2,400 characters | — |
| `tool_used` | nothing (records the session's inputs in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing; raw capture ran as an async hook so it never ate the host's short session-end budget (1 s in Codex, 1.5 s shared in Claude Code) | — |

Injected text was wrapped in `<brain-wiki-context>` markers so capture and
the session readers could strip it; bringing hooks back means restoring that
stripping in the session readers.
