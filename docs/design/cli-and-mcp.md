# CLI and MCP

Three interfaces reach the same engine. The tool schemas in §3.4 are
normative: the server MUST accept these arguments, and MUST reject a
top-level argument the schema does not declare.

| Interface | Used by | Acts as |
|---|---|---|
| CLI `brain` (alias `brain-wiki`) | The user, scripts | The owner, or a host with `--as HOST` |
| MCP server `brain mcp` (stdio) | Agent hosts | The host given by `--host`, or detected |
| Files ([brain format](brain-format.md)) | Any agent or editor | Anyone; checked by [lint](lint-and-reports.md) |

## 1. Agent profiles

A profile decides what one host may do in one brain. Profiles live in
`brain.toml`, so they travel with the brain
([brain format §3](brain-format.md#3-braintoml)). Every host that may use a
brain can read all of it. Privacy inside a brain is a
[proposal](../proposal/privacy.md).

```toml
[agents.default]                 # any host without its own table
write = ["edit"]

[agents.claude-code]
write = ["edit", "propose_rules", "harvest"]
read_origin = true
```

| Field | Meaning | Default |
|---|---|---|
| `write` | The capabilities below | `["edit"]` |
| `read_origin` | May read the conversation behind an episode ([write path §4.6](write-path.md#46-origin-context)) | `false` |

| Capability | Allows |
|---|---|
| `edit` | Editing notes directly ([write path §2.3](write-path.md#23-direct-edits)), and the writers that change notes or the inbox: `mv`, `lint --fix`, `consolidate --done`, and `commit` under `--as` |
| `propose_rules` | Proposing rules for the user to confirm |
| `harvest` | The in-agent harvest (`brain_harvest_prepare`; `brain_harvest_done` also needs `edit`) |

Capturing an episode needs no capability: every connected host may log
one. An older `brain.toml` that lists `episodes` still loads, and the
entry is ignored.

Profiles are not a security boundary. An agent with file tools can edit
`brain.toml` itself; git history and lint are the backstop. Profiles say
what a host is expected to do, decide what orientation teaches it, and
limit brain-wiki's own commands.

`read_origin` is off by default because a transcript holds much more than
the episodes kept from it. The owner profile has every capability and
`read_origin`.

For host H, brain-wiki uses `[agents.H]` if it exists, else
`[agents.default]`, else the built-in default. The MCP server takes H from
`--host`; the CLI acts as the owner unless `--as H` is given. `--as` lets
the user check what a host may do.

`brain agents grant|revoke HOST CAPABILITY...` changes a profile as one
undoable `config` run that keeps the file's comments:

- `read_origin` is granted and revoked like a capability. An unknown
  capability is a usage error.
- A host without a table gets one that starts from what it may do now.
- An unknown host id with no table yet gets a typo warning, and the change
  is still made.
- A change to the default profile's `edit` also rewrites the brain's
  `AGENTS.md` block, which tells file-reading agents whether they may edit.
- The 0.1 capabilities `consolidate` and `review` still load and are
  ignored. The next grant or revoke for that host drops them.

A refusal names the command that allows the action for that host alone,
for example `brain agents grant claude-code edit`.

Under `--as HOST`, a CLI write does what the host could do through MCP, or
is refused:

| Command | Under `--as HOST` |
|---|---|
| `rules add` | Needs `propose_rules`. Saved as a proposal for `brain rules accept` (or `brain review accept`). |
| `mv`, `lint --fix`, `consolidate --done` | Need `edit`. Their `--dry-run` previews need nothing. |
| `commit` | Needs `edit`, also with `--dry-run`. The commit trailer names the host. `--push` is refused. |
| `origin` | Needs `read_origin`. |
| `validate`, `consolidate --prepare`, reads | Need nothing. |
| `rules accept`/`reject`, `review accept`/`reject`, `agents grant`/`revoke`, `schedule add`/`remove`, `consolidate --run`, `undo` | Refused. These are the user's decisions. |
| `import`, `harvest` | Not checked: they run with the owner's rights. `harvest` only lists sessions. |

No capability lets an agent undo runs, because it could undo the user's
own work.

The write functions `move_note`, the `lint` fixer, `consolidate.done`,
`accept_rule`, `reject_rule`, and `profile_run` check the profile
themselves, so a new interface inherits those checks. The other checks
live in the MCP tools and CLI handlers. Which brains a host may use is set
in the user config
([config and storage §3](config-and-storage.md#3-choosing-a-brain)).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can
change. They do not stop a malicious program running as the user, which
can read and write the files anyway
([security](security-and-privacy.md)).

## 2. CLI

### 2.1 Command tree

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
| `init`, `brains` | [config and storage](config-and-storage.md) |
| `agents` | §1 |
| `search`, `read`, `neighbors`, `orient`, `topics`, links and tags | [index and search](index-and-search.md) |
| `validate`, `harvest`, `origin`, `consolidate`, `rules`, `review`, `mv`, `runs`, `undo` | [write path](write-path.md) |
| `commit`, `schedule` | [write path §5](write-path.md#5-committing-direct-edits) |
| `lint`, `report` | [lint and reports](lint-and-reports.md) |
| `import` | [import](import.md) |
| `connect`, `mcp` | [agent integrations](agent-integrations.md), §3 |
| `doctor`, `setup` | [skills and onboarding](skills-and-onboarding.md) |

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
- `init` and `brains add` refuse a name or folder already registered to
  another brain, so a typo never points a name at a different brain. A
  moved brain may take its name along
  ([config and storage §5](config-and-storage.md#5-brain-lifecycle)).
- `--topic T`, and the MCP `topic` filter, include T's sub-topics
  ([brain format §2](brain-format.md#2-directory-layout)).
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

The CLI is built on Typer ([D31](../decision/d31-typer-cli.md)). Typer
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
no host lifecycle hooks ([D25](../decision/d25-static-instructions.md)), and
50 ms is small next to an agent's turn. `cli/_main.py` keeps real
annotations (no `from __future__ import annotations`), which halves the
time Typer spends reading them.

## 3. MCP server

### 3.1 Protocol target

- Python SDK `mcp` 2.x (`mcp>=2.3,<3`), the high-level `MCPServer` API,
  stdio transport.
- The server serves clients on the current stateless revision (2026-07-28)
  and clients still on the 2025-11-25 handshake, which is most hosts today.
- The server keeps no per-connection state. State that spans calls (a
  harvest run) is a handle the server mints and the agent passes back as a
  tool argument, as the current revision expects.
- The server does not rely on sampling, roots, server-to-client requests,
  or logging notifications, all deprecated in the current revision.
  Rule confirmation uses elicitation when the client offers it (§3.4).
- `tools/list` and `prompts/list` return items in a fixed order with a
  public cache hint of one hour, which helps client caches and prompt
  caching.

### 3.2 Naming and size limits

- The server key is `brain-wiki` in every host config. Every host accepts
  a lowercase name with a hyphen, and it keeps underscores free to
  separate server and tool names.
- Tool names are lowercase snake case with a `brain_` prefix, at most 26
  characters. Every host's prefixed form (`mcp__brain-wiki__brain_search`,
  `mcp__plugin_brain-wiki_brain-wiki__brain_search`,
  `brain-wiki__brain_search`) stays under the 64-character limit some model
  APIs impose.
- Tool descriptions put the essential sentence first and stay under 1,000
  characters. Server instructions stay under 2,000. One host truncates both
  at 2,048.
- Results stay under 20k tokens by default; one host's default cap is 25k.
  Larger content is paged or summarized with a pointer to `brain_read`.
- The two packet tools, `brain_consolidate_prepare` and
  `brain_harvest_prepare`, set `_meta["anthropic/maxResultSizeChars"]` to
  100,000. Their packets are budgeted at about 15k tokens.

### 3.3 Server instructions

The server sends the static instruction block
([agent integrations §3.2](agent-integrations.md#32-the-static-instruction-block))
without its skill pointer, so clients without an instruction file follow
the same policy.

- The edit sentence follows the host's profile, as in the block. The
  server picks it when it starts, for the host it detects then.
- Codex gets the policy only this way and weighs the first 512 characters
  most, so the first bullet ends within them
  ([Codex](hosts/codex.md#1-instructions-come-from-the-mcp-server)).

### 3.4 Tools

Every tool except `brain_list` takes an optional `brain` argument: a brain
this host may use, or its default when omitted. `brain_harvest_done`
refuses a run prepared for another brain. Unknown top-level
arguments are rejected with an error that names them. Every tool returns
structured content and a text rendering.

All tools are closed-world. "Read-only" below means read-only, not
destructive, and idempotent.

| Tool | Annotations | Purpose |
|---|---|---|
| `brain_list` | read-only | Brains this host may use ([index and search §9.1](index-and-search.md#91-brain-list)) |
| `brain_orient` | read-only | One brain's briefing ([index and search §8](index-and-search.md#8-orientation-the-briefing)) |
| `brain_search` | read-only | Search or browse with filters and supersession guards ([index and search §6](index-and-search.md#6-search)) |
| `brain_read` | read-only | A note, topic page, or episode, with handles on every link and backlink ([index and search §7](index-and-search.md#7-read)) |
| `brain_neighbors` | read-only | Follow a note's links in either direction ([index and search §9.2](index-and-search.md#92-neighbors)) |
| `brain_validate` | read-only | Check the frontmatter of notes the agent created or edited ([write path §2.3](write-path.md#23-direct-edits)) |
| `brain_log_episode` | writes, idempotent with `dedupe_key` | Write an episode ([write path §2.1](write-path.md#21-ways-an-episode-is-written)) |
| `brain_propose_rule` | destructive, not idempotent, needs user interaction | Add or replace a rule after the user confirms ([write path §6](write-path.md#6-rules)) |
| `brain_consolidate_prepare` | read-only | Pending episodes with candidate notes, and the guidance ([write path §4.3](write-path.md#43-selecting-and-packaging-work)) |
| `brain_consolidate_done` | writes, not idempotent | Archive the handled episodes as one run ([write path §4.4](write-path.md#44-archiving-handled-episodes)) |
| `brain_read_origin` | read-only | A bounded window of the conversation an episode came from ([write path §4.6](write-path.md#46-origin-context)) |
| `brain_harvest_prepare` | writes, not idempotent | Start a harvest of the calling host's sessions ([write path §2.2](write-path.md#22-harvesting-sessions)) |
| `brain_harvest_done` | writes, idempotent per run | Check each session's outcome and advance the watermarks of those whose notes cite them |

"Writes" means not read-only and not destructive. `brain_propose_rule`
carries `_meta["anthropic/requiresUserInteraction"] = true`.

Capabilities each tool needs:

| Tool | Needs |
|---|---|
| `brain_propose_rule` | `propose_rules` |
| `brain_consolidate_done` | `edit` |
| `brain_read_origin` | `read_origin` |
| `brain_harvest_prepare` | `harvest`, and harvest turned on for the host in the user config |
| `brain_harvest_done` | `edit`, and harvest still turned on for the host |
| Others | Nothing |

Input schemas (JSON Schema 2020-12; output shapes are in
[index and search](index-and-search.md) and [write path](write-path.md)):

```json
{
  "brain_list": {"type": "object", "additionalProperties": false, "properties": {}},

  "brain_orient": {"type": "object", "additionalProperties": false,
    "properties": {"brain": {"type": "string"}}},

  "brain_search": {"type": "object", "additionalProperties": false,
    "properties": {
      "query":  {"type": "string", "maxLength": 500, "default": "",
                 "description": "Keywords; empty to browse within the filters."},
      "limit":  {"type": "integer", "minimum": 1, "maximum": 50, "default": 8},
      "topic":  {"type": "array", "items": {"type": "string"}},
      "type":   {"type": "array", "items": {"type": "string"}},
      "tag":    {"type": "array", "items": {"type": "string"}},
      "where":  {"type": "object", "additionalProperties": {"type": "string"}},
      "since":  {"type": "string", "description": "Date (YYYY-MM-DD) or 7d, 4w, 3m."},
      "until":  {"type": "string"},
      "sort":   {"enum": ["relevance", "recent"]},
      "cursor": {"type": "string"},
      "count_only": {"type": "boolean", "default": false},
      "facets": {"type": "boolean", "default": false},
      "format": {"enum": ["text", "paths"], "default": "text"},
      "include_episodes": {"type": "boolean", "description": "Default: on for a query, off when browsing."},
      "include_archived": {"type": "boolean", "default": false},
      "within": {"type": "string",
                 "description": "A whole (project, series, team): only the notes that name it in bw-part_of."},
      "brain":  {"type": "string"}}},

  "brain_neighbors": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":    {"type": "string", "description": "id, path, file name, alias, or title"},
      "direction": {"enum": ["out", "in", "both"], "default": "both"},
      "depth":     {"type": "integer", "minimum": 1, "maximum": 3, "default": 1},
      "limit":     {"type": "integer", "minimum": 1, "maximum": 100, "default": 30},
      "relations": {"type": "array", "items": {"enum": ["superseded_by", "conflicts_with",
                    "depends_on", "part_of", "links_to", "source"]},
                    "description": "Follow only these edges; default all."},
      "brain":     {"type": "string"}}},

  "brain_validate": {"type": "object", "additionalProperties": false,
    "properties": {
      "paths": {"type": "array", "items": {"type": "string"}, "maxItems": 100, "default": [],
                "description": "Brain-relative paths you created or edited; empty checks the notes git sees as changed (every note without git)."},
      "brain": {"type": "string"}}},

  "brain_read": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":  {"type": "string", "description": "id, path, file name, alias, or title"},
      "mode":    {"enum": ["outline", "full", "section", "raw"]},
      "section": {"type": "string"},
      "brain":   {"type": "string"}}},

  "brain_log_episode": {"type": "object", "additionalProperties": false, "required": ["summary"],
    "properties": {
      "summary":        {"type": "string", "minLength": 1, "maxLength": 20000,
                         "description": "What happened and what was learned, in Markdown."},
      "claims":         {"type": "array", "maxItems": 50, "items": {"type": "string", "maxLength": 500}},
      "open_questions": {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
      "topics":         {"type": "array", "maxItems": 5, "items": {"type": "string", "maxLength": 100}},
      "dedupe_key":     {"type": "string", "maxLength": 200},
      "session":        {"type": "string", "pattern": "^[A-Za-z0-9._:-]{1,200}$",
                         "description": "Host session id this episode summarizes, if known (recorded as a hint)."},
      "origin_turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$"},
      "pattern":        {"enum": ["record", "playbook", "file", "distill"],
                         "description": "The agent's guess at how to consolidate it (a hint)."},
      "brain":          {"type": "string"}}},

  "brain_propose_rule": {"type": "object", "additionalProperties": false, "required": ["text", "user_quote"],
    "properties": {
      "text":       {"type": "string", "minLength": 1, "maxLength": 300},
      "user_quote": {"type": "string", "minLength": 1, "maxLength": 500,
                     "description": "The user's exact words asking for this rule."},
      "replaces":   {"type": "string", "pattern": "^r-[0-9A-HJKMNP-TV-Z]{26}$"},
      "brain":      {"type": "string"}}},

  "brain_consolidate_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "topic":        {"type": "string"},
      "max_episodes": {"type": "integer", "minimum": 1, "maximum": 100},
      "agents":       {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 64},
                       "description": "Also take these agents' episodes, only when the user asked."},
      "unowned":      {"type": "boolean"},
      "all":          {"type": "boolean"},
      "brain":        {"type": "string"}}},

  "brain_consolidate_done": {"type": "object", "additionalProperties": false, "required": ["episodes"],
    "properties": {
      "episodes": {"type": "array", "minItems": 1, "maxItems": 200,
                   "items": {"anyOf": [
                     {"type": "object", "required": ["episode", "pattern"],
                      "properties": {
                        "episode": {"type": "string"},
                        "pattern": {"enum": ["record", "playbook", "file", "distill", "skip"]},
                        "notes":   {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
                        "reason":  {"type": "string", "maxLength": 200}}},
                     {"type": "string"}]},
                   "description": "One outcome per episode; a plain path or id records no outcome."},
      "brain":    {"type": "string"}}},

  "brain_read_origin": {"type": "object", "additionalProperties": false, "required": ["episode"],
    "properties": {
      "episode": {"type": "string", "description": "Episode id or path."},
      "turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$",
                  "description": "Turn range; default: the episode's range plus context."},
      "brain":   {"type": "string"}}},

  "brain_harvest_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "since":        {"type": "string", "pattern": "^[0-9]+[hdw]$", "default": "7d"},
      "max_sessions": {"type": "integer", "minimum": 1, "maximum": 50, "default": 10},
      "project":      {"type": "string", "description": "Only sessions whose working directory is under this path."},
      "brain":        {"type": "string"}}},

  "brain_harvest_done": {"type": "object", "additionalProperties": false, "required": ["run", "sessions"],
    "properties": {
      "run":      {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "sessions": {"type": "array", "maxItems": 50, "items": {
        "type": "object", "required": ["session", "pattern"],
        "properties": {
          "session": {"type": "string", "pattern": "^S[0-9]+$", "description": "Handle from the packet."},
          "pattern": {"enum": ["record", "playbook", "file", "distill", "skip"]},
          "notes":   {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "reason":  {"type": "string", "maxLength": 200}}}},
      "brain":    {"type": "string"}}}
}
```

Notes:

- Unknown fields inside a `brain_harvest_done` or `brain_consolidate_done`
  item are dropped, not rejected. Only top-level arguments are checked.
- `brain_log_episode` builds the episode body from `summary`, `claims`,
  and `open_questions`. Claims become a `## Claims` list, plain text that
  nothing parses later. The server sets the provenance fields
  (`bw-origin: agent`, `bw-captured: mcp`, `bw-inputs: unknown`, the host as
  agent), never the arguments
  ([write path §3](write-path.md#3-provenance-and-inputs)). `pattern` is
  stored as `bw-pattern`.
- `session` and `origin_turns` on `brain_log_episode` are hints from the
  model. The episode records them. In a harvest packet, by contrast, the
  session URL, turn range, and inputs come from the server's own parse of
  the session.
- `brain_propose_rule` asks the user through elicitation when the client
  offers it. A confirmed rule is added as a run, and a declined one writes
  nothing. Without a way to ask (including Antigravity, which declines
  every request unseen, T-8), the rule is saved as a proposal for
  `brain rules accept`.
- `brain_validate` writes nothing and needs no capability: any agent may
  check files. It returns the lint result (`problems`, counts) plus
  `checked`, the paths it checked (`null` for the whole brain).
- The packet tools return the guidance and packet as text, and counts as
  structured content: `{episodes, pending, notes}` for consolidation,
  `{run, sessions, remaining}` for harvest. No MCP tool writes a note; the
  agent edits notes with its own file tools.
- `brain_consolidate_done` returns `{run, archived}`, and its text gives
  the run's summary ("archived 3 episodes: 1 file, 1 playbook, 1 skip").
  A note that does not cite its episode fails the call with `usage` and
  archives nothing. `brain undo RUN` puts the episodes back.
- With nothing of the caller's pending, `brain_consolidate_prepare` returns
  `{episodes: 0}` and names whose episodes are waiting.
- `brain_harvest_done` records the sessions that pass and lists the
  problems for the rest, which stay unharvested. It fails with `usage` only
  when nothing was recorded.

### 3.5 Prompts

Three MCP prompts give hosts that show prompts as slash commands a
one-step entry point, for example `/brain:harvest`, depending on the
host's naming:

| Prompt | Asks the agent to |
|---|---|
| `consolidate` | Call `brain_consolidate_prepare`, edit or create notes by pattern, run `brain_validate`, call `brain_consolidate_done` with the outcomes, repeat while the agent's episodes remain, and report what changed |
| `capture` | Summarize the session's durable learnings and log them with one `brain_log_episode` call |
| `harvest` | Run prepare, file the sessions into notes, and done, at most 3 rounds; on `unsupported_host`, ask the user before reading its own session history |

### 3.6 Errors

Execution errors are tool errors (`isError: true`), so the model can
correct itself. After the SDK's `Error executing tool <name>: ` prefix, the
message starts with a stable code:

| Code | When |
|---|---|
| `not_found` | The target, brain, or run does not exist |
| `ambiguous` | The target matches several notes; the message lists them |
| `forbidden` | Not allowed by the profile, the host limits, or the harvest setting |
| `usage` | A value the schema allows but the engine rejects: a bad date, cursor, section, or turn range |
| `invalid_ops` | Harvest entries failed validation, or a run's lint gate refused the change; the problems follow |
| `stale` | Files changed since the run read them; run the command again |
| `conflict` | The change collides with something already there, such as a registered name or an existing file |
| `budget_exceeded` | `rules.md` would exceed its budget |
| `expired` | The harvest run handle is older than one hour |
| `busy` | The brain's write lock could not be taken in time |
| `not_available` | An episode's origin conversation is not on this device, or the host deleted it |
| `unsupported_host` | brain-wiki has no session reader for the calling host; the message describes the fallback recipe |
| `not_configured` | No brain is set up for this host; the message says to use the `brain-setup` skill or `brain setup --guide` |
| `internal` | An unexpected exception; the trace goes to the log file and the message names it, without internal details |

Protocol errors (an unknown tool, a malformed request) are left to the SDK.

### 3.7 Lifecycle

- One process serves one host connection over stdio.
- On start, the server detects the host (§3.3) and builds its
  instructions. With `--host auto`, the client's self-reported name, read
  on the first tool call, replaces the guess from the environment
  ([agent integrations §2](agent-integrations.md#2-host-ids)).
- The `brain` argument can pick a different brain on each call, within the
  host's limits. Engines are opened on first use and cached per brain.
- Each call re-reads the user config and the brain's `brain.toml` and
  refreshes the cached engine, so a profile change, or any other manifest
  change, applies to the next call without a restart.
- Each request rescans the brain if more than `search.freshness_ms`
  (default one second) has passed since the last scan
  ([index and search §4](index-and-search.md#4-freshness)).
- Tool calls run one at a time, under one lock.
- The server exits on stdin EOF, as the transport requires.

### 3.8 Not built

- Resources (`brain://note/{id}`) for hosts that let users attach
  resources.
- `search` and `fetch` aliases and an HTTP transport for chat apps
  ([proposal](../proposal/remote-mcp.md)).

## 4. Stability promises

| Surface | Promise in 0.x |
|---|---|
| Brain format | Versioned by `format`; a format change ships with a `brain lint --fix` conversion ([brain format §13](brain-format.md#13-format-versioning)) |
| CLI command names and `--json` shapes | Additive changes only within a minor version; breaking changes are noted in the changelog |
| MCP tool names and input schemas | Additive changes only; a renamed tool keeps its old name as an alias for one minor version |
| Python API (`import brainwiki`) | Not public |
