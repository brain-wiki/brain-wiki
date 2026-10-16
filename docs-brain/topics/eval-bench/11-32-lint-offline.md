---
id: 01M3250V009M05W3Q3R1ZV8EE7
type: design
title: "`lint` (offline)"
aliases: ["11 §3.2"]
tags: [eval-bench]
source: "docs/design/11-eval-bench.md#32-lint-offline"
---
# `lint` (offline)

A corpus of small broken brains, one or more per rule code, each with the
expected diagnostics (code, path, line).

| Metric | Target |
|---|---|
| Per-rule precision and recall | 100% on the corpus |
| Fix resolves: `--fix` clears the finding it targets | always |
| Fix idempotency: `--fix` twice changes nothing the second time | always |
| Fix locality: fixes change only the lines they must | always |
