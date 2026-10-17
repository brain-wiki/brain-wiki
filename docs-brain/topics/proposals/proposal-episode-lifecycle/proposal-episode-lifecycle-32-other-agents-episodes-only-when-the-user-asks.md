---
id: 01M3250V00R9KG0EW153715MNE
type: proposal
title: "Other agents' episodes, only when the user asks"
aliases: ["Episodes: quick capture, per-agent consolidation §3.2"]
source: "docs/proposal/episode-lifecycle.md#32-other-agents-episodes-only-when-the-user-asks"
---
# Other agents' episodes, only when the user asks

By default an agent sees only its own episodes. It takes another agent's
episodes, or the unowned ones, only when the user asks: "take Cursor's
episodes too", "fold in the unowned episodes". The request is the consent;
there is no confirmation step, which could not stop an agent that reads
the files anyway.

| Where | How |
|---|---|
| A session (MCP) | `brain_consolidate_prepare(agents=["cursor"])`, `unowned=true`, or `all=true`. The guidance says to pass them only when the user asked |
| CLI | `brain consolidate --prepare --agent cursor`, `--unowned`, or `--all` |
| A schedule | The user adds the job with `--include cursor` or `--include unowned` (§5.2) |

Without a hand-off timer, an agent that never consolidates leaves its
episodes in the inbox. Orientation and `brain doctor` show the pending
episodes per agent, with the age of the oldest, so the user can see it and
ask another agent to take them over (journey E6).
