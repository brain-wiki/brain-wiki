# Criteria for a relation

Status: draft.
Study: [Typed relations](README.md).

Every relation in this study is judged by these tests, so the verdicts
compare. A relation should pass C1 to C4 to be revived at all. C5 to C8
shape its design.

## At a glance

- **Behavior first.** A type the engine never reads is a tag with extra syntax.
- **Declared, not inferred.** The author writes the type, so brain-wiki still extracts no meaning.
- **Relations are metadata.** A relation is a link in its one frontmatter field; a `## Relations` section in the body is free prose that brain-wiki never parses ([syntax](syntax.md)).

## The criteria

| # | Criterion | Question | Why |
|---|---|---|---|
| C1 | Engine behavior | Does the engine do something with it that a test can check: retrieval, navigation, lint, or a rollup? | The format 2 spec called guards the reason typed relations exist. A type nothing reads adds syntax without value |
| C2 | One distinct concept | Does it duplicate or overlap something brain-wiki already has (folders, plain links, `bw-superseded_by`, `bw-sources`, `type`, tags), and does it have exactly one name, with no aliases? | Every concept, second name, and overlap is one more thing for people and agents to learn ([fewer concepts](../README.md#principle-fewer-concepts)) |
| C3 | Declared by the author | Does the author write the type, rather than brain-wiki inferring it from prose? | [D33](../../decision/d33-no-meaning-extraction.md) rules out extracting meaning, and [D8](../../decision/d08-no-model-calls.md) rules out model calls |
| C4 | Writable by direct edit | Can a person in Obsidian and an agent with file tools write the field correctly, and can `brain validate` check it? | Direct edits are the main write path ([D34](../../decision/d34-direct-edits.md)). In format 2, consolidation ops wrote most relations |
| C5 | Links only in frontmatter | Is each relation item exactly one quoted wikilink, with no prose or qualifiers? | Format 2 broke notes and hid links by putting sentences in YAML strings ([D3](../../decision/d03-flat-frontmatter.md), [D32](../../decision/d32-format-3.md)). A link is the atomic value properties are for, as `bw-superseded_by` shows |
| C6 | Prose stays free | Can people explain the relation, or not, in ordinary Markdown, with nothing in the body parsed or checked? | Files are the source of truth ([D1](../../decision/d01-source-of-truth.md)); the body belongs to the people who write it |
| C7 | One direction, safe chains | Does it have one canonical direction (one field, on one side), or, if symmetric, one field written once on either side? Is following a chain of it well defined? | Compass-style poles failed on direction: "down" meant both child and downstream effect |
| C8 | Cost | What does it add to the index, lint, docs, and the format version? | A format change needs a converter, a version bump, and a migration story |

## Scoring

- **Pass**: meets the criterion as designed.
- **Partial**: meets it with a condition the analysis names.
- **Fail**: does not meet it. A fail on C1 to C4 means the verdict is keep
  as is, or drop.
