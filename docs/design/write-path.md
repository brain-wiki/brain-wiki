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
  host session stores ─► (brain harvest: read, filter, distill) ─► inbox/episodes/…
  host memory feature ─► inbox/agents/<agent>/…               treated as episodes

                     PATH 2: direct edits (agents with `edit`, and people)
  agent edits topics/… ─► brain validate <paths> ─► fix what it reports
        ─► brain commit (by hand or from brain schedule) ─► git history (§5)

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
| `brain harvest` (§2.2) | `agent` | computed from the session's tool calls | `harvest` |
| File created directly under `inbox/episodes/` | as written, but `owner` becomes `agent` | `unknown` | `file` |
| File in `inbox/agents/<agent>/` | `agent` | `unknown` | `file` |

- The MCP server sets `agent` to the calling host, so an agent cannot write
  an episode as another agent.
- `brain_log_episode` takes an optional `pattern` hint (`record`,
  `playbook`, `file`, `distill`), stored as `bw-pattern`: the agent's guess
  at how consolidation should use the episode. The consolidation packet
  shows it; consolidation may ignore it.
- Episodes written earlier by `brain log` (`captured: cli`) or
  `brain import` (`captured: import`) stay valid. Documents and agents'
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

`brain harvest` reads finished sessions from the hosts' own transcript
stores and turns them into episodes ([D20](../decision/d20-harvest-host-sessions.md)).
This gives:

- episodes for sessions from before brain-wiki was installed, the fastest
  way to give a new brain real history;
- episodes for sessions in which the agent logged nothing;
- exact inputs, because every tool call of the session is visible.

```
discover ─► filter ─► route ─► extract ─► distill (or raw) ─► write episodes ─► advance watermark
```

A per-host session reader lists sessions modified within `--since`
(default `[harvest] since`, else `30d`)
([agent integrations §6.4](agent-integrations.md#64-session-readers)).
The filter skips:

- subagent sessions, and headless sessions unless `[harvest]
  include_headless = true`;
- brain-wiki's own headless runs, whose working directory is in the state
  directory;
- sessions modified less than `[harvest] min_idle_minutes` ago (default
  60), which may still be running;
- sessions outside `--project`, when given;
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

Distillation sends chunks of about 30k tokens, with `prompts/distill.md`,
to a model that returns
`{skip, reason, summary, claims[{text, turns}], negative_findings, open_questions, topics}`.
Each chunk becomes one episode, and each claim is written with its turn
range as `<text> (turns A-B)`. With `--raw`, no model is called and the
episode holds a condensed transcript excerpt for whoever consolidates it.
After writing, harvest records the last harvested turn in
`<state>/harvest/<host>/<hash of session id>.json`, so a long session is
harvested in increments.

The distill step reaches an LLM in one of three ways:

| Backend | How it runs | Best for |
|---|---|---|
| `agent` | Inside a host, through the in-agent recipe below | Regular use; no extra process or credentials |
| `preset` | `brain harvest --apply` runs the headless preset `[harvest] distill` (default `claude-code`) or `--distill` once per chunk ([agent integrations §7](agent-integrations.md#7-headless-presets)) | Large backfills that would fill a chat session's context |
| `raw` | No model; `--raw` or `--distill raw` | No model available |

The in-agent recipe:

1. The user runs `/brain:harvest` (the `harvest` MCP prompt) in a host.
2. The agent calls `brain_harvest_prepare {since, max_sessions, project}`
   (defaults `7d`, 10). It returns that host's new sessions for the current
   brain as condensed, scrubbed turns, at most about 15k tokens, named
   `S1`, `S2`, and so on, with a count of the sessions `remaining`.
3. The agent distills each session and calls `brain_harvest_apply` within
   one hour with the run id and one entry per session: episode content, or
   `skip` with a reason.
4. The server checks shapes, lengths, claim turn ranges, and that each
   session still routes to the same brain. It sets every provenance field
   itself, writes the episodes, and advances the watermarks.

Both tools need the `harvest` capability and harvest turned on for the host
in the user config (`[harvest] enabled` and `hosts`, both set by `brain
harvest enable HOST`).

For hosts without a session reader (Cursor, OpenClaw), prepare returns
`unsupported_host`. The skill then lets the agent read its own history, at
the user's request, and log one episode per session with
`brain_log_episode`, passing `session` and `origin_turns` as hints. These
are `captured: mcp` with `inputs: unknown`, so they never feed rules.

Harvest runs only when the user asks. Scheduled harvest is a
[proposal](../proposal/scheduled-maintenance.md).

`brain harvest` in a terminal is the user's command and needs neither the
capability nor the config switch.

- Without `--apply` it writes nothing. It lists each session (host, full
  session id, folder, target brain, turn range, estimated tokens) or why it
  was skipped.
- `--apply` writes episodes. `--apply --dry-run` lists the turn ranges it
  would write per session.
- `--status` shows, per host, whether harvest is on and how many sessions
  are left.
- `--from` with an unknown host, or one without a session reader, is a
  usage error, as it is for `brain harvest enable`.

### 2.3 Direct edits

Agents whose profile has `edit` create and edit notes and hubs under
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
| No format 1 or 2 fields; the message names the conversion command | BW117 |
| No unknown `bw-` field | BW118 |
| `bw-superseded_by` is one resolving link to another note, with `status: superseded` | BW119 |
| `bw-sources` items are links or URLs, and the links resolve | BW120, BW122 |
| No supersession cycle | BW307 |
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
| Harvest | `external` when any tool call in the session matches the host's untrusted-tool list, else `local` |
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
4. Harvest drops tool output bodies, so what brain-wiki's tools returned is
   never recorded again as new evidence.
5. Provenance fields are written by code, stored in episode frontmatter,
   and indexed. No component parses provenance out of prose.

## 4. Consolidation

Consolidation is an optional helper for folding the inbox into notes. It
writes no notes itself. The agent edits them directly (§2.3), and the
helper gathers the work and archives what was handled.

### 4.1 Flow

1. Prepare returns pending episodes, candidate notes, and the guidance. It
   writes nothing.
2. The agent edits notes under `topics/` and runs `brain validate` on them.
3. Done archives the handled episodes as one run, which `brain undo`
   reverses. It only moves files.

A failure between the steps leaves notes edited and episodes still pending.
Running prepare again shows what is left.

### 4.2 Triggers

| Trigger | How |
|---|---|
| The user asks their agent ("consolidate my brain") | The skill or the `consolidate` MCP prompt drives prepare, edits, `brain_validate`, and `brain_consolidate_done`, repeating while episodes remain |
| The user works from a terminal | `brain consolidate --prepare`, then any model or person edits notes, then `brain consolidate --done EPISODE…` |

`--prepare` prints the guidance followed by the packet. `--json` prints the
packet alone, and `--out FILE` writes `{guidance, packet}` as JSON.

brain-wiki never consolidates on its own. Running an LLM costs money and
attention, and the user chooses when. Scheduled consolidation is a
[proposal](../proposal/scheduled-maintenance.md).

### 4.3 Selecting and packaging work

`brain consolidate --prepare [--topic T] [--max-episodes N] [--out FILE]`
(MCP `brain_consolidate_prepare {topic, max_episodes}`) needs no capability.
It rescans the brain first.

Selection:

- Pending episodes are everything under `inbox/episodes/` and
  `inbox/agents/`, oldest first. Episodes with an empty body are skipped.
- The packet holds up to `--max-episodes` (default `[consolidate]
  max_episodes_per_run`, 50; MCP allows 1 to 100) within a budget of about
  15k tokens, because hosts cap tool results. The first episode is always
  included. The MCP tool raises Claude Code's cap with
  `_meta["anthropic/maxResultSizeChars"]`.
- `--topic` keeps episodes whose topic hints include T. An unknown topic is
  `not_found`.
- Leftover episodes wait for the next round.

The model the agent runs on sees every episode and candidate note in the
packet. Keeping notes away from a cloud model means keeping them in a
separate brain ([privacy proposal](../proposal/privacy.md)).

Candidates for each episode are the hubs of its hinted topics, then up to 5
notes or hubs found by an FTS query over the episode's 12 most frequent
words. Archived notes are excluded.

The packet is JSON with brain-relative paths. The guidance comes before it:

```json
{
  "brain": "personal",
  "root": "/home/me/brains/personal",
  "pending": 9,
  "episodes": [
    {"path": "inbox/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "archive_to": "archive/episodes/2026/10/01JA0D7F9G1H3J5K7M9N1P3Q5R.md",
     "agent": "claude-code", "created": "2026-10-10T19:22:11Z",
     "inputs": "unknown", "topics": ["search"],
     "candidates": ["topics/search/index.md", "topics/search/fts5.md"],
     "origin_available": true,
     "text": "Switched Lumen's search path to FTS5 after …",
     "untrusted": true}
  ],
  "notes": [
    {"path": "topics/search/fts5.md", "title": "Use SQLite FTS5 for local search",
     "type": "decision", "status": "active",
     "summary": "Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep."}
  ],
  "topics": [
    {"slug": "search", "path": "topics/search", "title": "Search",
     "description": "How local search works and why."}
  ]
}
```

Each note appears once, with its summary (the first paragraph, at most 600
characters), so the agent can decide which to open in full. A topic entry
has `parent` when the topic is nested.

### 4.4 Archiving handled episodes

`brain consolidate --done EPISODE…` (MCP `brain_consolidate_done
{episodes}`) needs `edit`. Episodes are named by path or id, as prepare
listed them. Each must be pending, or the command fails with `not_found`.

The command moves them from `inbox/` to the same relative path under
`archive/` as one run of kind `consolidate` (§7), with one `log.md` entry
and one git commit, `brain: consolidate N episodes`. `brain undo` returns
them to the inbox. It regenerates `reports/` when `[reports]
after_consolidate = true`, the default.

Episodes the agent found nothing durable in go to `--done` too, and
episodes left out stay pending. A note may cite an episode's `archive_to`
path in `bw-sources` before `--done` moves it there. Lint does not report
that link until the episode is archived
([lint §4](lint-and-reports.md#4-how-lint-works)).

### 4.5 Guidance

The guidance shipped with the package (`prompts/consolidate.md`) tells the
model to:

- add each episode to a candidate note, create a new note
  (`topics/<topic>/<slug>.md`, listed in its hub's `## Notes`) only when
  nothing fits, or skip it with a reason;
- write a one-paragraph summary, one specific fact per bullet, and
  wikilinks inside sentences, recording failed approaches as facts;
- change a fact in place, and mark a replaced note `status: superseded`
  with `bw-superseded_by`;
- cite the episode's `archive_to` path in `bw-sources`, run
  `brain_validate`, then call `brain_consolidate_done` with every episode
  handled;
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
  `origin_turns`, brain-wiki has a session reader for its `agent`, and its
  `device` is this one.
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

`brain schedule` installs one job per brain with the platform's own
scheduler. Jobs are keyed by the brain's id, so adding again replaces the
brain's job and a rename does not orphan it.

| Platform | Job | Install | Remove |
|---|---|---|---|
| Linux | User crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` | Read `crontab -l`, replace or add the block, write with `crontab -` | Drop the block |
| macOS | LaunchAgent `io.github.brain-wiki.commit.<brain-id>` | Write `~/Library/LaunchAgents/<label>.plist`, then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Not supported | — | — |

- Other crontab lines stay byte for byte. On Windows, `add` and `remove`
  are usage errors that suggest running `brain commit` from Task Scheduler.
- Each job runs `brain commit --brain <name> [--push]` on its own interval,
  with its own log (`<state>/logs/schedule-<brain-id>.log`) and state file,
  so a failing brain never delays another.
- `--push` is chosen per job and off by default. Without it the job commits
  and fetches but never pushes. To change it, add the job again.
- Schedules live only in the OS scheduler, so there is nothing in
  brain-wiki's config to drift. `brain schedule list` reads every crontab
  block or LaunchAgent (it ignores `--brain`) and shows, per job, the brain
  (by id, or `unregistered`), the interval, whether it pushes, and the last
  run and outcome.
- `brain brains rename` rewrites the brain's job, found by id, and `brain
  brains remove` removes it. A moved folder breaks the registration, not
  the job, and re-pointing the registration fixes both.
- The job calls `brain` by the absolute path resolved at install time, and
  carries the `BRAIN_WIKI_CONFIG`, `_STATE_DIR`, `_CACHE_DIR`, and
  `_DATA_DIR` values set then, because cron and launchd start with a
  minimal environment.
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
9. If the brain is a git work tree and `[git] mode` is `"auto"` (the
   default) or `"on"`, stage exactly the files the run touched, plus
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
