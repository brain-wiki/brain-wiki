---
id: 01M3250V00KS84YTD9JM7RRKV7
type: guide
title: "Lint and reports"
source: "docs/user/maintenance.md#lint-and-reports"
---
# Lint and reports

```sh
brain validate                   # frontmatter of the notes git sees as changed
brain lint                       # whole brain; exit 1 on errors
brain lint --fix                 # safe repairs, one undoable run
brain lint --fix --select BW405  # info-level fixes run only when selected
brain lint --install-hook        # check staged files before each git commit
brain report                     # regenerate reports/
```

- `brain validate` runs lint's frontmatter rules on the files you just
  edited, or on every note in a brain without git.
- The lint summary counts only what `brain lint --fix` would repair.
  Info-level fixes are listed separately, with the `--select` that turns
  them on.
- `--install-hook` does nothing when its own hook is already there, and
  never overwrites a hook someone else wrote. The hook does not block
  `brain commit`.

`reports/` holds pages you can browse in Obsidian: an index, notes that
need review (`stale.md`: notes that rest on an outdated note, open
conflicts, and links to superseded or archived notes), the inbox,
orphans, and the latest lint results.

When two notes conflict, decide which holds and supersede the other, or
keep both and say why in each. Once one side is superseded, `brain lint`
reports the leftover `bw-conflicts_with` as BW314, and
`brain lint --fix --select BW314` removes it.
