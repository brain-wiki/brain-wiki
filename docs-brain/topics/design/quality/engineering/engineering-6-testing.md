---
id: 01M3250V00XK0PBQZQV7MW8BJD
type: design
title: "Testing (Engineering)"
aliases: ["Engineering §6"]
source: "docs/design/engineering.md#6-testing"
---
# Testing (Engineering)

| Layer | What | How |
|---|---|---|
| Unit | Parsers, writers, format conversion, `brain validate`, link resolution, profiles, path safety | pytest |
| Property | Frontmatter writes never touch the body; quoted values are valid YAML; conversion keeps every claim's text | hypothesis |
| Index | Schema, freshness (edits, renames, deletes), supersession guards in both directions and through chains | pytest on temporary brains |
| Commit and schedule | `brain commit` on temporary git repositories with a local origin; crontab and LaunchAgent backends through an injected command runner | pytest |
| CLI | Commands end to end on temporary brains with `BRAIN_WIKI_*` overrides | pytest, calling `main()` in process |
| MCP | Every tool through the SDK's in-memory client; error codes; schema conformance | `mcp.Client(server)` |
| Session readers | Synthetic sessions per host to normalized turns, routing, inputs | pytest |
| Plugin | Manifests parse and agree; skills follow the Agent Skills rules | `tests/test_plugin.py` |
| Hosts | The plugin loads in real hosts, and smoke flows work | By hand before releases |
| Bench | [[eval-bench\|Eval bench]] `retrieval` and `lint` suites on a 300-note brain | `brain bench`, from `scripts/check.py` |

Fixtures are synthetic: a small hand-written example brain about the
fictional notes app Lumen (`tests/fixtures/example-brain/`), plus generated
brains for scale tests. No fixture may contain real personal data.

CI runs on Ubuntu and macOS with Python 3.11 and 3.13 (§8). Windows is
best-effort and not tested in CI.
