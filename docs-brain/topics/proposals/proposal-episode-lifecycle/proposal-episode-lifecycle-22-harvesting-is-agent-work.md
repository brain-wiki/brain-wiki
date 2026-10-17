---
id: 01M3250V00Q9ZPBDN01NEME8J4
type: proposal
title: "Harvesting is agent work"
aliases: ["Episodes: quick capture, per-agent consolidation §2.2"]
source: "docs/proposal/episode-lifecycle.md#22-harvesting-is-agent-work"
---
# Harvesting is agent work

Harvest becomes consolidation whose input is a past session instead of an
episode. The agent files what a session holds straight into notes, and
harvest writes no episodes.

- brain-wiki still reads, filters, routes, and scrubs sessions, and
  computes their provenance (session id, turn range, inputs), so
  provenance never comes from the model
  ([[d20-harvest-host-sessions|D20]]).
  `brain_harvest_prepare` returns the packet as today, with each
  session's inputs.
- The agent applies the patterns of §4 to each session. Each note it
  creates or changes cites the session in `bw-sources` with a session URL
  from the packet, such as `"session://claude-code/<session id>#turns=12-30"`.
  The URL holds no file path. `brain origin` and `brain_read_origin`
  accept it and show those turns when the transcript is on this machine.
- `brain_harvest_done {run, sessions}` replaces `brain_harvest_apply`. It
  takes an outcome per session, as `--done` does (§4.1), checks that each
  named note cites its session, and advances the watermarks so the next
  harvest starts after the last handled turn.
- Distill uses only sessions with `inputs: local`, the same rule as for
  episodes.
- `brain harvest` in a terminal keeps listing sessions, `--status`,
  `enable`, and `route`. `--apply`, `--raw`, `--distill`, and the
  `[harvest] distill` setting are removed, since without an agent nothing
  can file the sessions. A large backfill runs over several sessions
  (`remaining` counts what is left), or night by night with the scheduled
  job's `--harvest` (§5.2).
- On a host without a session reader (Cursor, OpenClaw), the agent reads
  its own history when the user asks and files it the same way, citing a
  session URL with the session id it knows. brain-wiki cannot check those
  citations, and there is no watermark.
