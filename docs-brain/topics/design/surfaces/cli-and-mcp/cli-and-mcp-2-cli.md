---
id: 01M3250V00N33JXYHQDF9158MQ
type: design
title: "CLI"
aliases: ["CLI and MCP §2"]
source: "docs/design/cli-and-mcp.md#2-cli"
---
# CLI

### 2.1 Command tree

```
brain init [PATH] [--name NAME] [--template NAME|PATH] [--git] [--no-register]
brain templates                                        # built-in templates for init --template
brain brains [list]                                    # brains you (or --as HOST) may use
brain brains add NAME PATH | remove NAME [--purge-state] | rename OLD NEW | default NAME
brain brains limit HOST BRAIN... | unlimit HOST        # which brains an agent app may use
brain agents [list]                                    # profiles (§1)
brain agents grant HOST CAP... [--dry-run] | revoke HOST CAP... [--dry-run]
brain doctor                                           # problems and fixes; --json for agents
brain setup [--guide]                                  # terminal wizard; --guide prints the steps for an agent

brain orient
brain search [QUERY] [--limit N] [--topic T]... [--type T]... [--tag T]... [--where KEY=VALUE]...
             [--since D] [--until D] [--sort relevance|recent|title] [--cursor C]
             [--include archived,episodes,archived_episodes] [--no-episodes] [--count] [--facets]
             [--within WHOLE] [--paths]
brain read TARGET [--mode outline|full|section|raw] [--section HEADING]
brain neighbors TARGET [--direction out|in|both] [--depth N] [--limit N] [--relation REL]... [--paths]

brain topics [TOPIC]                                   # the topic tree with note counts
brain links TARGET | backlinks TARGET                  # paged: --limit, --cursor, --count, --paths
brain tags [--counts] | types [--counts]
brain orphans | unresolved                             # notes nothing links to; links to no note

brain validate [PATH]...                               # check the frontmatter of edited notes
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run]
brain schedule [list] | add commit [--every 15m] [--push] [--dry-run] | remove commit [--dry-run]
brain schedule add consolidate --host HOST [--at 21:30] [--harvest] [--include AGENT|unowned]... [--dry-run]
brain schedule remove consolidate --host HOST [--dry-run]

brain rules add TEXT [--quote Q] [--replaces RULE] | list | accept ID | reject ID

brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST]... [--unowned] [--all] [--out FILE.json]
brain consolidate --done EPISODE[:PATTERN:NOTE | :skip:REASON]...
brain consolidate --run --host HOST [--harvest] [--include AGENT|unowned]... [--dry-run]
brain harvest [--from HOST]... [--since 30d] [--project PATH]      # list the sessions waiting
brain harvest --status                                 # per host: on or off, sessions left
brain harvest enable HOST... | disable HOST... | route PATTERN BRAIN
brain origin EPISODE [--turns A-B]
brain review list | show ID | accept ID | reject ID     # rule proposals
brain runs [list] | show [RUN]
brain undo [RUN] [--force]

brain lint [PATH]... [--fix [--dry-run]] [--profile strict|migrate] [--select CODES] [--ignore CODES] [--staged] [--changed]
brain lint --install-hook
brain report
brain index [--rebuild | --status]
brain mv SRC DST [--dry-run]                           # a note, or a topic folder with its notes

brain import PATH --overlay [--phase 0|1|2] [--dry-run | --apply]
brain import PATH --into BRAIN [--topic SLUG] [--dry-run | --apply]

brain connect HOST [--scope user|project] [--print] [--force] [--dry-run] [--uninstall]
brain mcp [--host HOST]                                # stdio MCP server; --host defaults to auto

brain viz [BRAIN] [--topic T]... [--port P] [--host ADDRESS] [--no-open] [--keep-token] [--export FILE.html|.json|.graphml]
brain obsidian [BRAIN]                                 # open the brain's folder as a vault in Obsidian
brain bench [SUITE]... [--backends PRESET,...] [--sizes 1k,10k] [--out DIR] [-q]
brain bench --compare A.json B.json
```

`brain rule` is a hidden alias of `brain rules`.

Global options are `--brain NAME|PATH`, `--as HOST`, and `--json`. They
are accepted before the command and after it, and the one nearest the
command wins (`brain --brain a search x --brain b` uses `b`). `brain --version`
prints `brain-wiki X`. Every command and subcommand has its own `--help`
(`-h`).

Browsing has no commands of its own beyond the link and tag listings.
`brain search ""` with filters lists notes, sorted by `recent` unless
`--sort` says otherwise (`brain search "" --since 7d` for recent notes).
`brain read TARGET --mode outline` shows a note's summary, headings, links,
and backlinks.

Where each command is specified:

| Commands | Document |
|---|---|
| `init`, `brains` | [[config-and-storage\|config and storage]] |
| `agents` | §1 |
| `search`, `read`, `neighbors`, `orient`, `topics`, links and tags | [[index-and-search\|index and search]] |
| `validate`, `harvest`, `origin`, `consolidate`, `rules`, `review`, `mv`, `runs`, `undo` | [[write-path\|write path]] |
| `commit`, `schedule` | [[write-path-5-committing-direct-edits\|write path §5]] |
| `lint`, `report` | [[lint-and-reports\|lint and reports]] |
| `import` | [[import\|import]] |
| `connect`, `mcp` | [[agent-integrations\|agent integrations]], §3 |
| `doctor`, `setup` | [[skills-and-onboarding\|skills and onboarding]] |

`search` does not follow links; `--within` limits it to the parts of a
whole, and `neighbors --relation` to some kinds of edge.
`consolidate` needs exactly one of `--prepare` and `--done`; with
`--prepare`, `--json` prints the packet and `--out` writes
`{guidance, packet}`. `--agent`, `--unowned`, `--all`, and `--out` go only
with `--prepare`; `--host`, `--harvest`, `--include`, and `--dry-run` only
with `--run`.


### 2.2 Conventions

- Output is human-readable by default. `--json` prints a stable,
  documented shape, the same as the MCP structured results.
- Commands that change many files, or files outside the brain, take
  `--dry-run` and print what they would change: `lint --fix`, `mv`,
  `agents grant|revoke`, `import`, `connect`, `commit`, and
  `schedule add|remove`. `import` defaults to a dry run and writes only
  with `--apply`.
- Single-step writes have no `--dry-run`: `rules`, `consolidate --done`,
  `review accept|reject`, and `undo`. All of them are runs that
  `brain undo` reverses.
- Printed paths are brain-relative. `--json` also includes absolute paths.
- Targets follow the Obsidian CLI convention. A title, alias, or file name
  resolves like a wikilink, and an exact path or id resolves exactly.
  Results always print the exact path, which is the handle for the next
  command.
- Listing commands share `--count` (print only the total), `--paths` (one
  path per line, for piping into file tools), `--limit`, and `--cursor`.
  `search` also takes `--facets` (counts by type, topic, and tag).
- `brain init --git` runs `git init` and commits the new files.
- `brain init --template` starts the brain with a template's topic pages
  and topic rules ([[config-and-storage-5-brain-lifecycle|config and storage §5.1]]).
  Its JSON adds `template` and `files`, the paths it copied.
- `init` and `brains add` refuse a name or folder already registered to
  another brain, so a typo never points a name at a different brain. A
  moved brain may take its name along
  ([[config-and-storage-5-brain-lifecycle|config and storage §5]]).
- `--topic T`, and the MCP `topic` filter, include T's sub-topics
  ([[brain-format-2-directory-layout|brain format §2]]).
- `brain mcp` writes only protocol messages to stdout. Diagnostics go to
  stderr and to `<state>/logs/brain-wiki.log`.


### 2.3 Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | The command ran and found problems, or could not finish (see below) |
| 2 | Usage error |
| 3 | Not found: `not_found`, `not_configured`, `not_available` |
| 4 | Conflict: `conflict`, `stale`, `expired`, `busy` |
| 5 | Forbidden by the profile or host limits |
| 10 | Internal error (a bug) |
| 130 | Interrupted (Ctrl-C, or Ctrl-D at a prompt) |
| 141 | The reader of stdout went away (`brain topics \| head`); nothing is printed |

Exit 1 covers lint or validate errors, a change a run's lint gate refused
(`invalid_ops`), a rebase conflict in `brain commit`, `ambiguous`,
`budget_exceeded`, `unsupported_host`, `format`, and `os_error` (a path
that could not be read or written).

Exit 2 covers an unknown command or option, a bad value, and a flag the
command would ignore. A parse error prints the command's usage line, then
`brain <command>: error: <message>`. `brain` alone prints the help.

Other errors print one line to stderr, `<code>: <message>`, with the codes
of §3.6. An internal error prints
`internal: unexpected error; details are in <log>` and writes the trace to
`<state>/logs/brain-wiki.log`.


### 2.4 Parser and startup cost

The CLI is built on Typer ([[d31-typer-cli|D31]]). Typer
gives nested subcommands with their own arguments and help
(`brain rules add --help`), validation from type annotations, and shell
completion (`brain --install-completion`). Help is plain text: rich markup
is off, so rich, which Typer installs, is never imported.

Typer only parses. Each command returns the handler to run and the
arguments it reads, and `main` runs the handler, so exit codes and error
lines (§2.3) do not depend on Typer.

Handler modules are imported only for the command that runs:

- Only `brain mcp` imports the MCP SDK.
- Only `brain viz` and `brain bench` load the visualizer and the bench.
- Help imports none of them. A test checks that `brain --help`,
  `brain validate --help`, and `brain rules add --help` import neither the
  engine, the MCP SDK, the visualizer, the bench, nor rich.

Typer costs startup time for importing it (it vendors Click) and building
the command tree from annotations. Measured on a Linux workstation, Python
3.12, best of 7, on the example brain:

| Command | argparse | Typer |
|---|---|---|
| `brain --help` | 52 ms | 103 ms |
| `brain search x` | 124 ms | 166 ms |

The cost is accepted. No command runs on every agent turn, since there are
no host lifecycle hooks ([[d25-static-instructions|D25]]), and
50 ms is small next to an agent's turn. `cli/_main.py` keeps real
annotations (no `from __future__ import annotations`), which halves the
time Typer spends reading them.
