---
id: 01M3250V0076T19Y5KJDAHCH9S
type: design
title: "Command tree"
aliases: ["07 §2.1"]
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
             [--since D] [--until D] [--sort relevance|recent|title] [--cursor C]
             [--include archived,episodes,archived_episodes] [--no-episodes] [--count] [--facets] [--paths]
brain read TARGET [--mode outline|full|section|raw] [--section HEADING]
brain neighbors TARGET [--direction out|in|both] [--depth N] [--limit N] [--paths]

brain topics [TOPIC]                                     # the topic tree with note counts
brain links TARGET | backlinks TARGET                    # what it links to (body links, bw-superseded_by, bw-sources) / what links to it
brain tags [--counts] | types [--counts]
brain orphans | unresolved                               # notes nothing links to; dead links

brain validate [PATH]...                                 # check the frontmatter of edited notes (05 §2.3)
brain commit [--settle 2m] [--no-fetch] [--push] [--dry-run]   # snapshot direct edits into git (05 §5)
brain schedule [list] | add commit [--every 15m] [--push] [--dry-run] | remove commit [--dry-run]

brain log [TEXT | -] [--topic T]... [--claim C]... [--agent HOST] [--inputs local|external|unknown]
brain rules add TEXT [--quote Q] [--replaces RULE] | list | accept ID | reject ID   # `rule` is a hidden alias

brain consolidate --prepare [--topic T] [--max-episodes N] [--out FILE.json]
brain consolidate --done EPISODE...                      # archive the episodes handled (05 §4.4)
brain harvest [--from HOST]... [--since 30d] [--project PATH] [--raw | --distill PRESET] [--apply [--dry-run]]   # list, or harvest
brain harvest --status                                   # per host: enabled, sessions left to harvest
brain harvest enable HOST... | disable HOST... | route PATTERN BRAIN   # user config (05 §2.2)
brain origin EPISODE [--turns A-B]
brain review list | show ID | accept ID | reject ID     # rule proposals
brain runs [list] | show [RUN]
brain undo [RUN] [--force]

brain lint [PATH]... [--fix] [--dry-run] [--profile strict|migrate] [--select CODES] [--ignore CODES] [--staged] [--changed]
brain lint --install-hook
brain report
brain index [--rebuild | --status]
brain mv SRC DST [--dry-run]                             # a note, or a topic folder with its notes

brain import PATH --overlay [--phase 0|1|2] [--dry-run | --apply]   # adopt; ids and status; hubs
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
`brain read TARGET --mode outline` shows a note's summary, headings, links,
and backlinks.

Command details where format 3 changed the surface:

| Command | Behavior |
|---|---|
| `search` | FTS over title, aliases, tags, headings, and body with filters; a superseded hit carries the note that replaced it ([[04-6-search\|04 §6]]). There is no `--intent` and no graph expansion; `neighbors` follows links. |
| `neighbors` | Follows links: `out` is what the note links to, `in` what links to it, up to 3 hops; supersession comes first. There is no relation filter (`--rel` is gone, [[04-92-neighbors\|04 §9.2]]). |
| `links` / `backlinks` | `links`: what a note links to, as written in its file: body links, `bw-superseded_by`, and `bw-sources`. `backlinks`: what links to it, as written in other files. |
| `validate` | Runs the frontmatter rules on the paths given, default the Markdown files git sees as changed (every note without git). Exit 0 valid, 1 otherwise; writes nothing ([[05-23-direct-edits\|05 §2.3]]). |
| `consolidate` | `--prepare` prints the guidance and a packet of pending episodes with candidate notes (`--json`: the packet; `--out`: `{guidance, packet}`); `--done` archives the named episodes as one undoable run and needs `edit`. Exactly one of the two is required ([[05-4-consolidation\|05 §4]]). |
| `commit` | Snapshots changed files into git, then fetches and rebases (and pushes with `--push`); exit 1 on a rebase conflict or a second push rejection ([[05-51-brain-commit\|05 §5.1]]). |
| `schedule` | Installs, removes, or lists the per-brain OS job that runs `brain commit` (crontab on Linux, a LaunchAgent on macOS); bare `brain schedule` lists ([[05-52-brain-schedule\|05 §5.2]]). |
| `review` | Rule proposals only (`r-…` ids, also handled by `brain rules accept\|reject`); `list` shows each proposal's text, quote, and the rule it replaces. |
| `import --overlay` | Phase 0 adopts the folder as a brain (the default), phase 1 normalizes ids and status, phase 2 creates hubs; phases 1 and 2 are runs ([[09-32-phases\|09 §3.2]]). |
