---
id: 01M3250V00JEGH9VV9A2VCRW2C
type: design
title: "Words and lines"
aliases: ["Visualizer §3.2"]
source: "docs/design/visualizer.md#32-words-and-lines"
---
# Words and lines

The galaxy is the look, not the vocabulary. The interface says Overview, Group (of topics), Topic, and Note, never galaxy or constellation. It says issues, not flags; session captures, not episodes; Sources, not `bw-sources`; and the topic index, not the hub. Links read as plain verbs (Links to, Replaced by, Cites, and from the other end links here, replaced by this, cites this), and every number names its unit.

The folder tree is always drawn, as one line from each folder's core to its parent's, brighter at the parent end. Links between notes come in three kinds. Each has a chip in the dock, and all are on by default:

| Kind (dock chip) | From | Trail |
|---|---|---|
| Links | A wikilink in the body (`links_to`) | Faint violet, the main structure |
| Replaces | `bw-superseded_by` (`superseded_by`) | Amber, pulsing from old to new |
| Sources | A `bw-sources` entry (`source`) | Faint grey-blue, from the citing note to the cited one |
