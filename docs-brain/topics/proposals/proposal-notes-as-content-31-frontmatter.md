---
id: 01M3250V00Y877KRDTGS3XSH0M
type: proposal
title: "Frontmatter (Notes as content (format 3))"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#31-frontmatter"
bw-part_of:
  - "[[proposal-notes-as-content-3-format-3]]"
---
# Frontmatter (Notes as content (format 3))

Flat values only (scalars and lists of scalars), as today.

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes (`lint --fix` mints one) | ULID | Unique in the brain |
| `type` | no (default `note`) | lowercase word | Open vocabulary: `note`, `hub`, `decision`, `howto`, `person`, `project`, `reference`, … |
| `title` | no | string | Default: first `# ` heading, else file name |
| `aliases`, `tags` | no | list of strings | As in Obsidian |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set |
| `bw-superseded_by` | only with `status: superseded` | `"[[note]]"` | Must resolve to an active note; no cycles |
| `bw-sources` | no | list: URL or `"[[note or episode]]"` | Shape checked, targets resolved; no trust flags |
| `bw-stage` | no | string | Free workflow state, as today |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` |

- Any other property is the user's: preserved, indexed for `--where`, never
  validated.
- Unknown `bw-` fields are errors. `bw-claims`, `bw-claims-superseded`, and
  `bw-<verb>` fields are errors that name the conversion command (§12).
- brain-wiki-specific fields keep the `bw-` prefix (D29); shared metadata
  stays unprefixed.
