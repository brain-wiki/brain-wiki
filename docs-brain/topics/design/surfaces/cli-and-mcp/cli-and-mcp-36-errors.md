---
id: 01M3250V00YYYSEVE5Z73H50B9
type: design
title: "Errors"
aliases: ["CLI and MCP §3.6"]
source: "docs/design/cli-and-mcp.md#36-errors"
---
# Errors

Execution errors are tool errors (`isError: true`), so the model can
correct itself. After the SDK's `Error executing tool <name>: ` prefix, the
message starts with a stable code:

| Code | When |
|---|---|
| `not_found` | The target, brain, or run does not exist |
| `ambiguous` | The target matches several notes; the message lists them |
| `forbidden` | Not allowed by the profile, the host limits, or the harvest setting |
| `usage` | A value the schema allows but the engine rejects: a bad date, cursor, section, or turn range |
| `invalid_ops` | Harvest entries failed validation, or a run's lint gate refused the change; the problems follow |
| `stale` | Files changed since the run read them; run the command again |
| `conflict` | The change collides with something already there, such as a registered name or an existing file |
| `budget_exceeded` | `rules.md` would exceed its budget |
| `expired` | The harvest run handle is older than one hour |
| `busy` | The brain's write lock could not be taken in time |
| `not_available` | An episode's origin conversation is not on this device, or the host deleted it |
| `unsupported_host` | brain-wiki has no session reader for the calling host; the message describes the fallback recipe |
| `not_configured` | No brain is set up for this host; the message says to use the `brain-setup` skill or `brain setup --guide` |
| `internal` | An unexpected exception; the trace goes to the log file and the message names it, without internal details |

Protocol errors (an unknown tool, a malformed request) are left to the SDK.
