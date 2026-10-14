---
id: 01M3250V0076T19Y5KJDAHCH9S
type: design
title: "Command tree"
aliases: ["07 §2.1"]
tags: [interfaces]
source: "docs/design/07-interfaces.md#21-command-tree"
bw-part_of:
  - "[[07-2-cli]]"
---
# Command tree

```
brain init [PATH] [--name NAME] [--git] [--no-register]
brain brains [list | add NAME PATH | remove NAME [--purge-state] | rename OLD NEW | default NAME]
brain doctor [--json]
brain setup                                              # interactive onboarding wizard (15 §3)

brain list                                               # brains this host may use (04 §9.1)
brain orient
brain search [QUERY] [--limit N] [--topic T]... [--type T]... [--tag T]... [--where KEY=VALUE]...
             [--since D] [--until D] [--sort relevance|recent|title] [--cursor C] [--intent I]
             [--include archived,episodes,archived_episodes] [--no-episodes] [--count] [--facets] [--paths]
brain read TARGET [--mode outline|full|section|raw] [--section HEADING]
brain neighbors TARGET [--rel R]... [--direction out|in|both] [--depth N] [--limit N]

brain topics [TOPIC]                                     # the topic tree with note counts
brain notes [--topic T] [--type T] [--tag T] [--sort recent|title] [--facets]  # browse
brain outline TARGET                                     # headings
brain links TARGET | backlinks TARGET                    # one hop out / in
brain tags [--counts] | types [--counts] | recent [--since D]
brain orphans | unresolved                               # notes nothing links to; dead links

brain check [PATH]... [--adopt] [--allow-shrink]         # validate and record direct edits (05 §2.3)
brain restore PATH                                       # put back the last recorded version

brain log [TEXT | -] [--topic T]... [--claim C]... [--agent HOST] [--taint true|false|unknown]
brain rule add TEXT [--quote Q] [--replaces RULE] | list | accept ID | reject ID

brain consolidate --prepare [--topic T] [--max-episodes N] [--out PACKET.json]
brain consolidate --apply OPS.json --run RUN [--dry-run]
brain harvest [--from HOST]... [--since 30d] [--project PATH] [--raw | --distill PRESET] [--dry-run | --apply]
brain harvest --status                                   # per host: enabled, sessions left to harvest
brain origin EPISODE [--turns A-B]
brain review list | show RUN | accept RUN | reject RUN
brain runs list | show RUN
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

brain viz [--topic T]... [--port P] [--no-open] [--export FILE.html]
brain bench [SUITE]... [--backends PRESET,...] [--sizes 1k,10k] [--out DIR]
brain bench --compare A.json B.json
brain version
```

Global options: `--brain NAME|PATH`, `--as HOST`, `--json`, `-q` (quieter `brain bench`).
