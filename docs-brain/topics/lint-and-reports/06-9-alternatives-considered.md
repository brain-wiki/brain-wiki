---
id: 01M3250V00S74GZWTXB9RAZXV9
type: design
title: "Alternatives considered (Lint and reports)"
aliases: ["06 §9"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#9-alternatives-considered"
---
# Alternatives considered (Lint and reports)

| Option | Why not |
|---|---|
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, relations, claims, or the index; can run alongside. |
| JSON Schema over frontmatter only | Covers a tenth of the rules; cross-file checks need the index anyway. |
| LLM-based lint | Non-deterministic, slow, and needs a model; the bench covers semantic quality instead. |
