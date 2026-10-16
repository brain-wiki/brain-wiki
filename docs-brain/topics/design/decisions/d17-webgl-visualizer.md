---
id: 01M3250V00STCT03N3WM08A3TQ
type: decision
title: "D17: A WebGL visualizer with semantic zoom"
aliases: ["D17"]
source: "docs/decision/d17-webgl-visualizer.md"
---
# D17: A WebGL visualizer with semantic zoom

Status: accepted.
Argued in: [[visualizer|visualizer]].

The visualizer is a WebGL galaxy with semantic zoom (galaxy → constellation → topic → note), loading topics on demand from `brain viz`'s local server. It is a TypeScript app built with Vite in its own repository (brain-wiki-viz); only the built bundle is committed here, so users never need Node.

### Alternatives considered

One force graph of everything from vendored JavaScript with no build step (the first design); a 2.5D terrain atlas
