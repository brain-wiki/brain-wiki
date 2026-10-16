---
id: 01M3250V00X03S8DA9XCESPJRV
type: threat
title: "T18: Over-reading agent transcripts"
aliases: ["threat T18"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T18: Over-reading agent transcripts

**Over-reading agent transcripts.** Harvest and origin lookup read host session stores, which hold everything a session saw: other projects, secrets, tool output from untrusted sources.

**Mitigations:** Off by default, enabled per host; every harvest starts as a dry run listing the sessions it would read; sessions route to a brain by working directory and unrouted sessions are skipped; tool output bodies are dropped, by harvest and origin lookup alike; secrets scrubbed before anything is written or sent; inputs computed from the session's tool calls; origin reads need `read_origin`, off for every host by default; readers never modify host files.

**Residual risk:** Distillation sends condensed transcripts to the configured backend's provider, the same trust decision as consolidation.
