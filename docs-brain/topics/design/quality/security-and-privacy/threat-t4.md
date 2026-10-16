---
id: 01M3250V00X357V8QX77BHCCE8
type: threat
title: "T4: Leakage to model providers"
aliases: ["threat T4"]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T4: Leakage to model providers

**Leakage to model providers.** Sensitive notes sent to a cloud model during consolidation.

**Mitigations:** The consolidation packet carries the pending episodes and each candidate note's title and summary, not whole files; the agent then reads the notes it edits. `brain consolidate --prepare --out FILE` writes the packet for inspection. A brain that must not reach a cloud model is consolidated with a local one.

**Residual risk:** Any episode in the brain can reach the backend's provider ([[proposal-privacy|privacy proposal]]).
