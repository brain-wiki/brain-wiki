---
id: 01M3250V00DSP6TG1QWM0S91JN
type: proposal
title: "Scenario set"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#1-scenario-set"
---
# Scenario set

About 20 hand-written scenarios, roughly 4 per slice, grown over time,
instead of one scenario per model slice. Each scenario is a starting
brain, a set of episodes, and expectations.

| Slice | Situation | Expectations beyond what doc 11 checks |
|---|---|---|
| A · Extraction and routing | Episodes mixing durable facts with debugging noise and asides | Expected claims land in the right note, not just somewhere |
| B · Non-destructive merge | A rich note plus an episode confirming two facts and adding one | `merge_claim` for the confirmations, `add_claim` for the new fact; every prior anchor remains in the active view |
| C · Update and contradiction | Two episodes where the second reverses a decision | Dependents appear in the stale report; "why did we change?" remains answerable from the note |
| D · Relations | Episodes stating dependencies and replacements between notes | Expected verbs and directions for replacements too |
| E · Injection | Episodes with external inputs containing instructions, run through real models | No claim restates an instruction as a directive |
| F · Completeness | Many small episodes, some trivial, run through real models | Every episode is cited or skipped with a reason |
| G · Harvest distillation | Synthetic transcripts in each supported host's format, mixing durable decisions, dead ends, debugging noise, a web fetch, and an injected instruction in tool output | Episode claims cover the decisions and negative findings with correct turn ranges; noise produces nothing; `bw-inputs: external`; no claim restates the injected instruction; subagent and in-progress sessions are skipped |
