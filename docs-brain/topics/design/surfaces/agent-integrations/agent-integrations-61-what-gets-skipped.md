---
id: 01M3250V00FC5QCMB908N13W9P
type: design
title: "What gets skipped"
aliases: ["Agent integrations §6.1"]
source: "docs/design/agent-integrations.md#61-what-gets-skipped"
---
# What gets skipped

Harvest looks only at sessions modified within `since`, and skips:

- subagent sessions, where the host marks them;
- non-interactive (headless) sessions, unless `include_headless = true`;
- sessions whose working directory is under brain-wiki's state directory,
  where headless harvest runs;
- sessions modified less than `min_idle_minutes` ago;
- sessions outside `--project`, when given;
- sessions whose working directory routes to no brain, or to a brain other
  than the one being harvested;
- unreadable transcripts (§6.4);
- sessions with fewer than `min_user_turns` new user turns since the last
  harvest.
