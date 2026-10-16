---
id: 01M3250V00647XFD842RRN35W9
type: design
title: "Notes (Codex (CLI and ChatGPT desktop))"
source: "docs/design/hosts/codex.md#notes"
---
# Notes (Codex (CLI and ChatGPT desktop))

- Codex rewrites tool names to `[A-Za-z0-9_]`; brain-wiki's are snake case
  already.
- Codex reports web search as a hosted tool. The session reader treats a
  rollout's `web_search_call` items as untrusted, like web fetches.
