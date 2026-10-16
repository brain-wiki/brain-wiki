---
id: 01M3250V00465EQND4YMR3DCXB
type: design
title: "How lint works"
aliases: ["Lint and reports §4"]
source: "docs/design/lint-and-reports.md#4-how-lint-works"
---
# How lint works

```
lint(paths, profile):
  scan()                                    # index freshness (04 §4)
  per-file rules: re-parse each file in scope (fast, line-oriented)
  cross-file rules: query the index (ids, names, edges, budgets)
  merge, apply profile and overrides, sort by path and line
```

- File rules depend only on a file's content and the manifest, so their
  results are cached in the index by content hash (keyed with
  `LINT_VERSION`, now `"2"`, and the budgets); whole-brain lint re-checks
  only files that changed.
- Cross-file rules use the index, so whole-brain lint stays under a second
  at 10k notes:
  - duplicate ids (BW105), case clashes (BW110), conflict copies (BW112),
    database files (BW115);
  - link resolution over the `edges` table
    ([[index-and-search-3-schema|index and search §3]]): an unresolved or
    ambiguous body link is BW310, a `bw-superseded_by` link BW119, a
    `bw-sources` link BW122. A `bw-sources` link to `archive/episodes/…`
    whose episode is still under `inbox/episodes/` is not reported: it is
    the path the consolidation packet gives, valid once `brain consolidate
    --done` archives the episode;
  - `bw-superseded_by` naming its own note (BW119) and cycles along
    `bw-superseded_by` (BW307). Chains without a cycle are fine;
  - structure (BW4xx) and inbox (BW5xx).
- `--staged` (pre-commit) lints staged versions from git, not the working
  tree, so it checks exactly what will be committed.
- `--changed` lints files changed since the last run, for editor
  integrations.

`brain validate` ([[write-path-23-direct-edits|write path §2.3]])
is lint with `--profile strict --select` set to `SCHEMA_CODES`, on the
paths given or the Markdown files git sees as changed (every note without
git). It adds BW121 for any protected path it is asked to check, and exits 1
only on errors.
