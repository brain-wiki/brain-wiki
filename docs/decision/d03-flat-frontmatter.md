# D3: Frontmatter is flat metadata

Status: accepted.
Argued in: [brain format §4, §6](../design/brain-format.md#4-common-file-conventions).

Frontmatter values are scalars or lists of scalars, and frontmatter holds only metadata (D32). Facts and links go in the body.

Older formats differ. Format 1 kept claims and relations in `## Claims` and `## Relations` body sections. Format 2 moved them into frontmatter lists of strings (`bw-claims`, `bw-<verb>`). `brain lint --fix` converts both to format 3.

## Alternatives considered

- Nested YAML objects. Obsidian cannot show or edit them.
- Knowledge in properties, as in format 2. Note bodies were empty, links inside facts did not work in Obsidian, and every fact edit was a YAML edit.
