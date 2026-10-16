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
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, links between notes, supersession, or the index; can run alongside. |
| JSON Schema over frontmatter only | Covers only the `SCHEMA_CODES` rules, and even those need the index to resolve links and find duplicate ids. |
| LLM-based lint | Non-deterministic, slow, and needs a model; the bench covers semantic quality instead. |
