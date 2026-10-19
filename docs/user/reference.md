# Reference

## Commands

Every command takes the global options `--brain NAME|PATH`, `--as HOST` (act
with that agent app's profile), and `--json`, before or after the command
name. `brain --version` prints the version, and `brain --install-completion`
installs tab completion for your shell. `brain <command> --help` and
`brain <command> <subcommand> --help` list each command's options.

The commands, in the order `brain --help` lists them:

| Command | Does |
|---|---|
| `brain init [PATH] [--name N] [--git] [--no-register]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME [--purge-state] \| rename OLD NEW \| default NAME \| limit HOST BRAIN… \| unlimit HOST]` | List and manage registered brains |
| `brain agents [list \| grant HOST CAP… [--dry-run] \| revoke HOST CAP… [--dry-run]]` | Show or change what each agent app may do |
| `brain doctor` | Check configuration, brains, SQLite, agent apps, and commit jobs |
| `brain setup [--guide]` | Set up step by step |
| `brain orient` | Print the briefing agents get |
| `brain search [QUERY] [options]` | Search, or browse with an empty query |
| `brain read TARGET [--mode outline\|full\|section\|raw] [--section H]` | Read a note, topic page, or episode |
| `brain neighbors TARGET [--direction out\|in\|both] [--depth N] [--limit N] [--relation REL]... [--paths]` | Follow a note's links and backlinks |
| `brain topics [TOPIC]` | The topic tree with note counts |
| `brain links TARGET` | What a note links to |
| `brain backlinks TARGET` | What links to a note |
| `brain tags [--counts]` | Tags in use |
| `brain types [--counts]` | Note types in use |
| `brain orphans` | Notes nothing links to |
| `brain unresolved` | Links that resolve to no note |
| `brain index [--rebuild \| --status]` | Show index counts, or rebuild it |
| `brain rules add TEXT [--quote Q] [--replaces ID] \| list \| accept ID \| reject ID` | Manage standing rules |
| `brain mv SRC DST [--dry-run]` | Move a note or topic folder, rewriting links |
| `brain validate [PATH…]` | Check the frontmatter of notes you created or edited |
| `brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST] [--unowned] [--all] [--out FILE]`, `brain consolidate --done EPISODE[:PATTERN:NOTE]…` | Gather pending episodes, then archive the ones handled with what came of each |
| `brain review list \| show ID \| accept ID \| reject ID` | Agents' rule proposals waiting for you |
| `brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run]` | Commit direct edits to git and sync with origin |
| `brain schedule [list] \| add commit [--every 15m] [--push] [--dry-run] \| remove commit [--dry-run]` | OS jobs that run `brain commit` |
| `brain schedule add consolidate --host HOST [--at 21:30] [--harvest] [--include AGENT\|unowned]… [--dry-run]`, `remove consolidate --host HOST` | A daily job that starts the host's agent to consolidate |
| `brain consolidate --run --host HOST [--harvest] [--include …] [--dry-run]` | One scheduled consolidation, as the job runs it |
| `brain runs [list \| show [RUN]]` | Run history on this device |
| `brain undo [RUN] [--force]` | Undo a run |
| `brain lint [PATH…] [options]` | Check the brain against the format |
| `brain report` | Regenerate `reports/` |
| `brain harvest [options]`, `brain harvest enable HOST… \| disable HOST… \| route PATTERN BRAIN` | List agent sessions waiting to be harvested, and configure harvest |
| `brain origin EPISODE\|SESSION-URL [--turns A-B]` | Show the conversation an episode or session URL points to |
| `brain connect HOST [--scope user\|project] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent app |
| `brain mcp [--host HOST]` | The stdio MCP server, started by agent apps |
| `brain import PATH --overlay [--phase 0\|1\|2]` or `brain import PATH --into BRAIN` | Adopt or copy existing Markdown |
| `brain viz [BRAIN] [--topic T] [--port P] [--host ADDRESS] [--no-open] [--keep-token] [--export FILE]` | Open the 3D brain map |
| `brain obsidian [BRAIN]` | Open the brain's folder as a vault in Obsidian |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …] [--out DIR] [--compare A B] [-q]` | Run the evaluation bench |

### Brains and agents

- Bare `brain brains` lists the brains you may use, or that `--as HOST` may
  use, with what each holds.
- Brain names use lowercase letters, digits, and hyphens.
- `brain brains rename` also renames the brain in the default, in
  `[hosts.*]`, in harvest routes, and in its commit job.
- `brain brains remove` leaves the folder alone. It drops the name from the
  default, host defaults, host brain limits, and harvest routes, and deletes
  the brain's commit job. A host whose limit listed only this brain keeps an
  empty list, so it sees no brain. `--purge-state` also deletes the brain's
  index and run history on this machine.
- `brain agents grant` and `revoke` take `edit`, `propose_rules`,
  `harvest`, or `read_origin`, for a host id or `default`. Logging episodes
  needs no capability.
  Each change is an undoable run. An unknown host id gets a warning.

### Search and read

- `brain search` options: `--topic T` and `--type T` (repeatable, any
  match), `--tag T` (repeatable, all must match), `--where KEY=VALUE` (any
  frontmatter key; a list matches any item), `--since D` and `--until D`
  (`YYYY-MM-DD`, or `7d`, `4w`, `3m`), `--sort relevance|recent|title`,
  `--limit N` (1 to 50, default 8), `--cursor C`, `--include
  archived,episodes,archived_episodes`, `--no-episodes`, `--count`,
  `--facets`, `--within WHOLE` (only notes that name WHOLE in
  `bw-part_of`), and `--paths`.
- With an empty query, `brain search` browses, newest first:
  `brain search "" --since 7d` lists recent notes. An unknown `--topic` is
  not found (exit 3).
- `brain read --mode outline` shows the summary, headings, links, parts
  (the notes that name it in `bw-part_of`, by title), and backlinks. It is
  the default for topic pages. `--mode raw` prints the file byte
  for byte. `--section H` alone implies `--mode section`.
- `brain neighbors` puts a superseded note's replacement first. `--depth`
  is 1 to 3, `--limit` 1 to 100. `--relation` (repeatable) follows only
  those edges: `brain neighbors "Build Server Setup" --relation depends_on
  --direction in` lists what rests on it.
- `brain links` lists what a note links to as written in its file: body
  links, relation fields such as `bw-depends_on`, and `bw-sources`.
  `brain backlinks` lists what
  links to it from other files.
- `links`, `backlinks`, `tags`, `types`, `orphans`, and `unresolved` take
  `--limit`, `--cursor`, `--count`, and `--paths`. For `tags` and `types`,
  `--paths` prints one name per line.

### Writing

- Episodes come from agents (`brain_log_episode`). To record something
  yourself, edit a note or tell an agent "remember that …".
- `brain rules add` with `--as HOST` saves a proposal instead of a rule.
- `brain mv` on a topic folder also updates the topic's `brain.toml` entry
  and the `AGENTS.md` topic table.
- `brain validate` checks the Markdown files git sees as changed, or every
  note in a brain without git. It exits 1 on problems.
- `brain consolidate --done` takes `EPISODE:PATTERN:NOTE` (pattern
  `record`, `playbook`, `file`, or `distill`) or `"EPISODE:skip:REASON"`,
  repeated for each outcome, checks that each note cites its episode in
  `bw-sources`, and archives the episodes as one undoable run. Agents use
  `brain_consolidate_prepare` and `brain_consolidate_done`.

### Commits and schedules

- `brain commit` exits 1 on a rebase conflict or a rejected push. An agent
  (`--as HOST`) may run it only with `edit`, and never with `--push`.
- `brain schedule` installs one commit job per brain and one consolidate
  job per brain and host, and is refused with `--as`. `--every` values and
  platforms are in [Maintenance](maintenance.md#commit-direct-edits);
  scheduled consolidation in
  [Maintenance](maintenance.md#consolidate-on-a-schedule).

### Lint, runs, and undo

- `brain lint` options: `--fix` (one undoable run; `--dry-run` shows the
  diff), `--profile strict|migrate`, `--select C` and `--ignore C` (codes or
  prefixes such as `BW3,BW405`), `--staged`, `--changed`, and
  `--install-hook`.
- `--fix` also converts format 1 and 2 notes to format 3.
- An unknown code in `--select` or `--ignore` is a usage error, and so is
  `--dry-run` without `--fix`.
- `brain undo` without a run id undoes the latest run on this device.
  `--force` undoes it even if files changed since, and saves their current
  versions first.

### Harvest and origin

- `brain harvest` options: `--from HOST` (repeatable), `--since 30d`,
  `--project P`, and `--status`. It lists sessions and token estimates and
  writes nothing; the agent does the harvest.
- `brain harvest route` sends sessions run in folders matching a pattern to
  a brain.
- `brain origin` takes an episode id or path (in the brain, or absolute),
  or a session URL from a note's `bw-sources`. `--turns A-B` must lie
  within the session.

### Connect, import, viz, and bench

- `brain connect` hosts: `claude-code`, `codex`, `antigravity`, `openclaw`,
  `cursor`, or `generic`. `--scope project` works for `claude-code` and
  `cursor`; each scope is connected and uninstalled on its own.
- `brain import` is a dry run without `--apply`, and `--dry-run` wins over
  `--apply`. With `--into`, `--topic T` puts what is imported under one
  topic. Documents and memory files are imported by asking an agent. See
  [Import](import.md).
- `brain viz` and `brain obsidian` open BRAIN, the only brain, or the one
  you pick. `brain viz --host 0.0.0.0` lets other machines open the map.
  `--port 8792 --keep-token` keeps the same link across restarts; delete
  the token file it names to change it.
  `--export` writes `.html`, `.json`, or `.graphml` and exits.
- `brain bench` runs `retrieval`, `lint`, and `perf` by default. The
  `agent` suite is reserved and reports as skipped. `-q` prints a summary,
  failures, and regressions only.

## Which brain a command uses

A command that needs one brain takes the first of these that is set:

1. `--brain NAME|PATH`.
2. The `BRAIN_WIKI_BRAIN` environment variable.
3. A `.brain-wiki.toml` with `brain = "NAME"` in the current folder or above
   it.
4. The agent app's `brain` in `[hosts.<host>]` of the user config.
5. The default brain.
6. The brain the current folder is inside.

An agent app limited with `brain brains limit` is refused any other brain.

## MCP tools

These are the tools a connected agent can call. A write tool needs the
matching capability in the agent's profile. See
[Privacy and safety](privacy.md#agent-profiles). Agents edit notes with
their own file tools, and `edit` decides whether orientation tells them they
may.

| Tool | Does | Needs |
|---|---|---|
| `brain_list` | The brains this agent may use, and what each holds | — |
| `brain_orient` | The briefing: rules, topics, recent changes, inbox | — |
| `brain_search` | Search, or browse with an empty query and filters | — |
| `brain_read` | Read a note, topic page, or episode | — |
| `brain_neighbors` | Follow a note's links and backlinks | — |
| `brain_validate` | Check the frontmatter of notes the agent changed | — |
| `brain_log_episode` | Record a learning in the inbox | — |
| `brain_propose_rule` | Propose a standing rule for you to confirm | `propose_rules` |
| `brain_consolidate_prepare` | The agent's own pending episodes (others' only when you ask) with candidate notes and guidance | — |
| `brain_consolidate_done` | Archive the consolidated episodes with what came of each | `edit` |
| `brain_read_origin` | Read the conversation behind an episode | `read_origin = true` |
| `brain_harvest_prepare`, `brain_harvest_done` | File this agent's past sessions into notes | `harvest`; done also `edit` |

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Problems found (lint or validation errors, a commit conflict), a path that cannot be read or written, or an ambiguous target (the candidates are printed) |
| 2 | Usage error |
| 3 | Not found, or no brain configured |
| 4 | Conflict: `conflict` (a name or file already there), `stale` (changed since it was read), or `busy` (locked) |
| 5 | Forbidden by a profile |
| 10 | Internal error: one line on stderr, the trace in the log file |

With `--paths`, a listing prints only paths on stdout. When more rows
follow, the `--cursor` hint goes to stderr. `--count` prints the bare
number, followed by the facet lines with `--facets`.

## Files

| Where | What |
|---|---|
| `<brain>/brain.toml` | Settings that travel with the brain: format, layout, topics, agent profiles, lint, search, consolidation, git, reports, budgets |
| `~/.config/brain-wiki/config.toml` | Per machine: registered brains, default brain, per-host settings, harvest |
| `~/.local/state/brain-wiki/` | Run records and pre-images for undo, locks, harvest and connect state, commit-job state (`schedule/`), scheduled consolidation outcomes, logs |
| `~/.cache/brain-wiki/` | The search index, rebuilt when missing |
| `~/.local/share/brain-wiki/plugin/<host>/` | Plugin copies written by `brain connect` |

- The `XDG_CONFIG_HOME`, `XDG_STATE_HOME`, `XDG_CACHE_HOME`, and
  `XDG_DATA_HOME` variables move these folders on Linux and macOS.
- On Windows they live under `%APPDATA%` and `%LOCALAPPDATA%`.
- `BRAIN_WIKI_CONFIG`, `BRAIN_WIKI_STATE_DIR`, `BRAIN_WIKI_CACHE_DIR`, and
  `BRAIN_WIKI_DATA_DIR` override each one.

## Troubleshooting

| Symptom | Try |
|---|---|
| An agent says brain-wiki is not configured | `brain doctor`, then `brain init` or `brain brains add` |
| Search misses a note you just edited | Wait a second (the index checks for changes at most once per second), or `brain index --rebuild` |
| A run was interrupted | `brain doctor` rolls it back |
| A git commit failed after a run | The files changed anyway and stay staged. Fix what git reported, then commit by hand |
| `brain commit` reports a conflict | Run `git pull --rebase` in the brain, resolve, and commit. Later runs commit locally until then |
| Lint reports BW117 | The note is from brain-wiki 0.1. Run `brain lint --fix --dry-run`, then `brain lint --fix` |
