# Write path

This document covers every way content enters a brain: episodes, harvest,
direct edits, consolidation, commits, rules, and brain-wiki's own runs. The
protected-file list in §2.3 and the run record in §8 are normative.

## 1. Requirements

| # | Requirement | Why |
|---|---|---|
| W1 | Writing an episode never blocks or fails an agent's work, and never conflicts across agents or devices. | Agents log mid-task, several at once, on several devices. |
| W2 | A note is an ordinary Markdown file that agents and people edit directly. brain-wiki checks its frontmatter, not its meaning. | Facts live in the body ([brain format §6](brain-format.md#6-notes)). See [D34](../decision/d34-direct-edits.md). |
| W3 | Untrusted content never becomes a standing directive without the user. | One poisoned web page must not steer every later session (G4). |
| W4 | Every change can be undone. Git keeps direct edits, and run records keep brain-wiki's own writes. | The history of a fact is part of the fact. |
| W5 | Every change brain-wiki itself makes is recorded with what it touched, before and after, and who asked. | Debugging, and undo that does not depend on git. |
| W6 | Any LLM the user already runs can do the writing, with no API keys. | [D8](../decision/d08-no-model-calls.md), G6. |

## 2. The write paths

There are three ways to write, plus rules, which have their own path.

```
                     PATH 1: inbox (append-only, any agent)
  agent (MCP) ───────► inbox/episodes/YYYY/MM/<ulid>.md     never edited again
  host memory feature ─► inbox/agents/<agent>/…               treated as episodes

                     PATH 2: direct edits (agents with `edit`, and people)
  agent edits topics/… ─► brain validate <paths> ─► fix what it reports
        ─► brain commit (by hand or from brain schedule) ─► git history (§5)
  host session stores ─► (harvest: read, filter, scrub) ─► agent files notes (§2.2)

                     PATH 3: brain-wiki's own writers (runs)
  consolidate --done, lint --fix, mv, import, rules, agents grant, undo
        ─► Run: lock, verify, lint gate, pre-images, apply, log.md, git commit (§7)

  rules.md ◄── only: user via CLI, or agent via MCP with user confirmation (§6)
  any file ◄── a person with an editor (picked up by the index and by lint)
```

The inbox is optional. An agent may log an episode and let consolidation
fold it in later (§4), or edit the right note itself.

Agents with file tools can write anywhere. The instruction block, the
skill, `AGENTS.md`, orientation, and the MCP tools describe the documented
ways to write, and lint and `brain validate` report changed episodes,
edited protected files, and unknown frontmatter fields. People can always
edit any file.

### 2.1 Ways an episode is written

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
  ([import §6](import.md#6-documents-and-memory-files)).

Episodes from an agent session also record `agent` (host id), `session`
(host session id), `origin_turns` (the turn range they cover), and
`device`. On that device, tools can show the original conversation later
(§4.6). These fields never hold file paths. An episode must make sense
without its origin, because hosts delete old transcripts.

An episode's `## Claims`, `## Negative findings`, and `## Open questions`
sections are body text built from the writer's arguments
([brain format §9](brain-format.md#9-episodes)). Nothing parses them into
structured facts.

Every writer calls `write_episode()`, which:

1. Checks the provenance values and field formats. An episode needs a
   summary or at least one claim.
2. Returns the existing episode and writes nothing when one already has
   the given dedupe key. Harvest uses `<host>:<session>:<turn range>`.
3. Scrubs secrets, replacing each with `[REDACTED:<kind>]`
   ([security §6](security-and-privacy.md#6-secret-scanning)).
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

### 2.2 Harvesting sessions

Harvest is consolidation whose input is a past session instead of an
episode. brain-wiki reads finished sessions from the hosts' own transcript
stores ([D20](../decision/d20-harvest-host-sessions.md)), and the agent
whose sessions they are files what they hold straight into notes
([D36](../decision/d36-harvest-into-notes.md)). Harvest writes no episodes.
It gives:

- knowledge from sessions before brain-wiki was installed, the fastest way
  to give a new brain real history;
- knowledge from sessions in which the agent logged nothing;
- exact inputs, because every tool call of the session is visible.

```
discover ─► filter ─► route ─► extract ─► (the agent files notes) ─► done ─► advance watermark
```

A per-host session reader lists sessions modified within `since` (default
`[harvest] since`, else `30d`)
([agent integrations §6.4](agent-integrations.md#64-session-readers)).
The filter skips:

- subagent sessions, and headless sessions unless `[harvest]
  include_headless = true`;
- brain-wiki's own runs, whose working directory is in the state
  directory;
- sessions modified less than `[harvest] min_idle_minutes` ago (default
  60), which may still be running;
- sessions outside `project`, when given;
- transcripts where half or more of the lines failed to parse;
- sessions with fewer than `[harvest] min_user_turns` new user turns
  (default 3).

Each session goes to the brain of its working directory, checked in order:

1. a project file (`.brain-wiki.toml`) in the folder or an ancestor;
2. the brain the folder is inside (a `brain.toml` above it, or a
   registered brain's path);
3. the first matching pattern in `[harvest.routes]`;
4. the host's default brain (`[hosts.<id>] brain`).

What the folder says comes before routes, so a catch-all such as `~/**`
never overrides a project's own brain. `brain harvest route PATTERN BRAIN`
adds a route and keeps longer patterns first. A session that resolves to no
brain is skipped, never sent to the user's default brain
([config and storage §3](config-and-storage.md#3-choosing-a-brain)).

Extraction keeps user text, assistant text, and tool calls by name with a
short argument summary. It drops tool output bodies and text the host
injected (reminders, command echoes), and scrubs secrets.

The recipe, in the host agent:

1. The user asks ("harvest my sessions"), or runs `/brain:harvest` (the
   `harvest` MCP prompt), or a scheduled run includes harvest
   (§4.8).
2. The agent calls `brain_harvest_prepare {since, max_sessions, project}`
   (defaults `7d`, 10). It returns that host's new sessions for the current
   brain as condensed, scrubbed turns, at most about 15k tokens, named
   `S1`, `S2`, and so on, with a count of the sessions `remaining`. Each
   session carries its `source`, a session URL, and its `inputs`.
3. The agent applies the consolidation patterns (§4.5) to each session:
   it edits or creates notes, cites the session's `source` in each note's
   `bw-sources`, and validates them.
4. Within one hour it calls `brain_harvest_done {run, sessions}` with one
   outcome per session: `{session, pattern, notes}`, or `{session,
   pattern: "skip", reason}`.
5. The server checks each outcome: each note exists and cites the
   session's URL, a skip has a reason, distill is used only for a session
   with `inputs: local`, and the session still routes to this brain. It
   advances the watermark of each session that passes, so the next harvest
   starts after its last handled turn. A session that fails stays where it
   was and comes back in the next packet. With nothing recorded, the call
   fails with `usage`.

A session URL is `session://<host>/<session id>#turns=A-B`
([brain format §6.4](brain-format.md#64-sources)). It holds no file path,
so it means the same on every machine. `brain origin` and
`brain_read_origin` accept it and show those turns when the transcript is
on this machine (§4.6). Provenance never comes from the model: the URL,
the turn range, and the inputs are brain-wiki's own reading of the
session, and `done` checks that the notes cite it.

`brain_harvest_prepare` needs the `harvest` capability and harvest turned
on for the host in the user config (`[harvest] enabled` and `hosts`, both
set by `brain harvest enable HOST`). `brain_harvest_done` also needs `edit`,
since the agent filed notes.

For hosts without a session reader (Cursor, OpenClaw), prepare returns
`unsupported_host`. The skill then lets the agent read its own history, at
the user's request, and file it the same way, citing
`session://<host>/<session id>`. brain-wiki cannot check those citations
and keeps no watermark for them, and the agent distills nothing about the
user from them.

A large backfill costs agent time in proportion to the sessions read. It
runs over several rounds (`remaining` counts what is left), or night by
night in a scheduled run.

`brain harvest` in a terminal is the user's command and needs neither the
capability nor the config switch. It writes nothing:

- Bare, it lists each session (host, full session id, folder, target
  brain, turn range, estimated tokens) or why it was skipped.
- `--status` shows, per host, whether harvest is on and how many sessions
  are left.
- `--from` with an unknown host, or one without a session reader, is a
  usage error, as it is for `brain harvest enable`.
- `enable`, `disable`, and `route` change the user config.

Earlier versions wrote harvested sessions as episodes, distilled in the
agent, by a headless model preset (`brain harvest --apply`), or raw
(`--raw`). Those are removed: the agent that reads a session can file it
where it belongs at once, and the episode step added a second pass without
adding provenance.

### 2.3 Direct edits

Agents whose profile has `edit` create and edit notes and topic pages under
`topics/` with their own file tools, then run `brain validate` (MCP
`brain_validate`) on what they changed. A correction and new knowledge take
the same path. Orientation's "Writing notes" section tells an agent with
`edit` where files go, the frontmatter fields, and the body conventions
([index and search §8](index-and-search.md#8-orientation-the-briefing)).

The `edit` capability ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles))
is on by default: the default profile's `write` list is `edit`, and a host
profile that lists `write` without `edit` turns it off.
Orientation and the `AGENTS.md` block tell the agent whether it has it.
`edit` also gates brain-wiki's own writers that change notes: `brain mv`,
`brain lint --fix`, and `brain consolidate --done`.

The protected files are never edited directly by agents:

- `rules.md` (changed only through the rules path, §6);
- `brain.toml` (changed by `brain` commands);
- `log.md`, and the whole of `AGENTS.md`;
- everything under `inbox/` and `archive/` (episodes stay immutable) and
  `reports/` (regenerated).

Files are not authenticated. `edit` and the protected list tell a
cooperating agent what to do, and `brain validate` and lint report what it
did anyway. A person may edit any file, protected ones included.

`brain validate [PATH…] [--json]` runs lint's frontmatter rules alone
(`SCHEMA_CODES`, [lint §3](lint-and-reports.md#3-rule-catalog)) with the
`strict` profile:

| Check | Codes |
|---|---|
| Frontmatter parses and holds flat values | BW101, BW102 |
| `id` present, a ULID, and unique | BW103, BW104, BW105 |
| `status` is `active`, `superseded`, or `archived` | BW106 |
| No older-format fields or sections; the message names the conversion command | BW117 |
| No unknown `bw-` field | BW118 |
| `bw-superseded_by` holds resolving links to other notes, with `status: superseded` | BW119 |
| `bw-sources` items are links or URLs, and the links resolve | BW120, BW122 |
| The other relation fields hold resolving links to other notes, and `bw-part_of` skips the note's own topic page | BW123, BW124, BW312, BW313 |
| No supersession or part_of cycle | BW307, BW315 |
| The file is not a protected file | BW121 |

- Paths default to the Markdown files git sees as changed or new, or every
  note without git. The default leaves out new files in the inbox, which
  agents are meant to create, and `reports/`, which brain-wiki rewrites. A
  changed episode is still reported. Given paths may be brain-relative or
  absolute.
- BW121 is reported for a protected file among those paths. `brain.toml`
  is not Markdown, so only an explicit path reports it.
- Each problem is one line with path, line, code, what was found, and what
  is allowed. With nothing to check it prints "Nothing to validate: git
  sees no changed notes. Pass the paths you edited." When clean it prints
  "Valid: N file(s) checked, no frontmatter problems."
- It exits 1 on any error, else 0. Warnings, such as an unresolved
  `bw-sources` link (BW122), do not fail.
- It writes and records nothing and needs no capability. Body links,
  orphans, secrets, and conflict copies stay with `brain lint`.

Recovery from a bad edit is git: `git diff`, `git restore`, or reverting a
snapshot commit (§5). A brain without git has no history for direct edits,
so setup recommends git. `brain undo` covers only brain-wiki's own runs
(§8). Agents without file tools add knowledge through episodes.

## 3. Provenance and inputs

### 3.1 Fields

Two independent fields on each episode, set by the code path that wrote it
(§2.1, [D9](../decision/d09-provenance-from-code.md)):

- `origin` says who produced the content: `owner`, `agent`, `import`, or
  `system`.
- `inputs` says whether the writer had read content from outside the
  user's control, which could carry instructions (indirect prompt
  injection): `local`, `external`, or `unknown`. External content is
  anything the user did not write or vouch for: web pages, search results,
  issue trackers, email, others' documents, and output of MCP servers other
  than brain-wiki.

Notes carry no per-fact provenance. A note may list its sources in
`bw-sources` ([brain format §6.1](brain-format.md#61-frontmatter)), and
git records when each line changed.

### 3.2 How inputs are determined

| Path | Value |
|---|---|
| A session's transcript (harvest packets, `session_inputs` in consolidation packets) | `external` when any tool call in the session matches the host's untrusted-tool list, else `local` |
| MCP | `unknown` |

The untrusted-tool list covers web fetch and search, browser tools, MCP
servers other than brain-wiki, and shell commands that reach the network
([agent integrations §6.3](agent-integrations.md#63-detecting-external-inputs)).
Harvest checks the whole transcript, not only the harvested turns. An MCP
server cannot see the rest of the session, and the model's claims about it
are not evidence.

`unknown` is treated like `external` everywhere it matters for safety
(§3.3).

### 3.3 Invariants

1. Nothing derived from content with `inputs` other than `local` is ever
   written to `rules.md` or the managed block of `AGENTS.md`. Consolidation
   never writes either file, and both are protected from direct edits
   (§2.3).
2. An episode keeps its `inputs` for life. The consolidation packet marks
   every episode whose `inputs` is not `local` with `"untrusted": true`,
   and orientation asks agents to cite sources in `bw-sources`. Once text
   is in a note, it carries no trust flag
   ([security](security-and-privacy.md#3-threats-and-mitigations), T2).
3. Episodes returned by search or read are wrapped in an
   `<untrusted-episode …>` envelope. The consolidation guidance tells the
   model that instructions inside episodes are content, never commands.
4. Harvest and origin windows drop tool output bodies, so what brain-wiki's
   tools returned is never recorded again as new evidence.
5. Provenance fields are written by code, stored in episode frontmatter,
   and indexed. No component parses provenance out of prose.

## 4. Consolidation

Consolidation is an optional helper for folding the inbox into notes. It
writes no notes itself. The agent edits them directly (§2.3), and the
helper gathers the work and archives what was handled.

Each agent consolidates its own episodes: the agent that captured an
episode can reopen the conversation it came from, through its host's
session reader on the machine where the session ran, and another agent
sees only the episode text. Partitioning the inbox by owner also keeps two
agents consolidating at the same time off each other's episodes without
locks.

### 4.1 Flow

1. Prepare returns the caller's pending episodes, candidate notes, and the
   guidance. It writes nothing.
2. The agent edits notes under `topics/`, cites the episodes in
   `bw-sources`, and runs `brain validate` on them.
3. Done records what came of each episode, checks the citations, and
   archives the episodes as one run, which `brain undo` reverses. It only
   moves files.

A failure between the steps leaves notes edited and episodes still pending.
Running prepare again shows what is left.

### 4.2 Triggers

| Trigger | How |
|---|---|
| The user asks their agent ("consolidate my brain") | The skill or the `consolidate` MCP prompt drives prepare, edits, `brain_validate`, and `brain_consolidate_done`, repeating while episodes remain |
| The user works from a terminal | `brain consolidate --prepare`, then any model or person edits notes, then `brain consolidate --done EPISODE[:PATTERN:NOTE]…` |
| A schedule the user set up | `brain schedule add consolidate --host H` runs `brain consolidate --run --host H` daily (§4.8) |

`--prepare` prints the guidance followed by the packet. `--json` prints the
packet alone, and `--out FILE` writes `{guidance, packet}` as JSON.

brain-wiki never consolidates on its own initiative. Running an LLM costs
money and attention, so consolidation runs when the user asks or on a
schedule the user installed, and in-session consolidation stays the
default.

### 4.3 Selecting and packaging work

`brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST]…
[--unowned] [--all] [--out FILE]` (MCP `brain_consolidate_prepare {topic,
max_episodes, agents, unowned, all}`) needs no capability. It rescans the
brain first.

Selection:

- Pending episodes are everything under `inbox/episodes/` and
  `inbox/agents/`. Episodes with an empty body are skipped.
- An episode's owner is its `bw-agent`; a file in `inbox/agents/<agent>/`
  belongs to that agent. An episode without one (written by hand, or by the
  user or an import in earlier versions) is unowned. brain-wiki cannot tell
  a file written by hand from one written on another machine, and profiles
  are not a security boundary ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles)),
  so ownership is what the file says.
- A host (MCP, or `--as HOST`) gets its own episodes: first those whose
  conversation is on this machine (the host's session reader finds the
  transcript), then the rest, each group oldest first. No device name is
  configured; a renamed or replaced machine needs nothing.
- `agents`, `unowned`, and `all` add other agents' episodes, the unowned
  ones, or everything, after the host's own. The guidance and the tool
  description say to pass them only when the user asked ("take Cursor's
  episodes too"); the request is the consent, and there is no confirmation
  step, which could not stop an agent that reads the files anyway.
- The user's own CLI, without `--as`, gets every pending episode, or only
  the ones `--agent` and `--unowned` name.
- The packet holds up to `--max-episodes` (default `[consolidate]
  max_episodes_per_run`, 50; MCP allows 1 to 100) within a budget of about
  15k tokens, because hosts cap tool results. The first episode is always
  included. The MCP tool raises Claude Code's cap with
  `_meta["anthropic/maxResultSizeChars"]`.
- `--topic` keeps episodes whose topic hints include T. An unknown topic is
  `not_found`.
- Leftover episodes wait for the next round. `not_included` in the packet
  counts the pending episodes of owners outside the scope, with the oldest
  one's date, so the agent can tell the user who else is waiting. With
  nothing in scope, prepare says the same in text: "Nothing of yours to
  consolidate. Pending: cursor 12 (oldest 2026-10-07)."

The model the agent runs on sees every episode and candidate note in the
packet. Keeping notes away from a cloud model means keeping them in a
separate brain ([privacy proposal](../proposal/privacy.md)).

Candidates for each episode are the pages of its hinted topics, then up to
5 notes or topic pages found by an FTS query over the episode's 12 most frequent
words. Archived notes are excluded.

The packet is JSON with brain-relative paths. The guidance comes before it:

```json
{
  "brain": "personal",
  "root": "/home/me/brains/personal",
  "scope": {"agent": "claude-code", "agents": [], "unowned": false, "all": false},
  "pending": 9,
  "episodes": [
    {"path": "inbox/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "archive_to": "archive/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "agent": "claude-code", "created": "2026-10-10T19:22:11Z",
     "inputs": "unknown", "session_inputs": "local", "topics": ["search"],
     "candidates": ["topics/search/_Index.md", "topics/search/fts5.md"],
     "origin_available": true, "pattern": "file",
     "text": "Switched Lumen's search path to FTS5 after …"}
  ],
  "notes": [
    {"path": "topics/search/fts5.md", "title": "Use SQLite FTS5 for local search",
     "type": "decision", "status": "active",
     "summary": "Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep."}
  ],
  "topics": [
    {"slug": "search", "path": "topics/search", "title": "Search",
     "description": "How local search works and why."}
  ],
  "not_included": {"cursor": {"count": 12, "oldest": "2026-10-07"}}
}
```

- Each note appears once, with its summary (the first paragraph, at most
  600 characters), so the agent can decide which to open in full. A topic
  entry has `parent` when the topic is nested.
- `origin_available` is true when the transcript was found on this
  machine.
- `session_inputs` is brain-wiki's own reading of that transcript (as
  harvest computes inputs, §3.2), given when the episode's `inputs` is not
  `local`. An MCP episode is always `inputs: unknown`, because the server
  cannot see the session; the transcript can. An episode is marked
  `"untrusted": true` unless one of the two is `local`.
- `pattern` is the capturing agent's hint (§2.1).

### 4.4 Archiving handled episodes

`brain consolidate --done EPISODE[:PATTERN:NOTE]…` (MCP
`brain_consolidate_done {episodes}`) needs `edit`. Episodes are named by
path or id, as prepare listed them. Each must be pending, or the command
fails with `not_found`.

Each episode comes with what came of it:

| Form | CLI | MCP item |
|---|---|---|
| A pattern and the note it changed | `EP:file:topics/lumen/sync.md` | `{"episode": EP, "pattern": "file", "notes": ["topics/lumen/sync.md"]}` |
| Skipped, with the reason | `"EP:skip:already in topics/lumen/sync.md"` | `{"episode": EP, "pattern": "skip", "reason": "already in …"}` |
| No outcome | `EP` | `"EP"` |

- Patterns are `record`, `playbook`, `file`, `distill`, and `skip` (§4.5).
  The CLI repeats an episode for a second outcome; MCP takes a list of
  notes.
- Before anything moves, each note named for an episode must exist and
  cite the episode in `bw-sources`, by its archive path, inbox path, or
  file name. A missing note or citation fails the whole call with `usage`,
  naming the note and the link to add, and archives nothing. A skip needs
  a reason and names no notes, and an episode cannot be both skipped and
  consolidated.
- A plain reference archives the episode without a check, for terminal use
  and older agents.

The command moves them from `inbox/` to the same relative path under
`archive/` as one run of kind `consolidate` (§7), with one `log.md` entry
and one git commit, `brain: consolidate N episodes`. Every episode is
archived, never deleted, whatever its pattern. The `log.md` entry's summary
counts the patterns, and it has one line per episode:

```
## 2026-10-16T21:30:02Z · consolidate · run-01JA…
- agent: claude-code
- archived 3 episodes: 1 file, 1 playbook, 1 skip
- inbox/episodes/2026/10/01JA….md: playbook → topics/lumen/release-howto.md
- inbox/episodes/2026/10/01JB….md: file → topics/lumen/sync.md
- inbox/episodes/2026/10/01JC….md: skip (already in topics/lumen/sync.md)
```

The run record keeps the same outcomes as `ops`. `brain undo` returns the
episodes to the inbox; note edits are restored from git. It regenerates
`reports/` when `[reports] after_consolidate = true`, the default.

Episodes the agent found nothing durable in go to `--done` too, as skips,
and episodes left out stay pending. A note may cite an episode's `archive_to`
path in `bw-sources` before `--done` moves it there. Lint does not report
that link until the episode is archived
([lint §4](lint-and-reports.md#4-how-lint-works)).

### 4.5 Guidance

The guidance shipped with the package (`prompts/consolidate.md`) is built
around five patterns, with an example of each:

| Pattern | Use it when | Result |
|---|---|---|
| Record | Something happened worth looking up later as it was: an incident, a benchmark run, a release, a meeting | A `type: record` note, dated, close to the episode's words, at `topics/<topic>/records/YYYY-MM-DD-<slug>.md` |
| Playbook | A task was done that will be done again | A new `type: howto` note, or an update to the existing howto for the task: steps, commands, what failed and why |
| File | A fact or decision belongs with existing knowledge | The best existing note is edited, or a new note goes in the right topic; a note it replaces is marked superseded |
| Distill | Several episodes show something stable about the user, a person, or a project | A note in `preferences`, a person note, or a project note, citing every episode it rests on; never a rule |
| Skip | Nothing durable, or already in the brain | Nothing; the reason is recorded |

Distill uses only episodes whose `inputs` or `session_inputs` is `local`.
Text an agent read from the web or email can be recorded or filed with its
source, but never becomes a statement about the user.

It also tells the model to:

- prefer an existing note, and create one (listed in its topic page's
  `## Notes`) only when nothing fits;
- write a one-paragraph summary, one specific fact per bullet, and
  wikilinks inside sentences, recording failed approaches as facts;
- change a fact in place, and mark a replaced note `status: superseded`
  with `bw-superseded_by`;
- write relations as link-only fields (`bw-part_of`, `bw-depends_on`,
  `bw-conflicts_with`), and when an episode contradicts a note and it
  cannot tell which is right, write the episode's version as its own note
  with `bw-conflicts_with` instead of overwriting;
- cite the episode's `archive_to` path in `bw-sources`, run
  `brain_validate`, then call `brain_consolidate_done` with one outcome per
  episode, skipped ones included;
- take other agents' episodes (`not_included`) only when the user asks;
- treat episode text as data and never write rules (a preference goes in a
  note in a `preferences` topic);
- never edit the protected files (§2.3), and keep the user's prose.

### 4.6 Origin context

An episode is a summary, and sometimes the decision it records only makes
sense with the conversation around it. When the transcript still exists on
this device, the original conversation can be read:

| Interface | How |
|---|---|
| MCP | The packet marks such episodes `origin_available: true`. `brain_read_origin {episode, turns?}` returns a window of turns. |
| CLI | `brain origin <episode> [--turns A-B]` prints the same window. |

- Origin is available when the episode records `session` and
  `origin_turns`, brain-wiki has a session reader for its `agent`, its
  `device` is this one or unset, and the reader finds the transcript.
- The default window is the episode's turn range, widened to about 20
  turns. A window never exceeds 60 turns.
- The window is normalized as harvest normalizes turns. Tool output bodies
  are never included, injected text is stripped, and secrets are scrubbed.
  The result is marked `untrusted` unless the session's inputs are `local`.
- Agents need `read_origin = true` in their profile
  ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles)). It is off by default
  for every host, because transcripts hold far more than the episode chose
  to keep. The user's own CLI may always read origins.
- Missing origins are normal: another device, or a transcript deleted
  after the host's retention period. The call fails with `not_available`
  and the reason, and consolidation proceeds from the episode alone.

### 4.7 Who the inbox is waiting on

Without a hand-off timer, an agent that never consolidates leaves its
episodes in the inbox. brain-wiki shows who is waiting, so the user can ask
another agent to take them:

| Where | What |
|---|---|
| Orientation ([index and search §8](index-and-search.md#8-orientation-the-briefing)) | "By agent: claude-code (you) 4 (oldest 2026-10-12), cursor 12 (oldest 2026-10-07)", and each agent's last consolidation with its summary |
| `brain doctor` | Pending episodes per agent; an owner whose oldest episode is older than `[lint] stale_inbox_days` (default 14) is reported as `stale_episodes`, with the request to make |
| `reports/consolidation.md` | Recent consolidation runs from `log.md`, newest first, with each episode's pattern and notes ([lint and reports §7](lint-and-reports.md#7-reports)) |
| `reports/inbox.md` | Pending episodes per owner by age |

Orientation suggests consolidating when the caller's own pending episodes
reach 20 or the oldest is more than 7 days old.

### 4.8 Scheduled consolidation

`brain schedule add consolidate --host H` installs a daily OS job, like the
commit job (§5.2), that runs `brain consolidate --run --host H`. That
command starts the host's own CLI unattended in the brain, the way a
person would run it, with brain-wiki's MCP server attached. brain-wiki
calls no model itself ([D8](../decision/d08-no-model-calls.md)).

```
brain schedule add consolidate --host claude-code [--at 21:30] [--harvest]
                               [--include AGENT|unowned]… [--dry-run]
brain schedule remove consolidate --host claude-code [--dry-run]
brain consolidate --run --host claude-code [--harvest] [--include …] [--dry-run]
```

`brain consolidate --run --host H`:

1. Checks before it starts: H's profile has `edit`, H has an unattended
   mode and its CLI is on `PATH`
   ([agent integrations §7](agent-integrations.md#7-unattended-agent-mode)),
   and the brain's write lock is free.
2. Selects H's own episodes (§4.3), plus those of the agents `--include`
   names (`unowned` for the unowned ones). With `--harvest`, it also
   counts H's new sessions; harvest must be on for H, or the run notes
   that it is off. With nothing to do, it records `nothing` and stops.
3. Starts H's CLI with a prompt that asks it to call
   `brain_consolidate_prepare` (with the included agents), follow the
   guidance, and call `brain_consolidate_done`, repeating up to 5 rounds,
   then the same for harvest with `--harvest`. The prompt says nobody is
   watching: no questions, nothing outside the brain, no rules.
4. After the agent exits, validates the files it changed (`brain
   validate`). In a git brain, frontmatter errors fail the run and nothing
   is committed; otherwise it runs `brain commit`.
5. Records the outcome per brain and host: when, status (`ok`, `nothing`,
   `failed`), the summary of the `consolidate` runs the agent made, the
   error, and notes. The record is in brain-wiki's state directory, because
   it describes this machine.

`--dry-run` makes the checks and counts and starts nothing. The command is
the user's: it is refused under `--as`.

`brain schedule add consolidate` makes the same checks with a dry run and
refuses when one fails, so a job cannot fail silently every night the way
the scheduled maintenance removed before 0.1 did. The job runs only while
the machine is on: cron skips a missed time, and launchd runs it at the
next wake. It uses the user's plan or API key for that host, like any
session.

A failed run shows in orientation ("Scheduled consolidation by claude-code
failed at …"), in `brain doctor` (`scheduled_consolidation_failed`, with
the dry run to try), and in `reports/consolidation.md`. Review is the git
diff of the snapshot commit; `brain undo` of a `consolidate` run returns its
episodes to the inbox.

## 5. Committing direct edits

brain-wiki's own runs commit as they apply (§7.3). Direct edits are
committed by a snapshot command, run by hand or by an OS job, one job per
brain ([D35](../decision/d35-git-history.md)). `brain validate` stays free
of side effects. Every command acts on one brain: `--brain NAME|PATH`, else
the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list                      # bare `brain schedule` lists too
```

### 5.1 `brain commit`

When the brain is a git work tree:

1. Take the brain's write lock without waiting. If it is held, skip this
   round (outcome `busy`). If git is in the middle of a rebase or merge,
   commit nothing and report it (outcome `conflict`).
2. Snapshot. Collect changed, new, and deleted files from `git status`,
   leaving out files modified within `--settle` (default 2 minutes; takes
   `30s`, `2m`, `1h`), so a half-finished multi-file edit waits for the
   next round. Stage exactly those files and commit them (format below).
   Never amend.
3. Sync with origin, when the current branch tracks a branch on `origin`.
   Otherwise this is skipped with a note. `--no-fetch` skips it too.
   1. `git fetch origin`, non-interactive (`GIT_TERMINAL_PROMPT=0`, ssh
      `BatchMode=yes`), so a job never waits for a password.
   2. Rebase local commits onto the upstream with `--autostash`. Files
      left out by `--settle` are set aside and put back.
   3. On a conflict, run `git rebase --abort`, so commits and files are
      exactly as before, and exit 1 naming the conflicting files. Later
      runs keep committing locally and report the conflict until the user
      resolves it (`git pull --rebase` in the brain).
   4. With `--push`, push to the upstream. If origin moved since the
      fetch, fetch and rebase once more, then push. A second rejection
      exits 1.
4. Record the time, the outcome (`committed`, `nothing`, `fetched`,
   `pushed`, `conflict`, `rejected`, `offline`, or `busy`), the commit, any
   conflicting files, and the time of the last successful sync in
   `<state>/schedule/<brain-id>.json`.

The commit message:

```
brain: snapshot 3 notes in search

M topics/search/fts5.md
M topics/search/trigram.md
A topics/search/sqlite-version-policy.md

Brain-Agent: schedule
```

- The subject is `brain: snapshot N notes in <topic>` when every note is in
  one topic, and `… in 3 topics` otherwise. A note is a `.md` file in a
  topic. Other files are counted after the notes: `brain: snapshot 2 notes
  in lumen and 1 file`, or `brain: snapshot 2 files`.
- The body has one line per file with git's status letter: `A`, `M`, `D`,
  or `R old -> new`.
- The trailer is `Brain-Agent: schedule`, or the host under `--as HOST`. It
  names who committed, not who edited.

Failures and limits:

- A conflict or a second push rejection (`rejected`) exits 1. A network or
  authentication failure keeps the local commit, records `offline`, and
  exits 0 with a warning. `busy` also exits 0.
- Validation is not a gate, because history must hold broken states too.
  `brain commit` sets `BRAIN_WIKI_SNAPSHOT=1`, and `brain lint --staged`
  (the hook `brain lint --install-hook` installs) exits 0 when it sees it.
  Other hooks run as usual, and one that fails stops the commit with git's
  error.
- A brain that is not a git work tree is refused. With nothing to commit,
  the command still fetches and rebases.
- `brain commit --as HOST` needs `edit`, and `--push` is refused under
  `--as`, since pushing publishes the brain.

### 5.2 `brain schedule`

`brain schedule` installs jobs with the platform's own scheduler: one
commit job per brain, and one consolidate job per brain and host (§4.8).
Jobs are keyed by the brain's id (and the host), so adding again replaces
the job and a rename does not orphan it.

| Platform | Job | Install | Remove |
|---|---|---|---|
| Linux | User crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` (`consolidate <brain-id>.<host>` for a consolidate job) | Read `crontab -l`, replace or add the block, write with `crontab -` | Drop the block |
| macOS | LaunchAgent `io.github.brain-wiki.commit.<brain-id>` (`io.github.brain-wiki.consolidate.<brain-id>.<host>`) | Write `~/Library/LaunchAgents/<label>.plist`, then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Not supported | — | — |

- Other crontab lines stay byte for byte. On Windows, `add` and `remove`
  are usage errors that suggest running `brain commit` from Task Scheduler.
- Each job runs `brain commit --brain <name> [--push]` on its own interval,
  with its own log (`<state>/logs/schedule-<brain-id>.log`) and state file,
  so a failing brain never delays another.
- `--push` is chosen per job and off by default. Without it the job commits
  and fetches but never pushes. To change it, add the job again.
- A consolidate job runs daily at `--at` (default 21:30): a cron line
  `MM HH * * *`, or a LaunchAgent `StartCalendarInterval`. Its log is
  `<state>/logs/consolidate-<brain-id>-<host>.log`, and it also carries
  `PATH`, so the host CLI is found as it was at install time.
- Schedules live only in the OS scheduler, so there is nothing in
  brain-wiki's config to drift. `brain schedule list` reads every crontab
  block or LaunchAgent (it ignores `--brain`) and shows, per job, the kind,
  the brain (by id, or `unregistered`), the interval and whether it pushes,
  or the host, time, and options, and the last run and outcome.
- `brain brains rename` rewrites the brain's jobs, found by id, and `brain
  brains remove` removes them. A moved folder breaks the registration, not
  the job, and re-pointing the registration fixes both.
- The job calls `brain` by the absolute path resolved at install time, and
  carries the `BRAIN_WIKI_CONFIG`, `_STATE_DIR`, `_CACHE_DIR`, and
  `_DATA_DIR` values set then, because cron and launchd start with a
  minimal environment. It also carries `DBUS_SESSION_BUS_ADDRESS` when set:
  git credential helpers that keep the token in the desktop keyring (`gh`,
  libsecret) need the session bus to fetch from or push to a private
  origin. That works while the user's session runs (systemd lingering keeps
  it up after logout, and the keyring must be unlocked); a fetch or push
  that fails is reported by `brain doctor` after a day.
- `--every` (default `15m`) takes minutes that divide an hour or hours that
  divide a day (`5m`, `10m`, `15m`, `20m`, `30m`, `1h`, `2h`, `3h`, `4h`,
  `6h`, `8h`, `12h`, `24h`), so cron and launchd agree.
- `--dry-run` prints the crontab block or plist and the commands it would
  run. Without a `crontab` command, `add` prints the block to add by hand
  and exits 1. An unregistered brain, a brain that is not a git work tree,
  or an `--every` outside the list is a usage error (exit 2).
- `add` and `remove` are refused under `--as HOST`, like `agents grant`.
  `list` is allowed.
- Setup offers a 15-minute job for a git brain that has none (default yes),
  and asks whether it should push when the brain has an `origin` remote
  (default no).
- Tests drive the backends through an injected command runner, never the
  real crontab or launchd.

Share a git brain through origin, not a sync tool. With pushing jobs on
each machine, every machine fetches, rebases, and pushes. Two machines
committing into one `.git` that a sync tool copies between them can
corrupt it.

`brain doctor` reports:

| Code | When |
|---|---|
| `schedule_unregistered` | A job's brain id is no longer registered |
| `brain_not_synced` | The last `brain commit` ended `offline`, `conflict`, or `rejected`, and the last successful sync is over a day old |
| `uncommitted_edits` | A git brain with no job has uncommitted files last changed over a day ago |

## 6. Rules

Rules are loaded into every session, so they get the strictest path.

| Path | Flow |
|---|---|
| `brain rules add "…"` | Written at once as the user, `origin: owner`. `--quote` defaults to the text. |
| `brain rules add --as <host>` | Needs `propose_rules`. Saved as a proposal. |
| MCP `brain_propose_rule {text, user_quote, replaces?}` | Needs `propose_rules`. The user confirms first (below). |
| Direct edits | Never. `rules.md` is protected (§2.3), and `brain validate` reports an edit to it (BW121). |
| Consolidation | Never. A preference goes in a note in a `preferences` topic. Making it a rule is a separate step the user confirms. |

`brain_propose_rule` asks the user through MCP elicitation, showing the
exact rule and the user's quote:

- Confirmed: the rule is written with `origin: owner` and `via: mcp`.
- Declined: nothing is written.
- No way to ask: the rule is saved as a proposal
  (`inbox/proposals/rule-<id>.md`), and orientation shows "1 rule awaiting
  the user's confirmation: `brain rules accept <id>`". Clients that declare
  elicitation but decline every request without showing it (Antigravity)
  get the proposal path too.

The tool is annotated as destructive and carries
`_meta["anthropic/requiresUserInteraction"]`, so hosts that honor it ask
the user to approve the call itself.

Limits and checks:

- A rule is 1 to 300 characters, and its quote 1 to 500.
- `rules.md` must stay within `[budgets] rules_max_lines` (100) and
  `rules_max_chars` (4000). Going over is `budget_exceeded`, and the
  message names the longest rules.
- Replacing a rule (`replaces: r-…`) moves the old line to
  `archive/rules.md`, marked superseded.
- Adding, proposing, or accepting fails with `not_found` when `replaces`
  names no rule, and with `conflict` when a rule already says the same
  thing (compared ignoring case and spacing).

A proposal is known by its file name (`rule-<id>.md`). `brain rules list`
and `brain review list` show that id and the rule it replaces. `brain rules
accept|reject ID` and `brain review accept|reject ID` act on it. Accepting
and rejecting are the user's decisions, and no profile allows them.

## 7. Runs

### 7.1 What is a run

Every change brain-wiki itself makes to a brain goes through one
transaction, `Run` (`brainwiki.runs`), so all of them get the same
guarantees. Direct edits and episode writes are not runs, and neither is
saving a rule proposal.

| Kind | Made by |
|---|---|
| `consolidate` | `brain consolidate --done`, `brain_consolidate_done` |
| `lint-fix` | `brain lint --fix`, including the format 1 and 2 conversion |
| `mv` | `brain mv` |
| `import` | `brain import --into`, `brain import --overlay --phase 1` and `--phase 2` |
| `rule`, `rule-reject` | `brain rules add`, a confirmed `brain_propose_rule`, accepting or rejecting a proposal |
| `config` | `brain agents grant`, `brain agents revoke` |
| `undo` | `brain undo` (§8) |

### 7.2 Lint gate

Runs that rewrite notes in bulk (`lint --fix`, `mv`, `import --into`) pass a
check to `commit`: strict lint errors the run would introduce in the files
it touches, computed in memory before anything is written. Errors already
in a file before the run do not count, so one note a person broke by hand
does not stall every later run that touches it. A failing check raises
`invalid_ops` and writes nothing.

### 7.3 Apply

1. Take the brain's write lock (`<state>/locks/<brain-key>.lock`, an OS
   advisory lock held for the whole apply). Wait up to 30 seconds, then
   fail with `busy`.
2. Check that every file the run read still has the content it read. A
   file edited since, by an agent, a person, or a sync tool, makes the run
   `stale`, and nothing is written.
3. Run the lint gate (§7.2), if any.
4. Stage the run's entry at the end of `log.md`.
5. Save a pre-image of every file the run changes, and the run record with
   status `applying`.
6. Write each file atomically (temporary file, `fsync`, rename). Moves keep
   the relative path. A failure rolls back what the run wrote and marks the
   record `failed`.
7. Raise `brain.toml`'s `format` when the run wrote notes into a brain that
   declares an older one. This is one-way
   ([brain format §13](brain-format.md#13-format-versioning)).
8. Update the index and mark the record `applied`.
9. If `[git] mode` is `"auto"` (the default) and the brain is its own git
   repository, or the mode is `"on"` and the brain is inside a git work
   tree, stage exactly the files the run touched, plus
   `brain.toml` when step 7 changed it, and commit. The subject names the
   operation, for example `brain: consolidate 6 episodes`, with trailers
   `Brain-Run: run-…` and `Brain-Agent: claude-code` (`owner` from the
   CLI). The commit uses the user's git identity and hooks, and never
   pushes. A refused commit leaves the run applied and its files staged.
   The record keeps git's error, the CLI prints it, and `brain doctor`
   lists it.

Run records outside the retention window are pruned after each run (§8).

## 8. Undo

Every run writes a record to
`<state>/brains/<brain-key>/runs/<run>/record.json`
([config and storage §4](config-and-storage.md#4-machine-state)). Abridged:

```json
{
  "run": "run-01JA0D7F…", "kind": "consolidate", "brain": "01J9Z7M0…",
  "started": "…", "finished": "…", "status": "applied",
  "agent": "claude-code", "summary": "archived 2 episodes",
  "files": [
    {"path": "log.md", "before": "sha256:…", "after": "sha256:…", "append_only": true},
    {"path": "inbox/episodes/2026/10/01JA….md", "before": "sha256:…", "after": "sha256:…",
     "moved_to": "archive/episodes/2026/10/01JA….md"}
  ],
  "git_commit": "3f2a…", "git_error": null,
  "undoes": null, "undone_by": null, "error": null
}
```

`status` is `applying`, `applied`, `failed`, or `rolled_back`. Pre-images
are stored next to the record as `preimages/<sha256>.gz`. `brain runs`
lists records newest first, and `brain runs show [RUN]` prints one (default
the newest).

`brain undo [<run>] [--force]` defaults to the latest applied run on this
device that is not an undo and was not undone.

- Undo restores each file's pre-image, deletes files the run created, and
  moves episodes back. `log.md` is append-only and not restored.
- If any file changed since the run (its hash is not `after`), undo refuses
  and lists them. Files no later change touched do not block, so an older
  run can be undone. `--force` first saves the current versions under
  `<state>/brains/<brain-key>/runs/<run>/conflicts/`.
- Undo is itself a run (`kind: undo`, §7.3), logged and, in a git brain,
  committed with exactly the restored files. The undone record gets
  `undone_by`, and undoing it again is a `conflict`.
- Pre-images, not git, are the source. A run can touch files git never saw
  (an uncommitted episode), and a `git revert` of an older run conflicts on
  `log.md`.
- Undo is refused under `--as`, and there is no MCP undo tool.

Direct edits have no run record; git reverses them (§5). Retention is the
last 200 runs or 90 days, whichever keeps more. Older runs cannot be undone
with `brain undo`, but their commits can still be reverted.

## 9. Concurrency and multiple devices

| Situation | Behavior |
|---|---|
| Several agents log episodes at once | Unique ULID file names; no locks needed. |
| Consolidation while agents log | New episodes are not in the packet, and `--done` archives only the episodes it names. |
| Two runs on one device | The second waits for the write lock (up to 30 seconds), then applies or finds its files stale. |
| An agent or person edits a file while a run is pending | The hash check in §7.3 makes the run stale; nothing is overwritten. |
| Two agents edit the same note directly | No lock; the last write wins. Snapshots (§5) keep both versions when they fall in different rounds. |
| `brain commit` while a run applies | Commit skips the round. |
| Two devices consolidate the same episodes before syncing | Notes may repeat a fact after sync, and nothing detects it. Consolidate on one device. |
| Episode already archived by another device | Not pending, so prepare skips it and `--done` reports `not_found`. |

## 10. Failure modes

| Failure | Result |
|---|---|
| Agent writes invalid frontmatter or edits a protected file | `brain validate` reports it; lint keeps reporting it until fixed. Restore from git (§2.3). |
| Crash during a run | `brain doctor` finds records left in `applying` and restores the pre-images of files whose hash matches `after`. |
| Index stale or busy | Prepare forces a fresh scan. Runs verify file hashes on disk, not in the index. |
| Origin transcript missing | `brain_read_origin` returns `not_available`; consolidation uses the episode alone. |
| Host changes its transcript format | The reader skips lines it cannot parse. Harvest skips a mostly unparsable session as unreadable. |
| `brain commit` hits a rebase conflict | The rebase is aborted and exit 1 names the files (§5.1). |

## 11. Alternatives considered

| Option | Why not |
|---|---|
| Validated JSON operations as the only way knowledge enters notes (format 2) | Heavy for the common case, and agents with file access write files anyway. See [D7](../decision/d07-json-ops.md), superseded by [D34](../decision/d34-direct-edits.md). |
| Recording every direct edit as a run | Duplicates git, and needs a "last recorded version" per note that drifts from the files. See [D28](../decision/d28-checked-edits.md). |
| `brain validate` commits or records on success | A check with side effects surprises agents. Committing is a separate step (§5). |
| Nightly multi-phase "dreaming" with clustering and saliency scores | Too much machinery to tune before there is data. Clustering may return as a selection heuristic for prepare. |
| A watermark file for consolidation progress | Extra state to sync and corrupt; location already encodes it ([D13](../decision/d13-inbox-by-location.md)). |
| Built-in API clients | Need keys and dependencies; the user's agent already has a model ([D8](../decision/d08-no-model-calls.md)). |
