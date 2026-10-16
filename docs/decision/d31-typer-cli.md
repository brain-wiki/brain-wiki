# D31: The CLI is built on Typer

Status: accepted.
Argued in: [CLI and MCP §2.4](../design/cli-and-mcp.md#24-parser-and-startup-cost).

The CLI is built on Typer (help in plain text, rich never imported): nested subcommands with their own help, validation from type annotations, and shell completion. Typer only parses; `main` runs the handler and owns exit codes. Its ~50 ms startup cost is accepted now that no hook runs the CLI on every agent turn. (`typer-slim` was the plan, but it is now an alias that installs full `typer`.)

## Alternatives considered

`argparse` with nested subparsers; Click
