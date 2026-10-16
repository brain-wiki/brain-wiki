---
id: 01M3250V0042QTTQ8HSY35AHST
type: guide
title: "What agents get"
source: "docs/user/agents.md#what-agents-get"
---
# What agents get

| Tool | Does |
|---|---|
| `brain_list` | Which brains this agent may use, what each holds, which is the default here |
| `brain_orient` | One brain's briefing: rules, what it holds, topics, recent changes, inbox, example queries |
| `brain_search` | Search, or browse with filters (type, tag, property, date) and `sort: recent`; a warning and the newer note when a hit is superseded |
| `brain_read` | Read a note, hub, or episode, with the path of every note it links to and every note linking to it |
| `brain_neighbors` | Follow a note's links and backlinks, up to 3 hops |
| `brain_validate` | Check the frontmatter of notes the agent created or edited |
| `brain_log_episode` | Record a learning in the inbox when it has no place in a note yet |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare` / `_done` | Fold the inbox into notes: gather episodes, then archive them once the notes are edited (`_done` needs `edit`) |
| `brain_harvest_prepare` / `_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

Agents fetch the briefing when they need it, guided by the instruction
block. The plugin also ships three skills: `brain` (everyday use), `brain-setup`, and `brain-maintain`.
