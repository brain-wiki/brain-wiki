---
id: 01M3250V006ERDJXKY5KR2AHK7
type: design
title: "Startup cost"
aliases: ["07 §2.4"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#24-startup-cost"
bw-part_of:
  - "[[07-2-cli]]"
---
# Startup cost

`brain hook` runs inside agent turns and must finish in well under a
second ([[13-5-performance-budgets|13]]). The CLI uses `argparse`
and imports subcommand modules lazily, so `brain hook` never imports the
MCP SDK, the visualizer, or the bench.
