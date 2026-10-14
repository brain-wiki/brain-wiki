---
id: 01M3250V009BS6Y6F8EBSKEERJ
type: guide
title: "Which agent may do what"
tags: [user-guide]
source: "docs/user/agents.md#which-agent-may-do-what"
bw-part_of:
  - "[[user-agents]]"
---
# Which agent may do what

Each agent acts with a **profile** in `brain.toml`. Every agent reads the
whole brain; by default it may log episodes and correct notes it checks with
`brain check`. Grant more per host:

```toml
[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "consolidate", "harvest"]
read_origin = true
```

See [[user-privacy|Privacy and safety]].
