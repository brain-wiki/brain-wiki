# Reference

## Commands

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
| `brain consolidate [--backend agent\|command] [--command PRESET] [--if-pending N] [--dry-run]` | Consolidate |
| `brain consolidate --prepare [--out F]` / `--apply OPS.json --run RUN` | Drive consolidation externally |
| `brain review list \| show RUN \| accept RUN \| reject RUN` | Proposals waiting for review |
| `brain runs [list \| show RUN]`, `brain undo [RUN] [--force]` | Run history and undo |
| `brain lint [PATH…] [--fix] [--select C] [--ignore C] [--staged] [--changed] [--install-hook]` | Check the format |
| `brain report` | Regenerate `reports/` |
| `brain mv SRC DST [--dry-run]` | Move a note and rewrite links |
| `brain harvest [--from HOST] [--since 30d] [--project P] [--raw \| --distill PRESET] [--apply] [--status]` | Harvest sessions |
| `brain origin EPISODE [--turns A-B]` | Show an episode's original conversation |
| `brain connect HOST [--scope user\|project] [--briefing-hook] [--capture] [--print] [--force] [--dry-run] [--uninstall]` | Connect an agent |
| `brain schedule list \| show R --for HOST \| install R (--for openclaw \| --via cron\|launchd\|systemd) [--at HH:MM] [--apply] \| remove R` | Routines |
| `brain import PATH (--overlay [--phase N] \| --into BRAIN \| --to-episodes) [--apply]`, `brain import --from HOST` | Import |
| `brain viz [--topic T] [--export FILE.html\|.json\|.graphml]` | The brain map |
| `brain bench [SUITE…] [--sizes 1k,10k] [--backends …]` | Evaluation bench |
| `brain hook HOST EVENT`, `brain mcp [--host HOST]` | Used by agent hosts |

Exit codes: 0 success; 1 problems found (lint errors, invalid ops); 2 usage;
3 not found; 4 conflict (stale, lock); 5 forbidden by a profile.

## Files

| Where | What |
|---|---|
| `<brain>/brain.toml` | Settings that travel with the brain: privacy, topics, agent profiles, lint, consolidation, budgets |
| `~/.config/brain-wiki/config.toml` | Per machine: registered brains, default brain, per-host brain choice, capture, harvest, recall |
| `~/.local/state/brain-wiki/` | Run records and pre-images (undo), locks, session and harvest state, connect records, logs |
| `~/.cache/brain-wiki/` | The search index (rebuilt automatically when missing) |
| `~/.local/share/brain-wiki/plugin/<host>/` | Plugin copies written by `brain connect` |

On Windows these live under `%APPDATA%` and `%LOCALAPPDATA%`. Override any
of them with `BRAIN_WIKI_CONFIG`, `BRAIN_WIKI_STATE_DIR`,
`BRAIN_WIKI_CACHE_DIR`, and `BRAIN_WIKI_DATA_DIR`.

## Troubleshooting

| Symptom | Try |
|---|---|
| An agent says brain-wiki is not configured | `brain doctor`; then `brain init` or `brain brains add` |
| Search misses a note you just edited | Wait a second (freshness checks run at most once per second), or `brain index --rebuild` |
| A run was interrupted | `brain doctor` rolls it back |
| A git commit failed after a run | The files changed anyway; `brain doctor` lists the run; commit by hand |
| Hooks do nothing | Capture and recall are off by default; check `config.toml`, then `brain connect HOST --capture` |
