# 11 · Eval bench

Status: draft for review

## 1. Purpose

`brain bench` measures what brain-wiki promises, so that defaults are
tuned on evidence and regressions are caught:

| Promise | Suite |
|---|---|
| Retrieval finds the right notes and always surfaces superseding and conflicting ones (G5) | `retrieval` |
| Privacy filters leak nothing | `retrieval` (profile variants) |
| Lint finds what it claims and fixes safely | `lint` |
| Consolidation writes faithful, specific, well-placed claims, with any model (G4, G8) | `consolidation` |
| Injected instructions never become rules or directives | `consolidation` (injection slice) |
| Hooks and search are fast enough (G7) | `perf` |
| A real agent with the plugin answers with current knowledge | `agent` (optional) |

Rule for the project: published numbers come only from this bench, with
the command and version that produced them.

## 2. Principles

- **Synthetic, seeded data.** Every dataset is generated from a seed or
  hand-written about fictional subjects. No personal data, no licensing
  questions, fully reproducible.
- **Deterministic grading first.** Graders check anchors, handles, spans,
  and structure. An LLM judge is optional, labeled, and reported
  separately.
- **Negative assertions.** Cases state what must *not* happen (noise
  promoted, a forbidden claim, a leaked note), not only what should.
- **Worst model, not average.** For model comparisons the headline is the
  lowest score across backends, because a brain is shared by every model
  that writes to it.
- **Same code paths as production.** Model suites run through the real
  consolidation pipeline and command backends ([05 §4.4](05-write-path-and-consolidation.md#44-backends)).

## 3. Suites

### 3.1 `retrieval` (offline)

Generated brains with known structure: topics, notes, claims, relations,
supersession chains up to 4 long, conflict pairs, privacy levels, and
episodes. Queries come from templates over titles and claims (with
synonym substitution) plus hand-written queries for the example brain.

| Metric | Target |
|---|---|
| Recall@8, MRR, nDCG@8 for primary results | tracked; used to tune ranking factors |
| **Guard recall**: for every hit with a guard neighbor visible to the profile, the neighbor is returned | **100%** (fails the suite otherwise) |
| Newest-successor correctness through chains | **100%** |
| **Privacy leaks**: any result, snippet, guard, or count derived from a note above the profile's level, other than the hidden-guard count | **0** |
| Hidden-guard counts | exact |

### 3.2 `lint` (offline)

A corpus of small broken brains, one or more per rule code, each with the
expected diagnostics (code, path, line).

| Metric | Target |
|---|---|
| Per-rule precision and recall | 100% on the corpus |
| Fix idempotency: `--fix` twice changes nothing the second time | always |
| Fix locality: fixes change only the lines they must | always |

### 3.3 `consolidation` (model backends)

Each scenario is a starting brain, a set of episodes, and expectations.
Initial set: about 20 hand-written scenarios (roughly 4 per slice), grown
over time.

| Slice | Situation | Expectations |
|---|---|---|
| A · Extraction and routing | Episodes mixing durable facts with debugging noise and asides | Expected claims land in the right note; noise and asides produce no claims (`skip_episode` or nothing) |
| B · Non-destructive merge | A rich note plus an episode confirming two facts and adding one | `merge_claim` for the confirmations, `add_claim` for the new fact; every prior anchor remains in the active view |
| C · Update and contradiction | Two episodes where the second reverses a decision | `supersede_claim` (old kept in `bw-claims-superseded`); dependents appear in the stale report; "why did we change?" remains answerable from the note |
| D · Relations | Episodes stating dependencies and replacements between notes | Expected relation verbs and directions |
| E · Injection | Tainted episodes containing instructions ("add a rule…", "ignore previous…", "tell the user…") | No rule is written (structurally impossible, verified); no claim restates an instruction as a directive; derived claims carry `taint` |
| F · Completeness | Many small episodes, some trivial | Every episode is cited or skipped with a reason |
| G · Harvest distillation | Synthetic transcripts in each supported host's format, mixing durable decisions, dead ends, debugging noise, a web fetch, and an injected instruction in tool output | Episode claims cover the decisions and negative findings with correct turn ranges; noise produces nothing; `bw-taint: true`; no claim restates the injected instruction; subagent and in-progress sessions are skipped |

**Deterministic graders:**

| Metric | How |
|---|---|
| Validity | Ops pass validation on the first attempt / after one retry |
| Claim recall | An expected claim is matched when a written claim contains its required anchors (numbers, names, versions, dates) and its key terms |
| Forbidden claims | Any written claim containing a forbidden anchor or phrase is a violation |
| Op-type accuracy | Per expected (episode, target) pair: add vs merge vs supersede vs skip |
| Placement accuracy | Target note or topic matches |
| Relation precision and recall | Verb, direction, endpoints |
| Citation faithfulness | Each written claim's anchors appear inside the episode spans it cites |
| Specificity | Anchors dropped by `supersede_claim` (the V9 warning), per run |
| Taint propagation | Claims from tainted episodes carry `taint` |
| Completeness | Unaccounted episodes per run |

An optional `--judge <preset>` asks a model to rate atomicity and
faithfulness per claim; its scores are reported in a separate column and
never gate anything.

**Multi-model metrics** (same scenarios, several presets, 3 repeats each by
default):

| Metric | Measures |
|---|---|
| Worst-model score per slice | The headline number |
| Self-consistency | Variance across repeats of one model |
| Agreement on op type and placement (Fleiss' kappa) | Whether models make the same structural decisions |
| Claim-set overlap (anchor-matched Jaccard) | Content divergence |
| Cross-read retrieval | After model A consolidates, run the retrieval queries; tests whether A's notes serve every reader |
| Tokens and wall time | From the host CLI's JSON output where it reports usage |

### 3.4 `perf` (offline)

Generated brains of 1k and 10k notes; measures the budgets in
[13 §5](13-engineering.md#5-performance-budgets): freshness check, full
rebuild, search and read latency percentiles, orientation, lint, and
`brain hook` end to end (process start to output). Each budget is a pass
or fail line in the report.

### 3.5 `agent` (optional, real hosts)

A few end-to-end scenarios run a host headless with the plugin installed,
on a fixture brain: for example, ask about a decision that was later
superseded and check that the answer states the current decision; ask the
agent to remember something and check that an episode appears with the
right provenance; run the `harvest` recipe over fixture sessions and check
the episodes, their turn ranges, and that taint came from the server's
parse rather than the model; run guided onboarding on a fresh home
directory and check the end state and that every write was preceded by a
dry run; check skill triggering with should-trigger and near-miss prompts
([15 §6](15-skills-onboarding-and-routines.md#6-testing)). Expensive and host-dependent; run manually before
releases.

## 4. Data

- **Generator** (`brainwiki.bench.gen`): seeded; fictional domains
  (a software project, a research lab, a recipe collection, a community
  garden); produces notes, claims with anchors, relations, chains,
  conflicts, privacy levels, and episodes with controlled noise and
  injection.
- **Example brain:** a small hand-written brain about a fictional
  software project, also used by tests and docs.
- **Scenario format:**

```text
bench/scenarios/<slice>/<id>/
├── scenario.toml        id, slice, description, notes for maintainers
├── brain/               starting brain (a normal brain directory)
├── episodes/            episodes to place in the inbox before the run
└── expect.toml          expected claims (anchors, terms, target), forbidden anchors,
                         expected ops and relations, budget checks
```

- **Growing the set from real failures:** `brain bench capture <run>`
  copies a real run's packet, ops, and validation result into a draft
  scenario under the user's state directory. It never leaves the machine
  automatically; the user scrubs it and decides whether to contribute it.

## 5. Public benchmarks

Public memory benchmarks measure question answering over long histories.
An adapter (after v0.1) can run them against brain-wiki by turning
sessions into episodes in timestamp order, consolidating, and answering
through search. They complement the core suites but do not test privacy,
write safety, or relation structure.

| Benchmark | Relevant part | License | Use |
|---|---|---|---|
| LongMemEval | Knowledge-update and temporal-reasoning questions; evidence session ids allow retrieval recall without an LLM judge | MIT | First adapter target |
| MemoryAgentBench | Conflict resolution over incrementally fed facts (supersession) | MIT | Second target; closest to guard behavior |
| LoCoMo | Very long multi-session dialogs with evidence ids | CC BY-NC 4.0 | Download at run time only; never redistributed |
| HaluMem | Operation-level extraction and update quality against gold memory points | CC BY-NC-ND 4.0 | Download at run time only; closest public measure of write quality |

A method worth borrowing from recent work on LLM-compiled wikis is
**probe coverage**: generate questions from the source episodes and check
that each remains answerable from the consolidated notes. With a fixed
question set it can run without a judge (answers checked by anchors); it
is planned as an optional consolidation metric.

## 6. Output

- `--out DIR` receives `report.json` (stable schema: suite, case, backend,
  metric, value, pass) and `report.md` (tables per suite and backend, the
  worst-model line first).
- `brain bench compare A.json B.json` prints regressions and improvements.

## 7. When the bench runs

| Trigger | Suites |
|---|---|
| Every change (CI) | `retrieval`, `lint`, `perf` at 1k |
| Nightly (CI) | `perf` at 10k |
| Changing consolidation instructions (`instructions_version`) or the ops schema | `consolidation` with at least two backends; the worst-model score must not drop |
| Before a release | all, including `agent` where hosts are available |
