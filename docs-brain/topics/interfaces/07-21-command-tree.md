---
id: 01M3250V0076T19Y5KJDAHCH9S
type: design
title: "Command tree"
aliases: ["07 §2.1"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#21-command-tree"
---
# Command tree

```
brain init [PATH] [--name NAME] [--git] [--no-register]
brain brains [list]                                      # brains you (or --as HOST) may use (04 §9.1)
brain brains add NAME PATH | remove NAME [--purge-state] | rename OLD NEW | default NAME
brain brains limit HOST BRAIN... | unlimit HOST          # which brains an agent app may use
brain agents [list]                                      # profiles (§1)
brain agents grant HOST CAP... [--dry-run] | revoke HOST CAP... [--dry-run]
brain doctor [--json]
brain setup [--guide]                                    # onboarding wizard; --guide: the steps for an agent (15 §3)

brain orient
brain search [QUERY] [--limit N] [--topic T]... [--type T]... [--tag T]... [--where KEY=VALUE]...
             [--since D] [--until D] [--sort relevance|recent|title] [--cursor C] [--intent I]
             [--include archived,episodes,archived_episodes] [--no-episodes] [--count] [--facets] [--paths]
brain read TARGET [--mode outline|full|section|raw] [--section HEADING]
brain neighbors TARGET [--rel R]... [--direction out|in|both] [--depth N] [--limit N]

brain topics [TOPIC]                                     # the topic tree with note counts
brain links TARGET | backlinks TARGET                    # links as written: in its file / in others
brain tags [--counts] | types [--counts]
brain orphans | unresolved                               # notes nothing links to; dead links

brain check [PATH]... [--adopt] [--allow-shrink]         # validate and record direct edits (05 §2.3)
brain restore PATH                                       # put back the last recorded version

brain log [TEXT | -] [--topic T]... [--claim C]... [--agent HOST] [--inputs local|external|unknown]
brain rules add TEXT [--quote Q] [--replaces RULE] | list | accept ID | reject ID   # `rule` is a hidden alias

brain consolidate --prepare [--topic T] [--max-episodes N] [--out PACKET.json]
brain consolidate --apply OPS.json --run RUN [--dry-run]
brain harvest [--from HOST]... [--since 30d] [--project PATH] [--raw | --distill PRESET] [--apply [--dry-run]]   # list, or harvest
brain harvest --status                                   # per host: enabled, sessions left to harvest
brain harvest enable HOST... | disable HOST... | route PATTERN BRAIN   # user config (05 §2.2)
brain origin EPISODE [--turns A-B]
brain review list | show ID | accept ID | reject ID     # consolidation, edit, and rule proposals
brain runs [list] | show [RUN]
brain undo [RUN] [--force]

brain lint [PATH]... [--fix] [--dry-run] [--profile strict|migrate] [--select CODES] [--ignore CODES] [--staged] [--changed]
brain lint --install-hook
brain report
brain index [--rebuild | --status]
brain mv SRC DST [--dry-run]                             # a note, or a topic folder with its notes

brain import PATH --overlay [--phase N] [--dry-run | --apply]
brain import PATH --into BRAIN [--topic SLUG] [--dry-run | --apply]
brain import PATH --to-episodes [--untrusted] [--agent HOST] [--dry-run | --apply]
brain import [PATH] --from HOST [--dry-run | --apply]     # a host's memory files; PATH overrides where they are

brain connect HOST [--brain NAME] [--scope user|project] [--print] [--force] [--dry-run] [--uninstall]
brain mcp [--host HOST]                                   # stdio MCP server

brain viz [BRAIN] [--topic T]... [--port P] [--host ADDRESS] [--no-open] [--export FILE.html|.json|.graphml]
brain obsidian [BRAIN]                                   # open the brain's folder as a vault in Obsidian (12 §11)
brain bench [SUITE]... [--backends PRESET,...] [--sizes 1k,10k] [--out DIR] [-q]
brain bench --compare A.json B.json
```

Global options: `--brain NAME|PATH`, `--as HOST`, and `--json`, accepted
before the command and after it; the one nearer the command wins. `brain
--version` prints `brain-wiki X`. Every command and subcommand has
its own `--help` (`-h`).

Browsing has no commands of its own beyond the link and tag listings:
`brain search ""` with filters lists notes (`brain search "" --since 7d` for
recent ones; browsing sorts by `recent` unless `--sort` says otherwise), and
`brain read TARGET --mode outline` shows a note's headings and claims.

`brain review` is the one queue of proposals awaiting the user: consolidation
and edit proposals (`run-…` ids) and rule proposals (`r-…` ids, also handled
by `brain rules accept|reject`). `review list` marks each with its kind
(`consolidation`, `edit`, or `rule`); rule proposals show their text, quote,
and the rule they replace.
