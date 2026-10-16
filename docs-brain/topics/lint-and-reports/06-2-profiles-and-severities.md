---
id: 01M3250V00FJJTQ3SHXTZQ5WSD
type: design
title: "Profiles and severities"
aliases: ["06 §2"]
tags: [lint-and-reports]
source: "docs/design/06-lint-and-reports.md#2-profiles-and-severities"
---
# Profiles and severities

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
