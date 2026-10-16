# Eval bench

Status: draft for review

## 1. Purpose

`brain bench` measures what brain-wiki promises, so that defaults are
tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always surfaces the notes that supersede them (G5) | `retrieval` |
| Lint finds what it claims and fixes safely | `lint` |
| Search, reads, and orientation are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent` (a stub that reports skipped, §3.5) |

Rule for the project: published numbers come only from this bench, with
the command and version that produced them.

## 2. Principles

- **Synthetic, seeded data.** Every dataset is generated from a seed or
  hand-written about fictional subjects. No personal data, no licensing
  questions, fully reproducible.
- **Deterministic grading.** Graders check ids, ranks, diagnostics, and
  file diffs. No LLM judges a result.
- **Negative assertions.** Cases state what must *not* happen (a guard the
  ground truth lacks, a finding on clean text, a fix that touches other
  lines), not only what should.
- **Worst model, not average.** For model comparisons, once a model suite
  exists, the headline is the lowest score across backends, because a brain
  is shared by every model that writes to it.
- **Same code paths as production.** Suites call the functions the CLI and
  MCP server use (search, read, orient, lint, fix). Model suites, when
  built, run through headless agent CLIs ([agent integrations §7](agent-integrations.md#7-headless-presets)).

## 3. Suites

### 3.1 `retrieval` (offline)

Generated format-3 brains with known structure: topics with hubs, notes,
supersession chains (`bw-superseded_by`, up to 4 notes long), body links,
and episodes. Queries come from the generated notes (§4). The only guard is
supersession ([brain format §7](brain-format.md#7-supersession-guard)).

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: every hit on a superseded note carries a `superseded_by` guard, and every hit on a successor carries `supersedes` guards for the notes it replaced | **100%** (fails the suite otherwise) |
| Unexpected guards: guards the ground truth does not have | 0 |
| Newest-successor correctness through chains | **100%** (fails the suite otherwise) |

### 3.2 `lint` (offline)

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

### 3.3 `consolidation` (removed)

Removed with format 3. Consolidation is now an agent editing notes with its
own tools ([write path §4](write-path.md#4-consolidation)), so there are no ops to
validate or claims to recall. What remains to measure, whether a real agent
writes good notes, belongs to the `agent` suite (§3.5).

### 3.4 `perf` (offline)

Generated brains of the sizes given by `--sizes` (default `1k`; budgets
apply at 10k and are relaxed 2× below it); measures the budgets in
[engineering §5](engineering.md#5-performance-budgets): freshness check,
one-file update, full rebuild, search and read latency percentiles,
orientation, and warm lint. Each budget is a pass or fail line in the
report.

### 3.5 `agent`

Reserved for end-to-end runs of real hosts with the plugin installed on a
fixture brain. Not built: `brain bench agent` (with or without `--backends`)
reports the suite as skipped, and those checks are done by hand before
releases.

## 4. Data

- **Generator** (`brainwiki/bench/_generate.py`): seeded; notes about invented
  software projects, in common English words plus generated pseudo-words
  drawn with a Zipf distribution so FTS ranks them like real prose. It
  writes format-3 notes (a summary, a `## Facts` list, a `## Related` list
  of prose links, mostly within the note's topic), hubs, supersession chains
  as `bw-superseded_by` on the older notes (about 3% of links), and pending
  episodes, and records the ground truth. The same seed writes
  byte-identical files.
- **Queries** come from the generated notes: a planted token (`exact`), a
  title (`title`), and a token shared by a small group with graded
  relevance (`group`).
- **Base brain:** a small hand-written format-3 brain about a fictional
  software project, the starting point for the lint cases.

## 5. Output

- `--out DIR` (default: a new temporary directory) receives `results.json`
  (schema version, brain-wiki version, the command, and one record per
  metric: suite, case, backend, metric, value, target, pass, hard) and
  `report.md` (tables per suite; a skipped suite says why). The command
  exits 1 when a hard target fails.
- `brain bench --compare A B` prints metric changes between two
  `results.json` files and exits 1 when a metric went from pass to fail.

## 6. When the bench runs

| Trigger | Suites |
|---|---|
| Every change (`scripts/check.py`, and CI through it) | `retrieval` and `lint` on a 300-note brain |
| Performance work, and before a release | `perf` at 10k (`brain bench perf --sizes 10k`) |
