---
id: 01M3250V00YSMXHNDNAEWT873M
type: proposal
title: "Host hooks: briefing, capture, and recall"
source: "docs/proposal/hooks.md"
---
# Host hooks: briefing, capture, and recall

Status: built during development and removed before 0.1. Not scheduled;
bring it back only after the checks in §3.

Today agents learn about brain-wiki from the static instruction block and
fetch the briefing with `brain_orient`
([[agent-integrations-3-the-plugin-bundle|agent integrations §3.2]],
[[d25-static-instructions|D25]]). They record what they learn
with `brain_log_episode`, and `brain harvest` turns past sessions into
episodes afterwards
([[write-path-22-harvesting-sessions|write path §2.2]]). This
proposal records what host lifecycle hooks added on top.


## 1. What was built

One entry point, `brain hook <host|auto> <event>`, read the host's JSON
payload on stdin and wrote the JSON the host expects on stdout.
`brain connect <host>` installed hooks only on request, with the absolute
path of the installed `brain`:

| Option | Hooks | Did |
|---|---|---|
| `--briefing-hook` | `SessionStart` (Claude Code, Codex), `PreInvocation` (Antigravity) | Injected the briefing at session start |
| `--capture` | `PostToolUse`, `Stop`, `PreCompact`, `SessionEnd` | Tracked external inputs, asked for learnings at stop, wrote raw episodes at compaction and session end |
| By hand | `UserPromptSubmit` with `[recall] on_prompt = true` | Injected up to three matching notes on each prompt |

- The briefing (rules, topics, recent changes) meant the agent did not
  need to call `brain_orient`.
- Capture marked sessions that ran untrusted tools as having external
  inputs, and asked the agent once at stop to log durable learnings.
- Recall included each note's supersession warnings.


### 1.1 Events

| Normalized | Claude Code | Codex | Antigravity | OpenClaw (accepted; nothing installed it) |
|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `agent:bootstrap` |
| `prompt` (recall) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | — |
| `tool_used` (inputs) | `PostToolUse` | `PostToolUse` | `PostToolUse` | — |
| `stop` | `Stop` | `Stop` | `Stop` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `command:reset` |


### 1.2 Outputs

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


### 1.3 Capture

```toml
# user config.toml
[capture]
enabled = true
hosts   = ["claude-code", "antigravity"]
mode    = "prompted"            # prompted | raw | both
min_turns = 5                   # prompted: only ask after this many turns
untrusted_tools = []            # extra tool-name patterns that count as external inputs
trusted_mcp_servers = ["brain-wiki"]
```

| Mode | How | Cost |
|---|---|---|
| `prompted` | At the first `stop` after `min_turns`, the hook asked the agent once to call `brain_log_episode` with durable learnings, or do nothing | One short extra turn per session |
| `raw` | At `pre_compact` and `session_end` (and `stop` for Antigravity), the hook wrote the transcript since the last capture point as one episode with `bw-captured: hook` | No model call; consolidation distills |

- The `prompted` mode asked through the host's "continue with reason"
  output.
- Capture points and inputs were kept per session in
  `<state>/sessions/<host>/<id>.json`.
- `BRAIN_WIKI_INTERNAL=1`, set for brain-wiki's own headless runs, made
  every hook exit at once. The variable no longer exists. Harvest now skips
  brain-wiki's own runs by their working folder under the state folder.


### 1.4 Inputs from hooks

`PostToolUse` marked a session as having external inputs when an untrusted
tool ran: web fetch and search, MCP servers not in `trusted_mcp_servers`, or
network shell commands. `brain_log_episode` and `brain_propose_rule` took
the host's session id. Episodes from such a session got
`bw-inputs: external`, and such a session could not propose rules.


### 1.5 Rules for every hook

- Never break the host. Internal errors were logged, and the hook exited 0
  with an empty, valid output.
- Be fast: about 0.1 s with the installed `brain` (300 ms budget), no
  network, no model calls, and no import of the MCP SDK. `uvx` took 23 s
  per call behind a slow package index (T-10), so marketplace copies
  shipped no hooks.
- Print only protocol JSON on stdout.
- Never interpolate payload content into a shell command.


## 2. Why it was removed

- The briefing hook duplicated the instruction block. The block tells
  agents to call `brain_orient` before work that may depend on the brain,
  which delivers the same briefing. The only loss is that `rules.md` is not
  in context in a session where the agent never orients.
- Capture duplicated harvest. Harvest reads the same transcripts later with
  the same readers, skip rules, and dedupe keys, and the instruction block
  already tells agents to log as they go.
- Hooks were the least tested part. Only Antigravity's hooks ran on a real
  host (T-1, T-9). Claude Code and Codex hooks were built from their
  documentation and tested with synthetic payloads.
- Codex skips plugin hooks until the user trusts them in `/hooks`. The
  ChatGPT desktop app runs them only for plugins installed by hand.
- Input tracking had gaps. The `PostToolUse` matcher
  (`WebFetch|WebSearch|mcp__.*`) never saw shell commands, which Claude Code
  and Codex report as `Bash`. Codex's hosted web search does not reach tool
  hooks at all.

Without hooks, an episode written through MCP records `bw-inputs: unknown`,
which is never trusted, and every rule still needs the user's confirmation.


## 3. Before bringing it back

1. Run each hook on the real host (Claude Code, Codex, Antigravity) and keep
   the recorded payloads as fixtures.
2. Decide how users trust hooks where the host requires it (Codex
   `/hooks`), and say so in `brain connect` output.
3. Fix input coverage: include shell tools in the matcher, or derive inputs
   from the transcript at write time, which also covers tools hooks cannot
   see.
4. Add an OpenClaw hook pack (`HOOK.md` plus a small handler running
   `brain hook openclaw <event>`) and Cursor's own hook events
   (`sessionStart`, `stop`, `preCompact`, `sessionEnd`).
