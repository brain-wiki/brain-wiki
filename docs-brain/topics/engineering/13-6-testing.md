---
id: 01M3250V00R2BDHMKKBCDSZE51
type: design
title: "Testing (Engineering)"
aliases: ["13 §6"]
tags: [engineering]
source: "docs/design/13-engineering.md#6-testing"
---
# Testing (Engineering)

| Layer | What | Tools |
|---|---|---|
| Unit | Parsers, writers, link resolution, ops validation, profile filtering, path safety | pytest |
| Property | Parse → write → parse round trips; writers never change untouched lines; ops never delete text | hypothesis |
| Golden | Writer output for every op on fixture notes, compared byte for byte | pytest + committed expected files |
| Index | Schema, freshness (edits, renames, deletes), guard queries in both directions and through chains | pytest on temp brains |
| CLI | Every command end to end on temp brains with `BRAIN_WIKI_*_DIR` overrides | pytest + subprocess |
| MCP | Every tool via the SDK's in-memory client; error codes; schema conformance | `mcp.Client(server)` |
| Hooks | Recorded payload fixtures per host and event → expected output | pytest |
| Hosts (optional) | Plugin loads and smoke flows in real hosts where installed | marked tests, run manually or in dedicated CI jobs |
| Bench | [[eval-bench\|11]] suites; offline suites run in CI | `brain bench` |

Fixtures are synthetic: a small hand-written example brain about a
fictional software project, plus generated brains for scale tests. No
fixture may contain real personal data.

Platforms in CI: Linux and macOS on every change; Windows best-effort
(core tests only). Python 3.11 and the latest release.

## Relations
- part_of [[engineering]]
