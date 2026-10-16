---
id: 01M3250V00572EGX3AVFW7GWR0
type: scenario
title: "S3b: Harvest and backfill"
aliases: ["S3b"]
source: "docs/design/overview.md#6-users-and-scenarios"
---
# S3b: Harvest and backfill

Harvest and backfill

**What happens:** The agent logged nothing in a session, or the sessions happened before brain-wiki was set up. `brain harvest` lists finished sessions from the hosts' own stores, and with `--apply` routes each to a brain by project and distills it into episodes.

**Details:** [[write-path-22-harvesting-sessions|write path §2.2]]
