---
id: 01M3250V004DPW41Y8SGXV9T6T
type: proposal
title: "An agent consolidates its own episodes"
aliases: ["Episodes: quick capture, per-agent consolidation §3.1"]
source: "docs/proposal/episode-lifecycle.md#31-an-agent-consolidates-its-own-episodes"
---
# An agent consolidates its own episodes

`brain consolidate --prepare`, called by a host (MCP, or `--as HOST`),
selects that host's own episodes, those whose conversation is readable here
first: the host's session reader finds the transcript on this machine, so
the agent can reopen what it captured. Its episodes captured on other
machines follow, with only the episode text.

Why scope by agent:

- Only the capturing agent can read the origin conversation, through its
  host's session reader on the machine where the session ran. Another
  agent sees only the episode text.
- Partitioning the inbox by owner means two agents consolidating on the
  same night do not touch the same episodes, without leases or locks.
- "Readable here" replaces the device name the old scheduled design
  needed: the session reader answers it from the transcript on disk, so a
  renamed or replaced machine needs no configuration.
