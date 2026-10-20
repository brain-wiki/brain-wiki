# Changelog

## 0.3.4 (unreleased)

- **A topic opens as its topic page.** Selecting a topic in the map shows
  its `Index.md` in the Details panel, then its notes, sub-topics, links,
  and backlinks on the same page, in place of a summary with a button to
  open the page. Clicking a topic page anywhere opens its topic. The
  Details panel and the note preview widen for reading with a button in
  their header or `W`.

- **The map stays up longer.** `brain viz` stops after 2 hours without a
  request, instead of 30 minutes.

- **The map is the topic tree, in layers.** Each level of topics sits on its
  own plane, with a stem from each sub-topic to its parent. A topic's notes
  form a ring of slices around its topic page, clockwise by file name, a
  longer note wider and reaching farther; past one ring, they form spiral
  arms like a galaxy's. The levels are Overview, Topic,
  and Note: groups of topics are gone. Shift+drag turns the view, and `R`
  turns it back. Stems and links are drawn as curves. Flows between
  top-level topics count only typed links
  ([D41](docs/decision/d41-map-of-the-topic-tree.md)).
- **Content sizes in the map's data.** Each node in `/api/world`,
  `/api/topic`, and `--export` carries `chars`, its text without
  frontmatter; each topic carries `chars`, `tree_chars`, `depth`, and its
  folder `name`. `constellations` and each topic's `constellation` are
  removed.

- **Every folder is a topic.** A folder inside a topic is a sub-topic
  whether or not it has a topic page, so a note belongs to the folder it
  sits in, as a file browser shows. A folder with no notes under it, such
  as one of images only, is not a topic. Before, a folder without a page was
  plain organization and its notes belonged to the enclosing topic. Only
  top-level and declared topics are expected to have a page (BW404)
  ([D40](docs/decision/d40-every-folder-is-a-topic.md)).

- **A link to the map that stays put.** `brain viz --port P --keep-token`
  reuses the token saved for that brain and port, so a bookmarked link keeps
  working after a restart. Without it, each start has a new token as before.

- **`brain mv` rewrites links in tables.** A wikilink in a Markdown table
  row escapes its pipe (`[[note\|label]]`, as Obsidian writes it), and
  `brain mv` left such links pointing at the old path.

## 0.3.3 (2026-10-18)

- **Typed relations, as link-only fields (format 4).** A note may name
  the whole it is part of (`bw-part_of`), the notes it rests on
  (`bw-depends_on`), and the notes it disagrees with
  (`bw-conflicts_with`), beside `bw-superseded_by`, which now also takes
  more than one link. Each field holds quoted wikilinks only, on one side;
  the other note sees a backlink such as `has_part` or `depended_on_by`.
  A `## Relations` section is free prose that brain-wiki does not parse
  ([D39](docs/decision/d39-relation-fields.md)).
- **Converting older notes.** `brain lint --fix` (BW117) now also turns
  format 3's "Part of", "Depends on", and "Conflicts with" bullets into
  fields, and moves format 2 relations to the side format 4 keeps them on.
  Format 1 `## Relations` sections are no longer read as relations; their
  links stay plain links. Any run that writes a note raises the brain to
  format 4, which older versions refuse to open.
- **New lint rules.** BW123 (a relation item is not one link), BW124 (a
  relation link does not resolve), BW312 (a note names itself), BW313
  (`bw-part_of` names the page of the note's own topic, fixable), and BW315
  (a part_of cycle).
- **The conflict guard.** A search or read that returns an active note in
  a conflict with another active note also returns the other, with a
  banner: `⚠ CONFLICTS with "…": read both before acting.` It stops once
  either note is superseded or archived; BW314 then suggests removing the
  conflict. A hit now carries every replacement and conflict, and
  `search.max_guards_per_hit` caps only the notes it replaced.
- **Notes that need review.** `reports/stale.md` lists, in order, notes
  that rest on a superseded or archived note, open conflicts, and stale
  links; its title is now "Needs review". The briefing counts the first
  two, and `brain_orient` returns them as `needs_review`.
- **Wholes and parts.** `brain_read` on a whole lists its parts by title,
  comparing numbers as numbers ("2 Design" before "10 Rollout"), and
  leaves them out of the backlinks. A search hit names the wholes it is
  part of, with the opening of each, and `brain_search(within=…)`
  (`--within`) searches only a whole's parts.
- **`brain_neighbors` by relation.** `relations` (`--relation`) follows
  only the edges named, such as `depends_on` with `direction="in"` for what
  rests on a note.
- **The map draws meaning, not mentions.** `brain viz` no longer draws
  body wikilinks, as trails or in the flows between topics; the Details
  panel still lists them. It draws Conflicts (red), Depends on (blue,
  pulsing), and Part of (teal) beside Replaces and Sources, each a dock
  chip and a number key (`1`–`5`). A note lists its links
  by relation and a whole lists its parts by title. A new `conflict` issue
  marks both notes of an open conflict, and `stale` now also marks a note
  that rests on an outdated note.
- **The bench measures the new relations.** Generated brains plant
  conflicts and `bw-depends_on` fields, guard recall covers conflicts, and
  the lint suite adds cases for BW123, BW124, BW312 to BW315, and the
  format 3 conversion.
- **Typed links come first.** `brain_read`, `brain_neighbors`,
  `brain links`, and `brain backlinks` label relation edges and list them
  before body links and citations.
- **Hubs are now topic pages.** A topic is a folder, and its page is the
  file named `layout.topic_page` (`index.md` by default) at the folder's
  root ([D38](docs/decision/d38-topic-pages.md)). A note with `type: hub`
  elsewhere in a topic is no longer indexed as a second hub; it is an
  ordinary note. New pages get `type: topic`.
- **Renamed settings and fields.** `layout.hub_filename` is now
  `layout.topic_page` and the `hub` key of `search.kind_factor` is now
  `topic`; both old names still load. The index kind `hub` is now `topic`
  (the index rebuilds itself). JSON output renames `hub` to `page` in
  topic rows (`brain topics --json`, orientation, `brain viz`) and the
  visualizer's `hubs` total to `pages`. `brain import --overlay --json`
  reports `topic_page` instead of `hub_filename`.
- **AGENTS.md wording.** The managed block's table header is now
  `Topic | Page | About`, and the block names the relation fields, so
  existing brains report BW408 until `brain lint --fix` regenerates it.

## 0.3.2 (2026-10-16)

- **Clicking a connection in `brain viz` opens it.** A click on a link, or
  on the links between two topics or groups, used to fly to one end. It now
  shows the connection in the Details panel and keeps it lit: both notes,
  how they link, the passages that hold the link, and, between topics, each
  link one by one.
- **docs-brain notes follow page size.** A document up to 10 KB is one
  note, and longer ones split by `##` section.

## 0.3.1 (2026-10-16)

- **Scheduled jobs reach keyring credentials.** A crontab job now carries
  `DBUS_SESSION_BUS_ADDRESS`, so git credential helpers that keep the token
  in the desktop keyring (`gh`, libsecret) can fetch from and push to a
  private origin. Add the job again to pick it up.
- **`brain brains` fits on one line.** The terminal listing leaves out each
  brain's description, which pushed the counts and path off-screen; agents
  still get it from `brain_list`, and `--json` has every field.

## 0.3.0 (2026-10-16)

Episodes are captured by agents and consolidated by the agent that captured
them, and harvest and import file straight into notes
([write path](docs/design/write-path.md)). This release removes commands:
`brain log`, `brain import --to-episodes` and `--from`, `brain harvest
--apply`, `--raw`, and `--distill`, the `episodes` capability, and the MCP
tool `brain_harvest_apply` (now `brain_harvest_done`).

- **Capture is agents only, through MCP.** `brain log` is removed. People
  record knowledge by editing a note or by asking an agent to remember it.
  The MCP server records the calling host as the episode's `bw-agent`.
- **No capability for capturing.** The `episodes` capability is removed;
  every connected host may log episodes. A `brain.toml` that still lists it
  loads, and the entry is ignored. The default profile is now
  `write = ["edit"]`.
- **A consolidation hint.** `brain_log_episode` takes an optional `pattern`
  (`record`, `playbook`, `file`, `distill`), stored as `bw-pattern` and shown
  in the consolidation packet.
- **Each agent consolidates its own episodes.** `brain consolidate
  --prepare` (MCP `brain_consolidate_prepare`) gives a host its own
  episodes, those whose conversation is on this machine first. Other
  agents' episodes, or unowned ones, come only when the user asks:
  `--agent HOST`, `--unowned`, `--all` (MCP `agents`, `unowned`, `all`).
  The packet adds `scope`, `not_included`, each episode's `pattern` hint,
  and `session_inputs`, brain-wiki's own reading of the transcript.
- **Consolidation patterns.** The guidance is built around record,
  playbook, file, distill, and skip. `brain consolidate --done` takes
  `EPISODE:PATTERN:NOTE` or `EPISODE:skip:REASON` (MCP: `{episode, pattern,
  notes}` or `{episode, pattern: "skip", reason}`), checks that each note
  cites its episode in `bw-sources`, and archives nothing otherwise. The
  `log.md` entry lists each episode's outcome.
- **Who the inbox is waiting on.** Orientation shows pending episodes per
  agent and each agent's last consolidation; `brain doctor` reports them,
  and an owner whose oldest episode is past `[lint] stale_inbox_days` as
  `stale_episodes`. New report: `reports/consolidation.md`.
- **Harvest files sessions into notes.** `brain_harvest_prepare` gives each
  session a `source` URL (`session://<host>/<session id>#turns=A-B`) and its
  `inputs`; the agent files the session into notes citing that URL, and
  `brain_harvest_done` (replacing `brain_harvest_apply`) checks the
  citations before it marks the session harvested. Harvest writes no
  episodes. `brain harvest --apply`, `--raw`, `--distill`, and the
  `[harvest] distill` setting are removed; `brain harvest` lists sessions.
  `brain origin` and `brain_read_origin` accept session URLs.
- **Scheduled consolidation for Claude Code.** `brain schedule add
  consolidate --host claude-code [--at 21:30] [--harvest] [--include
  AGENT|unowned]` installs a daily crontab block or LaunchAgent that runs
  `brain consolidate --run --host claude-code`: it checks the profile, the
  CLI, and the lock, starts `claude -p` with only file tools and
  brain-wiki's MCP server, validates, commits, and records the outcome.
  `add` refuses when the dry run fails; a failed run shows in orientation,
  `brain doctor`, and `reports/consolidation.md`. Other hosts consolidate in
  sessions until their unattended modes are verified. The headless distill
  presets are removed.
- **Importing documents is agent work.** `brain import --to-episodes` and
  `brain import --from HOST` are removed. Ask an agent to file documents or
  its memory files into notes; the `brain` skill says how. `--overlay` and
  `--into` are unchanged.

## 0.2.0 (2026-10-15)

Format 3: a note is an ordinary Markdown page. This release changes the file
format and several commands; convert existing brains with `brain lint --fix
--dry-run`, then `brain lint --fix`.

- **Notes as content.** Frontmatter holds metadata only: `id`, `type`,
  `title`, `aliases`, `tags`, `status`, `bw-superseded_by`, `bw-sources`,
  `bw-stage`, `created`, `updated`. Facts and connections are body Markdown,
  and notes connect through `[[wikilinks]]`. brain-wiki indexes body words,
  headings, and where links point; it no longer reads claims or typed
  relations.
- **Converting a brain.** `brain lint --fix` turns format 1 and 2 notes into
  format 3 as one undoable run: claims become a `## Facts` list (superseded
  ones a struck-through `## History`), relations become a `## Related` list,
  claim sources become `bw-sources`, and a note another note supersedes gets
  `status: superseded` and `bw-superseded_by`. Until a note is converted,
  its old claim text stays searchable and lint reports BW117. Episodes are
  not converted.
- **Agents edit notes directly.** An agent whose profile has `edit` creates
  and edits notes, then runs `brain validate` (MCP `brain_validate`), which
  checks frontmatter: fields and values, ids, `bw-superseded_by` and
  `bw-sources` links, supersession cycles, and files that are never edited
  directly. By default it checks the notes git sees as changed. Orientation
  shows agents that may edit a short "Writing notes" guide.
- **Git keeps the history of direct edits.** `brain commit` snapshots
  changed notes into a commit, fetches and rebases onto origin, and with
  `--push` pushes. `brain schedule add commit [--every 15m] [--push]` runs it
  from crontab (Linux) or a LaunchAgent (macOS), one job per brain;
  `brain schedule list` and `remove commit` manage the jobs.
- **Consolidation is a helper.** `brain consolidate --prepare` (MCP
  `brain_consolidate_prepare`) gathers pending episodes with candidate notes
  and guidance; the agent edits notes and validates them; `brain consolidate
  --done EPISODE...` (MCP `brain_consolidate_done`) archives the episodes as
  one undoable run.
- **Removed, and what replaces them:** `brain check` / `brain_check` →
  `brain validate` / `brain_validate`; `brain restore` → git; `brain
  consolidate --apply` / `brain_consolidate_apply` → edit notes, then
  `--done`; `brain search --intent` and `brain neighbors --rel` → plain
  search and `brain neighbors` (links and backlinks); the `consolidate` and
  `review` capabilities (an old `brain.toml` that names them still loads);
  topic `review` and `agent_edits` policies; the `contradictions` and
  `unverified` reports. `brain review` lists rule proposals only.
- `brain import --overlay` keeps phases 0 (adopt), 1 (ids and status), and
  2 (hubs); the relation and claim phases are gone, and link properties such
  as `up:` stay yours.
- Supersession is metadata: a hit on a superseded note still comes with the
  note that replaced it, now found through `bw-superseded_by`. The `stale`
  report lists active notes that link to superseded or archived notes other
  than the ones they replaced.
- The visualizer draws wikilinks, supersession, and sources, and flags
  superseded, stale, orphan, and lint-error notes.
- The MCP server rereads `brain.toml` on every call, so `brain agents grant`
  and `revoke` apply to the next tool call without a restart.
- An MCP client that calls itself OpenCode is recognized as the `opencode`
  host.

## 0.1.1 (2026-10-14)

- `brain viz --host ADDRESS` serves the map beyond this machine, for example
  `--host 0.0.0.0` to open it from a laptop while the brain lives on a remote
  workstation. It prints a URL for other machines and warns that the
  connection is not encrypted. The default stays 127.0.0.1.

## 0.1.0 (2026-10-14)

The first release of the 0.1 line. brain-wiki is alpha: expect breaking
changes before 1.0. Changes since 0.1.0.dev1:

- `brain obsidian [BRAIN]` opens the brain's folder as a vault in Obsidian,
  adding it as a new vault the first time through the Obsidian CLI (or, without
  the CLI, opening the vault manager with the step to take).
- `brain viz [BRAIN]` and `brain obsidian [BRAIN]` open the named brain, the
  only brain, or with several, the one you pick from a list (the usual brain is
  the default).
- `brain setup` asks first whether to create a new brain or adopt a folder you
  have, names the brain after its folder, and shows the answer Enter picks
  for every question.

## 0.1.0.dev1 (2026-10-14)

- `brain setup --guide` prints the setup steps for an AI agent, so any agent
  that can run commands can set brain-wiki up from one prompt, without the
  plugin. Without a terminal, `brain setup` points to it, and an agent that
  finds no brain is told to use the `brain-setup` skill or the guide.
- Every setup step is now a command, so the guide never edits config files:
  `brain agents [list | grant | revoke]` changes what an app may do as an
  undoable run, and `brain harvest enable | disable | route` configures
  harvest. A refusal names the `brain agents grant` command that allows it.
  `brain brains limit HOST BRAIN...` and `unlimit HOST` set which brains an
  app may use.
- `brain setup` also asks what each connected app may do, grants the
  `harvest` ability with harvest, and ends with what to try next.
- The CLI is built on Typer. Action commands are real subcommands with their
  own help (`brain rules add --help`), and `brain --install-completion`
  installs tab completion. `--brain`, `--as`, and `--json` still work before
  or after the command. `brain --version` also prints the file format.
- Removed commands, and what replaces them: `brain version` → `brain
  --version`; `brain list` → `brain brains` (also with `--as HOST`); `brain
  notes` and `brain recent` → `brain search ""` with filters (e.g. `brain
  search "" --since 7d`; browsing sorts by `recent`); `brain outline TARGET` →
  `brain read TARGET --mode outline`.
- `brain rule` is now `brain rules`; `rule` still works as a hidden alias.
- `brain review` also covers rule proposals: `review list` shows them with
  consolidation and edit proposals, marking each one's kind, and `review
  show`, `accept`, and `reject` take a rule proposal's id.
- `brain import --phase` given with a mode other than `--overlay` is a usage
  error even when it is `--phase 0`.
- Harvest routes are a fallback: a project's `.brain-wiki.toml` now wins over
  a catch-all route such as `~/**`.

Fixes from an audit of every command, each with a regression test:

- **Data loss:** undo could delete notes when the first write came before
  any full scan. In a git brain, undo lost files git never tracked (inbox
  episodes, proposals), left deletions staged, and failed for any run but the
  newest. Undo now restores from the run's saved copies in every brain.
- **Safety:** `brain review accept` trusted the packet inside the proposal
  file, so a forged one could write `rules.md`; it now rebuilds the packet
  from the brain. `--as HOST` is enforced by every write command.
- `brain import --apply --dry-run` applied the import; a failed `brain
  brains rename` deleted the brain's entry; overlay phases 1–3 never ran in
  a git repository; `--to-episodes` turned frontmatter into an episode.
- `tags`, `types`, `orphans`, and `unresolved` showed a stale index; `search
  --where` ignored tags, aliases, title, and id; `read --mode raw` was not
  the raw file; `doctor` counted hubs as notes.
- `brain check` recorded edits that lint rejects; `brain mv` of a topic left
  its `brain.toml` entry behind; topics with `review = "always"` skipped
  review for new notes.
- `brain connect` broke a project-scope install on a later user-scope
  connect, did not restore config files byte for byte, and crashed on
  malformed JSON.
- Unexpected errors exit 10 with a log reference instead of a traceback;
  conflicts report `conflict:`, and only stale data reports `stale:`.

## 0.1.0.dev0 (2026-10-14)

First release.

- **Brain format**: plain Markdown notes with frontmatter, claims with
  provenance, and typed relations (`part_of`, `depends_on`,
  `conflicts_with`, `supersedes`, `related_to`, and their inverses);
  topics as folders, nested to any depth; immutable inbox episodes;
  `rules.md`; a managed `AGENTS.md` block.
- **Index and retrieval**: SQLite FTS5 index outside the brain, freshness
  checks, guard co-retrieval (superseding and conflicting notes come with
  every hit), search filters, facets, and intents, orientation, and
  Obsidian-style browsing (`brain topics`, `notes`, `links`, `backlinks`,
  `tags`, and more).
- **Write path**: one episode writer with server-set provenance, secret
  redaction, size caps, and dedupe; episodes dropped in by hand count as
  untrusted; checked direct edits (`brain check`, `brain restore`, a
  per-topic `agent_edits` policy), which agents may make by default; rules
  that need the user's words and confirmation; `brain mv`.
- **Runs**: every curated change is locked, gated by lint, recorded with
  pre-images, committed to git when the brain is a repository, and
  undoable.
- **Consolidation**: packets with short handles, a per-op validator, a
  deterministic writer that never deletes text, and review proposals. Your
  agent consolidates in its session over MCP; `brain consolidate --prepare`
  and `--apply` drive it by hand.
- **Lint and reports**: the BW rule catalog with strict and migrate
  profiles, cached whole-brain lint, safe fixes as one run, staged-file
  lint and a pre-commit hook, and browsable reports.
- **Agents**: a stdio MCP server with thirteen tools and three prompts;
  `brain connect` for Claude Code, Codex, Antigravity, OpenClaw, and
  Cursor, with instructions placed where each host reads them; session readers and
  harvest for Claude Code, Codex, and Antigravity, with headless presets
  for large backfills; origin lookup; a plugin bundle with three skills;
  `brain setup` and `brain doctor`.
- **Import**: overlay adoption of Obsidian vaults in phases, copying into
  a brain, documents and agent memory files as episodes.
- **Visualizer**: `brain viz`, a local read-only 3D map of groups,
  topics, folders, and notes with typed relations and issue highlighting,
  and HTML, JSON, and GraphML export.
- **Bench**: offline retrieval, lint, and performance suites, and
  model-backed consolidation scenarios through headless presets.

Known limitations:

- No privacy levels inside a brain: every agent that may use a brain
  reads all of it. Keep separate lives in separate brains
  ([proposal](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposal/privacy.md)).
- Maintenance runs when you ask your agent; there is no scheduler
  ([proposal](https://github.com/brain-wiki/brain-wiki/blob/v0.2.0/docs/proposals/scheduled-maintenance.md)).
- Chat apps that need a remote MCP server (ChatGPT, claude.ai, the Gemini
  app) are not supported ([proposal](https://github.com/brain-wiki/brain-wiki/blob/main/docs/proposal/remote-mcp.md)).
