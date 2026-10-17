# Lint and reports

## 1. Purpose

Lint checks a brain against the [brain format](brain-format.md) without
locking anyone out. People, Obsidian, sync tools, and agents all write to a
brain. Lint finds what they broke, explains it, and fixes what is safe to
fix. It never calls a model or the network.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | The whole brain, or the given paths | From `brain.toml` |
| `brain validate` | Frontmatter rules on changed notes (§4) | `strict` |
| The lint gate of a run | File rules on the files the run touches | `strict`, errors only |
| Git pre-commit hook | Staged files (§8) | From `brain.toml` |
| Indexer | BW101 and BW111, stored in `diagnostics` | — |

The lint gate runs inside `brain lint --fix`, `brain mv`, and
`brain import`, after the change is made in memory. Only strict errors the
change introduces block the run, so a note someone broke by hand does not
stall every later run that touches it. See
[write path §7.2](write-path.md#72-lint-gate).

## 2. Profiles and severities

A profile sets the severity of each rule. The catalog in §3 lists both.

| Profile | For | Behavior |
|---|---|---|
| `strict` | New brains and everything brain-wiki writes | Every rule at its strict severity |
| `migrate` | Imported vaults and legacy folders | Rules legacy content often breaks drop to `warning`, `info`, or off |

In `migrate`, missing ids, non-standard status values, format 1 and 2
fields, unknown `bw-` fields, and orphan notes stop being errors. Rules
that protect parsing, safety, or retrieval correctness stay errors.

`[lint.overrides]` maps path globs to a profile or to `off`, and the first
match wins. `--profile` replaces `lint.profile` but not the overrides.

```toml
[lint]
profile = "strict"

[lint.overrides]
"Archive/**" = "migrate"
"Clippings/**" = "off"        # skip entirely
```

Severities are `error`, `warning`, and `info`. Any error makes
`brain lint` exit 1 and makes the pre-commit hook refuse the commit.

## 3. Rule catalog

Codes are stable. New rules get new codes, and the codes of removed rules
are not reused. The Fix column says what `brain lint --fix` does. Codes
marked † are `SCHEMA_CODES`, the rules `brain validate` runs.

### BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 † | Frontmatter is not valid YAML, not a mapping, not closed, or over 64 KiB. | error / error | — |
| BW102 † | Frontmatter holds a nested mapping or a list of lists. | error / warning | — |
| BW103 † | Note has no `id`. | error / info | Mint an id |
| BW104 † | `id` is not a ULID. | error / warning | Mint a new id |
| BW105 † | Two files share an `id`. | error / error | Mint new ids for the newer notes or topic pages |
| BW106 † | `status` is not `active`, `superseded`, or `archived`. | error / info | Map it, keeping the old value in `bw-stage` |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy. | warning / warning | — |
| BW114 | Leftover merge conflict markers outside code. | error / error | — |
| BW115 | `*.sqlite`, `*.sqlite3`, `*.db`, `*-wal`, or `*-shm` file inside the brain. | warning / warning | — |
| BW117 † | Note is in format 1 or 2. | error / warning | Convert to format 3 (§5.1) |
| BW118 † | Unknown `bw-` field in a note. | error / warning | — |
| BW119 † | `bw-superseded_by` is malformed, unresolved, names its own note, or is set without `status: superseded`. | error / warning | Set `status: superseded` (last case only) |
| BW120 † | A `bw-sources` item is neither a link nor a URL. | error / warning | — |
| BW121 † | A protected file was edited. | error / error | — |
| BW122 † | A `bw-sources` link does not resolve. | warning / info | — |

- The BW103 message includes a fresh `id:` line an agent can paste.
- BW105 keeps the id on the file with the oldest modification time.
  Duplicate episode ids get no fix.
- BW106 maps status values as [import §4](import.md#4-normalization-rules)
  describes, and leaves an existing `bw-stage` alone.
- BW112 matches common sync-tool conflict names, and `note (1).md` or
  `note 2.md` when `note.md` exists with different content.
- BW114 checks notes, topic pages, `rules.md`, `AGENTS.md`, and `log.md`.
- BW117 lists what makes the note format 1 or 2
  ([brain format §13](brain-format.md#13-format-versioning)). A
  `bw-supersedes` relation adds a second BW117 whose fix marks the note it
  names as superseded.
- BW121 comes only from `brain validate`, for a path that
  [write path §2.3](write-path.md#23-direct-edits) protects.

### BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle along `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous. | warning / info | Repoint it from the index's path history |

An unresolved link's message suggests the closest title, and an ambiguous
one lists up to five candidates. A wikilink to an attachment, such as
`![[diagram.png]]`, is also BW310, because attachments are not notes.

### BW4xx: structure and budgets

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds `budgets.agents_md_max_lines`. | error / warning | Regenerate the block |
| BW404 | A topic folder has no topic page. | warning / info | Create a topic page listing the topic's notes |
| BW405 | Note is not in its topic page's `## Notes`, and no chain of body links reaches it from a note that is. | info / off | Append a line to `## Notes` |
| BW406 | Orphan: no other note, topic page, or episode links to it. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` or its managed block is missing or out of date. | warning / warning | Create the file or regenerate the block |
| BW409 | A topic slug declared in `brain.toml` is invalid. | error / warning | — |

A deeper folder without a topic page is not a topic
([brain format §2.1](brain-format.md#21-topics)), so BW404 concerns
top-level folders and declared topics.

### BW5xx: inbox

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW501 | Episode changed after it was created. | error / error | — |
| BW502 | Episode id is not a ULID, or its path is not `YYYY/MM/<id>.md`. | error / warning | Move it (valid ids only) |
| BW503 | Episode lacks `id`, or a valid `bw-origin` or `bw-inputs`. | error / warning | Fill `bw-origin: agent`, `bw-inputs: unknown`, and a new id |
| BW504 | A proposal names an `inbox/episodes/` path that no longer exists. | warning / warning | — |
| BW505 | Episodes pending longer than `lint.stale_inbox_days` (default 14). | info / info | — |

- BW501 compares an episode with the first hash the index recorded for
  its id. A run that rewrites an episode records the new hash.
- Files archived under `archive/agents/` keep their own format and are not
  checked.

### BW6xx: rules

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW601 | Rule has no `quote`. | error / warning | — |
| BW602 | Rule `origin` is not `owner`. | error / error | — |
| BW603 | Rule metadata comment does not parse. | error / error | — |

### BW7xx: safety

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — |

The user removes the secret and rotates it, since git history may still
hold it. See [security and privacy](security-and-privacy.md).

Codes removed with format 3, for readers of 0.1 output: BW113, BW116 (now
part of BW117), BW201 to BW207, BW301 to BW306, BW308, BW309, BW311, and
BW702. An ambiguous body link, formerly BW305, is BW310.

## 4. How lint works

`brain lint` combines file rules, which read one file, with cross-file
rules, which query the index.

1. Force a scan, so the index matches the files
   ([index and search §4](index-and-search.md#4-freshness)).
2. Run the file rules on each note, topic page, episode, agent file, `rules.md`,
   `AGENTS.md`, proposal, and `log.md` in scope.
3. Run the cross-file rules and keep the problems in scope.
4. Apply `--select` and `--ignore`, set each severity from the profile for
   its path, drop the ones that are off, and sort by path, line, and code.

File rules depend only on a file's content and the manifest. Their results
are cached in `lint_cache`, keyed by content hash, `LINT_VERSION` (now
`"2"`), and a hash of `[budgets]`, so whole-brain lint re-checks only
changed files and stays under one second at 10k notes.

Cross-file rules cover:

- Duplicate ids (BW105), case clashes (BW110), conflict copies (BW112),
  and database files (BW115).
- Link resolution over the `edges` table
  ([index and search §3](index-and-search.md#3-schema)). An unresolved
  body link is BW310, `bw-superseded_by` link BW119, and `bw-sources`
  link BW122. A `bw-sources` link to `archive/episodes/…` is not reported
  while its episode is still under `inbox/episodes/`. The consolidation
  packet gives that path, and it resolves once
  `brain consolidate --done` archives the episode.
- A `bw-superseded_by` naming its own note (BW119), and cycles (BW307).
  Chains without a cycle are fine.
- Structure (BW4xx), the inbox (BW5xx), and `brain.toml` keys (BW109,
  BW409).

Narrowing the scope:

- Paths may be absolute, relative to the working directory, or relative
  to the brain. A path that does not exist is a not-found error.
- `--staged` runs the file rules on the bytes git has staged, so it checks
  exactly what will be committed. Cross-file rules still read the index of
  the working tree.
- `--changed` checks files modified since the last whole-brain or
  `--changed` lint (`meta.last_lint_ns`).

`brain validate` is lint with the `strict` profile and `--select` set to
`SCHEMA_CODES`. It checks the paths given, else the Markdown files git
sees as changed or new, else every note when the brain is not a git work
tree. A protected path among them gets BW121 instead of being linted. That
includes a new episode file, since it lies in the inbox. It exits 1 only
on errors. See [write path §2.3](write-path.md#23-direct-edits).

## 5. Fixes

`brain lint --fix` applies the fixes in §3 to problems at `error` or
`warning` severity, as one run.

- Fixes for `info` problems (BW405, and in `migrate` minting ids and the
  like) run only when `--select` is given, because they are suggestions,
  not repairs.
- `--select` and `--ignore` take codes or prefixes (`BW3`, `BW405`) for
  checks and fixes alike. One that matches no rule is a usage error, so a
  typo cannot pass as "no problems".
- A fix changes only the lines it must and never reflows prose.
- All fixes in one invocation form one run of kind `lint-fix`, with an
  undo record, one `log.md` entry, and one git commit when git mode is on.
- `--fix --dry-run` prints the diff and writes nothing. `--dry-run` alone
  is a usage error.
- `--fix` without `--dry-run` needs the `edit` capability under
  `--as <host>` ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles)).
- Afterwards lint runs again and prints what is left. The command exits 1
  if errors remain.
- Fixes that need judgment are never automatic: an ambiguous link, a
  secret, or a choice between conflict copies.

### 5.1 Converting format 1 and 2 notes (BW117)

The BW117 fix rewrites a note in format 3. Claims become `## Facts` and
`## History` bullets, relations become `## Related` bullets, cited
episodes and URLs become `bw-sources`, and a superseded-by relation
becomes the `bw-superseded_by` field. The full mapping is in
[brain format §13](brain-format.md#13-format-versioning).

- Episodes are never converted.
- Until a note is converted, the text of its format 2 claims stays
  searchable ([index and search §3](index-and-search.md#3-schema)).
- Like any run that writes notes, the conversion raises `format` to 3.
- `brain lint --fix --dry-run` shows the diff first, and `brain undo`
  reverses the whole conversion.

## 6. Output

Text output groups problems by file. A problem without a line shows `-`.

```
topics/search/ripgrep.md
     5  error    BW119  bw-superseded_by is set but status is 'active'  (fixable)
topics/search/fts5.md
    14  warning  BW310  link target 'SQLite policy' not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

- The "fixable with --fix" count is what `--fix` with the same options
  would repair. Fixable `info` problems are counted after it, with the
  selection that turns them on: `; 2 more with --fix --select BW405`.
- With no problems the output is `No problems (N files checked).`

`--json` emits `{problems, errors, warnings, info, fixable,
files_checked}`, each problem `{code, severity, path, line, message,
fixable}`. `--fix` adds `fixed` and `run`, and `--fix --dry-run` emits
`{fixes, diff}`. `brain validate --json` adds `checked`, the paths it
checked (null for the whole brain).

Exit codes: `0` no errors, `1` errors found, `2` usage error. The rest are
in [CLI and MCP §2.3](cli-and-mcp.md#23-exit-codes).

## 7. Reports

Reports render index queries as Markdown pages a person can browse. They
live in `reports/`, start with a "do not edit" comment, and use wikilinks
so every entry is clickable. They are never indexed as knowledge or put
into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts, last consolidation, lint totals, links to the other reports |
| `reports/stale.md` | Active notes that link to superseded or archived notes |
| `reports/inbox.md` | Pending episodes by owner and age, and open proposals |
| `reports/consolidation.md` | The last 20 consolidation runs from `log.md`, newest first: agent, summary, and each episode's pattern and notes |
| `reports/orphans.md` | Notes no other note links to |
| `reports/lint.md` | The latest lint results |

`stale.md` leaves out topic pages, which list their topic's history, and a link
from a note to the note it replaced. The visualizer's `stale` flag uses the
same query ([index and search §9](index-and-search.md#9-other-queries)).

`brain report` regenerates the reports, and so does
`brain consolidate --done` when `[reports] after_consolidate = true` (the
default). `index.md` is rewritten every time, since it carries the
generation time. The others are rewritten only when their content
changed.

Both commands write the files directly, outside any run, so brain-wiki's
run commits never include them. A `brain commit` snapshot
([write path §5](write-path.md#5-committing-direct-edits)) includes them
like any other changed file. `brain init` marks `reports/**` as `-diff` in
`.gitattributes`, because they change often.

## 8. Pre-commit integration

`brain lint --install-hook` writes `.git/hooks/pre-commit`, which changes
to the brain folder and runs `brain lint --staged --brain .`.

- Run again, it reports the hook as already installed. It refuses to
  overwrite a different hook and prints the line to add to it instead.
- When `brain` is not on `PATH`, the hook warns and lets the commit
  through.
- The hook also checks brain-wiki's own run commits. When git refuses one,
  the run stays applied and its files stay staged. The command prints
  git's message on stderr with how to finish: fix the problem, then run
  `git commit`.
- It never blocks a `brain commit` snapshot, because snapshots record
  broken states too, so they can be restored. `brain commit` sets
  `BRAIN_WIKI_SNAPSHOT=1`, and `brain lint --staged` exits 0 when it sees
  it ([write path §5.1](write-path.md#51-brain-commit)).

The repository also ships `.pre-commit-hooks.yaml`, so users of the
pre-commit framework can add the `brain-lint` hook to their config.

## 9. Alternatives considered

| Option | Why not |
|---|---|
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, links between notes, or supersession. It can run alongside. |
| JSON Schema over frontmatter | Covers part of `SCHEMA_CODES`. Duplicate ids and link targets still need the index. |
| LLM-based lint | Non-deterministic, slow, and needs a model ([D8](../decision/d08-no-model-calls.md)). The bench covers semantic quality. |
