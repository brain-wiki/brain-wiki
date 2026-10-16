---
id: 01M3250V00QNJW38W3HREENHQH
type: decision
title: "D16: Python 3.11 or newer, stdlib first"
aliases: ["D16"]
source: "docs/decision/d16-python-stdlib-first.md"
---
# D16: Python 3.11 or newer, stdlib first

Status: accepted.
Argued in: [[engineering|engineering]].

brain-wiki is written in Python 3.11 or newer, uses the standard library first, and keeps runtime dependencies few: the MCP SDK, PyYAML, tomlkit, filelock, and Typer. The CLI used `argparse` for fast startup until D31 moved it to Typer.

### Alternatives considered

- A Rust core.

## Related
- [[d31-typer-cli]]: D31: The CLI is built on Typer
