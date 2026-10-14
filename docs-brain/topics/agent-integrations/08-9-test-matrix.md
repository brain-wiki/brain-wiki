---
id: 01M3250V00NYQD6WKC88J76HKX
type: design
title: "Test matrix"
aliases: ["08 §9"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#9-test-matrix"
bw-part_of:
  - "[[agent-integrations]]"
---
# Test matrix

| Check | Claude Code | Codex | Antigravity | OpenClaw |
|---|---|---|---|---|
| Plugin validates and loads | `claude plugin validate`, install | marketplace add, install | `agy plugin install ./` | `plugins install --link`, `inspect` |
| MCP tools listed and callable | ✓ | ✓ | ✓ | ✓ |
| Orientation injected at start | ✓ | ✓ | ✓ (first call only) | — (no hooks) |
| Prompted capture asks once | ✓ | ✓ | ✓ | — |
| Raw capture produces one episode per compaction | ✓ | ✓ | stop only | — |
| Self-exclusion during headless harvest | ✓ | ✓ | ✓ | — |
| Session reader parses recorded fixtures; harvest dry run lists, routes, and skips correctly | ✓ | ✓ | ✓ | — |
| Origin lookup returns the right window, and `not_available` when deleted | ✓ | ✓ | ✓ | — |
| `brain connect` and `--uninstall` round trip | ✓ | ✓ | ✓ | ✓ |

Recorded hook payloads for each host and event are kept as test fixtures,
so the adapters are tested on every change even where the host is not
installed.
