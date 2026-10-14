# Host hooks: briefing, capture, and recall

Status: built during development and removed before 0.1. Not scheduled;
bring it back only after the checks in §3.

Agents today learn about the brains from the static instruction block and
fetch the briefing with `brain_orient`
([08 §3.2](../design/08-agent-integrations.md#32-the-static-instruction-block)).
They record what they learn with `brain_log_episode`, and `brain harvest`
turns past sessions into episodes afterwards
([05 §2.2](../design/05-write-path-and-consolidation.md#22-harvesting-sessions)).
This proposal is what host lifecycle hooks added on top.

## 1. What was built

One entry point, `brain hook <host|auto> <event>`, read the host's JSON
payload on stdin and wrote the host's expected JSON on stdout. `brain connect
<host>` installed hooks only on request, with the absolute path of the
installed `brain`:

| Option | Hooks | Did |
|---|---|---|
| `--briefing-hook` | `SessionStart` (Claude Code, Codex), `PreInvocation` (Antigravity) | Injected the briefing (rules, topics, recent changes) at session start, so the agent did not need to call `brain_orient` |
| `--capture` | `PostToolUse`, `Stop`, `PreCompact`, `SessionEnd` | Marked sessions that ran untrusted tools as tainted; asked the agent once at stop to log durable learnings; wrote raw transcript episodes at compaction and session end |
| by hand | `UserPromptSubmit` with `[recall] on_prompt = true` | Injected up to three matching notes, with their guards, on each prompt |

### 1.1 Events

| Normalized | Claude Code | Codex | Antigravity | OpenClaw (accepted; nothing installed it) |
|---|---|---|---|---|
| `session_start` | `SessionStart` | `SessionStart` | `PreInvocation` with `invocationNum == 0` | `agent:bootstrap` |
| `prompt` (recall) | `UserPromptSubmit` | `UserPromptSubmit` | — (no prompt text exposed) | — |
| `tool_used` (taint) | `PostToolUse` | `PostToolUse` | `PostToolUse` | — |
| `stop` | `Stop` | `Stop` | `Stop` | — |
| `pre_compact` | `PreCompact` | `PreCompact` | — | `session:compact:before` |
| `session_end` | `SessionEnd` | `SessionEnd` | — | `command:reset` |

### 1.2 Outputs

| Event | Claude Code / Codex | Antigravity |
|---|---|---|
| `session_start` | `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<orientation>"}}` | `{"injectSteps": [{"ephemeralMessage": "<orientation>"}]}` |
| `prompt` | `additionalContext` listing up to 3 notes scoring at least `[recall] min_score` (default 0.3), each with up to 3 guards, cut to 2,400 characters | — |
| `tool_used` | nothing (records session taint in state) | `{}` |
| `stop` | prompted capture: `{"decision": "block", "reason": "<capture instruction>"}` at most once per session | `{"decision": "continue", "reason": "…"}` likewise |
| `pre_compact`, `session_end` | nothing; raw capture ran as an async hook so it never ate the host's short session-end budget (1 s in Codex, 1.5 s shared in Claude Code) | — |

Injected text was wrapped in `<brain-wiki-context>` markers so capture and
the session readers could strip it.

### 1.3 Capture

```toml
# user config.toml
[capture]
enabled = true
hosts   = ["claude-code", "antigravity"]
mode    = "prompted"            # prompted | raw | both
min_turns = 5                   # prompted: only ask after this many turns
untrusted_tools = []            # extra tool-name patterns that taint a session
trusted_mcp_servers = ["brain-wiki"]
```

| Mode | How | Cost |
|---|---|---|
| `prompted` | At the first `stop` after `min_turns`, the hook asked the agent once, through the host's "continue with reason" output, to call `brain_log_episode` with durable learnings, or to do nothing | One short extra turn per session |
| `raw` | At `pre_compact` and `session_end` (and `stop` for Antigravity), the hook read the transcript since the last capture point and wrote one episode with `bw-captured: hook` | No model call; consolidation distills |

Capture points and taint were kept per session in
`<state>/sessions/<host>/<id>.json`. `BRAIN_WIKI_INTERNAL=1`, set for
brain-wiki's own headless runs, made every hook exit at once.

### 1.4 Taint from hooks

`PostToolUse` marked a session tainted when an untrusted tool ran (web
fetch and search, MCP servers not in `trusted_mcp_servers`, network shell
commands). `brain_log_episode` and `brain_propose_rule` took the host's
session id: episodes from a tainted session got `bw-taint: true`, and a
tainted session could not propose rules.

### 1.5 Rules for every hook

- Never break the host: internal errors were logged and the hook exited 0
  with an empty, valid output.
- Fast: about 0.1 s with the installed `brain` (300 ms budget), no network,
  no model calls, and never importing the MCP SDK. Online `uvx` took 23 s
  per call behind a slow package index (T-10), so marketplace copies shipped
  no hooks.
- Quiet: only protocol JSON on stdout.
- No shell interpolation of payload content.

## 2. Why it was removed

- **The briefing hook duplicated the instruction block.** The block tells
  agents to call `brain_orient` before work that may depend on the brain,
  which delivers the same briefing. The only loss is that `rules.md` is not
  in context in a session where the agent never orients.
- **Capture duplicated harvest.** Harvest reads the same transcripts after
  the fact with the same readers, skip rules, and dedupe keys, and the
  instruction block already tells agents to log as they go.
- **It was the least verified surface.** Only Antigravity's hooks ran on a
  real host (T-1, T-9). Claude Code and Codex hooks were built from their
  documentation and tested with synthetic payloads.
- **Codex skips plugin hooks until the user trusts them in `/hooks`**, and in
  the ChatGPT desktop app runs them only for manually installed plugins.
- **Taint had gaps.** The `PostToolUse` matcher (`WebFetch|WebSearch|mcp__.*`)
  never saw shell commands, which Claude Code and Codex report as `Bash`, and
  Codex's hosted web search does not reach tool hooks at all.

Without hooks, MCP writes are recorded with `bw-taint: unknown`, which is
never trusted, and every rule still needs the user's confirmation.

## 3. Before bringing it back

1. Run each hook on the real host (Claude Code, Codex, Antigravity) and keep
   the recorded payloads as fixtures.
2. Decide how users trust hooks where the host requires it (Codex `/hooks`),
   and say so in `brain connect` output.
3. Fix taint coverage: include shell tools in the matcher, or derive taint
   from the transcript at write time, which also covers tools hooks cannot
   see.
4. OpenClaw hook pack (`HOOK.md` plus a small handler running
   `brain hook openclaw <event>`) and Cursor's own hook events
   (`sessionStart`, `stop`, `preCompact`, `sessionEnd`).
