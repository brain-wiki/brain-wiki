---
id: 01M3250V0056E3H73CG3BS2TFQ
type: design
title: "Agent profiles (Interfaces: CLI, MCP, agent profiles)"
aliases: ["07 §1"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#1-agent-profiles"
bw-part_of:
  - "[[interfaces]]"
---
# Agent profiles (Interfaces: CLI, MCP, agent profiles)

A profile decides what one host may see and do in one brain. Profiles live
in `brain.toml` because privacy semantics belong to the brain
([[02-3-braintoml|02 §3]]).

```toml
[agents.default]                 # any host without its own table
max_privacy = "default"
topics      = ["*"]
write       = ["episodes"]

[agents.claude-code]
max_privacy = "sensitive"
topics      = ["*"]
write       = ["episodes", "propose_rules", "consolidate"]
```

| Field | Meaning | Built-in default |
|---|---|---|
| `max_privacy` | Highest privacy level this host may read. | lowest level |
| `topics` | Topic allowlist; `"*"` means all. Notes outside topics are readable when `"*"`. | `["*"]` |
| `write` | Subset of `episodes`, `edit`, `propose_rules`, `consolidate`, `harvest`, `review`. `edit` allows checked direct edits of notes ([[05-23-checked-agent-edits\|05 §2.3]]). | `["episodes"]`; the owner profile has `edit` |
| `read_origin` | May read the original agent conversations behind episodes ([[05-46-origin-context\|05 §4.6]]). Transcripts hold much more than the episodes kept, so this is separate from note access. | `false` |

Resolution: `--host <id>` → `[agents.<id>]` → `[agents.default]` →
built-in default. The CLI acts as `owner` (everything allowed) because the
person at the terminal owns the brain; `--as <host>` previews what a host
would see, which is how users check their privacy setup.

Enforcement points, all in the engine so every interface gets them:

- Reads: SQL filters before ranking ([[04-62-matching|04 §6.2]]);
  reads of hidden notes return `not_found`.
- Guard neighbors above the level: hidden, counted ([[04-5-guard-co-retrieval|04 §5]]).
- Consolidation: packets contain only what the backend's profile may read
  ([[05-43-selecting-and-packaging-work|05 §4.3]]).
- Writes: tools absent from `write` are refused with `forbidden`.
- Host brain limits from the user config ([[03-3-choosing-a-brain|03 §3]]).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can reach;
they do not stop a malicious program running as the user, which could read
the files anyway ([[security-and-privacy|10]]).
