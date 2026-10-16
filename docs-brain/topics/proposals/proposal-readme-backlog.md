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
| Retrieval | Optional embeddings (`sqlite-vec`, a local model) with rank fusion, guards applied the same way; a file watcher in long-running processes for very large brains; cross-brain search with results labeled by brain | [[index-and-retrieval\|04]] |
| Consolidation | A headless run of the prepare → edit → validate → done loop with a configured model; clustering as a selection heuristic; MCP tools for rule proposals (list, show, accept with user confirmation, reject) so an agent can walk the user through them | [[05-4-consolidation\|05 §4]] |
| Writing over MCP | A tool that writes a note and validates it in one call, minting the `id` of a new note, for agents without file access (such as remote MCP clients) | [[05-23-direct-edits\|05 §2.3]] |
| Provenance | `brain forget --session <id>`: list, with a dry run, the episodes from one session and the notes whose `bw-sources` cite only them, for the user to edit or delete | — |
| Hosts | Native OpenClaw memory provider (memory slot); Claude API memory-tool handler; Cursor plugin; session readers for OpenClaw and Cursor; MCP resources | [[agent-integrations\|08]] |
| Harvest | Orientation shows how many of the calling host's sessions are not yet harvested, from a cached count refreshed at most hourly, as a nudge to run the recipe | [[05-22-harvesting-sessions\|05 §2.2]] |
| Importers | Chat exports, email, documents; authority ordering (specs over notes over chat) when sources disagree | [[import\|09]] |
