---
id: 01M3250V00X357V8QX77BHCCE8
type: threat
title: "T4: Leakage to model providers"
aliases: ["threat T4"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
---
# T4: Leakage to model providers

**Leakage to model providers.** Sensitive notes sent to a cloud model during consolidation.

**Mitigations:** Episodes above the backend profile's level stay pending for a more trusted backend (e.g. a local model). Packets contain only candidate notes' claims and relations, not whole files. `brain consolidate --dry-run` shows the packet.

**Residual risk:** The user must set levels; defaults treat everything as `default`.
