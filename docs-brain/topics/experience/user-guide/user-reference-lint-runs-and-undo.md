---
id: 01M3250V0062A70Y5NQN583ZPM
type: guide
title: "Lint, runs, and undo"
source: "docs/user/reference.md#lint-runs-and-undo"
---
# Lint, runs, and undo

- `brain lint` options: `--fix` (one undoable run; `--dry-run` shows the
  diff), `--profile strict|migrate`, `--select C` and `--ignore C` (codes or
  prefixes such as `BW3,BW405`), `--staged`, `--changed`, and
  `--install-hook`.
- `--fix` also converts format 1 and 2 notes to format 3.
- An unknown code in `--select` or `--ignore` is a usage error, and so is
  `--dry-run` without `--fix`.
- `brain undo` without a run id undoes the latest run on this device.
  `--force` undoes it even if files changed since, and saves their current
  versions first.
