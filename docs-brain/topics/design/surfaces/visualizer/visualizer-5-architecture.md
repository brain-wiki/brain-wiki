---
id: 01M3250V006Z3KBXZCVPQJT8KX
type: design
title: "Architecture"
aliases: ["Visualizer §5"]
source: "docs/design/visualizer.md#5-architecture"
---
# Architecture

```
brain viz ─► local HTTP server on 127.0.0.1:<port> (stdlib, read-only; --host to widen)
          ─► opens http://127.0.0.1:<port>/?t=<token>
browser   ─► built app (index.html + assets/) ─► /api/world, /api/topic/<slug>,
             /api/note/<id>, /api/search?q=, /api/health
```

- `--port` picks the port, by default any free one. `--topic` maps only the named topics and their sub-topics. `--no-open` prints the URL without opening a browser.
- The server answers only GET; other methods get 405. Every request needs the token, either in the `t` query parameter or in a cookie. The token is random for each start. With `--keep-token`, which needs `--port`, the server reuses the token saved for that brain and port, so the link stays the same across restarts. The token is saved in brain-wiki's state directory, readable only by the user, and deleting the file makes a new one. A request with the token in the URL gets an `HttpOnly; SameSite=Strict` cookie named for the port, so module chunks and API calls are authorized without the token in every URL. Tokens are compared in constant time.
- The server exits after 30 minutes without a request, or on Ctrl-C.
- It listens on loopback by default. `--host ADDRESS` listens elsewhere, so the map can be opened from another machine (`0.0.0.0` or `::` for every interface). The server then prints a second URL with the machine's hostname and warns on stderr (§8).
- The server builds the graph once (§6), caches it, and rebuilds it only when an index scan reports changes. World, health, and search requests check for changes. Topic requests use the cached graph, so revealing a topic never waits on a scan (about 120 ms at 10k notes) and matches the world the page loaded. The world payload stays small, about 170 KB at 10k notes, and topics load on demand.
- The front end is TypeScript, three.js, `camera-controls` for flights, and Preact for the panels, built with Vite. Its source is a separate repository, brain-wiki-viz, which keeps the Node toolchain out of this one. Only the built bundle is committed here, in `src/brainwiki/viz/app/`, so installing or running brain-wiki never needs Node.
- `BUILD_INFO.json` next to the bundle names the brain-wiki-viz commit it was built from. CI rebuilds that commit from its `package-lock.json`, which may hold only public registry URLs, and fails if the result differs.
- The API in §6 is the interface between the two repositories. A change to it lands here first, then in brain-wiki-viz, then as a new bundle.

`--export FILE` writes the map to a file and exits, in the format its extension names:

| Extension | Contents |
|---|---|
| `.html` | One self-contained page: the app with every asset inlined, and the world, every topic, and health embedded |
| `.json` | The full graph: topics, nodes including episodes, links, and recent runs |
| `.graphml` | The same nodes and links as GraphML, for other graph tools |

The HTML export's details panel shows only what the topic data carries (links and backlinks among the mapped notes, no summary or banners) and says that note text is not included. Every export contains the title of every mapped note.
