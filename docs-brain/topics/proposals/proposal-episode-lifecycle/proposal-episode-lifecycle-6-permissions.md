---
id: 01M3250V00K9VQCRPHQ2XVRBV3
type: proposal
title: "Permissions"
aliases: ["Episodes: quick capture, per-agent consolidation §6"]
source: "docs/proposal/episode-lifecycle.md#6-permissions"
---
# Permissions

Permissions are not a security boundary. An agent with file access can
edit `brain.toml`, move files, or skip brain-wiki entirely. Git history
(`brain commit`) and lint are the backstop. Permissions say what a host is
expected to do, decide what orientation teaches it, and limit
brain-wiki's own commands.

| Action | Rule |
|---|---|
| Capture an episode | Every host, no permission. The MCP server records the calling host as the owner |
| Harvest sessions | A host reads only its own sessions, with `harvest`, once the user turns harvest on for it, and files them with `edit` |
| Consolidate own episodes | `edit` |
| Consolidate another agent's or unowned episodes | `edit`, when the user asks (§3.2) |
| Distill into user facts | From `inputs: local` episodes only (the guidance), listed in the report |
| Add a rule | The user, unchanged |
| Schedule consolidation | The user's command; refused under `--as`, like `agents grant` |

The `episodes` capability goes away: it could not be enforced, and capture
is open by design. A `brain.toml` that still lists it loads, and the entry
is ignored. The gap found while checking the docs, `brain import` and
`brain harvest` writing episodes without the `episodes` check, goes with
it.
