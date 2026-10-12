---
id: 01M3250V009BS6Y6F8EBSKEERJ
type: guide
title: "Which agent may do what"
tags: [user-guide]
source: "docs/user/agents.md#which-agent-may-do-what"
---
# Which agent may do what

Each agent acts with a **profile** in `brain.toml`. By default an agent may
read notes up to the `default` privacy level and write episodes, nothing
more. Grant more per host:

```toml
[agents.claude-code]
max_privacy = "sensitive"
write = ["episodes", "edit", "propose_rules", "consolidate", "harvest"]
read_origin = true
```

See [[user-privacy|Privacy and safety]].

## Relations
- part_of [[user-agents]]
