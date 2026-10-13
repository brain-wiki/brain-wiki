---
id: 01M3250V00C23YY5TB469XHW2W
type: design
title: "`agent` (optional, real hosts)"
aliases: ["11 §3.5"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#35-agent-optional-real-hosts"
bw-part_of:
  - "[[11-3-suites]]"
---
# `agent` (optional, real hosts)

A few end-to-end scenarios run a host headless with the plugin installed,
on a fixture brain: for example, ask about a decision that was later
superseded and check that the answer states the current decision; ask the
agent to remember something and check that an episode appears with the
right provenance; run the `harvest` recipe over fixture sessions and check
the episodes, their turn ranges, and that taint came from the server's
parse rather than the model; run guided onboarding on a fresh home
directory and check the end state and that every write was preceded by a
dry run; check skill triggering with should-trigger and near-miss prompts
([[15-6-testing|15 §6]]). Expensive and host-dependent; run manually before
releases.
