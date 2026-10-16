---
id: 01M3250V005RN6A8DKKPMHRBCF
type: design
title: "Principles"
aliases: ["Eval bench §2"]
source: "docs/design/eval-bench.md#2-principles"
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
  built, run through headless agent CLIs ([[agent-integrations-7-headless-presets|agent integrations §7]]).
