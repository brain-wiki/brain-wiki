---
id: 01M3250V00Y0S2Q7K4HC23BSG0
type: threat
title: "T11: Memory echo"
aliases: ["threat T11"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T11: Memory echo

Memory echo. What brain-wiki returned to an agent is harvested back as new evidence.

**Mitigations:** Harvest drops tool output bodies ([[write-path-33-invariants|write path §3.3]]). The consolidation packet shows each episode's agent and inputs.

**Residual risk:** An agent that restates recalled content in its own words can still echo it. Provenance makes it visible.
