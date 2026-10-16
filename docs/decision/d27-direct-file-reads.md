# D27: Agents may read the brain's files

Status: accepted.
Argued in: [index and search §9.1](../design/index-and-search.md#91-brain-list), [security](../design/security-and-privacy.md).

Agents may read a brain's files directly, at the folder path `brain_list` gives. grep and glob over the files work for bulk scans, and the tools add link resolution and supersession warnings.

## Alternatives considered

- Tools only.
- Giving the path only to profiles that may read everything. This is moot while every host reads the whole brain (D10).
