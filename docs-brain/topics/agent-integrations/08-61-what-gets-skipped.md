---
id: 01M3250V008P71TJSAHATK513R
type: design
title: "What gets skipped"
aliases: ["08 §6.1"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#61-what-gets-skipped"
bw-part_of:
  - "[[08-6-capture-and-harvest]]"
---
# What gets skipped

- Sessions with `BRAIN_WIKI_INTERNAL=1` (brain-wiki's own runs). Harvest
  also skips sessions whose working directory is under brain-wiki's state
  directory, which is where headless harvest runs.
- Subagent sessions, where the host distinguishes them.
- Non-interactive (headless) sessions, unless `capture_headless = true`.
- Sessions shorter than `min_turns` for prompted mode, or with fewer than
  `min_user_turns` user messages for harvest.
- For harvest: sessions still in progress, and sessions whose working
  directory routes to no brain.
