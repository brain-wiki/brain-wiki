---
id: 01M3250V00R1165CV94NKT3RQD
type: design
title: "Who the inbox is waiting on"
aliases: ["Write path §4.7"]
source: "docs/design/write-path.md#47-who-the-inbox-is-waiting-on"
---
# Who the inbox is waiting on

Without a hand-off timer, an agent that never consolidates leaves its
episodes in the inbox. brain-wiki shows who is waiting, so the user can ask
another agent to take them:

| Where | What |
|---|---|
| Orientation ([[index-and-search-8-orientation-the-briefing\|index and search §8]]) | "By agent: claude-code (you) 4 (oldest 2026-10-12), cursor 12 (oldest 2026-10-07)", and each agent's last consolidation with its summary |
| `brain doctor` | Pending episodes per agent; an owner whose oldest episode is older than `[lint] stale_inbox_days` (default 14) is reported as `stale_episodes`, with the request to make |
| `reports/consolidation.md` | Recent consolidation runs from `log.md`, newest first, with each episode's pattern and notes ([[lint-and-reports-7-reports\|lint and reports §7]]) |
| `reports/inbox.md` | Pending episodes per owner by age |

Orientation suggests consolidating when the caller's own pending episodes
reach 20 or the oldest is more than 7 days old.
