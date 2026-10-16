# D16: Python 3.11 or newer, stdlib first

Status: accepted.
Argued in: [engineering](../design/engineering.md).

brain-wiki is written in Python 3.11 or newer, uses the standard library first, and keeps runtime dependencies few: the MCP SDK, PyYAML, tomlkit, filelock, and Typer. The CLI used `argparse` for fast startup until D31 moved it to Typer.

## Alternatives considered

- A Rust core.
