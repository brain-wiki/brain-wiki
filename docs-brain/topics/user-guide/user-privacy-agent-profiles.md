---
id: 01M3250V007D9GKYYYE7TDBW2V
type: guide
title: "Agent profiles (Privacy and safety)"
tags: [user-guide]
source: "docs/user/privacy.md#agent-profiles"
bw-part_of:
  - "[[user-privacy]]"
---
# Agent profiles (Privacy and safety)

A profile says what an agent may change. Agents without their own profile
may log episodes and correct notes they check with `brain check`:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes", "edit"]

[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `episodes` | Log what it learned to the inbox |
| `edit` | Correct notes directly, then record the change with `brain check` |
| `propose_rules` | Propose a standing rule; you always confirm it |
| `consolidate` | Fold inbox episodes into notes |
| `harvest` | Turn its own past sessions into episodes |
| `review` | Accept or reject runs that wait for review |
