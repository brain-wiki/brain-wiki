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

A backend turns a packet into a list of ops. v0.1 has one, the agent the
user is talking to; the instructions and the validator do not depend on it.

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
