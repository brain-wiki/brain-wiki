---
id: 01M3250V00J5YMRH0PWBNB78SY
type: design
title: "Fixes"
aliases: ["06 §5"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#5-fixes"
bw-part_of:
  - "[[lint-and-reports]]"
---
# Fixes

`brain lint --fix` applies only fixes marked above, for problems at
`error` or `warning` severity. Fixes for `info` problems (minting claim ids,
converting frontmatter relations, listing notes in hubs) run only when
their codes are selected with `--select`, because they are suggestions, not
repairs. `--select` and `--ignore` take codes or prefixes (`BW3`, `BW405`)
for checks and fixes alike. Rules:

- A fix changes only the lines it must (02 §4). It never reflows prose.
- All fixes in one invocation form one run with an undo record, one
  `log.md` entry, and one git commit if git mode is on.
- `--fix --dry-run` prints the diff.
- Fixes that need judgment (resolving an ambiguous link, removing a
  secret, choosing between conflict copies) are never automatic.
