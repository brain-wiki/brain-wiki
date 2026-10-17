# D30: Topics form a tree

Status: accepted.
Argued in: [brain format §2](../design/brain-format.md#2-directory-layout).

A folder under `topics/` that has a topic page is a topic, at any depth, and its parent is the nearest enclosing topic. A note belongs to the topic whose folder holds it. A parent's topic page lists its sub-topics' pages like any other note. Each topic has a unique slug, and brain-wiki refers to it by slug rather than path, so folders can be reorganized; `brain mv` moves a topic folder and rewrites links. Topic pages were called hubs until [D38](d38-topic-pages.md).

## Alternatives considered

- Flat topics, with structure only from relations. Folders got cluttered, the briefing got long, and the map had to guess groups.
- Flat topics plus a `group` field. The grouping was invisible in file browsers.
- Topic ids based on paths. They break on every reorganization.
