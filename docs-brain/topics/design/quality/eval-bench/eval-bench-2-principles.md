---
id: 01M3250V005RN6A8DKKPMHRBCF
type: design
title: "Principles"
aliases: ["Eval bench §2"]
source: "docs/design/eval-bench.md#2-principles"
---
# Principles

- Synthetic data. Every dataset is generated from a seed or written by hand about fictional subjects, so it holds no personal data, raises no license questions, and is reproducible (D18).
- Deterministic grading. Graders check ids, ranks, diagnostics, and file diffs. No model judges a result.
- Negative cases. Cases also state what must not happen: a guard the ground truth lacks, a finding on clean text, a fix that touches other lines.
- The same code as production. Suites call the functions the CLI and MCP server use: search, read, orient, lint, and fix.
- Model comparisons are not built. When they are, they will run agent CLIs the way scheduled consolidation does ([[agent-integrations-7-unattended-agent-mode|agent integrations §7]]), and the headline will be the lowest score across models, because every model that writes to a brain shares it.
