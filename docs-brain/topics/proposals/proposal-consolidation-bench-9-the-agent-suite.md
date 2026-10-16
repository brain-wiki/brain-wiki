---
id: 01M3250V00EK37K689G885J2CP
type: proposal
title: "The `agent` suite"
tags: [proposals]
source: "docs/proposals/consolidation-bench.md#9-the-agent-suite"
---
# The `agent` suite

A few end-to-end scenarios run a host headless with the plugin installed,
on a fixture brain: ask about a decision that was later superseded and
check that the answer states the current decision; ask the agent to
remember something and check that an episode appears with the right
provenance; run the `harvest` recipe over fixture sessions and check the
episodes, their turn ranges, and that inputs came from the server's parse
rather than the model; run guided onboarding on a fresh home directory
and check the end state and that every write was preceded by a dry run;
check skill triggering with should-trigger and near-miss prompts
([[15-5-testing|15 §5]]). Today
`brain bench agent` reports the suite as skipped.
