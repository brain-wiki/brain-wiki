---
id: 01M3250V0097R2VX6SS9745NJK
type: design
title: "Dependencies"
aliases: ["Engineering §3"]
source: "docs/design/engineering.md#3-dependencies"
---
# Dependencies

| Package | Range | Why |
|---|---|---|
| `mcp` | `>=2.3,<3` | MCP server. Imported only by `brainwiki.mcp`. |
| `PyYAML` | `>=6.0` | Frontmatter parsing, with `CSafeLoader` when available. |
| `tomlkit` | `>=0.12` | Editing `config.toml` and `brain.toml` without losing comments. Reading uses stdlib `tomllib`. |
| `filelock` | `>=3.12` | Cross-platform advisory locks. |
| `typer` | `>=0.26,<1` | The CLI parser ([[d31-typer-cli\|D31]], [[cli-and-mcp-24-parser-and-startup-cost\|CLI and MCP §2.4]]). |

- `mcp` pulls in pydantic, starlette, uvicorn, httpx2, jsonschema, and
  others.
- Writers edit frontmatter line by line instead of dumping YAML, so
  formatting is preserved.
- `filelock` is imported only when a lock is taken, because it loads
  `asyncio` (about 40 ms), which read-only commands never need.
- `typer` vendors Click and installs rich and shellingham. Rich markup is
  off, so rich is never imported.

Everything else is standard library ([[d16-python-stdlib-first|D16]]):
`sqlite3`, `tomllib`, `json`, `re`, `hashlib`, `gzip`, `subprocess`,
`http.server`. ULIDs come from a small internal function. There are no
optional extras. A file watcher for long-running processes is in the
[[ideas|backlog]].

Development tools are the `dev` dependency group (`uv sync` installs it):
`pytest>=8`, `hypothesis>=6.100`, and `ruff==0.16.10`. Ruff is pinned
exactly because its formatting changes between releases. `pyproject.toml`
has a pyright section for editors, but no type checker or coverage tool
runs in `scripts/check.py`.

A new runtime dependency needs a reason in its pull request, a compatible
license (Apache-2.0, MIT, BSD, PSF; MPL-2.0 for tools only), and a version
range in `pyproject.toml`. The repository tracks no lockfile; `uv.lock` is
ignored.

Supported Python is 3.11 and newer. SQLite needs FTS5 (`brain doctor`
reports `no_fts5` otherwise). Trigram search (SQLite 3.34+) is used when
present.
