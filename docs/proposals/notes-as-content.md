# Notes as content (format 3)

Status: decided 2026-10-15; not built. Target release 0.2.0. No open
questions (§15 records how they were settled).

Format 3 makes a note an ordinary Markdown page: frontmatter holds metadata
only, and what the note knows (facts, connections) is Markdown in the body.
Agents edit notes directly; consolidation becomes an optional helper for
folding the inbox in.

## 1. Why

| Problem in format 2 | Seen as |
|---|---|
| Knowledge lives in properties. Claims and typed relations are YAML strings (D3), but Obsidian defines properties as "small, atomic bits of information" and renders no Markdown in them. | Notes whose body is only a title; wikilinks inside a claim are dead text; editing a fact means editing quoted YAML, and one bad quote breaks the note; other renderers hide or tabulate the content. |
| Consolidation is the only full write path. New knowledge reaches notes through validated ops; direct edits need `brain check`, a loss guard, and a run per edit. | A heavy protocol for the common case (write down a fact), and agents with file access write files anyway (T17's residual risk). |
| The protocol constrains shape, not quality. The validator checks schema, handles, spans, and lint, so a verbatim copy of a bundled episode line passes. | A real run turned 14 episodes into 15 notes whose 64 claims were copied line for line, 17 of them bundling three or more facts. |

## 2. Decisions

| # | Decision | Replaces |
|---|---|---|
| N1 | Frontmatter holds metadata only. | D3: claims and relations as frontmatter lists |
| N2 | Facts and connections are content: Markdown in the body, notes connected by wikilinks. brain-wiki does not extract meaning from content (no claims, no relation types); it indexes content only as Markdown: words for search, headings, and where links point. | Claims (02 §6.3), relations (02 §6.4), guard co-retrieval for `conflicts_with` (02 §7) |
| N3 | Agents edit notes directly. Consolidation is an optional helper, not the way knowledge enters a brain. | Ops as the curated write path (05 §2, §5, §7); checked edits (05 §2.3) |
| N4 | `brain validate [PATH…]` checks frontmatter, and orientation carries the schema an agent needs to write a valid note. | `brain check` |
| N5 | The inbox is optional capture for things the user has not organized yet; `brain consolidate` helps an agent fold it into notes. | Inbox as the mandatory first step |
| N6 | Note lifecycle is metadata: `status` plus an optional `bw-superseded_by`. | `bw-supersedes` / `bw-superseded_by` relations |
| N7 | Provenance is an optional note-level `bw-sources` list. | Claim `src`, `origin`, `inputs`, `[unverified]` |
| N8 | Git is the history for direct edits: `brain commit` snapshots them, and `brain schedule` runs it from crontab or a LaunchAgent. `brain undo` covers brain-wiki's own runs. | Run records for checked edits, `brain restore` |
| N9 | Ships as 0.2.0 with the pending 0.1.x fixes folded in. | — |

## 3. Format 3

### 3.1 Frontmatter

Flat values only (scalars and lists of scalars), as today.

| Field | Required | Values | Notes |
|---|---|---|---|
| `id` | yes (`lint --fix` mints one) | ULID | Unique in the brain |
| `type` | no (default `note`) | lowercase word | Open vocabulary: `note`, `hub`, `decision`, `howto`, `person`, `project`, `reference`, … |
| `title` | no | string | Default: first `# ` heading, else file name |
| `aliases`, `tags` | no | list of strings | As in Obsidian |
| `status` | no (default `active`) | `active` \| `superseded` \| `archived` | Closed set |
| `bw-superseded_by` | only with `status: superseded` | `"[[note]]"` | Must resolve to an active note; no cycles |
| `bw-sources` | no | list: URL or `"[[note or episode]]"` | Shape checked, targets resolved; no trust flags |
| `bw-stage` | no | string | Free workflow state, as today |
| `created`, `updated` | no | ISO 8601 date or date-time | Writers set `updated` |

- Any other property is the user's: preserved, indexed for `--where`, never
  validated.
- Unknown `bw-` fields are errors. `bw-claims`, `bw-claims-superseded`, and
  `bw-<verb>` fields are errors that name the conversion command (§12).
- brain-wiki-specific fields keep the `bw-` prefix (D29); shared metadata
  stays unprefixed.

### 3.2 Body

Free Markdown. Nothing in it is parsed except links (02 §6.5). Orientation
recommends a shape, and nothing enforces it:

```markdown
---
id: 01J9Z7Q2K4M6N8P0R2S4T6V8W0
type: decision
title: Use SQLite FTS5 for local search
bw-sources:
  - "[[archive/episodes/2026/10/01J9Z6B5N3M1K9H7G5F3D1S9A7]]"
updated: 2026-10-09
---
# Use SQLite FTS5 for local search

Lumen searches notes with SQLite FTS5 instead of shelling out to ripgrep.

- FTS5 is the default search backend since Lumen 0.4.
- Trigram search needs SQLite 3.34 or newer; see [[SQLite version policy]].
- Tried ripgrep over 10k notes: 1.8 s per query, too slow for search-as-you-type.

Replaced the earlier [[Use ripgrep for search]] approach.
```

- The first paragraph is the summary; search snippets and outlines use it.
- One fact per bullet, specific (numbers, versions, dates). Failed
  approaches are facts too.
- Connections are wikilinks in sentences, so the reason sits next to the
  link.

### 3.3 Topics and hubs

- A topic is a folder under `topics/` with a hub (`index.md`). Membership is
  the folder; `bw-part_of` goes away.
- A hub's `## Notes` list stays navigation. `brain lint --fix` adds missing
  entries and never removes lines a person wrote (unchanged).

### 3.4 Episodes

Unchanged: immutable inbox files with `bw-` provenance in frontmatter and
`## Claims` / `## Open questions` as body text.

## 4. Writing notes

### 4.1 Direct edits

- An agent with `edit` creates and edits notes and hubs under `topics/`
  with its own file tools, then runs `brain validate` on what it changed.
- Still protected: `rules.md` (the rules path, 05 §6), `brain.toml`
  (`brain` commands), `log.md`, the `AGENTS.md` managed block, `inbox/` and
  `archive/` (episodes stay immutable), `reports/`.
- `edit` tells an agent, through orientation and the `AGENTS.md` block,
  whether it may edit notes, and gates brain-wiki's own writers (`mv`,
  `lint --fix`, `consolidate --done`). Files are not authenticated, as today.
- Removed: `brain check`, `brain restore`, the loss guard, pending-edit
  detection, edit runs, and edit proposals in `brain review`.

### 4.2 `brain validate`

```
brain validate [PATH…] [--json]       # MCP: brain_validate {paths}
```

- Default paths: notes changed since the last commit (git), else since the
  last index scan.
- Checks: frontmatter parses and is flat; field types and values (§3.1);
  `id` present and unique; `bw-superseded_by` and `bw-sources` resolve;
  no format-2 fields; the file is a note or hub under `topics/`.
- Output: one line per problem with the field, what was found, and what is
  allowed. Exit 0 when valid, 1 otherwise.
- It is the schema family of lint rules, run alone. `brain lint` keeps
  everything else (broken links, orphans, secrets, conflict copies).

### 4.3 Orientation teaches the schema

`brain_orient` gains a short **Writing notes** section, built from the
schema and the brain's settings:

- a frontmatter template and the allowed `status` values;
- where files go (`topics/<topic>/<slug>.md`), and the topics that exist;
- the body conventions in §3.2;
- "run `brain validate` on the files you changed".

The section stays within the orientation budget (about 25 lines) and
appears only when the calling profile has `edit`.

### 4.4 Committing direct edits

brain-wiki's own runs commit as today (`git.mode = "auto"`). Direct edits
are committed by a snapshot command, run by hand or by an OS job, one job
per brain. `brain validate` stays free of side effects. Every command acts
on one brain: `--brain NAME|PATH`, else the default.

```
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run] [--json]
brain schedule add commit [--every 15m] [--push] [--dry-run]
brain schedule remove commit [--dry-run]
brain schedule list
```

**`brain commit`**, when the brain is a git work tree:

1. Take the brain's write lock without waiting; if it is held, skip this
   round.
2. **Snapshot.** Collect changed, new, and deleted files (`git status`),
   leaving out files modified within `--settle` (default 2 minutes), so a
   half-finished multi-file edit waits for the next round. Stage exactly
   those files and commit them (format below). Never amend.
3. **Sync with origin**, when the current branch tracks a branch on
   `origin` (otherwise skipped with a note; `--no-fetch` skips it):
   1. `git fetch origin`, non-interactive (`GIT_TERMINAL_PROMPT=0`, ssh
      `BatchMode=yes`), so a job never waits for a password.
   2. Rebase local commits onto the upstream with `--autostash`; files left
      out by `--settle` are set aside and put back.
   3. On a conflict: `git rebase --abort`, so commits and files are exactly
      as before; exit 1, naming the conflicting files. Later runs keep
      committing locally and report the conflict until the user resolves it
      (`git pull --rebase` in the brain).
   4. With `--push`: push to the upstream. If origin moved since the fetch,
      fetch and rebase once more, then push; a second rejection exits 1.
4. Record the time and the outcome (committed, fetched, pushed, conflict,
   offline) under the brain's id in `<state>/schedule/<brain-id>.json`.

The commit message:

```
brain: snapshot 3 notes in lumen/sync

M topics/lumen/sync/crdt.md
M topics/lumen/sync/offline.md
A topics/lumen/sync/conflicts.md

Brain-Agent: schedule
```

| Part | Rule |
|---|---|
| Subject | `brain: snapshot N notes in <topic>` when every file is in one topic, `… in 3 topics` otherwise; files that are not notes count as `files` |
| Body | One line per file with git's status letter: `A`, `M`, `D`, or `R old -> new` |
| Trailer | `Brain-Agent: schedule` from the OS job, or the host with `--as HOST`. It names who committed, not who edited |

- **Failures.** A conflict or a second push rejection exits 1. A network or
  authentication failure keeps the local commit, records `offline`, and
  exits 0 with a warning; `brain doctor` reports a brain that has not
  synced for a day.
- Validation is not a gate: the history must hold broken states too, so
  they can be restored.
- A brain without git is refused with a note. With nothing to commit, it
  still fetches and rebases.
- An agent with `edit` may run it after editing; `brain commit --as HOST`
  needs `edit`, and `--push` is refused under `--as`, since pushing
  publishes the brain.

**`brain schedule`** installs one job per brain with the scheduler native to
the platform. Jobs are keyed by the brain's id, so adding again replaces the
brain's job and a rename does not orphan it:

| Platform | One job per brain | Install | Remove |
|---|---|---|---|
| Linux | A user crontab block between `# >>> brain-wiki commit <brain-id>` and `# <<< brain-wiki commit <brain-id>` | Read `crontab -l`, replace or add the brain's block, write it back with `crontab -`; other lines stay byte for byte | Drop the brain's block |
| macOS | A LaunchAgent labeled `io.github.brain-wiki.commit.<brain-id>` | Write `~/Library/LaunchAgents/<label>.plist` (`ProgramArguments`, `StartInterval`, `StandardOutPath`/`StandardErrorPath`), then `launchctl bootstrap gui/<uid> <plist>` | `launchctl bootout gui/<uid>/<label>`, then delete the plist |
| Windows | Task Scheduler (`schtasks`), later | — | — |

- **Isolation.** Each job runs `brain commit --brain <name>` on its own
  interval, with its own log (`<state>/logs/schedule-<brain-id>.log`) and
  state file. A slow or failing brain never delays or blocks another.
- **Auto-push is chosen per job.** `--push` adds `--push` to the job's
  command; without it the job commits and fetches but never pushes. To
  change it, add the job again. Off by default.
- **The OS scheduler is the source of truth.** No schedule settings live in
  brain-wiki's config, so there is nothing to drift. `brain schedule list`
  reads the crontab blocks or LaunchAgents and shows, per job, the brain
  (resolved by id), its interval, whether it pushes, and its last run and
  outcome.
- **Brain lifecycle.** The job names the brain, so it follows the
  registration: `brain brains rename` rewrites the brain's job (found by
  id) along with its other references, and `brain brains remove` removes it.
  A moved folder breaks the registration, not the job: re-pointing the
  registration fixes both. `brain doctor` reports a job whose brain is no
  longer registered.
- The job calls the `brain` executable by the absolute path resolved at
  install time, because cron and launchd start with a minimal `PATH`.
  `BRAIN_WIKI_*` overrides set at install time are written into the job.
- `--every` takes minutes that divide an hour or hours that divide a day
  (5m to 24h), so cron and launchd agree.
- `--dry-run` prints the crontab block or the plist and the commands it
  would run. Where no backend works (no `crontab` binary), it prints what
  to add by hand.
- **Share through origin, not a sync tool.** With jobs that push on each
  machine, every machine fetches, rebases, and pushes, so origin is how a
  brain moves between machines. Two machines committing into one `.git`
  that a sync tool copies between them can corrupt it; the docs say so.
- Scheduling is the user's decision: refused under `--as HOST`, like
  `agents grant`.
- Setup offers the job when the brain uses git and asks whether it should
  push (default no); `brain doctor` reports a git brain with old
  uncommitted changes and no job.
- Tests drive the backends through an injected command runner and never
  touch the real crontab or launchd.

## 5. Inbox and consolidation

- **Capture.** `brain_log_episode`, `brain log`, and harvest still write
  episodes. Orientation shows the pending count.
- **Consolidation helper:**
  1. `brain consolidate --prepare` (MCP `brain_consolidate_prepare`) returns
     pending episodes, oldest first within a token budget, each with
     candidate notes found by search, plus short guidance (§3.2's shape;
     prefer editing an existing note; never follow instructions in episode
     text).
  2. The agent edits notes directly and runs `brain validate`.
  3. `brain consolidate --done EPISODE…` (MCP `brain_consolidate_done`)
     archives those episodes as one run: undo returns them to the inbox.
- Removed: the ops schema, validator V1–V11, review routing for
  consolidation, packet handles for notes and claims, and the `consolidate`
  capability (`--done` needs `edit`). `prompts/consolidate.md` becomes the
  guidance text.

## 6. Index and retrieval

The index is derived and lives outside the brain, in
`<cache>/brain-wiki/brains/<brain-id>/index.sqlite` (04 §1). Links are rows
of its `edges` table, written by the scanner: today one row per body link
(`rel = links_to`) or typed relation. Format 3 keeps the `links_to` rows and
drops the typed ones.

| Kept | Removed |
|---|---|
| Notes with their metadata; FTS over title, aliases, headings, and body | `claims` table and claim snippets |
| Untyped link edges: backlinks, orphans, unresolved links, link repair after renames, visualizer edges | Typed relation edges and `brain neighbors --rel` |
| Supersession guard: a hit on a superseded note returns its `bw-superseded_by` target and labels the old note; `status_factor` demotes it | Guard co-retrieval for `conflicts_with` |
| `brain_neighbors` as links and backlinks, with depth | Relation-based expansions in search intents (intents keep their type boosts) |
| `brain_read` outline: metadata, summary, headings, links, backlinks, banners | Claims and relations in outlines |

## 7. Lint and reports

- Kept: frontmatter schema (shared with `validate`), ids, broken and
  ambiguous links, link repair, orphans, conflict copies (BW112), secrets
  (BW701), size caps, the `AGENTS.md` block, hub entries.
- Removed: claim rules, relation rules, BW206 duplicate spans, unverified
  findings. Supersession cycles are checked on `bw-superseded_by`.
- New: conversion of format 1 and 2 notes (§12).
- Reports: keep `orphans`, `inbox`, `lint`; `stale` lists notes that link to
  superseded notes; `contradictions`, `unverified`, and `duplicates` go away.

## 8. Visualizer

- Nodes: topics, hubs, notes; edges: wikilinks. Topic flows count links
  between topics instead of typed relations.
- Flags: lint errors, orphans, superseded. Claim counts, typed relations,
  `conflict`, and `unverified` go away.
- The preview shows metadata as properties and renders the body.
- The API change lands here first, then in brain-wiki-viz, then as a new
  bundle (12 §5).

## 9. Import, harvest, bench

- Import: overlay adoption, `--into`, `--to-episodes`, and `--from HOST`
  stay. Phases 1–3 (typed relations, claims) are removed. Link properties
  such as `up:` stay the user's properties.
- Harvest: unchanged.
- Bench: retrieval, lint, and perf suites stay, on format-3 fixtures. The
  consolidation validity and claim-recall suites are removed; the
  consolidation-bench proposal is withdrawn.

## 10. Security and trust

| Threat (doc 10) | Change |
|---|---|
| T1 rules | Unchanged: rules still need the user's words and confirmation. |
| T2 poisoned knowledge | Weaker. No per-fact provenance or `[unverified]`. Mitigations: `bw-sources`, git history, episodes keep their `inputs`, orientation asks agents to cite sources. Residual: a false fact an agent writes directly looks like one the user wrote. |
| T17 direct edits | Becomes the main path. No loss guard. Recovery is git; a brain without git has none, so setup recommends git more strongly. |
| T6 path traversal | Unchanged for brain-wiki's own writers. |

## 11. Interface changes

| Today | Format 3 |
|---|---|
| `brain check` / `brain_check` | `brain validate` / `brain_validate` |
| `brain restore` | Removed (git) |
| — | `brain commit`: snapshot direct edits into git |
| — | `brain schedule add\|list\|remove commit`: crontab (Linux) or LaunchAgent (macOS) |
| `brain consolidate --apply OPS.json --run RUN` / `brain_consolidate_apply` | `brain consolidate --done EPISODE…` / `brain_consolidate_done` |
| `brain review` (runs and rules) | Rules only |
| `brain neighbors --rel R` | `brain neighbors` (links and backlinks) |
| `brain read --mode outline` lists claims | Lists headings and links |
| Capabilities `episodes, edit, propose_rules, consolidate, harvest` | `episodes, edit, propose_rules, harvest` |
| `brain import --overlay --phase 1–3` | Phase 0 only |

## 12. Migration

- `brain lint --fix` converts format 1 and 2 notes as one run, with
  `--dry-run`, and raises `format = 3`:
  - `bw-claims` → a `## Facts` list (text only); `bw-claims-superseded` →
    `## History`, struck through.
  - Claim sources → `bw-sources`, deduplicated, inbox paths mapped to
    `archive/`.
  - `bw-<verb>` relations → a `## Related` list
    (`- Depends on [[x]] — needs the trigram tokenizer`). `bw-part_of` to
    the note's own hub is dropped.
  - `bw-supersedes: X` → `X` gets `status: superseded` and
    `bw-superseded_by`.
- Until converted, the index treats format-2 claim and relation text as
  searchable content, and lint reports the conversion command. A writer
  converts a note before editing it, as format 1 → 2 does today.
- Episodes are not converted (immutable).

## 13. Documents to change

| Area | Change |
|---|---|
| Design docs | 01 (glossary, scenarios), 02 (§1, §4, §6–§8, §13), 03 (per-brain schedule state and logs), 04 (claims, guards, read modes), 05 (rewrite around direct edits, the helper, and `brain commit`), 06, 07 (`validate`, `commit`, `schedule`), 08 (instruction block), 09 (phases), 10, 11, 12, 15 (setup offers the schedule); decisions D3, D29 and new N-decisions in the README |
| User docs and README | Reference, getting started, maintenance, agents, privacy |
| Agent surfaces | `brain`, `brain-maintain`, `brain-setup` skills and references; the rules block; `prompts/consolidate.md`; `docs-brain` |
| Visualizer | brain-wiki-viz and the committed bundle |

## 14. Plan

Each phase is one reviewable change with `scripts/check.py` green.

| Phase | Content |
|---|---|
| P1 | Schema module; `brain validate` (CLI and MCP); orientation's Writing notes section |
| P2 | Format-3 reading and index: no claims or typed edges; supersession guard on `bw-superseded_by`; `neighbors` and `read` outlines on links |
| P3 | Write path: remove ops, validator, `check`, `restore`, edit review; consolidate `--prepare` / `--done`; capabilities; reload `brain.toml` when it changes (the stale-profile bug) |
| P3b | `brain commit`; `brain schedule` with crontab and LaunchAgent backends; setup and doctor hooks |
| P4 | Lint, reports, import, bench; the format 1/2 → 3 conversion |
| P5 | Visualizer API, brain-wiki-viz, new bundle |
| P6 | Docs, skills, README, CHANGELOG; 0.1.x fixes (`brains remove` cleanup, help text, `opencode` client name); release 0.2.0 |

After the release, convert existing brains with `brain lint --fix --dry-run`
first.

## 15. Open questions

- **Q1. Resolved:** direct edits are committed by `brain commit`, on a
  schedule from `brain schedule` (§4.4).
- **Q2. Resolved:** brain-wiki does not track what content means, but it
  still indexes where links point. The `links_to` rows (§6) keep serving
  backlinks, orphans, unresolved links, `brain mv` link rewriting, and the
  visualizer.
