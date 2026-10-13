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

A profile says what an agent may change:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes"]

[agents.claude-code]
write = ["episodes", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```
