---
id: 01M3250V008SZ3D6PRTEVD0MZN
type: design
title: "Parser and startup cost"
aliases: ["07 §2.4"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#24-parser-and-startup-cost"
bw-part_of:
  - "[[07-2-cli]]"
---
# Parser and startup cost

The CLI is built on Typer, for three things argparse made awkward: nested
subcommands with their own arguments and help (`brain rules add --help`),
validation from type annotations (choices, ranges, repeatable options), and
shell completion (`brain --install-completion`). Help is plain text: rich
markup is off, so rich, which Typer installs, is never imported.

Typer only parses. Each command returns the handler to run and the namespace
of arguments it reads; `main` runs the handler, so exit codes and error lines
(§2.3) do not depend on Typer. Handler modules are imported only for the
command run: no command but `brain mcp` imports the MCP SDK, none but `brain
viz` and `brain bench` load the visualizer or the bench, and help imports
none of them. A test checks that `brain --help` and `brain log --help` import
neither the engine, the MCP SDK, the visualizer, the bench, nor rich.

Typer costs startup time: importing it (it vendors Click) and building the
command tree from annotations. Measured on a Linux workstation, Python 3.12,
best of 7, on the example brain:

| Command | argparse | Typer |
|---|---|---|
| `brain --help` | 52 ms | 103 ms |
| `brain log --help` | 52 ms | 105 ms |
| `brain search x` | 124 ms | 166 ms |

The cost is accepted: with host lifecycle hooks removed (D14), no command
runs on every agent turn, and 50 ms is small next to an agent's turn. To keep
it down, `cli/_main.py` keeps real annotations (no `from __future__ import
annotations`), which halves the time Typer spends reading them.
