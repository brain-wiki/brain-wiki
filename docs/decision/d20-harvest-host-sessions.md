# D20: Harvest from the hosts' session stores

Status: accepted.
Argued in: [write path §2.2, §4.6](../design/write-path.md#22-harvesting-sessions), [agent integrations §6](../design/agent-integrations.md#6-harvest).

Hosts' own session stores are a second source of episodes (harvest, with backfill) and can be consulted during consolidation (origin lookup); both opt-in, routed by project, and never required for an episode to make sense. Distillation runs in the host agent via an MCP recipe (brain-wiki still reads, filters, routes, scrubs, and sets provenance), headless from the CLI, or raw; hosts without a reader use a self-read fallback with `inputs: unknown`.

## Alternatives considered

Hooks as the only capture path; agents reading raw transcripts themselves for all hosts; copying transcripts into the brain
