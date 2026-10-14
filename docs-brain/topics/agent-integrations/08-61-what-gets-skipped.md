---
id: 01M3250V008P71TJSAHATK513R
type: design
title: "What gets skipped"
aliases: ["08 §6.1"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#61-what-gets-skipped"
bw-part_of:
  - "[[08-6-harvest]]"
---
# What gets skipped

- Sessions whose working directory is under brain-wiki's state directory,
  which is where headless harvest runs.
- Subagent sessions, where the host distinguishes them.
- Non-interactive (headless) sessions, unless `include_headless = true`.
- Sessions with fewer than `min_user_turns` user messages.
- Sessions still in progress, and sessions whose working directory routes
  to no brain.
