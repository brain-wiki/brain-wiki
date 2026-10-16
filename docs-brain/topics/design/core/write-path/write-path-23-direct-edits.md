---
id: 01M3250V00SNYFEY4ZHMMF4MVK
type: design
title: "Direct edits (Write path)"
aliases: ["Write path §2.3"]
source: "docs/design/write-path.md#23-direct-edits"
---
# Direct edits (Write path)

Agents whose profile has `edit` create and edit notes and hubs under
`topics/` with their own file tools, then run `brain validate` (MCP
`brain_validate`) on what they changed. A correction (a person's new role, a
line added to a meeting note, a wrong fact fixed) and new knowledge take the
same path. Orientation's **Writing notes** section tells an agent with
`edit` where files go, the frontmatter fields, and the body conventions
([[index-and-search-8-orientation-the-briefing|index and search §8]]).

**Who may edit what:**

| Control | Default |
|---|---|
| Profile capability `edit` ([[cli-and-mcp-1-agent-profiles\|CLI and MCP §1]]) | On: the default profile's `write` is `episodes` and `edit`; a host profile that lists `write` without `edit` turns it off. Orientation and the `AGENTS.md` block tell the agent whether it may edit. `edit` also gates brain-wiki's own writers that change notes: `brain mv`, `brain lint --fix`, `brain consolidate --done` |
| Protected files | Never edited directly by agents: `rules.md` (the rules path, §6), `brain.toml` (changed by `brain` commands), `log.md`, `AGENTS.md` (the whole file), and everything under `inbox/` and `archive/` (episodes stay immutable) and `reports/` (regenerated) |

Files are not authenticated: `edit` and the protected list tell a
cooperating agent what to do, and `brain validate` and lint report what it
did anyway. A person may edit any file, protected ones included.

**`brain validate [PATH…] [--json]`** runs lint's frontmatter rules alone
(`SCHEMA_CODES`, [[lint-and-reports-3-rule-catalog|lint §3]]) with the
`strict` profile:

| Check | Codes |
|---|---|
| Frontmatter parses and holds flat values | BW101, BW102 |
| `id` present, a ULID, and unique | BW103, BW104, BW105 |
| `status` is `active`, `superseded`, or `archived` | BW106 |
| No format 1 or 2 fields (claims, relations); the message names the conversion command | BW117 |
| No unknown `bw-` field | BW118 |
| `bw-superseded_by` is one link, resolves, does not name its note, and comes with `status: superseded` | BW119 |
| `bw-sources` items are links or URLs, and the links resolve | BW120, BW122 |
| No supersession cycle | BW307 |
| The file is not a protected file | BW121 (validate only) |

- **Paths.** Default: the Markdown files git sees as changed or new
  (`git status`); without git, every note. Paths may be brain-relative or
  absolute inside the brain.
- **Output.** One line per problem with its path, line, code, what was
  found, and what is allowed. With nothing to check: "Nothing to validate:
  git sees no changed notes. Pass the paths you edited." Clean: "Valid: N
  file(s) checked, no frontmatter problems."
- **Exit codes.** 0 when no errors, 1 otherwise. Warnings (an unresolved
  `bw-sources` link, BW122) are shown and do not fail.
- **No side effects.** Validate writes nothing and records nothing; it needs
  no capability. Everything else (broken body links, orphans, secrets,
  conflict copies) stays with `brain lint`.

Recovery from a bad edit is git: `git diff`, `git restore`, or reverting a
snapshot commit (§5). A brain without git has no history for direct edits,
so setup recommends git. `brain undo` covers only brain-wiki's own runs
(§8).

Agents without file tools can still add knowledge through episodes, which a
person or another agent consolidates later.
