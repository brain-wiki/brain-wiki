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

Python ≥ 3.11, stdlib-first, few runtime dependencies. The CLI was on `argparse` for fast startup until D31.

### Alternatives considered

Rust core

## Related
- [[d31-typer-cli]]: D31: The CLI is built on Typer
