---
id: 01M3250V00FBJMH3N6BYPV2HAX
type: proposal
title: "Enforcement points"
source: "docs/proposals/privacy.md#44-enforcement-points"
---
# Enforcement points

| Point | Mechanism | Strength |
|---|---|---|
| Tool reads (search, read, orient, neighbors, list) | Filter by the reader's trust before ranking; a hidden note reads as missing. | Hard, for MCP and CLI |
| Direct file reads | `brain_list` gives the path only to readers trusted at every level present in the brain; others are told to use the tools. | Soft: any program can read files |
| Automatic injection | Session-start briefing and per-prompt recall include `open` content only. | Hard |
| Consolidation and harvest | Packets hold only what the backend may read; ops may not cite a source in a note less private than the source (P4). | Hard |
| Checked edits | `brain check` refuses a change to `bw-privacy`, and a new link from a note to a more private one. | Hard for recorded edits |
| Tool calls after a private read | A read of `private` content marks the session exposed. A pre-tool hook then asks the user before external tools run, where the host has one (Claude Code's `PreToolUse` can ask or deny); elsewhere, the read result says to keep the content local. | Medium, host-dependent |
| Outputs | Read results label `private` content: "keep in this conversation; do not post it". | Soft: depends on the agent |
| Exports | `brain viz --export` leaves out non-`open` notes unless `--include private`. | Hard |

The exposure mark (fourth row from the bottom) is the guardrail against
giving sensitive content to an untrusted third party: it targets the case
where injected text in a web page or issue steers an agent that has just
read private notes into sending them somewhere.
