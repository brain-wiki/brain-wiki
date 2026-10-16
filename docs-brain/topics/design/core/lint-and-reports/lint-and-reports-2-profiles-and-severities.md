---
id: 01M3250V009N6Y3MN284WDYAQN
type: design
title: "Profiles and severities"
aliases: ["Lint and reports §2"]
source: "docs/design/lint-and-reports.md#2-profiles-and-severities"
---
# Profiles and severities

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
