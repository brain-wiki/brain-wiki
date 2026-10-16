---
id: 01M3250V00GJD5GDY6ZCWR9E2C
type: design
title: "`lint` (offline)"
aliases: ["Eval bench §3.2"]
source: "docs/design/eval-bench.md#32-lint-offline"
---
# `lint` (offline)

Each case copies a small hand-written format-3 brain, breaks one thing, and lists the diagnostics it expects by code, path, and line:

| Case | Planted problem |
|---|---|
| BW103, BW104, BW106 | Missing id; malformed id; a `status` outside the standard values |
| BW114 | Leftover merge conflict markers |
| BW117, BW117 format-1, BW117 supersedes | A format-2 `bw-claims` field; format-1 `## Claims` and `## Relations` sections; a `bw-supersedes` field, reported twice, whose fix also marks the replaced note superseded |
| BW118 | An unknown `bw-` field |
| BW119, BW119 unresolved | `bw-superseded_by` without `status: superseded`; a target that does not resolve |
| BW120 | A `bw-sources` item that is neither a link nor a URL |
| BW307 | A supersession cycle |
| BW310 | A body link that does not resolve |
| BW402 | `rules.md` over its budget |
| BW404, BW406 | A topic folder without a hub, which also raises BW408; an orphan note, which also raises BW405 |
| BW502, BW503 | An episode at the wrong path; an episode without provenance |
| BW601, BW602 | A rule without a quote; a rule not from the owner |
| BW701 | A secret in a note |
| `clean:*` | Text that must produce no finding: the unchanged base brain, a wikilink after the word "token", conflict markers inside a code block |

When a case has a fix, the suite runs `brain lint --fix` for that code twice and compares the files.

| Metric | Target |
|---|---|
| Precision and recall per rule code | 100%, hard |
| The fix clears the finding it targets | Always, hard |
| A second fix changes nothing | Always, hard |
| The fix changes only the lines it must | Always, hard |
