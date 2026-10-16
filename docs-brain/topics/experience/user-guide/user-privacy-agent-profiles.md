---
id: 01M3250V007D9GKYYYE7TDBW2V
type: guide
title: "Agent profiles (Privacy and safety)"
source: "docs/user/privacy.md#agent-profiles"
---
# Agent profiles (Privacy and safety)

A profile says what an agent may change. An agent without its own profile
may log episodes and edit notes. Change profiles with
`brain agents grant HOST CAPABILITY…` and `brain agents revoke`. Each change
can be undone. The result in `brain.toml` looks like this:

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
| `edit` | Create and edit notes, move notes, run `brain lint --fix`, archive consolidated episodes, run `brain commit` |
| `propose_rules` | Propose a standing rule, which you always confirm |
| `harvest` | Turn its own past sessions into episodes |

- `read_origin = true` lets the agent read the conversation an episode came
  from. Turn it on with `brain agents grant HOST read_origin`.
- Only you change profiles, schedule jobs, and push. An agent acting with
  `--as` is refused.
- Profiles from brain-wiki 0.1 may list `consolidate` or `review`. Those
  names are ignored now.
