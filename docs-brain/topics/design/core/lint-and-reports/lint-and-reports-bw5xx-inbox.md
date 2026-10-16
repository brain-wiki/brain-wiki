---
id: 01M3250V00GXGYWS1GKJ7VSH2W
type: design
title: "BW5xx: inbox"
source: "docs/design/lint-and-reports.md#bw5xx-inbox"
---
# BW5xx: inbox

| Code | Rule | Severity (strict / migrate) | Fix |
|---|---|---|---|
| BW501 | Episode changed after it was created (compared with the first hash the index saw; runs that edit an episode update it). | error / error | — |
| BW502 | Episode path does not match `YYYY/MM/<ulid>.md` for its id. | error / warning | move it |
| BW503 | Episode lacks required provenance fields. | error / warning | fill `bw-origin: agent`, `bw-inputs: unknown` |
| BW504 | A proposal references an episode that no longer exists. | warning / warning | — |
| BW505 | Episodes pending longer than `lint.stale_inbox_days` (default 14). | info / info | — |
