---
id: 01M3250V0048APGTSZT0GZFCXE
type: design
title: "Backends"
aliases: ["05 §4.4"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#44-backends"
bw-part_of:
  - "[[05-4-consolidation]]"
---
# Backends

A backend turns a packet into a list of ops. Both v0.1 backends use the
same instructions and the same validator.

**`agent` backend (in-session).** The host agent is the LLM.

1. The agent calls `brain_consolidate_prepare` (optional `topic`,
   `max_episodes`). The server selects work for the calling host's
   profile, stores the packet under `<state>/runs/<run>/packet.json`, and
   returns instructions plus packet text. The run expires after one hour.
2. The agent reasons over it, optionally calling `brain_read_origin` for an
   episode whose meaning is unclear (§4.6), and calls
   `brain_consolidate_apply` with `{run, ops, dry_run}`.
3. The server validates. Invalid: it returns structured errors and the run
   stays open, so the agent can correct and resubmit. Valid: it applies (or
   writes a proposal for review) and returns a summary and a diff stat.

Advantages: no extra process, no extra credentials, the user watches it
happen and can steer. Cost: it uses the session's context window.

**`command` backend (headless).** A one-shot subprocess per packet:

```toml
[consolidate]
backend = "command"
command = "claude-code"           # preset name, or a full argv list:
# command = ["my-llm", "--json"]  # the prompt goes to stdin
model   = ""                      # optional, passed to presets that accept it
timeout_s = 600
```

1. Render the prompt: instructions + packet.
2. Run the command in an empty temporary directory, with the prompt on
   stdin, no inherited terminal, and the preset's flags that disable tools
   where the host supports it. The model gets text in and returns text out.
   It cannot read or change files.
3. Extract the reply: the preset knows how to find the final message in
   the host's JSON output; then the first JSON object with an `ops` array
   is parsed (code fences stripped).
4. On validation failure, retry once with the errors appended. A second
   failure ends the run; episodes stay pending.

Presets for Claude Code, Codex, Antigravity CLI, Cursor's CLI,
and a plain local-model runner are defined in
[[08-7-headless-presets-for-the-command-backend|08 §7]].
The backend's agent profile is the preset name (for example
`[agents.claude-code]`).

**Future `api` backend.** Direct provider calls behind the same packet →
ops interface. Not in v0.1.
