---
id: 01M3250V00H6WRKH7AA89VRBSJ
type: design
title: "Lifecycle"
aliases: ["CLI and MCP §3.7"]
source: "docs/design/cli-and-mcp.md#37-lifecycle"
---
# Lifecycle

- One process serves one host connection over stdio.
- On start, the server detects the host (§3.3) and builds its
  instructions. With `--host auto`, the client's self-reported name, read
  on the first tool call, replaces the guess from the environment
  ([[agent-integrations-2-host-ids|agent integrations §2]]).
- The `brain` argument can pick a different brain on each call, within the
  host's limits. Engines are opened on first use and cached per brain.
- Each call re-reads the user config and the brain's `brain.toml` and
  refreshes the cached engine, so a profile change, or any other manifest
  change, applies to the next call without a restart.
- Each request rescans the brain if more than `search.freshness_ms`
  (default one second) has passed since the last scan
  ([[index-and-search-4-freshness|index and search §4]]).
- Tool calls run one at a time, under one lock.
- The server exits on stdin EOF, as the transport requires.
