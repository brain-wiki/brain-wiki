---
id: 01M3250V00VE2NVVA32RGP3VPY
type: design
title: "Safety"
aliases: ["Visualizer §8"]
source: "docs/design/visualizer.md#8-safety"
---
# Safety

- Strings from notes are rendered as text, never as HTML. Preact escapes them, and labels use `textContent`.
- The preview renders Markdown without HTML. The body is parsed into a syntax tree (CommonMark with GFM), which is turned directly into elements, so no HTML string is built or assigned. Raw HTML in a note shows as text, and HTML and `%%` comments are dropped. Links open only `http(s)` and `mailto` URLs, in a new tab with `noopener noreferrer`. Wikilinks open only targets the server resolved. Images show as their alt text, and the CSP blocks remote images anyway.
- The server sends `Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; font-src 'self'`, with `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, and `Cache-Control: no-store`. Exported HTML allows its inline script and style by hash and allows no network connections.
- The server listens on loopback unless `--host` says otherwise. Beyond loopback the token still guards every request, but the traffic is plain HTTP, so anyone who can see it can take the token and read the brain. The warning says so and suggests an SSH tunnel on untrusted networks.
- Third-party code ships only inside the built bundle. `THIRD_PARTY_NOTICES.txt` next to it carries the licenses of every bundled package, all MIT or ISC today, and the build regenerates it.
