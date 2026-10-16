---
id: 01M3250V0028GSWJM36MPB64NC
type: design
title: "Pre-commit integration"
aliases: ["Lint and reports §8"]
source: "docs/design/lint-and-reports.md#8-pre-commit-integration"
---
# Pre-commit integration

`brain lint --install-hook` writes `.git/hooks/pre-commit`, which changes
to the brain folder and runs `brain lint --staged --brain .`.

- Run again, it reports the hook as already installed. It refuses to
  overwrite a different hook and prints the line to add to it instead.
- When `brain` is not on `PATH`, the hook warns and lets the commit
  through.
- The hook also checks brain-wiki's own run commits. When git refuses one,
  the run stays applied and its files stay staged. The command prints
  git's message on stderr with how to finish: fix the problem, then run
  `git commit`.
- It never blocks a `brain commit` snapshot, because snapshots record
  broken states too, so they can be restored. `brain commit` sets
  `BRAIN_WIKI_SNAPSHOT=1`, and `brain lint --staged` exits 0 when it sees
  it ([[write-path-51-brain-commit|write path §5.1]]).

The repository also ships `.pre-commit-hooks.yaml`, so users of the
pre-commit framework can add the `brain-lint` hook to their config.
