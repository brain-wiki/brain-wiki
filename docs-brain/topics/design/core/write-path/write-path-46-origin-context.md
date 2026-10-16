---
id: 01M3250V00FAF46Y62YFD5A4TP
type: design
title: "Origin context"
aliases: ["Write path §4.6"]
source: "docs/design/write-path.md#46-origin-context"
---
# Origin context

An episode is a summary; sometimes the decision it records only makes sense
with the conversation around it. When an episode carries `session` and
`origin_turns` and its transcript still exists on this device, consolidation
can look at the original:

| Interface | How |
|---|---|
| MCP | The packet marks such episodes `origin_available: true`. The agent may call `brain_read_origin {episode, turns?}`, which returns a bounded window of normalized turns (default up to 20, never more than 60) around the episode's range. |
| CLI | `brain origin <episode> [--turns A-B]` prints the same window for a person. |

Rules for origin reads:

- The window is normalized the same way harvest extracts turns: tool output
  bodies are omitted unless explicitly requested, and then wrapped as
  `<untrusted-tool-output>`; text the host injected is stripped; secrets
  are scrubbed.
- Reading origins requires `read_origin = true` in the caller's agent
  profile ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]), off by default for
  every host, because transcripts hold far more than the episode chose to
  keep.
- Missing origins are normal (another device, or deleted after the host's
  retention period; Claude Code keeps transcripts 30 days by default). The
  tool returns `not_available` with the reason, and consolidation proceeds
  from the episode alone.
