---
id: 01M3250V00MXGY8BDV97ADVRAR
type: design
title: "`brain connect`"
aliases: ["08 §8"]
tags: [agent-integrations]
source: "docs/design/08-agent-integrations.md#8-brain-connect"
bw-part_of:
  - "[[agent-integrations]]"
---
# `brain connect`

`brain connect <host>` wires a host to the locally installed brain-wiki.

1. Materialize a host-specific copy of the plugin under
   `<data dir>/brain-wiki/plugin/<host>/`, with the MCP command set to
   the absolute path of the installed `brain`, `--host <id>`, and (if given)
   `--brain <name>`.
2. Register it the way the host expects, preferring the host's own CLI when
   it is installed:

| Host | Registration |
|---|---|
| Claude Code | Add the materialized directory as a local marketplace and install the plugin from it |
| Codex | Add it as a local marketplace (`codex plugin marketplace add <dir>`) |
| Antigravity | Link or copy into `~/.gemini/config/plugins/brain-wiki/` |
| OpenClaw | `openclaw plugins install --link <dir>` |
| Cursor | Add the server to Cursor's MCP config file |
| generic | Print the snippet only |

3. Write the static instruction block (§3.2) where the host reads it, if
   it has such a file (§4).
4. Options: `--scope user|project`, `--brain`, `--print` (print the block
   and MCP entry instead of writing), `--force` (replace an edited block),
   `--dry-run` (print every file change as a diff), `--uninstall`.
   `--brain` must name a registered brain or a brain folder (written as an
   absolute path); anything else is `not_found`. `--print` with
   `--uninstall` is a usage error. Codex, Antigravity, and OpenClaw have no
   project scope, so `--scope project` with them is a usage error.
5. Every change is recorded with backups of modified files: user scope in
   `<state>/connect/<host>.json`, project scope in
   `<state>/connect/projects/<hash of the project folder>/<host>.json`. Each
   scope is connected and uninstalled on its own; what the scopes share (the
   plugin copy, Claude Code's marketplace) is removed only with the last
   one. On `--uninstall`, a config file still exactly as `connect` wrote it
   gets the original bytes back from the backup (or is deleted if `connect`
   created it); one the user changed since keeps those changes and loses
   only brain-wiki's entry, and the step says so. A reconnect over its own
   unchanged write keeps the first backup. A config that is not plain JSON
   (comments, trailing commas) is refused with a `format` error naming the
   file; `--print` gives the entry to add by hand.
6. After registering, run the host's own listing command (where one
   exists) and report whether the plugin, server, and instruction block are
   visible.
