---
id: 01M3250V00KRPKJSFGW52BGVZ4
type: design
title: "Alternatives considered (Lint and reports)"
aliases: ["Lint and reports §9"]
source: "docs/design/lint-and-reports.md#9-alternatives-considered"
---
# Alternatives considered (Lint and reports)

| Option | Why not |
|---|---|
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, links between notes, or supersession. It can run alongside. |
| JSON Schema over frontmatter | Covers part of `SCHEMA_CODES`. Duplicate ids and link targets still need the index. |
| LLM-based lint | Non-deterministic, slow, and needs a model ([[d08-no-model-calls\|D8]]). The bench covers semantic quality. |
