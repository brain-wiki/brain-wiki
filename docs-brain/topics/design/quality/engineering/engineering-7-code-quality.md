---
id: 01M3250V00FYS2KRS28Z1Z9YCZ
type: design
title: "Code quality"
aliases: ["Engineering §7"]
source: "docs/design/engineering.md#7-code-quality"
---
# Code quality

- `ruff` lints and formats, with rule sets E, F, W, I, B, UP, SIM, and S
  (bandit). The S rules flag `shell=True`, `eval`, and similar calls. Tests
  are exempt from S.
- No type checker runs, and there is no coverage target.
- Core code makes no network calls, except the fetch and push `brain
  commit` asks `git` to make to the brain's own remote. This is a
  convention, not a check.
