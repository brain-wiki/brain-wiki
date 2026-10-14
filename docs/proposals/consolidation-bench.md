# Consolidation bench, full design

Status: designed, not built · Extends [11](../design/11-eval-bench.md)

Doc 11 describes the bench as built: four model scenarios (slices A–D),
two offline slices (E, F), and a handful of graders. This proposal holds
the rest of the original design.

## 1. Scenario set

About 20 hand-written scenarios, roughly 4 per slice, grown over time,
instead of one scenario per model slice. Each scenario is a starting
brain, a set of episodes, and expectations.

| Slice | Situation | Expectations beyond what doc 11 checks |
|---|---|---|
| A · Extraction and routing | Episodes mixing durable facts with debugging noise and asides | Expected claims land in the right note, not just somewhere |
| B · Non-destructive merge | A rich note plus an episode confirming two facts and adding one | `merge_claim` for the confirmations, `add_claim` for the new fact; every prior anchor remains in the active view |
| C · Update and contradiction | Two episodes where the second reverses a decision | Dependents appear in the stale report; "why did we change?" remains answerable from the note |
| D · Relations | Episodes stating dependencies and replacements between notes | Expected verbs and directions for replacements too |
| E · Injection | Tainted episodes containing instructions, run through real models | No claim restates an instruction as a directive |
| F · Completeness | Many small episodes, some trivial, run through real models | Every episode is cited or skipped with a reason |
| G · Harvest distillation | Synthetic transcripts in each supported host's format, mixing durable decisions, dead ends, debugging noise, a web fetch, and an injected instruction in tool output | Episode claims cover the decisions and negative findings with correct turn ranges; noise produces nothing; `bw-taint: true`; no claim restates the injected instruction; subagent and in-progress sessions are skipped |

## 2. Scenario format

Scenarios move out of code into files:

```text
bench/scenarios/<slice>/<id>/
├── scenario.toml        id, slice, description, notes for maintainers
├── brain/               starting brain (a normal brain directory)
├── episodes/            episodes to place in the inbox before the run
└── expect.toml          expected claims (anchors, terms, target), forbidden anchors,
                         expected ops and relations
```

## 3. More deterministic graders

| Metric | How |
|---|---|
| Claim recall with key terms | A claim matches when it holds the required anchors and the key terms |
| Op-type accuracy | Per expected (episode, target) pair: add vs merge vs supersede vs skip |
| Placement accuracy | Target note or topic matches |
| Relation precision and recall | Verb, direction, endpoints |
| Citation faithfulness | Each written claim's anchors appear inside the episode spans it cites |
| Specificity | Anchors dropped by `supersede_claim` (the V9 warning), per run |
| Taint propagation | Claims from tainted episodes carry `taint`, for model runs |

## 4. Optional judge

`--judge <preset>` asks a model to rate atomicity and faithfulness per
claim. Its scores are reported in a separate column and never gate
anything.

## 5. Multi-model metrics

Same scenarios, several presets, 3 repeats each by default:

| Metric | Measures |
|---|---|
| Worst-model score per slice, over every grader | The headline number |
| Self-consistency | Variance across repeats of one model |
| Agreement on op type and placement (Fleiss' kappa) | Whether models make the same structural decisions |
| Claim-set overlap (anchor-matched Jaccard) | Content divergence |
| Cross-read retrieval | After model A consolidates, run the retrieval queries; tests whether A's notes serve every reader |
| Tokens and wall time | From the host CLI's JSON output where it reports usage |

## 6. Growing the set from real failures

`brain bench capture <run>` copies a real run's packet, ops, and
validation result into a draft scenario under the user's state
directory. It never leaves the machine automatically; the user scrubs it
and decides whether to contribute it.

## 7. Generator domains

The generator writes notes about invented software projects only. More
fictional domains (a research lab, a recipe collection, a community
garden) would test ranking on vocabularies that are not software.

## 8. Retrieval queries

Queries with synonym substitution, plus hand-written queries for the
example brain, in addition to the generated exact, title, and group
queries.

## 9. The `agent` suite

A few end-to-end scenarios run a host headless with the plugin installed,
on a fixture brain: ask about a decision that was later superseded and
check that the answer states the current decision; ask the agent to
remember something and check that an episode appears with the right
provenance; run the `harvest` recipe over fixture sessions and check the
episodes, their turn ranges, and that taint came from the server's parse
rather than the model; run guided onboarding on a fresh home directory
and check the end state and that every write was preceded by a dry run;
check skill triggering with should-trigger and near-miss prompts
([15 §5](../design/15-skills-and-onboarding.md#5-testing)). Today
`brain bench agent` reports the suite as skipped.
