---
id: 01M3250V00KS84YTD9JM7RRKV7
type: guide
title: "Lint and reports"
tags: [user-guide]
source: "docs/user/maintenance.md#lint-and-reports"
bw-part_of:
  - "[[user-maintenance]]"
---
# Lint and reports

```sh
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW205  # info-level suggestions run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

The summary counts only what `brain lint --fix` would repair. Info-level
fixes are listed separately with the `--select` that turns them on. An
unknown code or prefix in `--select` or `--ignore` is a usage error, and so
is `--dry-run` without `--fix`. Running `--install-hook` again over its own
hook does nothing; it never overwrites a hook someone else wrote.

`reports/` holds pages you can browse in Obsidian: contradictions, stale
dependencies, unverified claims, the inbox, duplicate claims, orphans, and
the latest lint results.

Notes written before format 2 keep claims and relations in `## Claims` and
`## Relations` sections. They still work; lint reports them as BW116, and
`brain lint --fix` moves them into `bw-` fields in one undoable run.
