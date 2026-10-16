---
id: 01M3250V00V94879DY5Q5F5N8C
type: decision
title: "D18: A synthetic, deterministic bench"
aliases: ["D18"]
source: "docs/decision/d18-synthetic-bench.md"
---
# D18: A synthetic, deterministic bench

Status: accepted.
Argued in: [[eval-bench|eval bench]].

The bench generates its data from a seed or uses hand-written fictional brains, and its graders are deterministic code. The data carries no personal information or license terms, and every run is reproducible. Model comparisons are not built; when they are, they will run through the headless presets that harvest uses.

### Alternatives considered

- Public datasets only.
- An LLM judging results by default.
