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
| `brain_orient` | One brain's briefing: rules, contents, topics, recent changes, inbox, example queries |
| `brain_search` | Search, or browse with filters and `sort: recent` |
| `brain_read` | Read a note, hub, or episode, with the paths of its links and backlinks |
| `brain_neighbors` | Follow a note's links and backlinks, up to 3 hops |
| `brain_validate` | Check the frontmatter of notes the agent changed |
| `brain_log_episode` | Record a learning in the inbox when no note fits yet |
| `brain_propose_rule` | Propose a rule; you confirm before anything is written |
| `brain_consolidate_prepare`, `brain_consolidate_done` | Gather episodes, then archive them once the notes are edited |
| `brain_harvest_prepare`, `brain_harvest_apply` | Turn past sessions into episodes |
| `brain_read_origin` | Show the conversation an episode came from |

- Search filters by type, tag, property, and date. A superseded hit comes
  with a warning and the note that replaced it.
- Agents fetch the briefing when they need it, as the instructions tell
  them.
- The plugin also ships three skills: `brain` for everyday use,
  `brain-setup`, and `brain-maintain`.

Which capability each tool needs is in the
[[user-reference-mcp-tools|Reference]].
