---
id: 01M3250V005WEQQ7SSCZJ1W6ZE
type: threat
title: "T11: Memory echo"
aliases: ["threat T11"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T11: Memory echo

**Memory echo.** What brain-wiki returned to an agent gets harvested back as new evidence and reinforced.

**Mitigations:** Harvest drops tool output bodies ([[05-3-provenance-and-inputs|05 §3]]). The consolidation packet shows each episode's agent and inputs.

**Residual risk:** Agents that paraphrase recalled content into their own words can still echo it; provenance makes it visible.
