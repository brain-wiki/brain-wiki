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

The path is `inbox/episodes/<YYYY>/<MM>/<ulid>.md`, using the UTC year and
month of the ULID's timestamp (BW502).

```markdown
---
id: 01JA0C5D8E2F4G6H8J0K2M4N6P
type: episode
bw-agent: claude-code
bw-session: 5f2c9a1e-…           # host session id, if known
bw-turns: 12-48                  # turns of that session this episode covers, if known
bw-device: laptop                # device the session ran on (user config name)
bw-origin: agent                 # owner | agent | import | system
bw-inputs: unknown               # local | external | unknown
bw-captured: mcp                 # mcp | harvest | cli | import | file
created: 2026-10-10T19:22:11Z
bw-topics: [search]              # hints only
bw-dedupe: claude-code:5f2c9a1e-…:12-48   # idempotency key, if the writer gave one
bw-pattern: file                 # the agent's consolidation hint, if it gave one
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

- Episodes are immutable. After creation no tool edits them. The index
  records each episode's first hash, and lint reports a change (BW501).
- An episode MUST have `id`, `bw-origin`, and `bw-inputs` (BW503).
- `bw-origin`, `bw-inputs`, `bw-captured`, and `bw-agent` are set by the
  code path that writes the episode (the MCP server or harvest), never
  taken from model-written text. The index trusts them only for
  episodes this device wrote. See
  [[write-path-3-provenance-and-inputs|write path §3]] and
  [[index-and-search-3-schema|index and search §3]].
- Episodes written before format 2 use the field names without `bw-`, and
  `origin_turns` for `bw-turns`. They are never rewritten, and readers
  accept both.
- `bw-session`, `bw-turns`, and `bw-device` point back to the conversation
  the episode came from, so tools on that device can show it
  ([[write-path-46-origin-context|write path §4.6]]). They never hold
  file paths. An episode must still make sense on its own, because hosts
  delete old transcripts and transcripts stay on their device.
- `bw-dedupe` holds the writer's idempotency key
  ([[write-path-21-ways-an-episode-is-written|write path §2.1]]).
  Episodes imported from documents by earlier versions carry `bw-source`,
  the original file and heading.
- `bw-pattern` is the capturing agent's guess at how the episode should be
  consolidated: `record`, `playbook`, `file`, or `distill`
  ([[write-path-21-ways-an-episode-is-written|write path §2.1]]). It is a
  hint, not provenance.
- The body is free Markdown. `## Claims`, `## Negative findings` (what was
  tried and failed, so later agents do not repeat it), and
  `## Open questions` are optional sections the consolidation guidance
  looks for. In an episode, `## Claims` is an ordinary heading, not format
  1's reserved section.
- `brain consolidate --done` moves processed episodes to
  `archive/episodes/` with the same relative path. Archived episodes are
  kept as provenance, so `bw-sources` links to them (§6.4) still resolve.
- Files dropped into `inbox/agents/<agent>/` by host-native memory
  features are treated as episodes without needing frontmatter. Their
  origin is `agent` and their inputs are `unknown`.
  `brain consolidate --done` archives them unchanged to
  `archive/agents/<agent>/`.
