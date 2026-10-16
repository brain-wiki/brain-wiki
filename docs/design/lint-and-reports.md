# Lint and reports

Status: draft for review

## 1. Purpose

Lint is how the format in [brain format](brain-format.md) is enforced without
locking anyone out. People, Obsidian, sync tools, and agents with file
access all write to a brain; lint finds what they broke, explains it, and
fixes what is safe to fix.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | Whole brain (or given paths) | From `brain.toml` |
| `brain validate` ([write path §2.3](write-path.md#23-direct-edits)) | The notes an agent changed: the frontmatter rules only (`SCHEMA_CODES`, §3) | Always `strict` |
| Inside runs that rewrite notes (`lint --fix`, `mv`, `import --into`) | Touched files only, after the in-memory change; only errors the change introduces block it, so a note a person broke by hand does not stall every later run that touches it ([write path §7.2](write-path.md#72-lint-gate)) | Always `strict` for new content |
| Git pre-commit hook (optional) | Staged files | From `brain.toml` |
| Indexer | Parse-level problems only (BW1xx), stored in `diagnostics` | — |

Lint never needs an LLM and never touches the network.

## 2. Profiles and severities

| Profile | For | Behavior |
|---|---|---|
| `strict` | New brains and everything brain-wiki writes | All rules at their listed severity. |
| `migrate` | Imported vaults and legacy folders | Rules that legacy content commonly breaks drop to `warning` or `info`: missing ids, non-standard status, format 1 and 2 fields, unknown `bw-` fields, orphan notes. Rules that break parsing, safety, or retrieval correctness stay errors. |

Per-path overrides let a brain mix both:

```toml
[lint]
profile = "strict"

[lint.overrides]
"Archive/**" = "migrate"
"Clippings/**" = "off"        # skip entirely
```

Severities: `error` (exit code 1, blocks pre-commit), `warning`, `info`.

## 3. Rule catalog

Codes are stable; new rules get new codes, and the codes of removed rules
are not reused. "Fix" means `brain lint --fix` can repair it safely. The
codes marked † are `SCHEMA_CODES`, the frontmatter rules `brain validate`
runs alone.

### BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 † | Frontmatter is not valid YAML. | error / error | — |
| BW102 † | Frontmatter contains a nested mapping. | error / warning | — |
| BW103 † | Note has no `id`. | error / info | mint ULID |
| BW104 † | `id` is not a ULID. | error / warning | re-mint |
| BW105 † | Two files share an `id`. | error / error | re-mint the newer file's id (the oldest file keeps it; not offered for episodes) |
| BW106 † | `status` is not `active`, `superseded`, or `archived`. | error / info | move the value to `bw-stage`, set `status` (mapping table in [import](import.md)) |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy (Syncthing, Dropbox, iCloud, OneDrive, Google Drive naming). | warning / warning | — (needs a person) |
| BW114 | Leftover merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) outside code. | error / error | — |
| BW115 | A database or lock file (`*.sqlite`, `*.db`, `*-wal`, `*-shm`) inside the brain; sync tools corrupt these. | warning / warning | — |
| BW117 † | Note is in format 1 or 2: claims or relations outside the body (`bw-claims`, `bw-claims-superseded`, `bw-<verb>` relations, `## Claims` or `## Relations` sections, an unprefixed `stage`) ([brain format §13](brain-format.md#13-format-versioning)). A `bw-supersedes` relation adds a second BW117 for the note it names. | error / warning | convert to format 3 (§5.1) |
| BW118 † | Unknown `bw-` field in a note. | error / warning | — |
| BW119 † | `bw-superseded_by` is not one link, does not resolve, names its own note, or is set without `status: superseded`. | error / warning | set `status: superseded` (the status case only) |
| BW120 † | A `bw-sources` item is neither a link nor a URL. | error / warning | — |
| BW121 † | A protected file was edited ([write path §2.3](write-path.md#23-direct-edits)). Reported only by `brain validate`, for a protected path it is asked to check. | error / error | — (restore it) |
| BW122 † | A `bw-sources` link does not resolve. Skipped while the cited episode is still in the inbox (§4). | warning / info | — |

### BW3xx: links

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW307 † | Supersession cycle on `bw-superseded_by`. | error / error | — |
| BW310 | Body link does not resolve, or is ambiguous (the message lists the candidates). | warning / info | point the link at the note's current name, from the index's path history |

### BW4xx: structure and budgets

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds its budget. | error / warning | regenerate the block |
| BW404 | A top-level topic folder has no hub. (A deeper folder without a hub is not a topic, brain format §2.) | warning / info | create a hub |
| BW405 | Note is missing from its hub's `## Notes`, and no chain of body links leads to it from a note the hub lists. | info / off | append a line |
| BW406 | Orphan: no incoming links and not listed in a hub. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` managed block missing or out of date. | warning / warning | regenerate |
| BW409 | Topic slug invalid. | error / warning | — |

### BW5xx: inbox

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW501 | Episode changed after it was created (compared with the first hash the index saw; runs that edit an episode update it). | error / error | — |
| BW502 | Episode path does not match `YYYY/MM/<ulid>.md` for its id. | error / warning | move it |
| BW503 | Episode lacks required provenance fields. | error / warning | fill `bw-origin: agent`, `bw-inputs: unknown` |
| BW504 | A proposal references an episode that no longer exists. | warning / warning | — |
| BW505 | Episodes pending longer than `lint.stale_inbox_days` (default 14). | info / info | — |

### BW6xx: rules

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW601 | Rule has no `quote`. | error / warning | — |
| BW602 | Rule `origin` is not `owner`. | error / error | — |
| BW603 | Rule line does not parse. | error / error | — |

### BW7xx: safety

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — (the user must remove and rotate it) |

Removed with format 3, for readers of 0.1 output: BW113 (relation-like
properties), BW116 (format 1, now part of BW117), BW201–BW207 (claims),
BW301–BW306, BW308, BW309, BW311 (typed relations), and BW702
(instruction-like claim text). An ambiguous body link, formerly BW305, is
BW310.

## 4. How lint works

```
lint(paths, profile):
  scan()                                    # index freshness (04 §4)
  per-file rules: re-parse each file in scope (fast, line-oriented)
  cross-file rules: query the index (ids, names, edges, budgets)
  merge, apply profile and overrides, sort by path and line
```

- File rules depend only on a file's content and the manifest, so their
  results are cached in the index by content hash (keyed with
  `LINT_VERSION`, now `"2"`, and the budgets); whole-brain lint re-checks
  only files that changed.
- Cross-file rules use the index, so whole-brain lint stays under a second
  at 10k notes:
  - duplicate ids (BW105), case clashes (BW110), conflict copies (BW112),
    database files (BW115);
  - link resolution over the `edges` table
    ([index and search §3](index-and-search.md#3-schema)): an unresolved or
    ambiguous body link is BW310, a `bw-superseded_by` link BW119, a
    `bw-sources` link BW122. A `bw-sources` link to `archive/episodes/…`
    whose episode is still under `inbox/episodes/` is not reported: it is
    the path the consolidation packet gives, valid once `brain consolidate
    --done` archives the episode;
  - `bw-superseded_by` naming its own note (BW119) and cycles along
    `bw-superseded_by` (BW307). Chains without a cycle are fine;
  - structure (BW4xx) and inbox (BW5xx).
- `--staged` (pre-commit) lints staged versions from git, not the working
  tree, so it checks exactly what will be committed.
- `--changed` lints files changed since the last run, for editor
  integrations.

`brain validate` ([write path §2.3](write-path.md#23-direct-edits))
is lint with `--profile strict --select` set to `SCHEMA_CODES`, on the
paths given or the Markdown files git sees as changed (every note without
git). It adds BW121 for any protected path it is asked to check, and exits 1
only on errors.

## 5. Fixes

`brain lint --fix` applies only fixes marked above, for problems at
`error` or `warning` severity. Fixes for `info` problems (listing notes in
hubs, BW405; in `migrate`, minting ids and the like) run only when their
codes are selected with `--select`, because they are suggestions, not
repairs. `--select` and `--ignore` take codes or prefixes (`BW3`, `BW405`)
for checks and fixes alike; one that matches no rule is a usage error, so a
typo cannot pass as "no problems". Rules:

- A fix changes only the lines it must (brain format §4). It never reflows prose.
- All fixes in one invocation form one run of kind `lint-fix` with an undo
  record, one `log.md` entry, and one git commit if git mode is on.
- `--fix --dry-run` prints the diff; `--dry-run` alone is a usage error.
- `--fix` changes files, so under `--as <host>` it needs the `edit`
  capability ([CLI and MCP §1](cli-and-mcp.md#1-agent-profiles)).
- Fixes that need judgment (resolving an ambiguous link, removing a
  secret, choosing between conflict copies) are never automatic.

### 5.1 Converting format 1 and 2 notes (BW117)

The BW117 fix rewrites a note in format 3 and raises `brain.toml`'s
`format` to 3 in the same run:

| Format 1 or 2 | Format 3 |
|---|---|
| `bw-claims` (or a format-1 `## Claims` section) | `## Facts` bullets, text only; claim metadata is dropped |
| `bw-claims-superseded` | `## History` bullets, `- ~~text~~ (reason)` |
| Claim `src` file paths | `bw-sources` links: inbox paths mapped to `archive/`, `.md` dropped, deduplicated and merged with existing items; URLs kept; conversation refs (`host:session#T…`) dropped |
| `bw-<verb>` relations (or format-1 `## Relations` items) | `## Related` bullets, e.g. `- Depends on [[sqlite-version-policy]] — needs the trigram tokenizer`; a `part_of` to the note's own hub is dropped; a relation item that does not parse moves unchanged to `## Related` |
| `bw-superseded_by` relation | the `bw-superseded_by` field and `status: superseded` |
| `bw-supersedes: X` | a second fix on note X: `status: superseded` and `bw-superseded_by` linking back by the shortest unique name |
| Unprefixed `stage:` | `bw-stage` |

Items are appended to an existing `## Facts`, `## History`, or `## Related`
section rather than duplicating it. Episodes are never converted. Until a
note is converted, its claim text stays searchable
([index and search §3](index-and-search.md#3-schema)). Run `brain lint --fix
--dry-run` first to see the diff; `brain undo` reverses the whole
conversion.

## 6. Output

Text, grouped by file:

```
topics/search/ripgrep.md
     8  error    BW119  bw-superseded_by is set but status is 'active'  (fixable)
topics/search/fts5.md
    14  warning  BW310  link target 'SQLite policy' not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

The "fixable with --fix" count is what `--fix` with the same options would
repair. Fixable `info` problems are counted after it, with the selection
that turns them on: `; 2 more with --fix --select BW405`.

`--json` emits `{problems, errors, warnings, info, fixable, files_checked}`,
each problem `{code, severity, path, line, message, fixable}`.
Exit codes: `0` no errors, `1` errors found, `2` usage error; the rest as in
[CLI and MCP §2.3](cli-and-mcp.md#23-exit-codes).

## 7. Reports

Reports turn index queries into Markdown pages a person can browse, in
Obsidian or anywhere else. They live in `reports/`, start with a
"generated, do not edit" line, use wikilinks so every entry is clickable,
and are never indexed as knowledge or injected into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts (notes, hubs, links, pending and archived episodes), last consolidation, lint totals, links to the other reports |
| `reports/stale.md` | Active notes (not hubs) that link to superseded or archived notes, except a link from a note to the note it replaced. Hubs list their topic's history, and a successor naming its predecessor is not stale. The visualizer's `stale` flag uses the same query |
| `reports/inbox.md` | Pending episodes by agent and age; open proposals |
| `reports/orphans.md` | Notes nothing links to and no hub lists |
| `reports/lint.md` | The latest lint results |

`brain report` regenerates them, and `brain consolidate --done` does when
`[reports] after_consolidate = true` (default). Both write the files
directly, outside any run, so brain-wiki's run commits never include them;
a `brain commit` snapshot ([write path §5](write-path.md#5-committing-direct-edits))
includes them like any other changed file. `brain init` marks
`reports/**` as `-diff` in `.gitattributes`, because they churn.

## 8. Pre-commit integration

- `brain lint --install-hook` writes a small `.git/hooks/pre-commit` in the
  brain that runs `brain lint --staged`. Run again, it reports the hook as
  already installed. It refuses to overwrite any other existing hook and
  prints how to chain it instead.
- The hook also checks brain-wiki's own run commits. When it (or anything
  else) makes git refuse one, the run stays applied, its files stay staged,
  and the command prints git's message on stderr with how to finish: fix the
  problem, then `git commit`.
- It never blocks a `brain commit` snapshot: snapshots record broken states
  too, so they can be restored. `brain commit` sets `BRAIN_WIKI_SNAPSHOT=1`,
  and `brain lint --staged` exits 0 when it sees it ([write path §5.1](write-path.md#51-brain-commit)).
- The repository also ships `.pre-commit-hooks.yaml` so users of the
  pre-commit framework can add `brain-lint` to their own config.

## 9. Alternatives considered

| Option | Why not |
|---|---|
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, links between notes, supersession, or the index; can run alongside. |
| JSON Schema over frontmatter only | Covers only the `SCHEMA_CODES` rules, and even those need the index to resolve links and find duplicate ids. |
| LLM-based lint | Non-deterministic, slow, and needs a model; the bench covers semantic quality instead. |
