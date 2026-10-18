# D39: Relations are link-only fields the author declares

Status: accepted.
Argued in: [brain format §6.6](../design/brain-format.md#66-relations), [the relations study](../analysis/relations/README.md).

Format 4 has four typed relations, each a frontmatter field that holds one or more quoted wikilinks and nothing else: `bw-part_of`, `bw-depends_on`, `bw-conflicts_with`, and `bw-superseded_by`. Each relation has one field, on one side, and the other note sees it as a backlink; `bw-conflicts_with` is symmetric and written once. A note's folder is its topic, and "related to" or "caused by" is a plain link in a sentence.

The author declares a relation; brain-wiki never infers one from what a note says. Why a relation holds is prose in the body, which brain-wiki does not parse. A `## Relations` section is free prose. It may explain the fields, say something else, or be absent.

This amends [D33](d33-no-meaning-extraction.md). Relation types are metadata, like `status`, not meaning extracted from text. It narrows [D32](d32-format-3.md)'s "connections are body content" to the reasons for them. Each relation has a behavior a test can check, such as a guard, a report of stale dependents, a lint rule, or traversal, as the study shows for each.

## Alternatives considered

- Inline fields such as `depends_on:: [[X]]` in the body, as Dataview reads them. The body would be parsed, and it reads as code without the plugin.
- Typed `## Related` bullets whose leading verb is read against an alias table. This parses prose, and a reworded sentence silently loses its type.
- Classifying each body link from its sentence. This is meaning extraction and needs a model call, which D33 and D8 rule out.
- `bw-conflicts_with` alone beside `bw-superseded_by`. The storage is the same, but it brings back only the guard.
- Mapping user properties (`up:` read as `part_of`) in `brain.toml`. Possible later as an import aid that rewrites properties into fields.
- A field on each side, or alias field names such as `bw-requires`. Two ways to write one relation is one more thing to learn and to keep in step.
- Text after the link, as format 2 allowed. Sentences in YAML strings broke notes and hid links (D3).
