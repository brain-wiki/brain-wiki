---
id: 01M3250V00N7K26KGFFZD5VDWS
type: design
title: "Fixes"
aliases: ["Lint and reports §5"]
source: "docs/design/lint-and-reports.md#5-fixes"
---
# Fixes

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
  `--as <host>` ([[cli-and-mcp-1-agent-profiles|CLI and MCP §1]]).
- Afterwards lint runs again and prints what is left. The command exits 1
  if errors remain.
- Fixes that need judgment are never automatic: an ambiguous link, a
  secret, or a choice between conflict copies.

## Subsections
- [[lint-and-reports-51-converting-format-1-and-2-notes-bw117]]: Converting format 1 and 2 notes (BW117)
