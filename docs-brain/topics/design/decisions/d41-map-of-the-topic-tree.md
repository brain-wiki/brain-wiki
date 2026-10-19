---
id: 01M3250V00K5384T20AJRBGHX7
type: decision
title: "D41: The map draws the topic tree in layers"
aliases: ["D41"]
source: "docs/decision/d41-map-of-the-topic-tree.md"
---
# D41: The map draws the topic tree in layers

Status: accepted.
Argued in: [[visualizer-2-levels-semantic-zoom|visualizer §2 and §3]].

The map is the folder tree ([[d40-every-folder-is-a-topic|D40]]). Each level of topics sits on a plane of its own, a topic's sub-topics are packed inside its footprint on the plane below, and a stem joins each to its parent. A topic's notes form a ring of slices around its topic page, clockwise from 12 o'clock in file-name order, a longer note wider and reaching farther. The levels are Overview, Topic, and Note. The view opens tilted and can be turned, but never below the map or upside down.

This amends [[d17-webgl-visualizer|D17]], whose levels included groups of topics. Groups, and the clustering of topics by their links, are removed: the folder tree already says how topics group, and it is the structure the user made.

### Alternatives considered

- Groups clustered by links, with each topic's notes as a star cluster around its page (the second design). The groups were not anything the user made, and a scatter showed neither a note's length nor its order.
- Sub-topics drawn as nested circles on one plane. Containment alone did not read as levels, and the outlines added clutter.
- A fixed tilt and heading. Layers stacked on planes hide one another from some directions, so the view needs to turn.

## Related
- [[d17-webgl-visualizer]]: D17: A WebGL visualizer with semantic zoom
- [[d40-every-folder-is-a-topic]]: D40: Every folder is a topic
