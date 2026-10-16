---
id: 01M3250V008D5A150T1MDP4Q8N
type: guide
title: "Commits and schedules"
source: "docs/user/reference.md#commits-and-schedules"
---
# Commits and schedules

- `brain commit` exits 1 on a rebase conflict or a rejected push. An agent
  (`--as HOST`) may run it only with `edit`, and never with `--push`.
- `brain schedule` installs one job per brain and is refused with `--as`.
  `--every` values and platforms are in
  [[user-maintenance-commit-direct-edits|Maintenance]].
