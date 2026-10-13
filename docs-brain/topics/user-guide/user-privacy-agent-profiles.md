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

```toml
[agents.default]          # any agent without its own profile
max_privacy = "default"
topics = ["*"]
write = ["episodes"]

[agents.claude-code]
max_privacy = "sensitive"
topics = ["*"]
write = ["episodes", "propose_rules", "consolidate", "harvest", "review"]
read_origin = false       # may it read the conversations episodes came from?
```

Consolidation backends use a profile too: episodes above a backend's level
stay in the inbox for a more trusted one, such as a local model.
