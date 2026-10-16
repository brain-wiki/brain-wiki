---
id: 01M3250V003DERV4Z36ZV2MA1J
type: design
title: "Requirements that shaped the format"
aliases: ["02 §1"]
source: "docs/design/02-brain-format.md#1-requirements-that-shaped-the-format"
---
# Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| Readable and editable by people in any editor, and by Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| Writable by LLMs without corrupting structure | Frontmatter holds flat metadata only; what a note knows is ordinary Markdown in the body, so a careless edit breaks a sentence, not the note |
| Parseable with simple, fast code | brain-wiki reads frontmatter, headings, and links; it never extracts meaning from the body |
| Survives renames and moves | Permanent ULID ids; link repair by id |
| Safe under concurrent agents and devices | Inbox files are append-only and uniquely named; agents edit notes directly and check them with `brain validate`; git keeps the history ([[write-path-and-consolidation\|05]]) |
| Diff- and merge-friendly in git | Stable ordering, one item per line, no reflowing of untouched lines |

Format 3 replaced format 2's claims and typed relations, which lived in
frontmatter lists, with plain body content: Obsidian renders no Markdown in
properties, so facts and links held there were hard to read and edit. §13
describes the older formats and their conversion.
