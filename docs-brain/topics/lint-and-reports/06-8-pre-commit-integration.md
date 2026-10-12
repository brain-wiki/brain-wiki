---
id: 01M3250V00GCGZ39BHWC6KZ0QH
type: design
title: "Pre-commit integration"
aliases: ["06 §8"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#8-pre-commit-integration"
---
# Pre-commit integration

- `brain lint --install-hook` writes a small `.git/hooks/pre-commit` in the
  brain that runs `brain lint --staged`. It refuses to overwrite an
  existing hook and prints how to chain it instead.
- The repository also ships `.pre-commit-hooks.yaml` so users of the
  pre-commit framework can add `brain-lint` to their own config.

## Relations
- part_of [[lint-and-reports]]
