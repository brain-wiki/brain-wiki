# 06 · Lint and reports

Status: draft for review

## 1. Purpose

Lint is how the format in [02](02-brain-format.md) is enforced without
locking anyone out. People, Obsidian, sync tools, and agents with file
access all write to a brain; lint finds what they broke, explains it, and
fixes what is safe to fix.

| Where lint runs | Scope | Profile |
|---|---|---|
| `brain lint` | Whole brain (or given paths) | From `brain.toml` |
| Inside every apply (consolidation, review accept, rule change, fix) | Touched files only, after the in-memory apply; only errors the change introduces block it, so a note a person broke by hand does not stall every later run that touches it | Always `strict` for new content |
| Git pre-commit hook (optional) | Staged files | From `brain.toml` |
| Indexer | Parse-level problems only (BW1xx), stored in `diagnostics` | — |

Lint never needs an LLM and never touches the network.

## 2. Profiles and severities

| Profile | For | Behavior |
|---|---|---|
| `strict` | New brains and everything brain-wiki writes | All rules at their listed severity. |
| `migrate` | Imported vaults and legacy folders | Rules that legacy content commonly breaks (missing ids, non-standard status, alias verbs, orphan notes) drop to `info`. Rules that break parsing, safety, or retrieval correctness stay errors. |

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

Codes are stable; new rules get new codes. "Fix" means `brain lint --fix`
can repair it safely.

### BW1xx: files and frontmatter

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW101 | Frontmatter is not valid YAML. | error / error | — |
| BW102 | Frontmatter contains a nested mapping. | error / warning | — |
| BW103 | Note has no `id`. | error / info | mint ULID |
| BW104 | `id` is not a ULID. | error / warning | re-mint |
| BW105 | Two files share an `id`. | error / error | re-mint the newer file's id (the oldest file keeps it; not offered for episodes) |
| BW106 | `status` is not `active`, `superseded`, or `archived`. | error / info | move the value to `bw-stage`, set `status` (mapping table in [09](09-import.md)) |
| BW109 | Unknown key in `brain.toml`. | warning / warning | — |
| BW110 | Two paths differ only by letter case. | warning / warning | — |
| BW111 | File is not valid UTF-8. | error / error | — |
| BW112 | File looks like a sync conflict copy (Syncthing, Dropbox, iCloud, OneDrive, Google Drive naming). | warning / warning | — (needs a person) |
| BW113 | A frontmatter property holds wikilinks that look like relations (`related`, `parent`, `up`…). | info / info | convert to `bw-<verb>` relations |
| BW114 | Leftover merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) outside code. | error / error | — |
| BW115 | A database or lock file (`*.sqlite`, `*.db`, `*-wal`, `*-shm`) inside the brain; sync tools corrupt these. | warning / warning | — |
| BW116 | Note is in format 1: `## Claims` or `## Relations` sections, or an unprefixed `stage` ([02 §13](02-brain-format.md#13-format-versioning)). | warning / info | convert to format 2 |

### BW2xx: claims

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW201 | Claim metadata is malformed, or a `bw-claims` item is not a string. | error / warning | — |
| BW202 | Duplicate claim id. | error / error | re-mint |
| BW203 | `by:` points to a claim that does not exist. | error / warning | — |
| BW204 | `src:` points to a missing file or a line range outside it. | warning / info | — |
| BW205 | Claim has no metadata (human-written). | info / off | assign an id |
| BW206 | Two active claims cite the same source span with near-identical text (likely double consolidation). | warning / warning | — |
| BW207 | More than one `## Claims` section (format 1). | error / warning | — |

### BW3xx: relations and links

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW301 | Relation does not parse. | error / warning | — |
| BW302 | Unknown relation verb, or an unknown `bw-` field. | error / warning | — |
| BW303 | Alias verb instead of canonical (`bw-requires`). | warning / info | move to the canonical field, keep the alias as qualifier |
| BW304 | Relation target does not resolve. | error / warning | repair via id history when possible |
| BW305 | Relation target is ambiguous. | error / error | — (lists candidates) |
| BW306 | Note relates to itself. | error / error | — |
| BW307 | Supersession cycle. | error / error | — |
| BW308 | Target of `supersedes` is not `status: superseded`. | warning / info | set status |
| BW309 | Contradictory containment (A part_of B and B part_of A). | error / error | — |
| BW310 | Body link does not resolve. | warning / info | repair via id history |
| BW311 | More than one `## Relations` section (format 1). | error / warning | — |

### BW4xx: structure and budgets

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW402 | `rules.md` exceeds its line or character budget. | error / error | — |
| BW403 | `AGENTS.md` exceeds its budget. | error / warning | regenerate the block |
| BW404 | A top-level topic folder has no hub. (A deeper folder without a hub is not a topic, 02 §2.) | warning / info | create a hub |
| BW405 | Note is missing from its hub's `## Notes`, and no `part_of` chain leads from it to the hub or to a note the hub lists. | info / off | append a line |
| BW406 | Orphan: no incoming links and not listed in a hub. | info / off | — |
| BW407 | Note outside any topic. | info / off | — |
| BW408 | `AGENTS.md` managed block missing or out of date. | warning / warning | regenerate |
| BW409 | Topic slug invalid. | error / warning | — |

### BW5xx: inbox

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW501 | Episode changed after it was created (compared with the first hash the index saw; runs that edit an episode update it). | error / error | — |
| BW502 | Episode path does not match `YYYY/MM/<ulid>.md` for its id. | error / warning | move it |
| BW503 | Episode lacks required provenance fields. | error / warning | fill `bw-origin: agent`, `bw-inputs: unknown` |
| BW504 | A proposal references an episode that no longer exists. | warning / warning | — |
| BW505 | Episodes pending longer than `lint.stale_inbox_days` (default 14). | info / info | — |

### BW6xx: rules

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW601 | Rule has no `quote`. | error / warning | — |
| BW602 | Rule `origin` is not `owner`. | error / error | — |
| BW603 | Rule line does not parse. | error / error | — |

### BW7xx: safety

| Code | Rule | Severity | Fix |
|---|---|---|---|
| BW701 | Text matches a secret pattern (API key, token, private key). | error / error | — (the user must remove and rotate it) |
| BW702 | Instruction-like text ("ignore previous instructions", "you must now…") in a claim with `inputs` ≠ `local`. | warning / warning | — |

## 4. How lint works

```
lint(paths, profile):
  scan()                                    # index freshness (04 §4)
  per-file rules: re-parse each file in scope (fast, line-oriented)
  cross-file rules: query the index (ids, names, edges, claims, budgets)
  merge, apply profile and overrides, sort by path and line
```

- File rules depend only on a file's content and the manifest, so their
  results are cached in the index by content hash; whole-brain lint
  re-checks only files that changed.
- Cross-file rules (BW105, BW110, BW112, BW2xx sources, BW3xx resolution,
  BW4xx structure, BW5xx inbox) use the index, so whole-brain lint stays
  under a second at 10k notes.
- `--staged` (pre-commit) lints staged versions from git, not the working
  tree, so it checks exactly what will be committed.
- `--changed` lints files changed since the last run, for editor
  integrations.

`brain check` ([05 §2.3](05-write-path-and-consolidation.md#23-checked-agent-edits))
reuses the per-file rules for the notes an agent edited and adds checks that
need the note's last recorded version: claims deleted or reworded in place,
large deletions, and protected files. Pending edits (a
note that differs from its last recorded version) are reported by `brain
check`, not by lint, so hand edits never raise warnings.

## 5. Fixes

`brain lint --fix` applies only fixes marked above, for problems at
`error` or `warning` severity. Fixes for `info` problems (minting claim ids,
converting frontmatter relations, listing notes in hubs) run only when
their codes are selected with `--select`, because they are suggestions, not
repairs. `--select` and `--ignore` take codes or prefixes (`BW3`, `BW405`)
for checks and fixes alike; one that matches no rule is a usage error, so a
typo cannot pass as "no problems". Rules:

- A fix changes only the lines it must (02 §4). It never reflows prose.
- All fixes in one invocation form one run with an undo record, one
  `log.md` entry, and one git commit if git mode is on.
- `--fix --dry-run` prints the diff; `--dry-run` alone is a usage error.
- `--fix` changes files, so under `--as <host>` it needs the `edit`
  capability ([07 §1](07-interfaces.md#1-agent-profiles)).
- Fixes that need judgment (resolving an ambiguous link, removing a
  secret, choosing between conflict copies) are never automatic.

## 6. Output

Text, grouped by file:

```
topics/search/ripgrep.md
  12  warning  BW308  superseded by "fts5" but status is "active"  (fixable)
topics/search/fts5.md
  31  error    BW304  relation target "SQLite policy" not found; did you mean "SQLite version policy"?
2 problems (1 error, 1 warning), 1 fixable with --fix
```

The "fixable with --fix" count is what `--fix` with the same options would
repair. Fixable `info` problems are counted after it, with the selection
that turns them on: `; 2 more with --fix --select BW205,BW405`.

`--json` emits a list of `{code, severity, path, line, message, fixable}`.
Exit codes: `0` no errors, `1` errors found, `2` usage error; the rest as in
[07 §2.3](07-interfaces.md#23-exit-codes).

## 7. Reports

Reports turn index queries into Markdown pages a person can browse, in
Obsidian or anywhere else. They live in `reports/`, start with a
"generated, do not edit" line, use wikilinks so every entry is clickable,
and are never indexed as knowledge or injected into prompts.

| File | Contents |
|---|---|
| `reports/index.md` | Counts, last consolidation, links to the other reports |
| `reports/contradictions.md` | Active `conflicts_with` pairs, with the qualifier and note |
| `reports/stale.md` | Active notes that depend on superseded or archived notes |
| `reports/unverified.md` | Notes with claims whose `inputs` are external or unknown, by count |
| `reports/inbox.md` | Pending episodes by age and agent; open proposals |
| `reports/duplicates.md` | Claims citing the same source span (BW206) |
| `reports/orphans.md` | Notes with no incoming links and not in a hub |
| `reports/lint.md` | The latest lint results |

`brain report` regenerates them; consolidation runs regenerate them when
`[reports] after_consolidate = true` (default). Report files are excluded
from git commits made by brain-wiki unless the user opts in, because they
churn on every run.

## 8. Pre-commit integration

- `brain lint --install-hook` writes a small `.git/hooks/pre-commit` in the
  brain that runs `brain lint --staged`. Run again, it reports the hook as
  already installed. It refuses to overwrite any other existing hook and
  prints how to chain it instead.
- The hook also checks brain-wiki's own run commits. When it (or anything
  else) makes git refuse one, the run stays applied, its files stay staged,
  and the command prints git's message on stderr with how to finish: fix the
  problem, then `git commit`.
- The repository also ships `.pre-commit-hooks.yaml` so users of the
  pre-commit framework can add `brain-lint` to their own config.

## 9. Alternatives considered

| Option | Why not |
|---|---|
| A general Markdown linter (markdownlint, remark) | Knows nothing about ids, relations, claims, or the index; can run alongside. |
| JSON Schema over frontmatter only | Covers a tenth of the rules; cross-file checks need the index anyway. |
| LLM-based lint | Non-deterministic, slow, and needs a model; the bench covers semantic quality instead. |
