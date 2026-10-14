---
id: 01M3250V00SEEJSJ67WYWFQ6CM
type: design
title: "Rules for every hook"
aliases: ["08 §5.3"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#53-rules-for-every-hook"
bw-part_of:
  - "[[08-5-hooks]]"
---
# Rules for every hook

- **Never break the host.** Any internal error is logged to the state log
  and the hook exits 0 with an empty, valid output. A hook never blocks a
  tool call.
- **Fast.** Budgets in [[13-5-performance-budgets|13 §5]]; no
  network; no model calls; heavy work (raw capture of a large transcript) is
  bounded by size and time and abandoned rather than delaying the host.
- **Quiet.** Only protocol JSON on stdout; diagnostics on stderr.
- **No shell interpolation.** Payload content never reaches a command line.
- **Self-exclusion.** If `BRAIN_WIKI_INTERNAL=1` is set (brain-wiki sets it
  for every subprocess it starts, such as headless harvest), hooks exit
  immediately. This prevents a harvest run from capturing itself.
