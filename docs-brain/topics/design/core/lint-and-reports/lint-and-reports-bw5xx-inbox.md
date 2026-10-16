---
id: 01M3250V00GXGYWS1GKJ7VSH2W
type: design
title: "BW5xx: inbox"
source: "docs/design/lint-and-reports.md#bw5xx-inbox"
---
# BW5xx: inbox

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
