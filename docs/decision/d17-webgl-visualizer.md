# D17: A WebGL visualizer with semantic zoom

Status: accepted.
Argued in: [visualizer](../design/visualizer.md).

The visualizer is a WebGL galaxy with semantic zoom (galaxy → constellation → topic → note), loading topics on demand from `brain viz`'s local server. It is a TypeScript app built with Vite in its own repository (brain-wiki-viz); only the built bundle is committed here, so users never need Node.

## Alternatives considered

One force graph of everything from vendored JavaScript with no build step (the first design); a 2.5D terrain atlas
