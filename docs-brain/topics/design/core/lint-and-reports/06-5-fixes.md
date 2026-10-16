---
id: 01M3250V00J5YMRH0PWBNB78SY
type: design
title: "Fixes"
aliases: ["06 §5"]
source: "docs/design/06-lint-and-reports.md#5-fixes"
---
# Fixes

`brain lint --fix` applies only fixes marked above, for problems at
`error` or `warning` severity. Fixes for `info` problems (listing notes in
hubs, BW405; in `migrate`, minting ids and the like) run only when their
codes are selected with `--select`, because they are suggestions, not
repairs. `--select` and `--ignore` take codes or prefixes (`BW3`, `BW405`)
for checks and fixes alike; one that matches no rule is a usage error, so a
typo cannot pass as "no problems". Rules:

- A fix changes only the lines it must (02 §4). It never reflows prose.
- All fixes in one invocation form one run of kind `lint-fix` with an undo
  record, one `log.md` entry, and one git commit if git mode is on.
- `--fix --dry-run` prints the diff; `--dry-run` alone is a usage error.
- `--fix` changes files, so under `--as <host>` it needs the `edit`
  capability ([[07-1-agent-profiles|07 §1]]).
- Fixes that need judgment (resolving an ambiguous link, removing a
  secret, choosing between conflict copies) are never automatic.

## Subsections
- [[06-51-converting-format-1-and-2-notes-bw117]]: Converting format 1 and 2 notes (BW117)
