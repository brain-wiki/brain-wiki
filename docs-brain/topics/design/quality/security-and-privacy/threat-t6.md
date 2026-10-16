---
id: 01M3250V00Y1J01BKJ90DFHJ83
type: threat
title: "T6: Path traversal and arbitrary writes through MCP arguments, import…"
aliases: ["threat T6"]
source: "docs/design/security-and-privacy.md#3-threats-and-mitigations"
---
# T6: Path traversal and arbitrary writes through MCP arguments, import…

Path traversal and arbitrary writes through MCP arguments, import paths, `consolidate --done` references, or `brain mv`.

**Mitigations:** `LocalStore` resolves every path, symlinks included, and refuses any outside the brain root. Slugs match `^[a-z0-9][a-z0-9-]{0,63}$`. `consolidate --done` accepts only pending episodes.

**Residual risk:** Direct edits use the agent's own file tools, outside these checks (§2).
