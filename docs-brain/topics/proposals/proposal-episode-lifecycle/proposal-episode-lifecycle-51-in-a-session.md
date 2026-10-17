---
id: 01M3250V007TTKXXKW9X8J3XK2
type: proposal
title: "In a session"
aliases: ["Episodes: quick capture, per-agent consolidation §5.1"]
source: "docs/proposal/episode-lifecycle.md#51-in-a-session"
---
# In a session

The user says "consolidate". The agent calls `brain_consolidate_prepare`,
works through its own episodes with the user watching, validates, and
calls `brain_consolidate_done`. This is today's flow with the scope of §3
and the patterns of §4.
