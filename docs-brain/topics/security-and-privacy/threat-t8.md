---
id: 01M3250V00JNXSEYDDQT0RRKQE
type: threat
title: "T8: XSS in the visualizer"
aliases: ["threat T8"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
bw-part_of:
  - "[[10-3-threats-and-mitigations]]"
---
# T8: XSS in the visualizer

**XSS in the visualizer.** A note title or body contains HTML or script.

**Mitigations:** Note content is inserted as text, never as HTML; previews render Markdown through an escaping renderer; a strict Content-Security-Policy on the page; no remote resources.

**Residual risk:** —
