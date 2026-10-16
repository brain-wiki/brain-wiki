---
id: 01M3250V00880S3YAKGDRVMXTH
type: design
title: "Errors"
aliases: ["07 §3.6"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#36-errors"
---
# Errors

Execution errors are tool errors (`isError: true`) so the model can correct
itself. After the SDK's `Error executing tool <name>: ` prefix, the message
starts with a stable code:

| Code | When |
|---|---|
| `not_found` | Target, brain, or run does not exist |
| `ambiguous` | Target matches several notes; the message lists them |
| `forbidden` | Not allowed by the profile or host limits |
| `invalid_ops` | Harvest entries failed validation, or a run's lint gate refused the change; the problems follow |
| `stale` | Files changed since the run read them; run the command again |
| `conflict` | The change collides with something already there (a registered name, an existing file) |
| `budget_exceeded` | `rules.md` would exceed its budget |
| `expired` | The harvest run handle is older than one hour |
| `busy` | The brain's write lock could not be taken in time |
| `not_available` | An episode's origin conversation is not on this device or was deleted by the host |
| `unsupported_host` | brain-wiki has no session reader for the calling host; use the fallback recipe |
| `not_configured` | No brain is set up for this host yet; the message points to the `brain-setup` skill |

Protocol errors (unknown tool, malformed request) are left to the SDK.
Unexpected exceptions are logged with a trace to the log file and reported
as `internal` with a log reference, never with internal details.
