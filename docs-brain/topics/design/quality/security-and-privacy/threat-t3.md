---
id: 01M3250V0058H1GXD2WDFQRJPB
type: threat
title: "T3: Cross-agent leakage"
aliases: ["threat T3"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T3: Cross-agent leakage

**Cross-agent leakage.** A personal assistant reads work notes.

**Mitigations:** Separate brains plus host brain limits ([[config-and-storage-3-choosing-a-brain|config and storage §3]]).

**Residual risk:** Inside one brain, every host reads everything until privacy is redesigned ([[proposal-privacy|privacy proposal]]). File access bypasses host limits (§2).
