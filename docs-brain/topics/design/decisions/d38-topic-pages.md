---
id: 01M3250V002Q115KMHNHVHM027
type: decision
title: "D38: A topic is a folder and its page"
aliases: ["D38"]
source: "docs/decision/d38-topic-pages.md"
---
# D38: A topic is a folder and its page

Status: accepted.
Argued in: [[brain-format-2-directory-layout|brain format §2.1]], [[brain-format-8-topic-pages|brain format §8]].

A topic is a folder (D30), and its topic page is the file named `layout.topic_page` (`index.md` by default) at the folder's root. Only that file is a topic page. It is indexed as kind `topic`: search ranks it higher, `brain_read` opens it as an outline, its `## Notes` list is what BW405 checks, and it gives an undeclared topic its title and description. brain-wiki has no separate "hub" concept any more, and a note's `type` never changes how it is indexed, so a note with `type: hub` or `type: topic` elsewhere in a topic is an ordinary note.

Older brains keep working. `layout.hub_filename` is read as `layout.topic_page`, a `hub` key in `search.kind_factor` as `topic`, and a page written with `type: hub` keeps that type.

### Alternatives considered

- Keep "hub" as a concept next to "topic". A note with `type: hub` anywhere in a topic was indexed as a second hub, so a topic could have two entry points and took its title from whichever path sorted first. Two words for one thing also meant every document and message explained both.
- No page, with everything derived from the folder. The page holds the summary people read and the `## Notes` list that orders the topic, which a folder cannot hold, and file browsers and Obsidian already show `index.md` or a folder note as the folder's page.
- `type: topic` marks the page, wherever it is. Membership comes from the folder (D30), and a type that can make any note the page brings the two-entry-point problem back.

## Related
- [[d30-topic-tree]]: D30: Topics form a tree
