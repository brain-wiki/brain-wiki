---
id: 01M3250V00CTV3Q87HMGH098KB
type: threat
title: "T6: Path traversal and arbitrary writes via MCP arguments, op slugs, import…"
aliases: ["threat T6"]
tags: [security-and-privacy]
source: "docs/design/10-security-and-privacy.md#3-threats-and-mitigations"
---
# T6: Path traversal and arbitrary writes via MCP arguments, op slugs, import…

**Path traversal and arbitrary writes** via MCP arguments, op slugs, import paths, or `brain mv`.

**Mitigations:** Every path is resolved and checked to stay inside the brain root after normalization (including symlinks). Slugs match `^[a-z0-9][a-z0-9-]{0,63}$`. Ops reference handles, never paths. Writes go through one function with these checks.

**Residual risk:** —

## Relations
- part_of [[10-3-threats-and-mitigations]]
