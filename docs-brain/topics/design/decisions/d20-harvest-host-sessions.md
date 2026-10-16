---
id: 01M3250V002HWRYPP0C52NRJ6Q
type: decision
title: "D20: Harvest from the hosts' session stores"
aliases: ["D20"]
source: "docs/decision/d20-harvest-host-sessions.md"
---
# D20: Harvest from the hosts' session stores

Status: accepted.
Argued in: [[write-path-22-harvesting-sessions|write path §2.2, §4.6]], [[agent-integrations-6-harvest|agent integrations §6]].

Hosts' own session stores are a second source of episodes (harvest, with backfill) and can be consulted during consolidation (origin lookup); both opt-in, routed by project, and never required for an episode to make sense. Distillation runs in the host agent via an MCP recipe (brain-wiki still reads, filters, routes, scrubs, and sets provenance), headless from the CLI, or raw; hosts without a reader use a self-read fallback with `inputs: unknown`.

### Alternatives considered

Hooks as the only capture path; agents reading raw transcripts themselves for all hosts; copying transcripts into the brain
