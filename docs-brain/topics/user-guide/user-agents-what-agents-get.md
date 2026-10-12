---
id: 01M3250V0042QTTQ8HSY35AHST
type: guide
title: "What agents get"
tags: [user-guide]
source: "docs/user/agents.md#what-agents-get"
---
# What agents get

| Tool | Does |
|---|---|
| `brain_list` | Which brains this agent may use, what each holds, which is the default here |
| `brain_orient` | One brain's briefing: rules, what it holds, topics, recent changes, inbox, example queries |
| `brain_search` | Search, or browse with filters (type, tag, property, date) and `sort: recent`; warnings when a hit is superseded or contradicted |
| `brain_read` | Read a note, hub, or episode, with the path of every related note |
| `brain_neighbors` | Follow a note's relations: what a release shipped, what depends on a decision |
| `brain_check` | Validate and record notes the agent edited directly (needs `edit`) |
| `brain_log_episode` | Record durable learnings in the inbox |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare` / `_apply` | Fold the inbox into notes |
| `brain_harvest_prepare` / `_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

Agents fetch the briefing when they need it, guided by the instruction
block. To inject it at the start of every session instead, connect with
`--briefing-hook` (Claude Code, Codex, Antigravity). The plugin also ships
three skills: `brain` (everyday use), `brain-setup`, and `brain-maintain`.

## Relations
- part_of [[user-agents]]
