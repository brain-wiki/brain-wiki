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
- **Deterministic grading first.** Graders check anchors, handles, spans,
  and structure. An LLM judge is optional, labeled, and reported
  separately.
- **Negative assertions.** Cases state what must *not* happen (noise
  promoted, a forbidden claim, a leaked note), not only what should.
- **Worst model, not average.** For model comparisons the headline is the
  lowest score across backends, because a brain is shared by every model
  that writes to it.
- **Same code paths as production.** Model suites run through the real
  consolidation pipeline and command backends ([[05-44-backends|05 §4.4]]).

## Relations
- part_of [[eval-bench]]
