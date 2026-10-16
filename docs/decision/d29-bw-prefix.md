# D29: The bw- prefix and the format version

Status: accepted.
Argued in: [brain format §4, §13](../design/brain-format.md#4-common-file-conventions).

brain-wiki's own frontmatter fields start with `bw-`: `bw-superseded_by`, `bw-sources`, `bw-stage`, and the episode provenance fields such as `bw-origin` and `bw-inputs`. Shared metadata stays unprefixed: `id`, `type`, `title`, `aliases`, `tags`, `status`, `created`, and `updated`.

`format` in `brain.toml` names the newest file format the brain may hold. Writers only raise it, and a brain-wiki that is older than the brain's format refuses to open it.

## Alternatives considered

- No prefix. The fields would clash with other tools' properties.
- A dotted `brain-wiki.` prefix. Dataview reads dots as nesting.
- Best-effort reads of newer brains. An old reader misreads what it does not know.
