---
id: 01M3250V003MZS80DP6NWEX3JY
type: design
title: "Code quality"
aliases: ["13 §7"]
tags: [engineering]
source: "docs/design/13-engineering.md#7-code-quality"
---
# Code quality

- `ruff` for linting and formatting; `pyright` in strict mode for
  `format`, `store`, `index`, `consolidate`, and `runs`.
- Coverage target: 90% lines for the core packages listed above.
- No `shell=True`, no `eval`, no network access in core code; enforced by a
  ruff rule set and a test that greps the core packages.

## Relations
- part_of [[engineering]]
