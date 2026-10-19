---
id: 01M3250V00CJG5WH3609075HV5
type: decision
title: "D40: Every folder is a topic"
aliases: ["D40"]
source: "docs/decision/d40-every-folder-is-a-topic.md"
---
# D40: Every folder is a topic

Status: accepted.
Argued in: [[brain-format-2-directory-layout|brain format §2.1]], the topic analysis.

Every folder under `topics/` that holds a note, directly or deeper, is a topic, with or without a topic page. A topic without a page has no content of its own. A folder of attachments only, such as `Images/`, or with nothing in it, is not a topic: it would be a topic with no notes at all. A note belongs to the topic of the folder that holds it, so adding or removing a page no longer moves notes between topics. Only top-level and declared topics are expected to have a page (BW404).

This amends [[d30-topic-tree|D30]], under which a folder below the top level was a topic only if it had a topic page, and was otherwise plain organization whose notes belonged to the enclosing topic.

### Alternatives considered

- Keep D30's rule. A file browser shows no difference between the two kinds of folder, so the rule was one more thing to learn, and creating a page silently moved notes into a new topic.
- A folder is a topic only with a page, at any depth. Top-level folders without a page would stop being topics, and most brains would need pages added.

## Related
- [[d30-topic-tree]]: D30: Topics form a tree
