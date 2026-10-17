---
id: 01M3250V00V42H9YHW1EYNQQ9T
type: guide
title: "MCP tools"
source: "docs/user/reference.md#mcp-tools"
---
# MCP tools

These are the tools a connected agent can call. A write tool needs the
matching capability in the agent's profile. See
[[user-privacy-agent-profiles|Privacy and safety]]. Agents edit notes with
their own file tools, and `edit` decides whether orientation tells them they
may.

| Tool | Does | Needs |
|---|---|---|
| `brain_list` | The brains this agent may use, and what each holds | — |
| `brain_orient` | The briefing: rules, topics, recent changes, inbox | — |
| `brain_search` | Search, or browse with an empty query and filters | — |
| `brain_read` | Read a note, hub, or episode | — |
| `brain_neighbors` | Follow a note's links and backlinks | — |
| `brain_validate` | Check the frontmatter of notes the agent changed | — |
| `brain_log_episode` | Record a learning in the inbox | — |
| `brain_propose_rule` | Propose a standing rule for you to confirm | `propose_rules` |
| `brain_consolidate_prepare` | Pending episodes with candidate notes and guidance | — |
| `brain_consolidate_done` | Archive the episodes folded into notes | `edit` |
| `brain_read_origin` | Read the conversation behind an episode | `read_origin = true` |
| `brain_harvest_prepare`, `brain_harvest_apply` | Turn this agent's past sessions into episodes | `harvest` |
