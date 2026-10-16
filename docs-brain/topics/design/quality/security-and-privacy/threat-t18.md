---
id: 01M3250V00YQ7V08KXTCB2HYTC
type: threat
title: "T18: Over-reading agent transcripts"
aliases: ["threat T18"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T18: Over-reading agent transcripts

Over-reading agent transcripts. Harvest and origin lookup read host session stores, which hold everything a session saw: other projects, secrets, tool output from untrusted sources.

**Mitigations:** Off by default and turned on per host. `brain harvest` without `--apply` only lists the sessions it would read. Sessions route to a brain by working directory, and unrouted sessions are skipped. Harvest and origin lookup both drop tool output bodies and scrub secrets before anything is written or sent. Inputs are computed from the session's tool calls. Agents need `read_origin`, off for every host by default, to read origins. Readers never modify host files.

**Residual risk:** Distillation sends condensed transcripts to the model provider of the preset or host, the same trust decision as consolidation.
