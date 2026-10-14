---
id: 01M3250V00V42H9YHW1EYNQQ9T
type: guide
title: "MCP tools"
tags: [user-guide]
source: "docs/user/reference.md#mcp-tools"
bw-part_of:
  - "[[user-reference]]"
---
# MCP tools

What a connected agent can call. Write tools need the matching capability in
the agent's profile, and `brain_read_origin` needs `read_origin = true`
([[user-privacy-agent-profiles|privacy.md]]).

| Tool | Does | Needs |
|---|---|---|
| `brain_list` | The brains this agent may use, and what each holds | — |
| `brain_orient` | The briefing: rules, topics, recent changes, inbox | — |
| `brain_search` | Search, or browse with an empty query and filters | — |
| `brain_read` | Read a note, hub, or episode (outline, full, section, raw) | — |
| `brain_neighbors` | Follow a note's relations | — |
| `brain_check` | Validate and record notes the agent edited directly | `edit` |
| `brain_log_episode` | Record a learning in the inbox | `episodes` |
| `brain_propose_rule` | Propose a standing rule; you confirm it | `propose_rules` |
| `brain_consolidate_prepare`, `brain_consolidate_apply` | Fold inbox episodes into notes | `consolidate` |
| `brain_read_origin` | Read the conversation behind an episode | `read_origin = true` |
| `brain_harvest_prepare`, `brain_harvest_apply` | Turn this agent's past sessions into episodes | `harvest` |

Exit codes: 0 success; 1 problems found (lint errors, invalid ops) or a path
that cannot be read or written; 2 usage; 3 not found; 4 conflict (stale,
lock); 5 forbidden by a profile; 10 internal error.
