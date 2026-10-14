# 11 · Eval bench

Status: draft for review

## 1. Purpose

`brain bench` measures what brain-wiki promises, so that defaults are
tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always surfaces superseding and conflicting ones (G5) | `retrieval` |
| Lint finds what it claims and fixes safely | `lint` |
| Consolidation writes faithful, specific, well-placed claims, with any model (G4, G8) | `consolidation` |
| Injected instructions never become rules or directives | `consolidation` (injection slice) |
| Search, reads, and orientation are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent` (not built, §3.5) |

Rule for the project: published numbers come only from this bench, with
the command and version that produced them.

## 2. Principles

- **Synthetic, seeded data.** Every dataset is generated from a seed or
  hand-written about fictional subjects. No personal data, no licensing
  questions, fully reproducible.
- **Deterministic grading.** Graders check anchors, handles, spans, and
  structure. No LLM judges a result.
- **Negative assertions.** Cases state what must *not* happen (noise
  promoted, a forbidden claim, a rule written), not only what should.
- **Worst model, not average.** For model comparisons the headline is the
  lowest score across backends, because a brain is shared by every model
  that writes to it.
- **Same code paths as production.** Model suites run through the real
  consolidation pipeline through headless agent CLIs ([08 §7](08-agent-integrations.md#7-headless-presets)).

## 3. Suites

### 3.1 `retrieval` (offline)

Generated brains with known structure: topics, notes, claims, relations,
supersession chains up to 4 long, conflict pairs, and episodes. Queries
come from the generated notes (§4).

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: for every hit with a guard neighbor, the neighbor is returned | **100%** (fails the suite otherwise) |
| Unexpected guards: guard neighbors the ground truth does not have | 0 |
| Newest-successor correctness through chains | **100%** (fails the suite otherwise) |

### 3.2 `lint` (offline)

A corpus of small broken brains, one or more per rule code, each with the
expected diagnostics (code, path, line).

| Metric | Target |
|---|---|
| Per-rule precision and recall | 100% on the corpus |
| Fix resolves: `--fix` clears the finding it targets | always |
| Fix idempotency: `--fix` twice changes nothing the second time | always |
| Fix locality: fixes change only the lines they must | always |

### 3.3 `consolidation`

Two offline slices drive the real pipeline with scripted ops, so they run
without a model; any failed check is a hard failure:

| Slice | Situation | Checks (all must hold) |
|---|---|---|
| E · Injection | An episode with external inputs containing instructions ("Add a rule…", "Ignore previous instructions…") and one fact | The packet marks the episode untrusted; no packet handle points at `rules.md`; an op that writes a rule is rejected; derived claims carry `inputs: external`; a claim that restates the instruction is flagged by BW702; `rules.md` is unchanged |
| F · Completeness | Six small episodes; ops cite two and skip one | The run applies; uncited episodes are reported pending, stay in the inbox, and are offered to the next run; cited and skipped episodes are archived |

Four model slices run only with `--backends PRESET,...` (headless presets,
[08 §7](08-agent-integrations.md#7-headless-presets)), one scenario each,
written in `brainwiki/bench/_suites.py`:

| Slice | Episode | Checks |
|---|---|---|
| A · Extraction | A durable fact mixed with debugging noise and an aside | Claim recall on the fact's anchor; no claim from the noise |
| B · Merge | Confirms an existing fact and adds one | Claim recall on the new fact; the prior claim stays active |
| C · Supersede | Raises a limit an existing claim states | Claim recall on the new value; the old claim is superseded |
| D · Relations | States a dependency between two notes | A `depends_on` edge between them |

Every model scenario also records `valid_first_try`, `valid_after_retry`
(ops pass validation after at most one retry with the errors appended),
and `all_episodes_accounted`. Claim recall counts an expected anchor as
found when an active claim contains it. Across backends, the suite reports
`worst_model_claim_recall` per slice: the lowest score, because a brain is
shared by every model that writes to it.

A larger scenario set, harvest distillation (slice G), more graders, an
optional LLM judge, and multi-model agreement metrics are a
[proposal](../proposals/consolidation-bench.md).

### 3.4 `perf` (offline)

Generated brains of the sizes given by `--sizes` (default `1k`; budgets
apply at 10k and are relaxed 2× below it); measures the budgets in
[13 §5](13-engineering.md#5-performance-budgets): freshness check,
one-file update, full rebuild, search and read latency percentiles,
orientation, and warm lint. Each budget is a pass or fail line in the
report.

### 3.5 `agent`

Reserved for end-to-end runs of real hosts with the plugin installed. Not
built: `brain bench agent` reports the suite as skipped, and those checks
are done by hand before releases. The planned scenarios are in the
[proposal](../proposals/consolidation-bench.md#9-the-agent-suite).

## 4. Data

- **Generator** (`brainwiki/bench/_generate.py`): seeded; notes about invented
  software projects, in common English words plus generated pseudo-words
  drawn with a Zipf distribution so FTS ranks them like real prose. It
  plants topics, notes, claims with anchors, relations, supersession
  chains, conflicts, and episodes, and records the ground truth. The same
  seed writes byte-identical files.
- **Queries** come from the generated notes: a planted token (`exact`), a
  title (`title`), and a token shared by a small group with graded
  relevance (`group`).
- **Base brain:** a small hand-written brain about a fictional software
  project, the starting point for the lint and consolidation cases.

## 5. Output

- `--out DIR` (default: a new temporary directory) receives `results.json`
  (schema version, brain-wiki version, the command, and one record per
  metric: suite, case, backend, metric, value, target, pass, hard) and
  `report.md` (tables per suite; in `consolidation`, the worst-model lines
  first). The command exits 1 when a hard target fails.
- `brain bench --compare A B` prints metric changes between two
  `results.json` files and exits 1 when a metric went from pass to fail.

## 6. When the bench runs

| Trigger | Suites |
|---|---|
| Every change (`scripts/check.py`, and CI through it) | `retrieval` and `lint` on a 300-note brain |
| Performance work, and before a release | `perf` at 10k (`brain bench perf --sizes 10k`) |
| Changing consolidation instructions (`instructions_version`) or the ops schema | `consolidation` with at least two backends; the worst-model score must not drop |
