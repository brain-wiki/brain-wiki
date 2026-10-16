---
id: 01M3250V00572EGX3AVFW7GWR0
type: scenario
title: "S3b: Harvest and backfill"
aliases: ["S3b"]
source: "docs/design/overview.md#6-users-and-scenarios"
---
# S3b: Harvest and backfill

**Harvest and backfill.** The agent logged nothing in a session, or sessions happened before brain-wiki existed.

**Flow (details in):** `brain harvest` reads finished sessions from the hosts' own stores, routes each to a brain by project, and distills them into episodes, after a dry run. [[write-path-22-harvesting-sessions|write path §2.2]]
