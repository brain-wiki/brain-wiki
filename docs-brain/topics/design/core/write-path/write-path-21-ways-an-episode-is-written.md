---
id: 01M3250V0045MCEAS8QN556FWQ
type: design
title: "Ways an episode is written"
aliases: ["Write path §2.1"]
source: "docs/design/write-path.md#21-ways-an-episode-is-written"
---
# Ways an episode is written

Agents capture episodes; people record knowledge by editing a note or by
asking an agent. Capturing needs no capability.

| Writer | `origin` | `inputs` | `captured` |
|---|---|---|---|
| MCP `brain_log_episode` | `agent` | `unknown` (§3.2) | `mcp` |
| File created directly under `inbox/episodes/` | as written, but `owner` becomes `agent` | `unknown` | `file` |
| File in `inbox/agents/<agent>/` | `agent` | `unknown` | `file` |

- The MCP server sets `agent` to the calling host, so an agent cannot write
  an episode as another agent.
- `brain_log_episode` takes an optional `pattern` hint (`record`,
  `playbook`, `file`, `distill`), stored as `bw-pattern`: the agent's guess
  at how consolidation should use the episode. The consolidation packet
  shows it; consolidation may ignore it.
- Episodes written earlier by `brain log` (`captured: cli`), `brain import`
  (`captured: import`), or harvest (`captured: harvest`) stay valid. Documents and agents'
  memory files are now imported by an agent filing them into notes
  ([[import-6-documents-and-memory-files|import §6]]).

Episodes from an agent session also record `agent` (host id), `session`
(host session id), `origin_turns` (the turn range they cover), and
`device`. On that device, tools can show the original conversation later
(§4.6). These fields never hold file paths. An episode must make sense
without its origin, because hosts delete old transcripts.

An episode's `## Claims`, `## Negative findings`, and `## Open questions`
sections are body text built from the writer's arguments
([[brain-format-9-episodes|brain format §9]]). Nothing parses them into
structured facts.

Every writer calls `write_episode()`, which:

1. Checks the provenance values and field formats. An episode needs a
   summary or at least one claim.
2. Returns the existing episode and writes nothing when one already has
   the given dedupe key. Harvest uses `<host>:<session>:<turn range>`.
3. Scrubs secrets, replacing each with `[REDACTED:<kind>]`
   ([[security-and-privacy-6-secret-scanning|security §6]]).
4. Mints the ULID and path (UTC year and month) and sets the provenance
   fields from the caller's code path, ignoring values the model put in
   the text. At most 5 topic hints are kept.
5. Caps the file at 64 KiB, cutting the body and noting how much was cut.
6. Claims the dedupe key with a marker created with `O_EXCL` in
   `<state>/brains/<brain-key>/dedupe/`, so two processes on one device
   cannot both write it. The index catches keys from synced episodes.
7. Writes the file atomically (temporary file, `fsync`, rename), records
   its hash in `<state>/brains/<brain-key>/written/<id>`, and updates the
   index.

Episode writes are not runs. They create one file and change nothing else,
so there is nothing to undo. The next `brain commit` snapshot (§5) or the
`consolidate --done` run that archives the episode puts it in git.

The scanner trusts an episode's declared provenance only when its
`written/` marker matches its content. Any other file under
`inbox/episodes/` (written by hand, edited later, or synced from another
device) is indexed with `inputs: unknown`, `captured: file`, and never
`origin: owner`. Most agent episodes are `unknown` anyway, because an MCP
write cannot prove its session clean (§3.2).
