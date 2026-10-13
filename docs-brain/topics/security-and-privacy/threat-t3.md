---
id: 01M3250V003S3FHVV3PJNZNVDE
type: threat
title: "T3: Cross-agent leakage"
aliases: ["threat T3"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
bw-related_to:
  - "[[03-3-choosing-a-brain]]"
  - "[[04-5-guard-co-retrieval]]"
---
# T3: Cross-agent leakage

**Cross-agent leakage.** A personal assistant reads work notes.

**Mitigations:** Separate brains plus host brain limits ([[03-3-choosing-a-brain|03 §3]]); privacy levels and topic allowlists enforced in SQL before ranking; hidden notes return `not_found`; consolidation packets filtered by the backend's profile.

**Residual risk:** File access bypasses this (§2). Hidden guard counts reveal that a restricted note exists (deliberate, [[04-5-guard-co-retrieval|04 §5]]).
