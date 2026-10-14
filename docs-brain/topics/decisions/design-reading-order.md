---
id: 01M3250V008EVJRQ2TVFDBZRZB
type: reference
title: "Reading order"
tags: [decisions]
source: "docs/design/README.md#reading-order"
bw-part_of:
  - "[[decisions]]"
---
# Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [[overview\|Overview]] | Problem, goals, non-goals, principles, scenarios, glossary |
| 02 | [[brain-format\|Brain format]] | The on-disk contract: layout, manifest, notes, claims, relations, episodes, rules (normative) |
| 03 | [[config-and-storage\|Config and storage]] | User config, multiple brains, brain selection, machine state, git, desktop sync tools |
| 04 | [[index-and-retrieval\|Index and retrieval]] | SQLite schema, freshness, search ranking, guard co-retrieval, read, orientation |
| 05 | [[write-path-and-consolidation\|Write path and consolidation]] | Episodes, provenance and taint, ops, consolidation backends, validation, review, undo |
| 06 | [[lint-and-reports\|Lint and reports]] | Rules, profiles, fixes, generated reports, pre-commit use |
| 07 | [[interfaces\|Interfaces]] | CLI commands, MCP tools and schemas, agent profiles, error model |
| 08 | [[agent-integrations\|Agent integrations]] | Plugin bundle, instruction block, `brain connect`, harvest; one page per host in `agents/` |
| 09 | [[import\|Import]] | Adopting existing Markdown folders and Obsidian vaults |
| 10 | [[security-and-privacy\|Security and privacy]] | Threat model and mitigations |
| 11 | [[eval-bench\|Eval bench]] | Retrieval, lint, consolidation, and performance suites |
| 12 | [[visualizer\|Visualizer]] | 3D brain map |
| 13 | [[engineering\|Engineering]] | Repo layout, dependencies, packaging, testing, performance budgets, release |
| 14 | [[roadmap-and-open-questions\|Roadmap and open questions]] | Implementation milestones and status, decisions needed, verification items |
| 15 | [[skills-and-onboarding\|Skills and onboarding]] | The three skills, the guided setup flow, and `brain doctor --json` |

Normative documents (02, and the schemas in 05 and 07) use MUST, SHOULD,
and MAY as in RFC 2119. The others explain and justify.
