---
id: 01M3250V00GCGZ39BHWC6KZ0QH
type: design
title: "Pre-commit integration"
aliases: ["06 §8"]
source: "docs/design/06-lint-and-reports.md#8-pre-commit-integration"
---
# Pre-commit integration

- `brain lint --install-hook` writes a small `.git/hooks/pre-commit` in the
  brain that runs `brain lint --staged`. Run again, it reports the hook as
  already installed. It refuses to overwrite any other existing hook and
  prints how to chain it instead.
- The hook also checks brain-wiki's own run commits. When it (or anything
  else) makes git refuse one, the run stays applied, its files stay staged,
  and the command prints git's message on stderr with how to finish: fix the
  problem, then `git commit`.
- It never blocks a `brain commit` snapshot: snapshots record broken states
  too, so they can be restored. `brain commit` sets `BRAIN_WIKI_SNAPSHOT=1`,
  and `brain lint --staged` exits 0 when it sees it ([[05-51-brain-commit|05 §5.1]]).
- The repository also ships `.pre-commit-hooks.yaml` so users of the
  pre-commit framework can add `brain-lint` to their own config.
