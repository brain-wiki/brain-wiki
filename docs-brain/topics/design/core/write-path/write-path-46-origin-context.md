---
id: 01M3250V00FAF46Y62YFD5A4TP
type: design
title: "Origin context"
aliases: ["Write path §4.6"]
source: "docs/design/write-path.md#46-origin-context"
---
# Origin context

An episode is a summary, and sometimes the decision it records only makes
sense with the conversation around it. When the transcript still exists on
this device, the original conversation can be read:

| Interface | How |
|---|---|
| MCP | The packet marks such episodes `origin_available: true`. `brain_read_origin {episode, turns?}` returns a window of turns. |
| CLI | `brain origin <episode> [--turns A-B]` prints the same window. |

- Origin is available when the episode records `session` and
  `origin_turns`, brain-wiki has a session reader for its `agent`, and its
  `device` is this one.
- The default window is the episode's turn range, widened to about 20
  turns. A window never exceeds 60 turns.
- The window is normalized as harvest normalizes turns. Tool output bodies
  are never included, injected text is stripped, and secrets are scrubbed.
  The result is marked `untrusted` unless the session's inputs are `local`.
- Agents need `read_origin = true` in their profile
  ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]). It is off by default
  for every host, because transcripts hold far more than the episode chose
  to keep. The user's own CLI may always read origins.
- Missing origins are normal: another device, or a transcript deleted
  after the host's retention period. The call fails with `not_available`
  and the reason, and consolidation proceeds from the episode alone.
