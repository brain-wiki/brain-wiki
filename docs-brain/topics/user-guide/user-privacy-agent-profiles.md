---
id: 01M3250V007D9GKYYYE7TDBW2V
type: guide
title: "Agent profiles (Privacy and safety)"
tags: [user-guide]
source: "docs/user/privacy.md#agent-profiles"
---
# Agent profiles (Privacy and safety)

A profile says what an agent may change. Agents without their own profile
may log episodes and edit notes. Change
profiles with `brain agents grant HOST CAPABILITY…` and `brain agents revoke`
(each change can be undone); the result in `brain.toml` looks like this:

```toml
[agents.default]          # any agent without its own profile
write = ["episodes", "edit"]

[agents.claude-code]
write = ["episodes", "edit", "propose_rules", "harvest"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `episodes` | Log what it learned to the inbox |
| `edit` | Create and edit notes directly (then `brain validate`); also needed for `brain mv`, `brain lint --fix`, and archiving consolidated episodes |
| `propose_rules` | Propose a standing rule; you always confirm it |
| `harvest` | Turn its own past sessions into episodes |

Profiles from brain-wiki 0.1 may list `consolidate` or `review`; those
names are ignored now.
