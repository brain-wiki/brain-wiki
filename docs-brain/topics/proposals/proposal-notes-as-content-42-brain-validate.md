---
id: 01M3250V00K1H78H5YN2EE1AVG
type: proposal
title: "`brain validate`"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#42-brain-validate"
bw-part_of:
  - "[[proposal-notes-as-content-4-writing-notes]]"
---
# `brain validate`

```
brain validate [PATH…] [--json]       # MCP: brain_validate {paths}
```

- Default paths: notes changed since the last commit (git), else since the
  last index scan.
- Checks: frontmatter parses and is flat; field types and values (§3.1);
  `id` present and unique; `bw-superseded_by` and `bw-sources` resolve;
  no format-2 fields; the file is a note or hub under `topics/`.
- Output: one line per problem with the field, what was found, and what is
  allowed. Exit 0 when valid, 1 otherwise.
- It is the schema family of lint rules, run alone. `brain lint` keeps
  everything else (broken links, orphans, secrets, conflict copies).
