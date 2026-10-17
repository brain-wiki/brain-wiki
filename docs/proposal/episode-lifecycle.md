# Episodes: quick capture, per-agent consolidation

Status: decided 2026-10-16 (§9). Phase 1 (capture) is built; phases 2 to 4 are not.

An episode has two moments with different needs. An agent captures it in
the middle of a task, so capture must be fast and raw. Later, off the busy
path, the agent that captured it turns it into a note, because that agent
can reopen the conversation it came from. This proposal designs around
those two moments: agents capture, each agent consolidates its own
episodes, in a session or on a schedule, and the work of turning an episode
into a note follows a few named patterns. An agent takes another agent's
episodes only when the user asks. Work that is already off the busy path,
harvesting past sessions and importing documents, skips the inbox: the
agent files straight into notes.

It also removes a permission gap instead of patching it. Today
`brain log` and `brain_log_episode` check an `episodes` permission that
`brain import` and `brain harvest` skip. Under this design capture needs no
permission at all (§6), so there is nothing to skip.

## 1. Lifecycle

```
   during work (fast)                      off-peak (thorough)
 ┌──────────────────────┐              ┌────────────────────────────────┐
 │ an agent, on its own │              │ the agent that wrote it        │
 │ or asked by the user │  inbox/      │ reads the episode, its origin  │
 │   └─ brain_log_      ├─────────────►│ conversation, and the brain    │
 │      episode         │  episodes/   │   └─ record / playbook / file  │
 │      (raw, one call) │  bw-agent=X  │      / distill / skip          │
 └──────────────────────┘              │   └─ validate, done, commit    │
                                       └────────────────────────────────┘
```

| Stage | Who | When | Cost to the agent |
|---|---|---|---|
| Capture | The working agent, on its own or because the user asked | Mid-task, when something is worth keeping | One call, no search, no organizing |
| Consolidate | The agent that captured it. Another agent only when the user asks | On a schedule, or when the user asks | A full session: search, read, edit, validate |
| Harvest, import | The agent whose sessions they are, or the agent the user asks to import | On a schedule (harvest), or when the user asks | The same as consolidation, with no episode in between |

## 2. Capture

Capture records what happened, in the agent's words, and returns at once.
The agent does not search the brain or decide where the knowledge goes.

- Agents write episodes, through MCP `brain_log_episode`. Almost every
  agent host speaks MCP. Every connected host may capture; no permission
  is needed.
- People do not write episodes. A person records knowledge by editing a
  note, in Obsidian or any editor, or by telling an agent "remember this".
  `brain log` goes away.
- An episode file an agent writes by hand into `inbox/episodes/` is still
  accepted, but its `bw-agent` is self-declared, so it counts as unowned.
  The brain's `AGENTS.md` block stops suggesting it.
- The writer always sets `bw-agent` to the calling host. An agent cannot
  write an episode as another agent. `bw-session`, `bw-turns`, and
  `bw-device` stay as today, so the owner can reopen the conversation.
- `brain_log_episode` keeps its fields (`summary`, `claims`,
  `open_questions`, `topics`) and gains one optional hint, `pattern`: the
  agent's quick guess at how the episode should be consolidated (`record`,
  `playbook`, `file`, `distill`). Consolidation may ignore it.
- The tool description and orientation tell agents: capture raw, do not
  organize now; consolidation happens later.

Every episode has an owner, or none:

| Written by | Owner |
|---|---|
| MCP `brain_log_episode` | The calling host |
| A file written by hand into `inbox/episodes/` | None, whatever its `bw-agent` says |
| An episode harvested before this change (`bw-captured: harvest`) | The host in its `bw-agent` |
| An episode imported before this change (`bw-captured: import`) | None |

### 2.1 Importing is agent work

Documents and an agent's memory files go straight into notes, without
becoming episodes first. `brain import --to-episodes` and
`brain import --from HOST` are removed.

- The user asks an agent: "bring in my meeting notes from ~/meetings",
  "import your memory files". The agent reads the files, searches the
  brain, and applies the patterns of §4 directly: it records a meeting,
  files a decision, updates a howto.
- Each note it creates or changes cites its source in `bw-sources`: the
  document's URL when it has one, or the record note the agent made from
  a local file. Local file paths are not written into notes, because a
  brain moves between machines.
- An agent's memory files are its own earlier notes. It files their
  content like an episode it captured; there is nothing outside the brain
  to cite.
- Text the user did not write (clippings, other people's documents) can
  be recorded or filed with its source, but cannot become a statement
  about the user (Distill, §4). The user says what the files are when
  asking, which replaces `--untrusted`.
- A second import finds the notes already there, because the agent
  searches before it writes. The chunk dedupe keys go away.
- Each host's design doc keeps its memory-file locations, as guidance for
  the agent.
- Cost grows with the volume of text, since an agent reads all of it.
  Copying a folder of notes as they are stays `brain import --into`, and
  adopting a vault stays `brain import --overlay`; both are deterministic
  and need no agent.

### 2.2 Harvesting is agent work

Harvest becomes consolidation whose input is a past session instead of an
episode. The agent files what a session holds straight into notes, and
harvest writes no episodes.

- brain-wiki still reads, filters, routes, and scrubs sessions, and
  computes their provenance (session id, turn range, inputs), so
  provenance never comes from the model
  ([D20](../decision/d20-harvest-host-sessions.md)).
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

## 3. Consolidation scope

### 3.1 An agent consolidates its own episodes

`brain consolidate --prepare`, called by a host (MCP, or `--as HOST`),
selects that host's own episodes, those whose conversation is readable here
first: the host's session reader finds the transcript on this machine, so
the agent can reopen what it captured. Its episodes captured on other
machines follow, with only the episode text.

Why scope by agent:

- Only the capturing agent can read the origin conversation, through its
  host's session reader on the machine where the session ran. Another
  agent sees only the episode text.
- Partitioning the inbox by owner means two agents consolidating on the
  same night do not touch the same episodes, without leases or locks.
- "Readable here" replaces the device name the old scheduled design
  needed: the session reader answers it from the transcript on disk, so a
  renamed or replaced machine needs no configuration.

### 3.2 Other agents' episodes, only when the user asks

By default an agent sees only its own episodes. It takes another agent's
episodes, or the unowned ones, only when the user asks: "take Cursor's
episodes too", "fold in the unowned episodes". The request is the consent;
there is no confirmation step, which could not stop an agent that reads
the files anyway.

| Where | How |
|---|---|
| A session (MCP) | `brain_consolidate_prepare(agents=["cursor"])`, `unowned=true`, or `all=true`. The guidance says to pass them only when the user asked |
| CLI | `brain consolidate --prepare --agent cursor`, `--unowned`, or `--all` |
| A schedule | The user adds the job with `--include cursor` or `--include unowned` (§5.2) |

Without a hand-off timer, an agent that never consolidates leaves its
episodes in the inbox. Orientation and `brain doctor` show the pending
episodes per agent, with the age of the oldest, so the user can see it and
ask another agent to take them over (journey E6).

## 4. Consolidation patterns

Each episode gets one or more outcomes. The guidance
(`prompts/consolidate.md`) is rewritten around these patterns, with an
example of each.

| Pattern | Use it when | Result |
|---|---|---|
| Record | Something happened that is worth looking up later as it was: an incident, a benchmark run, a release, a meeting | A `type: record` note, dated, close to the episode's own words, in the topic it concerns, citing the episode in `bw-sources` |
| Playbook | The agent did a task it or another agent will do again | A new `type: howto` note when the brain has none for the task, or an update to the existing howto for the same task. Either way: the steps, the commands, what failed and why |
| File | The episode holds a fact or decision that belongs with existing knowledge | The best existing note is edited, or a new note goes in the right topic. A note it replaces is marked superseded |
| Distill | Several episodes show something stable about the user, a person, or a project: a preference, a role, a constraint | A note in `preferences`, a person note, or a project note, citing every episode it rests on. Never a rule |
| Skip | Nothing durable: small talk, or already in the brain | Archived, with the reason |

- Every episode is archived after consolidation, never deleted, whatever
  its pattern, skip included. `--done` moves it from `inbox/` to
  `archive/episodes/YYYY/MM/<id>.md`, where it stays unchanged.
- Every note a consolidation creates or changes links back to its
  episodes in `bw-sources` (`"[[archive/episodes/2026/10/01JA…]]"`). The
  agent writes the archive path before `--done` moves the file; lint
  accepts the link while the episode is still in the inbox. From an
  episode, the reverse is the index's `cited_by` backlinks.
- Record, playbook, and file cover most episodes. Distill is rare and
  usually draws on several episodes at once.
- Distill uses only episodes with `inputs: local`. Text an agent read from
  the web or email can be recorded or filed with its source, but cannot
  become a statement about the user.
- A preference that should bind every session becomes a rule only through
  the user (`brain_propose_rule` in an interactive session).

### 4.1 Recording outcomes

`brain consolidate --done` takes the outcome with each episode, so the run
says what happened:

```
brain consolidate --done 01JA…:playbook:topics/lumen/release-howto.md \
                         01JB…:record:topics/lumen/records/2026-10-16-sync-outage.md \
                         "01JC…:skip:already in topics/lumen/sync.md"
```

MCP `brain_consolidate_done` takes `[{episode, pattern, notes}]`. A plain
episode id still works (pattern unknown). The run's `log.md` entry lists
each episode with its pattern and notes, and feeds the report in §5.4.

`--done` checks the trail before it archives anything. Each note named for
an episode must exist and cite that episode in `bw-sources`; a missing
citation fails the whole call, naming the note and the line to add. A
skipped episode needs a reason instead.

## 5. Running consolidation

### 5.1 In a session

The user says "consolidate". The agent calls `brain_consolidate_prepare`,
works through its own episodes with the user watching, validates, and
calls `brain_consolidate_done`. This is today's flow with the scope of §3
and the patterns of §4.

### 5.2 On a schedule

`brain schedule` gains a second job kind, one job per brain and host:

```
brain schedule add consolidate --host claude-code [--at 21:30] [--harvest]
                               [--include cursor|unowned]… [--dry-run]
brain schedule remove consolidate --host claude-code
```

Like `brain schedule add commit`, it installs an OS job: a block in the
user's crontab on Linux, a LaunchAgent on macOS. On Linux:

```
# >>> brain-wiki consolidate 01M51PF8… claude-code
30 21 * * * /home/me/.local/bin/brain consolidate --run --host claude-code --brain weisun-brain >> /home/me/.local/state/brain-wiki/logs/consolidate-01M51PF8…-claude-code.log 2>&1
# <<< brain-wiki consolidate 01M51PF8… claude-code
```

At 21:30 cron starts brain-wiki, and brain-wiki starts the Claude Code CLI
(`claude -p`) in the brain folder, the way a person would run it, with
brain-wiki's MCP server attached. brain-wiki calls no model itself
([D8](../decision/d08-no-model-calls.md)).

- Claude Code must be installed and signed in on that machine. The run
  uses the user's Claude plan or API key, like any session.
- It runs only while the machine is on. cron skips a missed time;
  launchd runs it at the next wake.

`brain consolidate --run --host claude-code` does this:

1. Checks before it starts: the host's profile has `edit`, the host CLI is
   installed and has an unattended agent mode (§7), and the brain's write
   lock is free.
2. Selects the host's own episodes (§3.1), plus those of the agents the
   user named with `--include`. With `--harvest`, it also finds the host's
   new sessions (harvest must be on for that host). With neither, it
   records "nothing to do" and stops.
3. Starts the host's CLI unattended in the brain folder, with brain-wiki's
   MCP server and file tools limited to the brain, and gives it the
   guidance, the selected episodes, and with `--harvest` the instruction
   to harvest (§2.2).
4. After the agent exits, validates the files it changed and, in a git
   brain, runs `brain commit`.
5. Records the outcome per host: when, episodes and sessions done by
   pattern, notes changed, and any failure.

### 5.3 Answers to why scheduled maintenance was removed

| Reason it was removed | This design |
|---|---|
| It failed silently, refused every night by a profile without the needed capability | `schedule add` refuses unless the host's profile has `edit` and a dry run succeeds. A failed run shows in orientation and `brain doctor` |
| Device names were brittle | No device name. Scope is "this host's episodes, those readable here first" (§3.1) |
| Desktop schedulers could not be configured from outside | The OS scheduler runs the job (crontab or a LaunchAgent, as commit jobs do), so no desktop app is involved |
| Work in a session fits better | In-session consolidation (§5.1) stays the default. Scheduling is opt-in per host |

### 5.4 Telling the user what happened

- Orientation for the owner shows the last consolidation per host, and what is pending per agent: "claude-code, last night: 7 episodes; 2 records, 1 playbook, 3 filed, 1 skipped. Pending: claude-code 4, cursor 12 (oldest 9 days)."
- `reports/consolidation.md` lists recent runs with the episodes, their patterns, the notes they changed, and failures.
- `brain doctor` reports a scheduled run that failed, and pending episodes per agent with the oldest one's age.
- Review is the git diff of the run's snapshot commit. `brain undo` of the `--done` run returns the episodes to the inbox; note edits are restored from git.

## 6. Permissions

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

## 7. Unattended agent mode, per host

Scheduled consolidation needs a host CLI that runs an agent without a
person: tools on, limited to the brain folder, with an MCP server. The
existing presets run with tools off, so they cannot do this.

| Host | Candidate | To verify |
|---|---|---|
| Claude Code | `claude -p` with `--mcp-config`, `--allowedTools`, and an edit-only permission mode | Tool scoping to one folder; MCP tool approval without a prompt |
| Codex | `codex exec` with `--sandbox workspace-write` in the brain folder | MCP servers in exec mode; no approval prompts |
| Antigravity | `agy` headless mode | Whether a headless run can use tools at all (T-5 says denied tools end the turn) |
| Cursor | `cursor-agent -p` | Availability and tool scoping |
| OpenClaw | Gateway automations | Whether automations can be created from outside |

A host without a verified mode consolidates in sessions only. If it never
does, its pending episodes show in orientation, and the user can ask
another agent to take them (§3.2).

## 8. CUJs

| # | Journey | Steps | Done when |
|---|---|---|---|
| E1 | An agent captures mid-task | While fixing a build, the agent learns the tests need the emulator. It calls `brain_log_episode(summary=…, pattern="playbook", topics=["lumen"])` and keeps working | One call; the episode has `bw-agent`, session, and turns |
| E2 | The user asks to remember something | "Remember that Maya now leads sync." The agent logs it with the user's words | The episode cites the session; nothing else happens until consolidation |
| E3 | Nightly consolidation for one host | At 21:30 the job selects claude-code's 9 episodes, reopens two conversations for context, writes 2 records, updates the release howto, files 4 facts, skips 2, validates, and commits | Every episode has an outcome; the commit shows the changes |
| E4 | Morning review | The user starts a session. Orientation shows last night's summary. They open `reports/consolidation.md` and the commit diff, and undo one record | The summary matches the run; undo returns that episode to the inbox |
| E5 | Importing documents | The user tells claude-code "bring in my meeting notes from ~/meetings". It reads them, records each meeting as a dated note, files two decisions into the Lumen project notes citing those records, validates, and commits | No episodes; every changed note cites a record or URL in `bw-sources`; asked again, it changes nothing |
| E6 | A host that never consolidates | Cursor captured 12 episodes and has no unattended mode. Orientation shows "cursor 12 (oldest 9 days)". The user tells claude-code to take them; it prepares with `agents=["cursor"]` | The episodes are handled only after the user asked |
| E7 | A preference emerges | Across four episodes the user corrects test style the same way. The consolidator writes `preferences/testing.md` citing all four. In the next session the agent offers to make it a rule | A note, not a rule; the rule waits for the user |
| E8 | A scheduled run fails | The host CLI was updated and its flags changed. The job records the failure; orientation and `brain doctor` show it the next morning | The user learns of it within one session |
| E9 | The user clears the inbox in one go | "Consolidate everything." The agent prepares with `all=true` | Every pending episode is handled |
| E10 | Backfilling a new brain | The user tells claude-code "harvest my last 30 days". It calls `brain_harvest_prepare(since="30d")`, files six sessions, skips four, calls `brain_harvest_done`, and repeats while `remaining` is above zero | No episodes; every changed note cites a session URL; a second harvest finds nothing new |

## 9. Decisions

Settled with the maintainer on 2026-10-16:

| Question | Decision |
|---|---|
| How are records kept? | One dated note per record, in the topic it concerns (`topics/<topic>/records/2026-10-16-….md`), so each can be linked, cited, and superseded |
| Keep the `episodes` capability? | No. It cannot be enforced against an agent with file access, and capture is open by design |
| Do people write episodes? | No. People edit notes or ask an agent; `brain log` is removed |
| Confirm before an agent takes another agent's episodes? | No. The user's request is the consent; a confirmation step would not stop an agent that can read the files |
| Harvest in a scheduled run? | Only with `--harvest`, for a host with harvest on |
| Harvest into episodes? | No. The agent files sessions into notes directly and cites them with session URLs; brain-wiki keeps reading, routing, scrubbing, provenance, and watermarks; `brain harvest --apply`, `--raw`, and `--distill` are removed |
| A `pattern` hint at capture? | Yes, optional |
| Import documents and memory files through the CLI? | No. An agent files them into notes directly, citing sources in `bw-sources`; `--to-episodes` and `--from` are removed, `--overlay` and `--into` stay |

## 10. Plan

| Phase | Content |
|---|---|
| 1 | Capture: agents only, through MCP; `brain log`, the `episodes` capability, `brain import --to-episodes`, and `brain import --from` removed; `bw-agent` always the caller; hand-written episode files unowned; the `pattern` hint; import guidance in the skill |
| 2 | Scope and patterns: `--prepare` by owner, with `agents`, `unowned`, and `all` for when the user asks; outcomes and the `bw-sources` check in `--done`; the guidance rewrite, `reports/consolidation.md`, pending episodes per agent in orientation and doctor; harvest files sessions directly (session URLs, `brain_harvest_done`, session URLs in `brain origin`; `brain harvest --apply`, `--raw`, and `--distill` removed) |
| 3 | Scheduled consolidation for Claude Code: unattended mode, `brain schedule add consolidate`, checks before starting, failure reporting in orientation and doctor |
| 4 | Other hosts as their unattended modes are verified |

When built, `brain log` leaves the CLI, the user guide, the skills, and the
setup wizard's next steps, and the setup skill checks capture with
`brain_log_episode`. Existing episodes written by people count as
unowned. The import design (§6), the user guide's import page, and the
write path's table of episode writers lose `--to-episodes` and `--from`.
The write path (§2.2), agent integrations (§6), and the user guide's
harvest section describe harvest filing into notes, and a new decision
replaces the episode output of D20. This proposal replaces the
consolidation part of [scheduled maintenance](scheduled-maintenance.md).
