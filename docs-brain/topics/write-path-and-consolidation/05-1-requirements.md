---
id: 01M3250V00KC38BAEW3T0W4T25
type: design
title: "Requirements (Write path and consolidation)"
aliases: ["05 §1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#1-requirements"
bw-part_of:
  - "[[write-path-and-consolidation]]"
---
# Requirements (Write path and consolidation)

| # | Requirement | Why |
|---|---|---|
| W1 | Writing an episode must never block or fail an agent's work, and never conflict across agents or devices. | Agents log mid-task, several at once, on several devices. |
| W2 | Curated notes change only through operations the engine can validate, explain, and undo. | Whole-file LLM rewrites lose detail a little at a time and cannot be audited. |
| W3 | Untrusted content can never become a standing directive without the user. | One poisoned web page must not steer every future session (G4). |
| W4 | No information is deleted by consolidation. Changes in belief are recorded as supersession. | The history of a fact is part of the fact. |
| W5 | Every run is reproducible from its record: inputs, proposals, decisions, outputs. | Debugging and multi-model comparison (G8). |
| W6 | Any LLM the user already runs can do the proposing, with no API keys. | D8; G6. |
