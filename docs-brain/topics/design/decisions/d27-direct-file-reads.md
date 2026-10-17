---
id: 01M3250V008WEXGP2FY4D1WPH6
type: decision
title: "D27: Agents may read the brain's files"
aliases: ["D27"]
source: "docs/decision/d27-direct-file-reads.md"
---
# D27: Agents may read the brain's files

Status: accepted.
Argued in: [[index-and-search-9-other-queries|index and search §9.1]], [[security-and-privacy|security]].

Agents may read a brain's files directly, at the folder path `brain_list` gives. grep and glob over the files work for bulk scans, and the tools add link resolution and supersession warnings.

### Alternatives considered

- Tools only.
- Giving the path only to profiles that may read everything. This is moot while every host reads the whole brain (D10).

## Related
- [[d10-no-access-control-in-a-brain]]: D10: No access control inside a brain
