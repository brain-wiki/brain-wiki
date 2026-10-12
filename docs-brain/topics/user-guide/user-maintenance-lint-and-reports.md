---
id: 01M3250V00KS84YTD9JM7RRKV7
type: guide
title: "Lint and reports"
tags: [user-guide]
source: "docs/user/maintenance.md#lint-and-reports"
---
# Lint and reports

```sh
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW205  # info-level suggestions run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

`reports/` holds pages you can browse in Obsidian: contradictions, stale
dependencies, unverified claims, the inbox, duplicate claims, orphans, and
the latest lint results.

## Relations
- part_of [[user-maintenance]]
