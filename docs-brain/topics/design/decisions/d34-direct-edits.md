---
id: 01M3250V00VK0CKAJ8E8CS98ZC
type: decision
title: "D34: Agents edit notes directly"
aliases: ["D34"]
source: "docs/decision/d34-direct-edits.md"
---
# D34: Agents edit notes directly

Status: accepted.
Argued in: [[write-path|write path]].

Agents with `edit` edit notes directly and run `brain validate`, which checks frontmatter against the schema; orientation teaches the schema to agents that may edit. Consolidation is an optional helper (`--prepare`, then `--done`), and the inbox is optional capture.

### Alternatives considered

Validated ops as the curated write path; `brain check` with a loss guard and a run per edit
