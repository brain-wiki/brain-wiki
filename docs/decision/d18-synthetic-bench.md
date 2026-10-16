# D18: A synthetic, deterministic bench

Status: accepted.
Argued in: [eval bench](../design/eval-bench.md).

The bench generates its data from a seed or uses hand-written fictional brains, and its graders are deterministic code. The data carries no personal information or license terms, and every run is reproducible. Model comparisons are not built; when they are, they will run through the headless presets that harvest uses.

## Alternatives considered

- Public datasets only.
- An LLM judging results by default.
