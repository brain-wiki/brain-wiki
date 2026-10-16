---
id: 01M3250V00SGYB2QNW5WE9C8XB
type: decision
title: "D29: The bw- prefix and the format version"
aliases: ["D29"]
source: "docs/decision/d29-bw-prefix.md"
---
# D29: The bw- prefix and the format version

Status: accepted.
Argued in: [[brain-format-4-common-file-conventions|brain format §4, §13]].

brain-wiki's own frontmatter fields carry a `bw-` prefix: `bw-superseded_by`, `bw-sources`, `bw-stage`, and episode provenance. Shared metadata (`id`, `type`, `title`, `aliases`, `tags`, `status`, `created`, `updated`) stays unprefixed. `format` in `brain.toml` names the newest file format a brain may hold; writers raise it one-way, and older tools refuse to open newer brains.

### Alternatives considered

No prefix (clashes with other tools' properties); a dotted `brain-wiki.` prefix (Dataview reads dots as nesting); best-effort reads of newer brains (an old reader misreads what it does not know)
