---
id: 01M3250V00V0RKKKQJ19JXZYAZ
type: threat
title: "T13: Sync-tool damage"
aliases: ["threat T13"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T13: Sync-tool damage

**Sync-tool damage.** Conflict copies, half-synced files.

**Mitigations:** No SQLite or locks in the brain; conflict-copy detection (BW112); edits are line-local, so merges are small.

**Residual risk:** Sync tools can still lose edits; that is outside brain-wiki's control.

## Relations
- part_of [[10-3-threats-and-mitigations]]
