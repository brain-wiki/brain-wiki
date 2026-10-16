---
id: 01M3250V00RE7HQ5CZJNBW6NYQ
type: proposal
title: "Why"
tags: [proposals]
source: "docs/proposals/notes-as-content.md#1-why"
---
# Why

| Problem in format 2 | Seen as |
|---|---|
| Knowledge lives in properties. Claims and typed relations are YAML strings (D3), but Obsidian defines properties as "small, atomic bits of information" and renders no Markdown in them. | Notes whose body is only a title; wikilinks inside a claim are dead text; editing a fact means editing quoted YAML, and one bad quote breaks the note; other renderers hide or tabulate the content. |
| Consolidation is the only full write path. New knowledge reaches notes through validated ops; direct edits need `brain check`, a loss guard, and a run per edit. | A heavy protocol for the common case (write down a fact), and agents with file access write files anyway (T17's residual risk). |
| The protocol constrains shape, not quality. The validator checks schema, handles, spans, and lint, so a verbatim copy of a bundled episode line passes. | A real run turned 14 episodes into 15 notes whose 64 claims were copied line for line, 17 of them bundling three or more facts. |
