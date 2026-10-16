---
id: 01M3250V00R2BDHMKKBCDSZE51
type: design
title: "Testing (Engineering)"
aliases: ["13 §6"]
source: "docs/design/13-engineering.md#6-testing"
---
# Testing (Engineering)

| Layer | What | Tools |
|---|---|---|
| Unit | Parsers, writers, format 1/2 → 3 conversion, `brain validate`, link resolution, profile filtering, path safety | pytest |
| Property | Parse → write → parse round trips; writers never change untouched lines; conversion keeps every claim's text | hypothesis |
| Index | Schema, freshness (edits, renames, deletes), supersession guards in both directions and through chains | pytest on temp brains |
| Commit and schedule | `brain commit` on temp git repositories with a local origin; crontab and LaunchAgent backends through an injected command runner, never the real crontab or launchd | pytest |
| CLI | Every command end to end on temp brains with `BRAIN_WIKI_*_DIR` overrides | pytest + subprocess |
| MCP | Every tool via the SDK's in-memory client; error codes; schema conformance | `mcp.Client(server)` |
| Session readers | Synthetic sessions per host → normalized turns, routing, inputs | pytest |
| Plugin | Manifests parse and agree, skills follow the Agent Skills rules | pytest (`tests/test_plugin.py`) |
| Hosts | Plugin loads and smoke flows in real hosts | by hand before releases; no automated host tests |
| Bench | [[eval-bench\|11]] `retrieval` and `lint` suites on a small brain | `brain bench`, from `scripts/check.py` |

Fixtures are synthetic: a small hand-written example brain about a
fictional software project, plus generated brains for scale tests. No
fixture may contain real personal data.

Platforms in CI: Ubuntu and macOS, Python 3.11 and 3.13 (§8). Windows is
best-effort and not tested in CI.
