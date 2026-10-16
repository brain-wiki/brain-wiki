---
id: 01M3250V003K6A0G50WEMB9KYQ
type: design
title: "Origin context"
aliases: ["05 §4.6"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#46-origin-context"
---
# Origin context

An episode is a summary; sometimes the decision it records only makes sense
with the conversation around it. When an episode carries `session` and
`origin_turns` and its transcript still exists on this device, consolidation
can look at the original:

| Backend | How |
|---|---|
| `agent` | The packet marks such episodes `origin_available: true`. The agent may call `brain_read_origin {episode, turns?}`, which returns a bounded window of normalized turns (default up to 20, never more than 60) around the episode's range. |
| CLI | `brain origin <episode> [--turns A-B]` prints the same window for a person. |

Rules for origin reads:

- The window is normalized the same way harvest extracts turns: tool output
  bodies are omitted unless explicitly requested, and then wrapped as
  `<untrusted-tool-output>`; text the host injected is stripped; secrets
  are scrubbed.
- Reading origins requires `read_origin = true` in the caller's agent
  profile ([[07-1-agent-profiles|07 §1]]), off by default for
  every host, because transcripts hold far more than the episode chose to
  keep.
- Claims may cite the conversation directly with an origin source,
  `<host>:<session>#T<start>-T<end>`, in addition to the episode span. Lint
  cannot check origin sources on other devices or after the host deleted the
  transcript, so it never reports them as broken.
- Missing origins are normal (another device, or deleted after the host's
  retention period; Claude Code keeps transcripts 30 days by default). The
  tool returns `not_available` with the reason, and consolidation proceeds
  from the episode alone.
