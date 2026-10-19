# D40: Every folder is a topic

Status: accepted.
Argued in: [brain format §2.1](../design/brain-format.md#21-topics), [the topic analysis](../analysis/relations/topic.md).

Every folder under `topics/` that holds a file, directly or deeper, is a topic, with or without a topic page. A topic without a page has no content of its own. A note belongs to the topic of the folder that holds it, so adding or removing a page no longer moves notes between topics. Only top-level and declared topics are expected to have a page (BW404).

This amends [D30](d30-topic-tree.md), under which a folder below the top level was a topic only if it had a topic page, and was otherwise plain organization whose notes belonged to the enclosing topic.

## Alternatives considered

- Keep D30's rule. A file browser shows no difference between the two kinds of folder, so the rule was one more thing to learn, and creating a page silently moved notes into a new topic.
- A folder is a topic only with a page, at any depth. Top-level folders without a page would stop being topics, and most brains would need pages added.
