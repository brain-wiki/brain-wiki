---
id: 01M3250V003MZS80DP6NWEX3JY
type: design
title: "Code quality"
aliases: ["13 §7"]
tags: [engineering]
source: "docs/design/13-engineering.md#7-code-quality"
---
# Code quality

- `ruff` for linting and formatting, with the `S` (bandit) rules on, which
  flag `shell=True`, `eval`, and similar calls.
- No type checker runs and there is no coverage target.
- No network access in core code, except the fetch and push `brain commit`
  asks `git` to make to the brain's own remote: a convention, not a check.
