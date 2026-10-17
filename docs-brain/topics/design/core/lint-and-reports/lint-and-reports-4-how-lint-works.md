---
id: 01M3250V00465EQND4YMR3DCXB
type: design
title: "How lint works"
aliases: ["Lint and reports §4"]
source: "docs/design/lint-and-reports.md#4-how-lint-works"
---
# How lint works

`brain lint` combines file rules, which read one file, with cross-file
rules, which query the index.

1. Force a scan, so the index matches the files
   ([[index-and-search-4-freshness|index and search §4]]).
2. Run the file rules on each note, topic page, episode, agent file, `rules.md`,
   `AGENTS.md`, proposal, and `log.md` in scope.
3. Run the cross-file rules and keep the problems in scope.
4. Apply `--select` and `--ignore`, set each severity from the profile for
   its path, drop the ones that are off, and sort by path, line, and code.

File rules depend only on a file's content and the manifest. Their results
are cached in `lint_cache`, keyed by content hash, `LINT_VERSION` (now
`"2"`), and a hash of `[budgets]`, so whole-brain lint re-checks only
changed files and stays under one second at 10k notes.

Cross-file rules cover:

- Duplicate ids (BW105), case clashes (BW110), conflict copies (BW112),
  and database files (BW115).
- Link resolution over the `edges` table
  ([[index-and-search-3-schema|index and search §3]]). An unresolved
  body link is BW310, `bw-superseded_by` link BW119, and `bw-sources`
  link BW122. A `bw-sources` link to `archive/episodes/…` is not reported
  while its episode is still under `inbox/episodes/`. The consolidation
  packet gives that path, and it resolves once
  `brain consolidate --done` archives the episode.
- A `bw-superseded_by` naming its own note (BW119), and cycles (BW307).
  Chains without a cycle are fine.
- Structure (BW4xx), the inbox (BW5xx), and `brain.toml` keys (BW109,
  BW409).

Narrowing the scope:

- Paths may be absolute, relative to the working directory, or relative
  to the brain. A path that does not exist is a not-found error.
- `--staged` runs the file rules on the bytes git has staged, so it checks
  exactly what will be committed. Cross-file rules still read the index of
  the working tree.
- `--changed` checks files modified since the last whole-brain or
  `--changed` lint (`meta.last_lint_ns`).

`brain validate` is lint with the `strict` profile and `--select` set to
`SCHEMA_CODES`. It checks the paths given, else the Markdown files git
sees as changed or new, else every note when the brain is not a git work
tree. A protected path among them gets BW121 instead of being linted. That
includes a new episode file, since it lies in the inbox. It exits 1 only
on errors. See [[write-path-23-direct-edits|write path §2.3]].
