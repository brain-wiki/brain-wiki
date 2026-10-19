# D17: A WebGL visualizer with semantic zoom

Status: accepted, amended by [D41](d41-map-of-the-topic-tree.md).
Argued in: [visualizer](../design/visualizer.md).

`brain viz` shows a brain as a WebGL map with semantic zoom: overview, groups of topics, a topic, and a note. Topics load on demand from a local server. The front end is a TypeScript app built with Vite in its own repository, brain-wiki-viz. Only the built bundle is committed here, so users never need Node.

## Alternatives considered

- One force graph of every note from vendored JavaScript with no build step (the first design). It did not scale past a few thousand notes.
- A 2.5D terrain atlas.
