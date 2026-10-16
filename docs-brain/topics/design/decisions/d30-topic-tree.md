---
id: 01M3250V00W9WB68JA4FV74Z36
type: decision
title: "D30: Topics form a tree"
aliases: ["D30"]
source: "docs/decision/d30-topic-tree.md"
---
# D30: Topics form a tree

Status: accepted.
Argued in: [[brain-format-2-directory-layout|brain format §2]].

Topics form a tree: a folder under `topics/` with a hub is a topic at any depth, and its parent is the nearest enclosing topic. A topic is known by a unique slug, not its path, so folders can be reorganized (`brain mv` moves a topic folder). Membership is the folder; a parent hub lists its sub-topics' hubs like any other note.

### Alternatives considered

Flat topics with structure only from relations (cluttered folders, long briefing, guessed map groups); flat topics plus a `group` field (grouping invisible in file browsers); path-based topic ids (break on every reorganization)
