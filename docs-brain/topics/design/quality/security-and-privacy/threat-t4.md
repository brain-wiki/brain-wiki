---
id: 01M3250V00YXVZ2AJEYJ6ZPQH6
type: threat
title: "T4: Leakage to model providers"
aliases: ["threat T4"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T4: Leakage to model providers

Leakage to model providers. Sensitive notes reach a cloud model during consolidation.

**Mitigations:** The consolidation packet carries the pending episodes and each candidate note's title and summary, not whole files. The agent then reads the notes it edits. `brain consolidate --prepare --out FILE` writes the packet for inspection. A brain that must not reach a cloud model is consolidated with an agent on a local model.

**Residual risk:** Any episode in the brain can reach the host's model provider.
