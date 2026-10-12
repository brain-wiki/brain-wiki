---
id: 01M3250V001NJSEZ3D48MQW7CX
type: guide
title: "Scheduled routines"
tags: [user-guide]
source: "docs/user/agents.md#scheduled-routines"
---
# Scheduled routines

```sh
brain schedule show brain-maintenance --for claude-code   # fields for the desktop app's routines
brain schedule show brain-harvest --for antigravity       # a /schedule line to run in the brain folder
brain schedule install brain-maintenance --for openclaw --apply
brain schedule install brain-maintenance --via cron --apply   # or launchd, systemd
brain schedule remove brain-maintenance
```

Routines: `brain-maintenance` (daily: harvest, then consolidate when at
least 5 episodes are pending), `brain-harvest` (daily, harvest only, for
your other agents), `brain-health` (weekly, read-only summary). Set
`[consolidate] device = "<this machine>"` in `brain.toml` so consolidation
runs on one machine only.

## Relations
- part_of [[user-agents]]
