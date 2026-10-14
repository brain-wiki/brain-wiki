---
id: 01M3250V00CX6WRR7MZDNYRRSA
type: hub
title: "Security and privacy"
source: "docs/design/10-security-and-privacy.md"
---
# Security and privacy

Threat model and mitigations

Generated from `docs/design/10-security-and-privacy.md`.

## Notes
- [[10-1-what-we-protect]]: What we protect
- [[10-2-trust-boundaries]]: Trust boundaries
- [[10-3-threats-and-mitigations]]: Threats and mitigations
  - [[threat-t1]]: T1: Indirect prompt injection becomes a standing directive
  - [[threat-t2]]: T2: Poisoned knowledge
  - [[threat-t3]]: T3: Cross-agent leakage
  - [[threat-t4]]: T4: Leakage to model providers
  - [[threat-t5]]: T5: Secrets stored in the brain
  - [[threat-t6]]: T6: Path traversal and arbitrary writes via MCP arguments, op slugs, import…
  - [[threat-t7]]: T7: Hostile files attack the tools
  - [[threat-t8]]: T8: XSS in the visualizer
  - [[threat-t9]]: T9: Local server exposure
  - [[threat-t10]]: T10: Hook command injection
  - [[threat-t11]]: T11: Recall echo
  - [[threat-t12]]: T12: Corruption or loss by a buggy run
  - [[threat-t13]]: T13: Sync-tool damage
  - [[threat-t14]]: T14: Supply chain
  - [[threat-t15]]: T15: Impersonating plugins
  - [[threat-t17]]: T17: A direct agent edit damages a note
  - [[threat-t18]]: T18: Over-reading agent transcripts
- [[10-4-privacy-model]]: Privacy model
- [[10-5-data-that-leaves-the-machine]]: Data that leaves the machine
- [[10-6-secret-scanning]]: Secret scanning
- [[10-7-encryption-documentation-not-code-in-v01]]: Encryption (documentation, not code, in v0.1)
- [[10-8-logging]]: Logging
- [[10-9-security-testing]]: Security testing
