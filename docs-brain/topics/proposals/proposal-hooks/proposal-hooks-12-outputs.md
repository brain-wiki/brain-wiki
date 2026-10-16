---
id: 01M3250V00033J2E3BV6ZDRTB1
type: proposal
title: "Outputs"
aliases: ["Host hooks: briefing, capture, and recall §1.2"]
source: "docs/proposal/hooks.md#12-outputs"
---
# Outputs

| Event | Claude Code and Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` with up to 3 notes (see below) | — |
| `tool_used` | Nothing; records the session's inputs in state | `{}` |
| `stop` | `{"decision": "block", "reason": "<capture instruction>"}`, at most once per session | `{"decision": "continue", "reason": "…"}`, likewise |
| `pre_compact`, `session_end` | Nothing; raw capture ran as an async hook | — |

- Recall listed up to 3 notes scoring at least `[recall] min_score`
  (default 0.3), each with up to 3 supersession warnings, cut to 2,400
  characters.
- Raw capture ran asynchronously so it never used up the host's short
  session-end budget: 1 s in Codex, and 1.5 s shared in Claude Code.
- Injected text was wrapped in `<brain-wiki-context>` markers, so capture
  and the session readers could strip it. The session readers no longer
  strip these markers. Bringing hooks back means restoring that.
