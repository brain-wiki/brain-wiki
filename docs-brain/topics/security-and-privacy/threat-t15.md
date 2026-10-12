---
id: 01M3250V00HJGT6CMGK1B2BYJR
type: threat
title: "T15: Name leakage through links"
aliases: ["threat T15"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T15: Name leakage through links

**Name leakage through links.** A `default` note links to `[[Secret project]]`.

**Mitigations:** Lint BW312 warns; guard results hide the target.

**Residual risk:** The link text in the source note is visible to whoever may read that note.

## Relations
- part_of [[10-3-threats-and-mitigations]]
