---
id: 01M3250V00ZNEW05WGHV3FF34C
type: design
title: "Ways an episode is written"
aliases: ["05 §2.1"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#21-ways-an-episode-is-written"
bw-part_of:
  - "[[05-2-the-write-paths]]"
---
# Ways an episode is written

| Writer | `origin` | `inputs` | `captured` | Notes |
|---|---|---|---|---|
| `brain log` (CLI, interactive) | `owner` | `local` | `cli` | A person typed it. |
| `brain log --agent <id>` (scripts) | `agent` | `unknown` unless `--inputs` given | `cli` | |
| MCP `brain_log_episode` | `agent` | `unknown` (§3.2) | `mcp` | |
| `brain harvest` from host session stores (opt-in) | `agent` | computed from the session's tool calls (§3.2) | `harvest` | §2.2 |
| File created directly under `inbox/episodes/` | as written if valid, else `agent`; `owner` becomes `agent` | `unknown` (forced) | `file` | Self-declared provenance is not trusted. |
| File in `inbox/agents/<agent>/` | `agent` | `unknown` | `file` | No frontmatter needed. |
| `brain import --to-episodes` | `import` | `false` | `import` | Importing the user's own files. |

Episodes that come from an agent session also record where they came
from: `agent` (host id), `session` (host session id), `origin_turns` (the
turn range they cover), and `device`. These let tools on that device show
the original conversation later (§4.6). They never contain file paths, and
an episode must make sense without its origin, because hosts delete old
transcripts.

All writers go through one function, `write_episode()`, which:

1. Mints the ULID and path (UTC year and month).
2. Sets the provenance fields from the code path, ignoring any values the
   model put in the text.
3. Scrubs secrets (patterns for common API keys, tokens, private key
   blocks; [[security-and-privacy|10]]), replacing them with
   `[REDACTED:<kind>]`.
4. Enforces a size cap (default 64 KiB; the excess is cut and noted).
5. Applies an idempotency key if given (`bw-dedupe` in frontmatter; harvest
   uses `<host>:<session>:<turn range>`), so retries do not
   duplicate. A marker created with `O_EXCL` in the state dir makes the
   check atomic across processes on one device; the index catches keys
   from episodes that arrived by sync.
6. Writes to a temporary file in the same directory, then renames it
   atomically, leaves a marker for the episode in the device's state
   directory (`written/<id>`, holding the content's hash), then updates the
   index (write-through).

The scanner trusts an episode's declared provenance only when its marker
matches its content. Anything else under `inbox/episodes/` (written by
hand, by another program, edited after brain-wiki wrote it, or synced from
another device) is indexed as a file: `bw-inputs: unknown`, `captured: file`,
and never `origin: owner`. An episode logged on another device therefore
counts as `unknown` here; most agent episodes are `unknown` anyway, because
an MCP write can never prove its session clean (§3.2).
