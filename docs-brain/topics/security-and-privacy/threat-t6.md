---
id: 01M3250V00CTV3Q87HMGH098KB
type: threat
title: "T6: Path traversal and arbitrary writes via MCP arguments, import paths,…"
aliases: ["threat T6"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T6: Path traversal and arbitrary writes via MCP arguments, import paths,…

**Path traversal and arbitrary writes** via MCP arguments, import paths, `consolidate --done` references, or `brain mv`.

**Mitigations:** Every path is resolved and checked to stay inside the brain root after normalization (including symlinks). Slugs match `^[a-z0-9][a-z0-9-]{0,63}$`. `consolidate --done` accepts only pending episodes. brain-wiki's writes go through one function with these checks.

**Residual risk:** Direct edits use the agent's own file tools, outside these checks (§2).
