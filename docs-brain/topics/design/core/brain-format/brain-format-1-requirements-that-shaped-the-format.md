---
id: 01M3250V006KVXN5K90P6DGV07
type: design
title: "Requirements that shaped the format"
aliases: ["Brain format §1"]
source: "docs/design/brain-format.md#1-requirements-that-shaped-the-format"
---
# Requirements that shaped the format

| Requirement | Consequence |
|---|---|
| People can read and edit a brain in any editor, and in Obsidian | Markdown files, YAML frontmatter, `[[wikilinks]]`, no binary state in the brain |
| LLMs can write it without corrupting its structure | Frontmatter holds flat metadata only. A note's knowledge is ordinary Markdown in the body, so a careless edit breaks a sentence, not the note. |
| Simple, fast code can parse it | brain-wiki reads frontmatter, headings, and links, and never extracts meaning from the body ([[d33-no-meaning-extraction\|D33]]) |
| Notes survive renames and moves | Permanent ULID ids, and link repair by id |
| Concurrent agents and devices are safe | Episodes are new, uniquely named files. Agents edit notes directly and check them with `brain validate`. Git keeps the history ([[write-path\|write path]]). |
| Git diffs and merges stay small | Stable ordering, one item per line, untouched lines never rewritten |

Format 3 moved format 2's claims and typed relations out of frontmatter
lists and into plain body text. Obsidian renders no Markdown in
properties, so facts and links held there were hard to read and edit
([[d32-format-3|D32]]). §13 describes the older formats and
their conversion.
