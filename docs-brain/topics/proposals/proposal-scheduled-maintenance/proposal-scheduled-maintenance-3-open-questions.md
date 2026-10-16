---
id: 01M3250V002RC42995H71ZA9NB
type: proposal
title: "Open questions (Scheduled maintenance)"
aliases: ["Scheduled maintenance §3"]
source: "docs/proposal/scheduled-maintenance.md#3-open-questions"
---
# Open questions (Scheduled maintenance)

1. Who may consolidate unattended, and how does the user allow it without
   allowing every agent?
2. How does one device claim a brain for scheduled runs? A lease recorded
   in the brain could replace a device name.
3. How does a failed scheduled run reach the user: orientation, a report
   file, or the host's notification?
4. Do harvest and health checks need schedules at all, or do orientation's
   inbox reminder ("N pending episodes") and `brain harvest --status`
   suffice? Orientation does not report unharvested sessions today.
