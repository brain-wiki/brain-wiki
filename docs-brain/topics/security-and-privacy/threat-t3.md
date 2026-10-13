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
  - "[[privacy]]"
---
# T3: Cross-agent leakage

**Cross-agent leakage.** A personal assistant reads work notes.

**Mitigations:** Separate brains plus host brain limits ([[03-3-choosing-a-brain|03 §3]]).

**Residual risk:** Inside one brain, every host reads everything until privacy is redesigned ([[privacy|16]]). File access bypasses host limits (§2).
