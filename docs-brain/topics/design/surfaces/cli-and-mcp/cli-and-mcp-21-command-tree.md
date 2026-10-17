---
id: 01M3250V00C03NHW36XDSV0CP6
type: design
title: "Command tree"
aliases: ["CLI and MCP §2.1"]
source: "docs/design/cli-and-mcp.md#21-command-tree"
---
# Command tree

```
brain init [PATH] [--name NAME] [--git] [--no-register]
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
             [--include archived,episodes,archived_episodes] [--no-episodes] [--count] [--facets] [--paths]
brain read TARGET [--mode outline|full|section|raw] [--section HEADING]
brain neighbors TARGET [--direction out|in|both] [--depth N] [--limit N] [--paths]

brain topics [TOPIC]                                   # the topic tree with note counts
brain links TARGET | backlinks TARGET                  # paged: --limit, --cursor, --count, --paths
brain tags [--counts] | types [--counts]
brain orphans | unresolved                             # notes nothing links to; links to no note

brain validate [PATH]...                               # check the frontmatter of edited notes
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run]
brain schedule [list] | add commit [--every 15m] [--push] [--dry-run] | remove commit [--dry-run]

brain rules add TEXT [--quote Q] [--replaces RULE] | list | accept ID | reject ID

brain consolidate --prepare [--topic T] [--max-episodes N] [--agent HOST]... [--unowned] [--all] [--out FILE.json]
brain consolidate --done EPISODE[:PATTERN:NOTE | :skip:REASON]...
brain harvest [--from HOST]... [--since 30d] [--project PATH] [--raw | --distill PRESET] [--apply [--dry-run]]
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

brain viz [BRAIN] [--topic T]... [--port P] [--host ADDRESS] [--no-open] [--export FILE.html|.json|.graphml]
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

`search` does not follow links, and `neighbors` has no relation filter.
`consolidate` needs exactly one of `--prepare` and `--done`; with
`--prepare`, `--json` prints the packet and `--out` writes
`{guidance, packet}`. `--agent`, `--unowned`, `--all`, and `--out` go only
with `--prepare`.
