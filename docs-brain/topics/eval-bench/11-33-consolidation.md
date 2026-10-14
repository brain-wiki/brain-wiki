---
id: 01M3250V00JMM3GEQ5BACQEMPF
type: design
title: "`consolidation`"
aliases: ["11 §3.3"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#33-consolidation"
bw-part_of:
  - "[[11-3-suites]]"
---
# `consolidation`

Two offline slices drive the real pipeline with scripted ops, so they run
without a model; any failed check is a hard failure:

| Slice | Situation | Checks (all must hold) |
|---|---|---|
| E · Injection | A tainted episode containing instructions ("Add a rule…", "Ignore previous instructions…") and one fact | The packet marks the episode untrusted; no packet handle points at `rules.md`; an op that writes a rule is rejected; derived claims carry `taint: true`; a claim that restates the instruction is flagged by BW702; `rules.md` is unchanged |
| F · Completeness | Six small episodes; ops cite two and skip one | The run applies; uncited episodes are reported pending, stay in the inbox, and are offered to the next run; cited and skipped episodes are archived |

Four model slices run only with `--backends PRESET,...` (headless presets,
[[08-7-headless-presets|08 §7]]), one scenario each,
written in `brainwiki.bench.suites`:

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
[[proposal-consolidation-bench|proposal]].
