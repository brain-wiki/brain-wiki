---
id: 01M3250V001WJVG4NQR5SMTCS1
type: guide
title: "Commands"
tags: [user-guide]
source: "docs/user/reference.md#commands"
bw-part_of:
  - "[[user-reference]]"
---
# Commands

Global options: `--brain NAME|PATH`, `--as HOST` (act with that host's
profile), `--json`, `-q`, `-v`. `brain <command> --help` lists each
command's options.

| Command | Does |
|---|---|
| `brain init [PATH] [--name N] [--git]` | Create a brain and register it |
| `brain brains [list \| add NAME PATH \| remove NAME \| rename OLD NEW \| default NAME]` | Manage registered brains |
| `brain doctor` | Check configuration, brains, SQLite, and agents |
| `brain setup` | Interactive onboarding |
| `brain list` | Brains you (or `--as HOST`) may use, with what each holds |
| `brain orient` | The briefing, as agents see it |
| `brain search [QUERY] [--topic T] [--type T] [--tag T] [--where K=V] [--since D] [--until D] [--sort relevance\|recent\|title] [--intent …] [--count] [--facets] [--paths] [--limit N] [--cursor C]` | Search, or browse with an empty query |
| `brain read TARGET [--mode outline\|full\|section\|raw] [--section H]` | Read a note, hub, or episode |
| `brain neighbors TARGET [--rel R] [--direction out\|in\|both] [--depth N] [--limit N]` | Follow a note's relations |
| `brain notes`, `outline`, `links`, `backlinks`, `tags`, `types`, `recent`, `orphans`, `unresolved` | Quick browsing; listings take `--count`, `--paths`, `--limit`, `--cursor` |
| `brain check [PATH…] [--adopt] [--allow-shrink]` | Validate and record direct edits; no paths lists pending edits |
| `brain restore PATH` | Put a note back to its last recorded version |
| `brain index [--rebuild \| --status]` | Inspect or rebuild the index |
| `brain log [TEXT \| -] [--topic T] [--claim C] [--agent HOST] [--taint …]` | Write an episode |
| `brain rule add TEXT [--quote Q] [--replaces ID] \| list \| accept ID \| reject ID` | Rules |
| `brain consolidate --prepare [--topic T] [--out FILE]`, `--apply OPS.json --run RUN [--dry-run]` | Drive consolidation yourself (agents use `brain_consolidate_*`) |
| `brain consolidate --prepare [--out F]` / `--apply OPS.json --run RUN` | Drive consolidation externally |
| `brain review list \| show RUN \| accept RUN \| reject RUN` | Proposals waiting for review |
| `brain runs [list \| show RUN]`, `brain undo [RUN] [--force]` | Run history and undo |
| `brain lint [PATH…] [--fix] [--select C] [--ignore C] [--staged] [--changed] [--install-hook]` | Check the format |
| `brain report` | Regenerate `reports/` |
| `brain mv SRC DST [--dry-run]` | Move a note and rewrite links |
| `brain harvest [--from HOST] [--since 30d] [--project P] [--raw \| --distill PRESET] [--apply] [--status]` | Harvest sessions |
| `brain origin EPISODE [--turns A-B]` | Show an episode's original conversation |
| `brain connect HOST [--scope user\|project] [--briefing-hook] [--capture] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent |
| `brain import PATH (--overlay [--phase N] \| --into BRAIN \| --to-episodes) [--apply]`, `brain import --from HOST` | Import |
| `brain viz [--topic T] [--export FILE.html\|.json\|.graphml]` | The brain map |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …]` | Evaluation bench |
| `brain hook HOST EVENT`, `brain mcp [--host HOST]` | Used by agent hosts |

Exit codes: 0 success; 1 problems found (lint errors, invalid ops) or a path
that cannot be read or written; 2 usage; 3 not found; 4 conflict (stale,
lock); 5 forbidden by a profile.
