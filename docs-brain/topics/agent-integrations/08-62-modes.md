---
id: 01M3250V00TDV7HNQJ3PVJHW8V
type: design
title: "Modes (Agent integrations)"
aliases: ["08 §6.2"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#62-modes"
bw-part_of:
  - "[[08-6-capture-and-harvest]]"
---
# Modes (Agent integrations)

| Mode | How | Quality | Cost |
|---|---|---|---|
| `prompted` (default where supported) | At the first `stop` after `min_turns`, the hook asks the agent once, via the host's "continue with reason" output, to call `brain_log_episode` with durable learnings, or to do nothing if there are none. | The agent's own distilled summary; provenance is set by the server. | One short extra turn per session. |
| `raw` | At `pre_compact` and `session_end` (and `stop` for hosts without those), the hook reads the transcript since the last capture point, keeps user and assistant text (no tool output bodies), strips injected markers, scrubs secrets, and writes one episode. | Verbose; consolidation does the distilling. | No model call. |

Capture points are tracked per session in `<state>/sessions/<host>/<id>.json`
(last captured transcript offset, whether prompted capture already ran,
taint), and episode `dedupe` keys make retries harmless. Transcript
readers are per host and defensive: an unreadable or unknown format yields
a `raw` episode with `bw-taint: unknown`, or no episode, never an error.
