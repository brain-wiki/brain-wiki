---
id: 01M3250V000FRB52GK6FY9GZX7
type: decision
title: "D9: Provenance comes from the code path"
aliases: ["D9"]
source: "docs/decision/d09-provenance-from-code.md"
---
# D9: Provenance comes from the code path

Status: accepted.
Argued in: [[write-path-3-provenance-and-inputs|write path §3]], [[security-and-privacy|security]].

Provenance, including inputs, is set by the code path that writes, never by model text. Content with external or unknown inputs can never become a rule.

### Alternatives considered

Trust model self-reports
