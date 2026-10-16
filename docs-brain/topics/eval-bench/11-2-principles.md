---
id: 01M3250V00825623P0DRZRTX2A
type: design
title: "Principles"
aliases: ["11 §2"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#2-principles"
---
# Principles

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
  built, run through headless agent CLIs ([[08-7-headless-presets|08 §7]]).
