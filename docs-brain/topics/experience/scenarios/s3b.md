---
id: 01M3250V00FJJT8D8ADW2BXYWJ
type: scenario
title: "S3b: Harvest and backfill"
aliases: ["S3b"]
source: "docs/design/01-overview.md#6-users-and-scenarios"
---
# S3b: Harvest and backfill

**Harvest and backfill.** The agent logged nothing in a session, or sessions happened before brain-wiki existed.

**Flow (details in):** `brain harvest` reads finished sessions from the hosts' own stores, routes each to a brain by project, and distills them into episodes, after a dry run. [[05-22-harvesting-sessions|05 §2.2]]
