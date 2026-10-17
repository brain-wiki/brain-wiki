---
id: 01M3250V00SNYFEY4ZHMMF4MVK
type: design
title: "Direct edits"
aliases: ["Write path §2.3"]
source: "docs/design/write-path.md#23-direct-edits"
---
# Direct edits

Agents whose profile has `edit` create and edit notes and topic pages under
`topics/` with their own file tools, then run `brain validate` (MCP
`brain_validate`) on what they changed. A correction and new knowledge take
the same path. Orientation's "Writing notes" section tells an agent with
`edit` where files go, the frontmatter fields, and the body conventions
([[index-and-search-8-orientation-the-briefing|index and search §8]]).

The `edit` capability ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]])
is on by default: the default profile's `write` list is `edit`, and a host
profile that lists `write` without `edit` turns it off.
Orientation and the `AGENTS.md` block tell the agent whether it has it.
`edit` also gates brain-wiki's own writers that change notes: `brain mv`,
`brain lint --fix`, and `brain consolidate --done`.

The protected files are never edited directly by agents:

- `rules.md` (changed only through the rules path, §6);
- `brain.toml` (changed by `brain` commands);
- `log.md`, and the whole of `AGENTS.md`;
- everything under `inbox/` and `archive/` (episodes stay immutable) and
  `reports/` (regenerated).

Files are not authenticated. `edit` and the protected list tell a
cooperating agent what to do, and `brain validate` and lint report what it
did anyway. A person may edit any file, protected ones included.

`brain validate [PATH…] [--json]` runs lint's frontmatter rules alone
(`SCHEMA_CODES`, [[lint-and-reports-3-rule-catalog|lint §3]]) with the
`strict` profile:

| Check | Codes |
|---|---|
| Frontmatter parses and holds flat values | BW101, BW102 |
| `id` present, a ULID, and unique | BW103, BW104, BW105 |
| `status` is `active`, `superseded`, or `archived` | BW106 |
| No format 1 or 2 fields; the message names the conversion command | BW117 |
| No unknown `bw-` field | BW118 |
| `bw-superseded_by` is one resolving link to another note, with `status: superseded` | BW119 |
| `bw-sources` items are links or URLs, and the links resolve | BW120, BW122 |
| No supersession cycle | BW307 |
| The file is not a protected file | BW121 |

- Paths default to the Markdown files git sees as changed or new, or every
  note without git. The default leaves out new files in the inbox, which
  agents are meant to create, and `reports/`, which brain-wiki rewrites. A
  changed episode is still reported. Given paths may be brain-relative or
  absolute.
- BW121 is reported for a protected file among those paths. `brain.toml`
  is not Markdown, so only an explicit path reports it.
- Each problem is one line with path, line, code, what was found, and what
  is allowed. With nothing to check it prints "Nothing to validate: git
  sees no changed notes. Pass the paths you edited." When clean it prints
  "Valid: N file(s) checked, no frontmatter problems."
- It exits 1 on any error, else 0. Warnings, such as an unresolved
  `bw-sources` link (BW122), do not fail.
- It writes and records nothing and needs no capability. Body links,
  orphans, secrets, and conflict copies stay with `brain lint`.

Recovery from a bad edit is git: `git diff`, `git restore`, or reverting a
snapshot commit (§5). A brain without git has no history for direct edits,
so setup recommends git. `brain undo` covers only brain-wiki's own runs
(§8). Agents without file tools add knowledge through episodes.
