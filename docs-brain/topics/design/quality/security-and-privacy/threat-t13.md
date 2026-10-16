---
id: 01M3250V00GFMHJPGYA3XQAV47
type: threat
title: "T13: Sync-tool damage"
aliases: ["threat T13"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T13: Sync-tool damage

Sync-tool damage: conflict copies, half-synced files.

**Mitigations:** No SQLite or locks in the brain. Lint detects conflict copies (BW112). brain-wiki's edits are line-local, so merges stay small. Git brains share through origin, not a sync tool ([[config-and-storage-62-local-folder-with-optional-git|config and storage §6.2]]).

**Residual risk:** Sync tools can still lose edits, and a `.git` folder synced between two committing machines can be corrupted.
