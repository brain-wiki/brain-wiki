---
id: 01M3250V000EZM4RWBVFN79KKC
type: design
title: "Parser and startup cost"
aliases: ["CLI and MCP §2.4"]
source: "docs/design/cli-and-mcp.md#24-parser-and-startup-cost"
---
# Parser and startup cost

The CLI is built on Typer ([[d31-typer-cli|D31]]). Typer
gives nested subcommands with their own arguments and help
(`brain rules add --help`), validation from type annotations, and shell
completion (`brain --install-completion`). Help is plain text: rich markup
is off, so rich, which Typer installs, is never imported.

Typer only parses. Each command returns the handler to run and the
arguments it reads, and `main` runs the handler, so exit codes and error
lines (§2.3) do not depend on Typer.

Handler modules are imported only for the command that runs:

- Only `brain mcp` imports the MCP SDK.
- Only `brain viz` and `brain bench` load the visualizer and the bench.
- Help imports none of them. A test checks that `brain --help`,
  `brain log --help`, and `brain rules add --help` import neither the
  engine, the MCP SDK, the visualizer, the bench, nor rich.

Typer costs startup time for importing it (it vendors Click) and building
the command tree from annotations. Measured on a Linux workstation, Python
3.12, best of 7, on the example brain:

| Command | argparse | Typer |
|---|---|---|
| `brain --help` | 52 ms | 103 ms |
| `brain log --help` | 52 ms | 105 ms |
| `brain search x` | 124 ms | 166 ms |

The cost is accepted. No command runs on every agent turn, since there are
no host lifecycle hooks ([[d25-static-instructions|D25]]), and
50 ms is small next to an agent's turn. `cli/_main.py` keeps real
annotations (no `from __future__ import annotations`), which halves the
time Typer spends reading them.
