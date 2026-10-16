---
id: 01M3250V0089A920T0HRVX658N
type: proposal
title: "What was built (Host hooks: briefing, capture, and recall)"
aliases: ["Host hooks: briefing, capture, and recall §1"]
source: "docs/proposal/hooks.md#1-what-was-built"
---
# What was built (Host hooks: briefing, capture, and recall)

One entry point, `brain hook <host|auto> <event>`, read the host's JSON
payload on stdin and wrote the host's expected JSON on stdout. `brain connect
<host>` installed hooks only on request, with the absolute path of the
installed `brain`:

| Option | Hooks | Did |
|---|---|---|
| `--briefing-hook` | `SessionStart` (Claude Code, Codex), `PreInvocation` (Antigravity) | Injected the briefing (rules, topics, recent changes) at session start, so the agent did not need to call `brain_orient` |
| `--capture` | `PostToolUse`, `Stop`, `PreCompact`, `SessionEnd` | Marked sessions that ran untrusted tools as having external inputs; asked the agent once at stop to log durable learnings; wrote raw transcript episodes at compaction and session end |
| by hand | `UserPromptSubmit` with `[recall] on_prompt = true` | Injected up to three matching notes, with their guards, on each prompt |

## Subsections
- [[proposal-hooks-11-events]]: Events
- [[proposal-hooks-12-outputs]]: Outputs
- [[proposal-hooks-13-capture]]: Capture
- [[proposal-hooks-14-inputs-from-hooks]]: Inputs from hooks
- [[proposal-hooks-15-rules-for-every-hook]]: Rules for every hook
