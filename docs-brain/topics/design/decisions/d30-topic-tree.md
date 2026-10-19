---
id: 01M3250V00W9WB68JA4FV74Z36
type: decision
title: "D30: Topics form a tree"
aliases: ["D30"]
source: "docs/decision/d30-topic-tree.md"
---
# D30: Topics form a tree

Status: accepted, amended by [[d40-every-folder-is-a-topic|D40]].
Argued in: [[brain-format-2-directory-layout|brain format §2]].

A folder under `topics/` that has a topic page is a topic, at any depth, and its parent is the nearest enclosing topic. A note belongs to the topic whose folder holds it. A parent's topic page lists its sub-topics' pages like any other note. Each topic has a unique slug, and brain-wiki refers to it by slug rather than path, so folders can be reorganized; `brain mv` moves a topic folder and rewrites links. Topic pages were called hubs until [[d38-topic-pages|D38]].

### Alternatives considered

- Flat topics, with structure only from relations. Folders got cluttered, the briefing got long, and the map had to guess groups.
- Flat topics plus a `group` field. The grouping was invisible in file browsers.
- Topic ids based on paths. They break on every reorganization.

## Related
- [[d38-topic-pages]]: D38: A topic is a folder and its page
- [[d40-every-folder-is-a-topic]]: D40: Every folder is a topic
