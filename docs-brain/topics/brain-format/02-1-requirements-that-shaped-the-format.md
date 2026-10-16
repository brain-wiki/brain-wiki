---
id: 01M3250V003DERV4Z36ZV2MA1J
type: design
title: "Requirements that shaped the format"
aliases: ["02 §1"]
tags: [brain-format]
source: "docs/design/02-brain-format.md#1-requirements-that-shaped-the-format"
---
# Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| Readable and editable by people in any editor, and by Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| Writable by LLMs without corrupting structure | One fact or relation per line; flat frontmatter lists; no nested YAML |
| Parseable with simple, fast code | Claims and relations are frontmatter strings with small grammars; the body stays prose |
| Survives renames and moves | Permanent ULID ids; link repair by id |
| Safe under concurrent agents and devices | Inbox files are append-only and uniquely named; curated files change only in validated runs |
| Diff- and merge-friendly in git | Stable ordering, one item per line, no reflowing of untouched lines |
