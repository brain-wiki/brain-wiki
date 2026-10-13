---
id: 01M3250V00NFVF9WDZM6ATB7EF
type: design
title: "The routines"
aliases: ["15 §4.1"]
tags: [skills-onboarding-and-routines]
source: "docs/design/15-skills-onboarding-and-routines.md#41-the-routines"
bw-part_of:
  - "[[15-4-routines]]"
---
# The routines

| Routine | Default cadence | Does | Where |
|---|---|---|---|
| `brain-maintenance` | Daily, 21:00 local | Harvest this host's new sessions, then consolidate if at least 5 episodes are pending, then a short report | The primary host, on the consolidation device |
| `brain-harvest` | Daily, 20:30 local | Harvest this host's new sessions only | Every other connected host with a local scheduler |
| `brain-health` | Weekly, Monday 09:00 | Read-only: summarize contradictions, stale notes, unverified claims, and open proposals from orientation and search, and suggest `brain lint` or `brain report` when they would help; change nothing | The primary host |

Harvest in a routine always uses the agent backend, so each host harvests
its own sessions and nothing else. Consolidation runs in one place only,
which avoids two hosts racing for the same episodes.
