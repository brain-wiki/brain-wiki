---
id: 01M3250V00FC5QCMB908N13W9P
type: design
title: "What gets skipped"
aliases: ["Agent integrations §6.1"]
source: "docs/design/agent-integrations.md#61-what-gets-skipped"
---
# What gets skipped

- Sessions whose working directory is under brain-wiki's state directory,
  which is where headless harvest runs.
- Subagent sessions, where the host distinguishes them.
- Non-interactive (headless) sessions, unless `include_headless = true`.
- Sessions with fewer than `min_user_turns` user messages.
- Sessions still in progress, and sessions whose working directory routes
  to no brain.
