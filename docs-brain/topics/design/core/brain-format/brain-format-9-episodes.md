---
id: 01M3250V00KHDPRD0E7V2XRSNB
type: design
title: "Episodes"
aliases: ["Brain format §9"]
source: "docs/design/brain-format.md#9-episodes"
---
# Episodes

Episodes are the inbox. They capture what happened in a session, raw and
unpolished, so nothing has to be decided at capture time.

Path: `inbox/episodes/<YYYY>/<MM>/<ulid>.md`, using the UTC year and month
of the ULID's timestamp.

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
created: 2026-10-10T19:22:11Z
bw-agent: claude-code
bw-session: 5f2c9a1e-…           # host session id, if known
bw-turns: 12-48                  # turns of that session this episode covers, if known
bw-device: laptop                # device the session ran on (user config name)
bw-origin: agent                 # owner | agent | import | system
bw-inputs: unknown               # local | external | unknown
bw-captured: mcp                 # mcp | harvest | cli | import | file
bw-topics: [search]              # hints only
bw-dedupe: claude-code:5f2c9a1e-…:12-48   # idempotency key, if the writer gave one
---
Switched the search path to FTS5 after ripgrep was too slow on 10k notes.

## Claims
- ripgrep took ~800 ms per query on the test corpus; FTS5 took ~5 ms.
- Trigram tokenizer requires SQLite 3.34+.

## Negative findings
- Tried a pure-Python BM25 first; too slow above 2k notes.

## Open questions
- Should CJK text use the trigram table by default?
```

Rules:

- Episodes are **immutable**. After creation no tool edits them. Lint
  records each episode's hash in the index and reports changes.
- `bw-origin`, `bw-inputs`, `bw-captured`, and `bw-agent` are set by the
  code path that writes the episode (MCP server, harvest, CLI, import), never
  taken from model-written text. See [[write-path-3-provenance-and-inputs|write path §3]].
  Episodes written before format 2 use the names without `bw-` (and
  `origin_turns` for `bw-turns`); they are never rewritten, and readers
  accept both.
- `bw-session`, `bw-turns`, and `bw-device` point back to the conversation the
  episode came from, so tools on that device can show it
  ([[write-path|write path]]). They
  never hold file paths. An episode must be understandable on its own:
  hosts delete old transcripts, and transcripts stay on the device that
  produced them.
- `bw-dedupe` holds the writer's idempotency key
  ([[write-path|write path]]).
  Episodes imported from documents carry `bw-source`, the original file
  and heading ([[import-6-to-episodes-and-from-agents|import §6]]).
- The body is free Markdown. `## Claims`, `## Negative findings` (what was
  tried and did not work, so later agents do not repeat it), and
  `## Open questions` are suggested sections that the consolidation
  guidance looks for; none is required. They are body text: `## Claims`
  in an episode is an ordinary heading, not format 1's reserved section,
  and episodes are never converted (§13).
- `brain consolidate --done` moves processed episodes to
  `archive/episodes/` with the same relative path. Archived episodes are
  kept as provenance: `bw-sources` links to them (§6.4) still resolve.
- Files dropped into `inbox/agents/<agent>/` by host-native memory features
  are treated as episodes by consolidation without needing frontmatter.
  Their origin is `agent` and their inputs are `unknown`. `brain
  consolidate --done` archives them to `archive/agents/<agent>/` unchanged.
