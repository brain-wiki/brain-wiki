---
id: 01M3250V008TSRV9HJKW22XSSF
type: proposal
title: "Security and trust"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#10-security-and-trust"
bw-part_of:
  - "[[proposal-notes-as-content]]"
---
# Security and trust

| Threat (doc 10) | Change |
|---|---|
| T1 rules | Unchanged: rules still need the user's words and confirmation. |
| T2 poisoned knowledge | Weaker. No per-fact provenance or `[unverified]`. Mitigations: `bw-sources`, git history, episodes keep their `inputs`, orientation asks agents to cite sources. Residual: a false fact an agent writes directly looks like one the user wrote. |
| T17 direct edits | Becomes the main path. No loss guard. Recovery is git; a brain without git has none, so setup recommends git more strongly. |
| T6 path traversal | Unchanged for brain-wiki's own writers. |
