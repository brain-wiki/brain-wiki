---
id: 01M3250V008KFB7JHR2ESZS49N
type: design
title: "Topics"
aliases: ["Brain format §2.1"]
source: "docs/design/brain-format.md#21-topics"
---
# Topics

A topic is the unit people browse, search filters by, and a hub
summarizes. Topics are folders, so every file browser shows them, and they
form a tree ([[d30-topic-tree|D30]]).

- A topic is a folder directly under `topics/`, or a folder at any depth
  below it that has a hub (`layout.hub_filename`, §8). There are no named
  levels: `people/` and `people/rin-sato/` are both topics.
- A folder without a hub inside a topic is plain organization. Its notes
  belong to the enclosing topic.
- A topic's parent is the nearest enclosing topic. A note belongs to the
  topic whose folder holds it. No frontmatter field declares membership.
- Notes MAY live outside any topic, for example in an imported vault
  (BW407, info).
- The inbox, archive, and reports folders are never topics, even when
  `layout.topics_dir` is `.`.
- Every topic has a slug, unique in the brain, and the slug is its
  identity. It is the folder name without a leading number, lowercased,
  with other characters turned into `-` (`01 People` becomes `people`).
  Folders are named shallowest first. A folder whose slug is taken gets
  its parent's slug as a prefix (`rin-sato-notes`), then a number.
- A topic declared in `brain.toml` (§3) names its `path`, or else the
  folder whose slug matches, wherever it sits.

Reorganizing is moving folders. `brain mv` moves a topic folder with its
notes and rewrites the links that named them by path, as one undoable run.
A move by hand works too, and `brain lint --fix` repairs path links from
the index's history. Because a topic is known by its slug, topic settings,
links by file name, and run records survive the move.

There is no state directory inside the brain. Machine state (the index,
run records) is rebuildable or device-specific. Which episodes are done is
encoded by location, in `inbox/episodes/` or `archive/episodes/`
([[d13-inbox-by-location|D13]]).
