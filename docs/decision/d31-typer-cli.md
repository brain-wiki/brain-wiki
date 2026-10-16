# D31: The CLI is built on Typer

Status: accepted.
Argued in: [CLI and MCP §2.4](../design/cli-and-mcp.md#24-parser-and-startup-cost).

The CLI uses Typer for nested subcommands with their own help, validation from type annotations, and shell completion. Help is plain text, and rich is never imported. Typer only parses the command line; `main` runs the handler and owns the exit codes. Typer adds about 50 ms at startup, which is acceptable now that no hook runs the CLI on every agent turn.

`typer-slim` was the plan, but it is now an alias that installs full `typer`.

## Alternatives considered

- `argparse` with nested subparsers.
- Click.
