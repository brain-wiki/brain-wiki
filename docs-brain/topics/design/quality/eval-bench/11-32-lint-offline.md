---
id: 01M3250V009M05W3Q3R1ZV8EE7
type: design
title: "`lint` (offline)"
aliases: ["11 §3.2"]
source: "docs/design/11-eval-bench.md#32-lint-offline"
---
# `lint` (offline)

A corpus of small broken brains, one or more per rule code, each with the
expected diagnostics (code, path, line). Each case copies a hand-written
format-3 base brain and breaks one thing:

| Cases | Planted problem |
|---|---|
| BW103, BW104, BW106 | Missing id, malformed id, non-standard `status` |
| BW114 | Leftover merge conflict markers |
| BW117, BW117 format-1, BW117 supersedes | A format-2 `bw-claims` field; format-1 `## Claims` and `## Relations` sections; a `bw-supersedes` relation (two findings; the fix also marks the replaced note superseded) |
| BW118 | An unknown `bw-` field |
| BW119, BW119 unresolved | `bw-superseded_by` without `status: superseded`; a target that does not resolve |
| BW120 | A `bw-sources` item that is neither a link nor a URL |
| BW307 | A supersession cycle |
| BW310 | A body link that does not resolve |
| BW402 | `rules.md` over its budget |
| BW404, BW406 | A topic without a hub (also BW408); an orphan note (also BW405) |
| BW502, BW503 | An episode at the wrong path; an episode without provenance |
| BW601, BW602 | A rule without a quote; a rule not from the owner |
| BW701 | A secret in a note |
| `clean:*` | Realistic text that must produce no finding (a wikilink after the word "token", conflict markers inside a code block) |

| Metric | Target |
|---|---|
| Per-rule precision and recall | 100% on the corpus |
| Fix resolves: `--fix` clears the finding it targets | always |
| Fix idempotency: `--fix` twice changes nothing the second time | always |
| Fix locality: fixes change only the lines they must | always |
