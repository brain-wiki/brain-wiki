---
id: 01M3250V00ED9KVE23NN3R2EH3
type: proposal
title: "Rules for every hook"
aliases: ["Host hooks: briefing, capture, and recall §1.5"]
source: "docs/proposal/hooks.md#15-rules-for-every-hook"
---
# Rules for every hook

- Never break the host. Internal errors were logged, and the hook exited 0
  with an empty, valid output.
- Be fast: about 0.1 s with the installed `brain` (300 ms budget), no
  network, no model calls, and no import of the MCP SDK. `uvx` took 23 s
  per call behind a slow package index (T-10), so marketplace copies
  shipped no hooks.
- Print only protocol JSON on stdout.
- Never interpolate payload content into a shell command.
