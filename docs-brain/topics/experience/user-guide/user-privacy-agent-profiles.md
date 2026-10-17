---
id: 01M3250V007D9GKYYYE7TDBW2V
type: guide
title: "Agent profiles (Privacy and safety)"
source: "docs/user/privacy.md#agent-profiles"
---
# Agent profiles (Privacy and safety)

A profile says what an agent may change. Every agent may log episodes to
the inbox. An agent without its own profile may also edit notes. Change profiles with
`brain agents grant HOST CAPABILITY…` and `brain agents revoke`. Each change
can be undone. The result in `brain.toml` looks like this:

```toml
[agents.default]          # any agent without its own profile
write = ["edit"]

[agents.claude-code]
write = ["edit", "propose_rules", "harvest"]
read_origin = false       # may it read the conversations episodes came from?
```

| Capability | Lets the agent |
|---|---|
| `edit` | Create and edit notes, move notes, run `brain lint --fix`, archive consolidated episodes, run `brain commit` |
| `propose_rules` | Propose a standing rule, which you always confirm |
| `harvest` | File its own past sessions into notes |

- `read_origin = true` lets the agent read the conversation an episode came
  from. Turn it on with `brain agents grant HOST read_origin`.
- Profiles tell a cooperating agent what to do; they are not a lock. An
  agent with file access could edit `brain.toml` itself, so git history is
  the backstop.
- Only you change profiles, schedule jobs, and push. An agent acting with
  `--as` is refused.
- Older profiles may list `consolidate`, `review`, or `episodes`. Those
  names are ignored now.
