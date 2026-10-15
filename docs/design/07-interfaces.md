# 07 · Interfaces: CLI, MCP, agent profiles

Status: draft for review · Tool schemas in §3 are normative for v0.1

Three interfaces expose the same engine:

| Interface | Audience | Identity |
|---|---|---|
| CLI `brain` (alias `brain-wiki`) | The user, scripts | The user (`owner` profile) unless `--as <host>` |
| MCP server `brain mcp` (stdio) | Agent hosts | The host id it was started with (`--host`) |
| Files ([02](02-brain-format.md)) | Any agent, any editor | Not authenticated; governed by lint ([06](06-lint-and-reports.md)) |

## 1. Agent profiles

A profile decides what one host may do in one brain. Every host that may
use a brain reads all of it; privacy inside a brain is being redesigned
([proposal](../proposals/privacy.md)). Profiles live in `brain.toml` because they travel
with the brain ([02 §3](02-brain-format.md#3-braintoml)).

```toml
[agents.default]                 # any host without its own table
write       = ["episodes", "edit"]

[agents.claude-code]
write       = ["episodes", "propose_rules", "consolidate"]
```

| Field | Meaning | Built-in default |
|---|---|---|
| `write` | Subset of `episodes`, `edit`, `propose_rules`, `consolidate`, `harvest`, `review`. `edit` allows checked direct edits of notes ([05 §2.3](05-write-path-and-consolidation.md#23-checked-agent-edits)). | `["episodes", "edit"]`; the owner profile has everything |
| `read_origin` | May read the original agent conversations behind episodes ([05 §4.6](05-write-path-and-consolidation.md#46-origin-context)). Transcripts hold much more than the episodes kept, so this is off by default. | `false` |

`brain agents grant|revoke HOST CAPABILITY…` edits these tables as one undoable
`config` run (comments kept; a new table starts from what the host may already
do). `read_origin` is granted and revoked the same way, as a flag. A host id
that is not a known host (`claude-code`, `codex`, `antigravity`, `openclaw`,
`cursor`, `generic`, `default`) and has no table yet gets a warning, since it
is most likely a typo, but the change is made. The command also refreshes the `AGENTS.md` block when the default profile's `edit`
changes, since that block tells file-reading agents whether they may edit.
A refusal names the command that allows the action for that host alone, e.g.
`brain agents grant claude-code consolidate`.

Resolution: `--host <id>` → `[agents.<id>]` → `[agents.default]` →
built-in default. The CLI acts as `owner` (everything allowed) because the
person at the terminal owns the brain; `--as <host>` acts with a host's
profile, which is how users check what it may do. Under `--as`, every CLI
write does what that host could do through MCP, or is refused:

| Command | Under `--as <host>` |
|---|---|
| `log` | Needs `episodes`; recorded as `origin: agent`, `inputs: unknown` (or `external`), with the host as agent, like `brain_log_episode` |
| `rules add` | Needs `propose_rules`; saved as a proposal for `brain rules accept` (or `brain review accept`), like `brain_propose_rule` without a way to ask |
| `check`, `mv`, `lint --fix` | Need `edit`: they change notes directly (`--dry-run` previews need nothing) |
| `rules accept`/`reject`, `review accept`/`reject`, `agents grant`/`revoke`, `undo` | Refused: these are the user's decisions. An agent undoing runs could undo the user's own work, so no capability allows it |

Enforcement points, all in the engine so every interface gets them:

- Writes: tools absent from `write` are refused with `forbidden`. Write
  functions check the profile themselves (`move_note`, `lint.fix`,
  `accept_rule`, `reject_rule`, `profile_run`), so a new interface inherits
  the checks.
- Host brain limits from the user config ([03 §3](03-config-and-storage.md#3-choosing-a-brain)).

Profiles are not authentication. A local stdio server trusts the `--host`
argument its host gave it, because the user configured that host. Profiles
prevent accidents and limit what a confused or manipulated agent can
change; they do not stop a malicious program running as the user, which
could read and write the files anyway ([10](10-security-and-privacy.md)).

## 2. CLI

### 2.1 Command tree

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
--version` prints `brain-wiki X (format N)`. Every command and subcommand has
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

### 2.2 Conventions

- Human-readable output by default; `--json` gives a stable, documented
  shape (the same shapes as the MCP structured results).
- Commands that change many files or files outside the brain support
  `--dry-run`, which prints what they would change: `lint --fix`, `mv`,
  `consolidate --apply`, `harvest`, `import`, and `connect`. Single-step
  writes (`log`, `rules`, `check`, `restore`, `review accept`, `undo`) have
  none; every curated one is a run that `brain undo` reverses.
- Paths printed are brain-relative; `--json` also includes absolute paths.
- Targets follow the Obsidian CLI convention: a title, alias, or file name
  resolves like a wikilink, and an exact path or id resolves exactly. Results
  always print the exact path, the handle for the next command.
- Listing commands share `--count` (print only the total), `--paths` (one
  path per line, for piping into file tools), `--limit`, and `--cursor`;
  `search` also takes `--facets` (counts by type, topic, and tag).
- `brain init --git` runs `git init` and commits the new files. `init` and
  `brains add` refuse a name or folder already registered to another brain,
  so a typo never re-points a brain; a moved brain may take its name along
  ([03 §5](03-config-and-storage.md#5-brain-lifecycle)).
- `--topic T` (and the MCP `topic` filter) includes T's sub-topics (02 §2).
- `brain log -` reads the episode body from stdin, so other tools can pipe
  into the inbox.
- `brain mcp` never prints anything to stdout except its protocol output; diagnostics go to stderr and to
  `<state>/logs/brain-wiki.log`.

### 2.3 Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | The command ran and found problems (lint errors, invalid ops, review required), or a path could not be read or written (`os_error`) |
| 2 | Usage error: an unknown command or option, a bad value, or a flag the command would ignore. Parse errors print the command's usage line, then `brain <command>: error: <message>`; `brain` alone prints the help |
| 3 | Not found (brain, note, run) |
| 4 | Conflict: `conflict` (a name or file already there, an edited block), `stale` (notes changed since prepare, files changed since a run), `expired`, or `busy` (lock timeout) |
| 5 | Forbidden by profile or host limits |
| 10 | Internal error (bug): one line, `internal: unexpected error; details are in <log>`, with the trace in `<state>/logs/brain-wiki.log` |

Errors print one line to stderr, `<code>: <message>`, with the codes of
§3.6.

### 2.4 Parser and startup cost

The CLI is built on Typer, for three things argparse made awkward: nested
subcommands with their own arguments and help (`brain rules add --help`),
validation from type annotations (choices, ranges, repeatable options), and
shell completion (`brain --install-completion`). Help is plain text: rich
markup is off, so rich, which Typer installs, is never imported.

Typer only parses. Each command returns the handler to run and the namespace
of arguments it reads; `main` runs the handler, so exit codes and error lines
(§2.3) do not depend on Typer. Handler modules are imported only for the
command run: no command but `brain mcp` imports the MCP SDK, none but `brain
viz` and `brain bench` load the visualizer or the bench, and help imports
none of them. A test checks that `brain --help` and `brain log --help` import
neither the engine, the MCP SDK, the visualizer, the bench, nor rich.

Typer costs startup time: importing it (it vendors Click) and building the
command tree from annotations. Measured on a Linux workstation, Python 3.12,
best of 7, on the example brain:

| Command | argparse | Typer |
|---|---|---|
| `brain --help` | 52 ms | 103 ms |
| `brain log --help` | 52 ms | 105 ms |
| `brain search x` | 124 ms | 166 ms |

The cost is accepted: with host lifecycle hooks removed (D14), no command
runs on every agent turn, and 50 ms is small next to an agent's turn. To keep
it down, `cli/_main.py` keeps real annotations (no `from __future__ import
annotations`), which halves the time Typer spends reading them.

## 3. MCP server

### 3.1 Protocol target

- Python SDK `mcp` 2.x, high-level `MCPServer` API, stdio transport.
- It serves clients on the current stateless revision (2026-07-28) and
  clients still on the 2025-11-25 handshake, which is most hosts today.
- The server keeps no per-connection state. Anything that spans calls
  (consolidation runs) is a server-minted handle passed as a tool
  argument, which is how the current revision expects cross-call state to
  work.
- No sampling, no roots, no reliance on server-to-client requests or
  logging notifications, all deprecated in the current revision.
- `tools/list` returns tools in a fixed order with a public cache hint (1
  hour), which helps client caches and prompt caching.

### 3.2 Naming and size limits

- Server key `brain-wiki` in every host config: lowercase with a hyphen,
  which every host accepts and which keeps underscores free to separate
  server and tool names.
- Tool names: lowercase snake case with a `brain_` prefix, at most 26
  characters, so every host's prefixed form (`mcp__brain-wiki__brain_search`,
  `mcp__plugin_brain-wiki_brain-wiki__brain_search`, `brain-wiki__brain_search`) stays under
  the 64-character limits some model APIs impose.
- Tool descriptions put the essential sentence first and stay under 1,000
  characters; server instructions under 2,000 (one host truncates both at
  2,048).
- Results are kept under 20k tokens by default (one host's default cap is
  25k). Larger content is paginated or summarized with a pointer to `read`.

### 3.3 Server instructions

Sent once per connection:

The static instruction block ([08 §3.2](08-agent-integrations.md#32-the-static-instruction-block))
without its skill pointer, so clients without an instruction file follow
the same policy. Its file-access and edit sentences follow the host's
profile, as in the block. Codex gets the policy only this way, and weighs
the first 512 characters most, so the first bullet ends within them
([Codex](agents/codex.md#1-instructions-come-from-the-mcp-server)).

### 3.4 Tools

All tools except `brain_list` and `brain_harvest_apply` (which takes the run
from `brain_harvest_prepare`) accept an optional `brain` argument (a brain
name allowed for this host). Unknown arguments are rejected. All return structured content plus a text rendering.

| Tool | Annotations | Purpose |
|---|---|---|
| `brain_list` | read-only, idempotent, closed-world | Brains this host may use ([04 §9.1](04-index-and-retrieval.md#91-brain-list)) |
| `brain_orient` | read-only, idempotent, closed-world | One brain's briefing ([04 §8](04-index-and-retrieval.md#8-orientation-the-briefing)) |
| `brain_search` | read-only, idempotent, closed-world | Search or browse with filters, expansion, and guards ([04 §6](04-index-and-retrieval.md#6-search)) |
| `brain_read` | read-only, idempotent, closed-world | Read a note, hub, or episode, with handles on every relation ([04 §7](04-index-and-retrieval.md#7-read)) |
| `brain_neighbors` | read-only, idempotent, closed-world | Follow a node's relations ([04 §9.2](04-index-and-retrieval.md#92-neighbors)) |
| `brain_check` | not read-only, not destructive (reversible), idempotent, closed-world | Validate and record direct edits; requires `edit` ([05 §2.3](05-write-path-and-consolidation.md#23-checked-agent-edits)) |
| `brain_log_episode` | not read-only, not destructive, idempotent (with `dedupe_key`), closed-world | Write an episode ([05 §2.1](05-write-path-and-consolidation.md#21-ways-an-episode-is-written)) |
| `brain_propose_rule` | destructive, not idempotent, closed-world; `_meta["anthropic/requiresUserInteraction"] = true` | Add or replace a rule with user confirmation ([05 §6](05-write-path-and-consolidation.md#6-rules)) |
| `brain_consolidate_prepare` | not read-only, not destructive, closed-world | Start an agent-backend run; returns instructions and packet |
| `brain_consolidate_apply` | destructive (reversible), idempotent per run, closed-world | Validate and apply ops for a run |
| `brain_read_origin` | read-only, idempotent, closed-world | Read a bounded window of the conversation an episode came from; requires `read_origin` ([05 §4.6](05-write-path-and-consolidation.md#46-origin-context)) |
| `brain_harvest_prepare` | not read-only, not destructive, closed-world | Start an agent-backend harvest of the calling host's sessions; returns instructions and a packet of condensed, scrubbed turns; requires `harvest` ([05 §2.2](05-write-path-and-consolidation.md#22-harvesting-sessions)) |
| `brain_harvest_apply` | not read-only, not destructive, idempotent per run, closed-world | Validate the agent's per-session results and write episodes with server-set provenance |

Input schemas (JSON Schema 2020-12; output schemas follow the result shapes
in 04 and 05):

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
      "intent": {"enum": ["none", "context", "why", "impact", "history", "related"], "default": "context"},
      "include_episodes": {"type": "boolean", "description": "Default: on for a query, off when browsing."},
      "include_archived": {"type": "boolean", "default": false},
      "brain":  {"type": "string"}}},

  "brain_neighbors": {"type": "object", "additionalProperties": false, "required": ["target"],
    "properties": {
      "target":    {"type": "string", "description": "id, path, file name, alias, or title"},
      "relations": {"type": "array", "items": {"enum": ["part_of", "depends_on", "conflicts_with", "supersedes", "related_to", "links_to"]}},
      "direction": {"enum": ["out", "in", "both"], "default": "both"},
      "depth":     {"type": "integer", "minimum": 1, "maximum": 3, "default": 1},
      "limit":     {"type": "integer", "minimum": 1, "maximum": 100, "default": 30},
      "brain":     {"type": "string"}}},

  "brain_check": {"type": "object", "additionalProperties": false,
    "properties": {
      "paths": {"type": "array", "items": {"type": "string"}, "maxItems": 50,
                "description": "Brain-relative paths you edited; empty lists pending edits without recording."},
      "allow_shrink": {"type": "boolean", "default": false},
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
      "topics":         {"type": "array", "maxItems": 5, "items": {"type": "string"}},
      "dedupe_key":     {"type": "string", "maxLength": 200},
      "session":        {"type": "string", "pattern": "^[A-Za-z0-9._:-]{1,200}$",
                         "description": "Host session id this episode summarizes, if known (recorded as a hint)."},
      "origin_turns":   {"type": "string", "pattern": "^[0-9]+-[0-9]+$"},
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
      "brain":        {"type": "string"}}},

  "brain_consolidate_apply": {"type": "object", "additionalProperties": false, "required": ["run", "ops"],
    "properties": {
      "run":     {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "ops":     {"type": "array", "description": "Operations, see the instructions from prepare."},
      "dry_run": {"type": "boolean", "default": false},
      "brain":   {"type": "string", "description": "Optional; the server finds the brain that holds the run."}}},

  "brain_read_origin": {"type": "object", "additionalProperties": false, "required": ["episode"],
    "properties": {
      "episode":             {"type": "string", "description": "Episode id or path."},
      "turns":               {"type": "string", "pattern": "^[0-9]+-[0-9]+$",
                              "description": "Turn range; default: the episode's range plus context."},
      "brain":               {"type": "string"}}},

  "brain_harvest_prepare": {"type": "object", "additionalProperties": false,
    "properties": {
      "since":        {"type": "string", "pattern": "^[0-9]+[hdw]$", "default": "7d"},
      "max_sessions": {"type": "integer", "minimum": 1, "maximum": 50, "default": 10},
      "project":      {"type": "string", "description": "Only sessions whose working directory is under this path."},
      "brain":        {"type": "string"}}},

  "brain_harvest_apply": {"type": "object", "additionalProperties": false, "required": ["run", "sessions"],
    "properties": {
      "run":      {"type": "string", "pattern": "^run-[0-9A-HJKMNP-TV-Z]{26}$"},
      "sessions": {"type": "array", "maxItems": 50, "items": {
        "type": "object", "additionalProperties": false, "required": ["session"],
        "properties": {
          "session":           {"type": "string", "pattern": "^S[0-9]+$", "description": "Handle from the packet."},
          "skip":              {"type": "boolean", "default": false},
          "reason":            {"type": "string", "maxLength": 200},
          "summary":           {"type": "string", "maxLength": 20000},
          "claims":            {"type": "array", "maxItems": 50, "items": {
                                  "type": "object", "required": ["text", "turns"],
                                  "properties": {"text":  {"type": "string", "maxLength": 500},
                                                 "turns": {"type": "string", "pattern": "^[0-9]+-[0-9]+$"}}}},
          "negative_findings": {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "open_questions":    {"type": "array", "maxItems": 20, "items": {"type": "string", "maxLength": 500}},
          "topics":            {"type": "array", "maxItems": 5, "items": {"type": "string"}}}}}}}
}
```

Notes:

- `brain_log_episode` assembles the episode body from `summary`, `claims`,
  and `open_questions`; the provenance fields are set by the server, never
  by arguments ([05 §3](05-write-path-and-consolidation.md#3-provenance-and-inputs)).
- `session` and `origin_turns` on `brain_log_episode` are hints from the
  model (used by the fallback harvest recipe); the episode records them but
  keeps `bw-captured: mcp` and `bw-inputs: unknown`. In `brain_harvest_apply`, by
  contrast, every provenance field comes from the server's own parse of the
  session.
- `brain_consolidate_apply` validates `ops` against the schema in
  [05 §5](05-write-path-and-consolidation.md#5-operations) itself, so a
  malformed op produces a precise, model-correctable error rather than a
  generic protocol failure.

### 3.5 Prompts

Three MCP prompts give hosts that surface prompts as slash commands a
one-step entry point (for example `/brain:harvest`, depending on the host's
naming):

| Prompt | Does |
|---|---|
| `consolidate` | Asks the agent to run the agent-backend consolidation flow and report what changed. |
| `capture` | Asks the agent to summarize the current session's durable learnings and log them as one episode. |
| `harvest` | Asks the agent to run the harvest recipe: prepare, distill each session, apply, repeat until no sessions remain or the user stops; fall back to the self-read recipe if the host is unsupported. |

### 3.6 Errors

Execution errors are tool errors (`isError: true`) so the model can correct
itself. After the SDK's `Error executing tool <name>: ` prefix, the message
starts with a stable code:

| Code | When |
|---|---|
| `not_found` | Target, brain, or run does not exist |
| `ambiguous` | Target matches several notes; the message lists them |
| `forbidden` | Not allowed by the profile or host limits |
| `invalid_ops` | Validation failed; a list of `{op_index, check, message}` follows |
| `stale` | Notes changed since the packet was prepared, or files since the run read them; prepare again |
| `conflict` | The change collides with something already there (a registered name, an existing file) |
| `budget_exceeded` | `rules.md` would exceed its budget |
| `expired` | The run handle is older than its expiry |
| `busy` | The brain's write lock could not be taken in time |
| `not_available` | An episode's origin conversation is not on this device or was deleted by the host |
| `unsupported_host` | brain-wiki has no session reader for the calling host; use the fallback recipe |
| `not_configured` | No brain is set up for this host yet; the message points to the `brain-setup` skill |

Protocol errors (unknown tool, malformed request) are left to the SDK.
Unexpected exceptions are logged with a trace to the log file and reported
as `internal` with a log reference, never with internal details.

### 3.7 Lifecycle

- One process per host connection (stdio). On start it resolves the brain
  for its host, opens the index, and runs a freshness scan. Each request
  scans again if more than a second has passed ([04 §4](04-index-and-retrieval.md#4-freshness)).
- Brain selection can change per call (`brain` argument), within the
  host's limits; indexes are opened lazily and cached per brain.
- The server exits on stdin EOF, as the transport requires.

### 3.8 Not in v0.1

- Resources (`brain://note/{id}`) for hosts that let users attach
  resources. Easy to add once the read path is stable.
- `search` / `fetch` aliases and HTTP transport for chat apps
  ([proposal](../proposals/remote-mcp.md)).

## 4. Stability promises

| Surface | Promise in 0.x |
|---|---|
| Brain format | Versioned (`format`); a format change ships with a `brain lint --fix` conversion ([02 §13](02-brain-format.md#13-format-versioning)). |
| CLI command names and `--json` shapes | Additive changes only within a minor version; breaking changes noted in the changelog. |
| MCP tool names and input schemas | Additive changes only; a renamed tool keeps its old name as an alias for one minor version. |
| Python API (`import brainwiki`) | Not public in 0.x. |
