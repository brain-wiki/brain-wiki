---
id: 01M3250V0026YGHW8GSF7MEXKJ
type: design
title: "How lint works"
aliases: ["06 §4"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#4-how-lint-works"
bw-part_of:
  - "[[lint-and-reports]]"
---
# How lint works

```
lint(paths, profile):
  scan()                                    # index freshness (04 §4)
  per-file rules: re-parse each file in scope (fast, line-oriented)
  cross-file rules: query the index (ids, names, edges, claims, budgets)
  merge, apply profile and overrides, sort by path and line
```

- File rules depend only on a file's content and the manifest, so their
  results are cached in the index by content hash; whole-brain lint
  re-checks only files that changed.
- Cross-file rules (BW105, BW110, BW112, BW2xx sources, BW3xx resolution,
  BW4xx structure, BW5xx inbox) use the index, so whole-brain lint stays
  under a second at 10k notes.
- `--staged` (pre-commit) lints staged versions from git, not the working
  tree, so it checks exactly what will be committed.
- `--changed` lints files changed since the last run, for editor
  integrations.

`brain check` ([[05-23-checked-agent-edits|05 §2.3]])
reuses the per-file rules for the notes an agent edited and adds checks that
need the note's last recorded version: claims deleted or reworded in place,
lowered privacy, large deletions, and protected files. Pending edits (a
note that differs from its last recorded version) are reported by `brain
check`, not by lint, so hand edits never raise warnings.
