---
id: 01M3250V00KQJC2DWA0XS9E3T8
type: design
title: "Goals (Overview)"
aliases: ["01 §3"]
tags: [overview]
source: "docs/design/01-overview.md#3-goals"
---
# Goals (Overview)

| ID | Goal | How we will know (v0.1) |
|---|---|---|
| G1 | **Files are the source of truth.** Everything the system knows is in the brain directory, readable and editable by humans with any editor, and works in Obsidian. | Deleting the index and rebuilding it loses nothing. A brain round-trips through Obsidian edits without lint errors. |
| G2 | **Works with the agents people use.** One brain serves Claude Code, Codex, Antigravity, OpenClaw (bundle mode), Cursor, and generic MCP clients. | The plugin loads in each host; `brain connect <host>` wires it; an end-to-end smoke test per host passes (see [[agent-integrations\|08]]). |
| G3 | **Code and data are separate.** The repo holds only source. Brains live at user-chosen locations; one user can have several named brains. | No brain content in the repo; config selects brains by name per project, per host, or per call. |
| G4 | **Writes are safe.** Untrusted content cannot become a standing directive automatically; every change to a note is reversible. | Rules change only with the user's verbatim words and confirmation; `brain undo` restores the exact prior bytes of a run; git restores a direct edit that `brain commit` recorded. |
| G5 | **Retrieval is correct about change.** When a note has been superseded, retrieving it also retrieves the newer note. | Guard recall is 100% on the bench retrieval suite. |
| G6 | **No required services or keys.** Runs offline on a laptop with Python and SQLite. | Core features pass tests with no network access. |
| G7 | **Fast enough to call on every turn.** | At 10,000 notes: search p95 < 50 ms warm; unchanged-tree freshness check < 150 ms. See [[engineering\|13]]. |
| G8 | **Measurable.** Retrieval quality, lint accuracy, and performance are measured by a reproducible bench. | `brain bench` runs offline on synthetic data and produces a JSON and Markdown report. |
