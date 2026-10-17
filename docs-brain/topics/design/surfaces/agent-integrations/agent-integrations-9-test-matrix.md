---
id: 01M3250V00AR8BSB8FVCQHJT8X
type: design
title: "Test matrix"
aliases: ["Agent integrations §9"]
source: "docs/design/agent-integrations.md#9-test-matrix"
---
# Test matrix

Session readers and `brain connect` are tested on every change with
synthetic host files. The host columns are checks to run by hand on each
host before a release.

| Check | Claude Code | Codex | Antigravity | OpenClaw |
|---|---|---|---|---|
| Plugin validates and loads | `claude plugin validate`, install | marketplace add, install | `agy plugin install ./` | `plugins install --link`, `inspect` |
| MCP tools listed and callable | ✓ | ✓ | ✓ | ✓ |
| Instructions reach the model | ✓ | ✓ (T-15) | ✓ (T-4) | ✓ |
| Harvest skips brain-wiki's own headless runs | ✓ | ✓ | ✓ | — |
| Reader parses real sessions; harvest dry run lists, routes, and skips correctly | ✓ | ✓ | ✓ | — |
| Origin lookup returns the right window, and `not_available` when deleted | ✓ | ✓ | ✓ | — |
| `brain connect` and `--uninstall` round trip | ✓ | ✓ | ✓ | ✓ |
| Unattended mode: a scheduled run edits only the brain, calls brain-wiki's tools without a prompt, and leaves no session behind | ✓ | — | — | — |
