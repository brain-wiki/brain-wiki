---
id: 01M3250V00Y0S2Q7K4HC23BSG0
type: threat
title: "T11: Memory echo"
aliases: ["threat T11"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T11: Memory echo

**Memory echo.** What brain-wiki returned to an agent gets harvested back as new evidence and reinforced.

**Mitigations:** Harvest drops tool output bodies ([[write-path-3-provenance-and-inputs|write path §3]]). The consolidation packet shows each episode's agent and inputs.

**Residual risk:** Agents that paraphrase recalled content into their own words can still echo it; provenance makes it visible.
