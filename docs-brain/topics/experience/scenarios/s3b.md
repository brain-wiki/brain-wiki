---
id: 01M3250V00572EGX3AVFW7GWR0
type: scenario
title: "S3b: Harvest and backfill"
aliases: ["S3b"]
source: "docs/design/overview.md#6-users-and-scenarios"
---
# S3b: Harvest and backfill

Harvest and backfill

**What happens:** The agent logged nothing in a session, or the sessions happened before brain-wiki was set up. The user asks the agent to harvest: brain-wiki reads the agent's finished sessions from its host's own store and routes each to a brain by project, and the agent files them into notes that cite each session.

**Details:** [[write-path-22-harvesting-sessions|write path §2.2]]
