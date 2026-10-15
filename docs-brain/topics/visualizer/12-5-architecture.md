---
id: 01M3250V00SQX5MHJQNXQ60VAH
type: design
title: "Architecture"
aliases: ["12 §5"]
tags: [visualizer]
source: "docs/design/12-visualizer.md#5-architecture"
bw-part_of:
  - "[[visualizer]]"
---
# Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only; --host to widen)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- **Session:** the first request carries the random token in the URL; the
  server answers with an `HttpOnly; SameSite=Strict` cookie holding it, so
  module chunks and API calls are authorized without putting the token in
  every URL. Every request needs the token (query) or the cookie, compared
  in constant time. Exits after 30 minutes idle or on Ctrl-C.
- **Address:** loopback by default. `--host ADDRESS` listens elsewhere, so
  the map can be opened from another machine (`0.0.0.0` or `::` for every
  interface); the server then prints a second URL with the machine's
  hostname and warns on stderr (§8).
- **Data:** the server builds the graph once (§6), caches it, and rebuilds
  it only when an index scan reports changes. World, health, and search
  requests check for changes; topic requests serve the cached graph, so a
  reveal never waits on a scan (about 120 ms at 10k notes) and matches the
  world the page loaded. The world payload stays small
  (topics, constellations, flows, totals: about 170 KB at 10k notes);
  topics load on demand.
- **Front end:** TypeScript, three.js, `camera-controls` for flights, and
  Preact for the HUD, built with Vite. The source is its own repository, **brain-wiki-viz**, so front-end
  work and its Node toolchain stay out of this one. **Only the built bundle
  is committed here**, in `src/brainwiki/viz/app/`, so installing or running
  brain-wiki never needs Node. `BUILD_INFO.json` next to the bundle names the
  brain-wiki-viz commit it was built from; CI rebuilds that commit from its
  `package-lock.json` (public registry URLs only) and fails if the result
  differs. The API in §6 is the contract between the two repositories: a
  change to it lands here first, then in brain-wiki-viz, then as a new
  bundle.
- **Exports:** `--export brain.html` writes one self-contained file: the
  same app with every asset inlined (CSP hashes) and the world plus every
  topic embedded; the inspector shows what the topic data carries, without
  claim text, and the preview says note text is not included.
  `--export graph.json` and `--export graph.graphml` are unchanged, for
  other tools. Exports contain every note title.
