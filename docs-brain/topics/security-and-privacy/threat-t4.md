---
id: 01M3250V00X357V8QX77BHCCE8
type: threat
title: "T4: Leakage to model providers"
aliases: ["threat T4"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
bw-related_to:
  - "[[privacy]]"
---
# T4: Leakage to model providers

**Leakage to model providers.** Sensitive notes sent to a cloud model during consolidation.

**Mitigations:** Packets contain only candidate notes' claims and relations, not whole files. `brain consolidate --dry-run` shows the packet. A brain that must not reach a cloud model is consolidated with a local one.

**Residual risk:** Any episode in the brain can reach the backend's provider ([[privacy|16]]).
