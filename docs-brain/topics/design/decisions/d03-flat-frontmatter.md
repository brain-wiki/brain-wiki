---
id: 01M3250V00R38ERPVCRVSHJREC
type: decision
title: "D3: Frontmatter is flat metadata"
aliases: ["D3"]
source: "docs/decision/d03-flat-frontmatter.md"
---
# D3: Frontmatter is flat metadata

Status: accepted.
Argued in: [[brain-format-4-common-file-conventions|brain format §4, §6]].

Frontmatter is flat (scalars and lists of scalars) and holds metadata only (D32). Format 2 kept claims and relations there as lists of strings (`bw-claims`, `bw-<verb>`); format 1 kept them in `## Claims` and `## Relations` body sections.

### Alternatives considered

Nested YAML objects (Obsidian cannot show or edit them); knowledge in properties (format 2: empty bodies, dead links inside facts, every fact edit a YAML edit)

## Related
- [[d32-format-3]]: D32: Format 3: notes are Markdown pages
