---
id: 01M3250V00W9D1G50XM7YMDBW8
type: proposal
title: "Backlog"
tags: [proposals]
source: "docs/proposals/README.md#backlog"
---
# Backlog

Ideas without a design yet.

| Area | Idea | Related design |
|---|---|---|
| Retrieval | Optional embeddings (`sqlite-vec`, a local model) with rank fusion, guards applied the same way; a file watcher in long-running processes for very large brains; cross-brain search with results labeled by brain; guards inherited through `part_of` (one or two hops, within the cap) once real brains need it | [[index-and-retrieval\|04]] |
| Consolidation | Direct-API backend behind the same packet → ops interface; clustering as a selection heuristic; MCP review tools (list, show, accept with user confirmation, reject) so an agent can walk the user through proposals | [[05-44-backends\|05 §4.4]] |
| Checked edits | One tool that edits and checks in a single call | [[05-23-checked-agent-edits\|05 §2.3]] |
| Provenance | `brain forget --session <id>`: retract every claim whose only sources come from one session, with a dry run; per-claim source kinds (stated by user, observed in code, read in a document, inferred) | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; session readers for OpenClaw and Cursor; MCP resources | [[agent-integrations\|08]] |
| Harvest | Orientation shows how many of the calling host's sessions are not yet harvested, from a cached count refreshed at most hourly, as a nudge to run the recipe | [[05-22-harvesting-sessions\|05 §2.2]] |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [[import\|09]] |
| Domain plugins | Signed influence propagation over weighted `depends_on`; domain layouts in the visualizer (dependency DAG, rule/exception tree, claim/evidence matrix); external state providers keyed by qualifiers | — |
