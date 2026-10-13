---
id: 01M3250V005WEQQ7SSCZJ1W6ZE
type: threat
title: "T11: Recall echo"
aliases: ["threat T11"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
bw-related_to:
  - "[[05-33-invariants]]"
---
# T11: Recall echo

**Recall echo.** Injected memory gets re-captured as new evidence and reinforced.

**Mitigations:** Injected spans are wrapped in markers and stripped before capture ([[05-33-invariants|05 §3.3]]). Consolidation sees provenance and does not count recalled content as a source.

**Residual risk:** Agents that paraphrase recalled content into their own words can still echo it; provenance makes it visible.
