# Eval bench

## 1. Purpose

`brain bench` measures what brain-wiki promises, so defaults are tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always returns the notes that supersede them (G5) | `retrieval` |
| Lint finds what it claims to find and fixes it safely | `lint` |
| Search, reads, and orientation are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent`, a stub that reports itself skipped (§3.5) |

Published numbers come only from this bench, with the command and version that produced them.

## 2. Principles

- Synthetic data. Every dataset is generated from a seed or written by hand about fictional subjects, so it holds no personal data, raises no license questions, and is reproducible (D18).
- Deterministic grading. Graders check ids, ranks, diagnostics, and file diffs. No model judges a result.
- Negative cases. Cases also state what must not happen: a guard the ground truth lacks, a finding on clean text, a fix that touches other lines.
- The same code as production. Suites call the functions the CLI and MCP server use: search, read, orient, lint, and fix.
- Model comparisons are not built. When they are, they will run agent CLIs the way scheduled consolidation does ([agent integrations §7](agent-integrations.md#7-unattended-agent-mode)), and the headline will be the lowest score across models, because every model that writes to a brain shares it.

## 3. Suites

`brain bench` with no suite names runs `retrieval`, `lint`, and `perf`. Every metric with a target is either hard or soft. A hard miss fails the command; a soft miss shows as `miss` in the report and does not.

### 3.1 `retrieval` (offline)

The suite generates a format-3 brain (§4), runs the planted queries, and checks every note and topic page in the top 8 results against the ground truth. The only guard is supersession ([brain format §7](brain-format.md#7-supersession-guard)).

| Metric | Target |
|---|---|
| Recall@8, MRR, and nDCG@8, overall and per query family | None; tracked to tune ranking |
| Guard recall: a hit on a superseded note carries a `superseded_by` guard, and a hit on a successor carries `supersedes` guards for the notes it replaced | 100%, hard |
| Guards the ground truth does not have | 0, soft |
| Newest successor: the `superseded_by` guard names the end of the chain | 100%, hard |

### 3.2 `lint` (offline)

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
| BW404, BW406 | A topic folder without a topic page, which also raises BW408; an orphan note, which also raises BW405 |
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

### 3.3 `consolidation` (removed)

Removed with format 3. Consolidation is now an agent editing notes with its own tools ([write path §4](write-path.md#4-consolidation)), so there are no ops to check. Whether an agent writes good notes belongs to the `agent` suite (§3.5).

### 3.4 `perf` (offline)

The suite generates a brain of each size given with `--sizes` and measures the budgets in [engineering §5](engineering.md#5-performance-budgets). Budgets apply at 10k notes and are relaxed 2× for smaller brains. Misses are soft.

| Metric | Measured over | Budget at 10k |
|---|---|---|
| `rebuild_s` | One full index rebuild | 30 s |
| `freshness_ms` | p95 of 20 scans of the unchanged tree | 150 ms |
| `incremental_ms` | p95 of 10 one-file edits, each followed by a scan of that file | 50 ms |
| `search_p95_ms` | Up to 200 planted queries plus 50 short three-word queries | 50 ms |
| `read_p95_ms` | 100 note reads | 20 ms |
| `orient_p95_ms` | 50 orientations | 30 ms |
| `lint_warm_s` | A second full lint | 1 s |
| `search_p50_ms`, `lint_cold_s` | Reported only | — |

### 3.5 `agent`

Reserved for end-to-end runs of real hosts with the plugin installed on a fixture brain. It is not built. `brain bench agent`, with or without `--backends`, reports the suite as skipped, and these checks are done by hand before releases.

## 4. Data

- The generator (`brainwiki/bench/_generate.py`) is seeded, and the same seed writes byte-identical files. Notes are about invented software projects, in common English words plus generated pseudo-words drawn with a Zipf distribution, so FTS ranks them like real prose.
- Each note has a summary, a `## Facts` list, and a `## Related` list of prose links. Body links mostly stay inside the note's own topic, and every topic has a topic page.
- Supersession chains of two to four notes make up about 3% of links, written as `bw-superseded_by` on the older notes.
- Pending episodes, one per 50 notes and at least 5, record `inputs` as `local` or `unknown`.
- The generator records the ground truth, including the chains and the queries. Queries come in three families: a token planted in one note (`exact`), a note's title (`title`), and a token planted three, two, and one times in three notes, for graded relevance (`group`).
- The `lint` suite starts from a separate hand-written format-3 brain about a fictional project.

## 5. Output

- `--out DIR`, by default a new temporary folder, receives `results.json` and `report.md`. `results.json` holds the schema version, the brain-wiki version, the time, the command, the sizes, each suite's status and details, and one record per metric (suite, case, backend, metric, value, target, pass, hard). `report.md` has a status table and one table per suite, and a skipped suite says why.
- The generated brains go in `DIR/work/`. The bench points brain-wiki's config, state, cache, and data directories there, so a run never touches the user's own brains.
- `--sizes` sets the brain sizes for `retrieval` and `perf`, such as `1k,10k` or `300`. The default is `1k` and the minimum 50.
- The terminal shows one line per metric, or with `-q` a summary and the failures. The command exits 1 when a hard target fails.
- `brain bench --compare A B` prints the metric changes between two `results.json` files and exits 1 when any metric went from pass to fail.

## 6. When the bench runs

| When | Command |
|---|---|
| Every change, through `scripts/check.py` and CI | `brain bench retrieval lint --sizes 300` |
| Performance work, and before a release | `brain bench perf --sizes 10k` |
