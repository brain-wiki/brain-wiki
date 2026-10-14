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

Agents run CLI commands inside their turns, so the CLI starts fast
([[13-5-performance-budgets|13]]): it uses `argparse` and
imports subcommand modules lazily, so no command but `brain mcp` imports the
MCP SDK, and none but `brain viz` and `brain bench` load the visualizer or
the bench.
