---
id: 01M3250V00Z4R5QKA9ZC7EZFWM
type: design
title: "Exit codes (CLI and MCP)"
aliases: ["CLI and MCP §2.3"]
source: "docs/design/cli-and-mcp.md#23-exit-codes"
---
# Exit codes (CLI and MCP)

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | The command ran and found problems, or could not finish (see below) |
| 2 | Usage error |
| 3 | Not found: `not_found`, `not_configured`, `not_available` |
| 4 | Conflict: `conflict`, `stale`, `expired`, `busy` |
| 5 | Forbidden by the profile or host limits |
| 10 | Internal error (a bug) |
| 130 | Interrupted (Ctrl-C, or Ctrl-D at a prompt) |
| 141 | The reader of stdout went away (`brain topics \| head`); nothing is printed |

Exit 1 covers lint or validate errors, a change a run's lint gate refused
(`invalid_ops`), a rebase conflict in `brain commit`, `ambiguous`,
`budget_exceeded`, `unsupported_host`, `format`, and `os_error` (a path
that could not be read or written).

Exit 2 covers an unknown command or option, a bad value, and a flag the
command would ignore. A parse error prints the command's usage line, then
`brain <command>: error: <message>`. `brain` alone prints the help.

Other errors print one line to stderr, `<code>: <message>`, with the codes
of §3.6. An internal error prints
`internal: unexpected error; details are in <log>` and writes the trace to
`<state>/logs/brain-wiki.log`.
