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

**Mitigations:** No SQLite or locks in the brain; conflict-copy detection (BW112); brain-wiki's edits are line-local, so merges are small. Git brains share through origin, not a sync tool ([[03-62-v01-local-folder-with-optional-git|03 §6.2]]).

**Residual risk:** Sync tools can still lose edits, and a `.git` folder synced between two committing machines can be corrupted; that is outside brain-wiki's control.
