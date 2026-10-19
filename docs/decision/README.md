# Decisions

One file per decision. Each says what was decided and why, what was rejected, and which design documents argue it.

| Decision | Status |
|---|---|
| [D1: Files are the source of truth](d01-source-of-truth.md) | Accepted |
| [D2: Code and brains live apart](d02-code-and-brains-apart.md) | Accepted |
| [D3: Frontmatter is flat metadata](d03-flat-frontmatter.md) | Accepted |
| [D4: Five relation families with eight verbs](d04-typed-relations.md) | Superseded by [D33](d33-no-meaning-extraction.md) |
| [D5: The supersession guard](d05-supersession-guard.md) | Accepted |
| [D6: Two write paths](d06-write-paths.md) | Accepted |
| [D7: The model proposes JSON ops](d07-json-ops.md) | Superseded by [D34](d34-direct-edits.md) |
| [D8: brain-wiki calls no model itself](d08-no-model-calls.md) | Accepted |
| [D9: Provenance comes from the code path](d09-provenance-from-code.md) | Accepted |
| [D10: No access control inside a brain](d10-no-access-control-in-a-brain.md) | Accepted |
| [D11: A local folder, with optional git](d11-local-storage.md) | Accepted |
| [D12: ULIDs as identifiers](d12-ulids.md) | Accepted |
| [D13: Pending episodes are known by location](d13-inbox-by-location.md) | Accepted |
| [D14: The repo root is the plugin root](d14-repo-is-plugin-root.md) | Accepted |
| [D15: Remote MCP is designed, not built](d15-remote-mcp-later.md) | Accepted |
| [D16: Python 3.11 or newer, stdlib first](d16-python-stdlib-first.md) | Accepted |
| [D17: A WebGL visualizer with semantic zoom](d17-webgl-visualizer.md) | Accepted |
| [D18: A synthetic, deterministic bench](d18-synthetic-bench.md) | Accepted |
| [D19: Apache-2.0](d19-apache-license.md) | Accepted |
| [D20: Harvest from the hosts' session stores](d20-harvest-host-sessions.md) | Accepted |
| [D21: Gemini CLI is not supported](d21-no-gemini-cli.md) | Accepted |
| [D22: Three skills and a guided setup](d22-three-skills.md) | Accepted |
| [D23: Plugin MCP entries stay plain uvx](d23-plain-uvx-entry.md) | Accepted |
| [D24: The brain-wiki GitHub organization](d24-github-organization.md) | Accepted |
| [D25: Static instructions, not session hooks](d25-static-instructions.md) | Accepted |
| [D26: Progressive discovery](d26-progressive-discovery.md) | Accepted |
| [D27: Agents may read the brain's files](d27-direct-file-reads.md) | Accepted |
| [D28: Checked agent edits](d28-checked-edits.md) | Superseded by [D34](d34-direct-edits.md) |
| [D29: The bw- prefix and the format version](d29-bw-prefix.md) | Accepted |
| [D30: Topics form a tree](d30-topic-tree.md) | Accepted, amended by [D40](d40-every-folder-is-a-topic.md) |
| [D31: The CLI is built on Typer](d31-typer-cli.md) | Accepted |
| [D32: Format 3: notes are Markdown pages](d32-format-3.md) | Accepted, amended by [D39](d39-relation-fields.md) |
| [D33: brain-wiki does not extract meaning](d33-no-meaning-extraction.md) | Accepted, amended by [D39](d39-relation-fields.md) |
| [D34: Agents edit notes directly](d34-direct-edits.md) | Accepted |
| [D35: Git is the history of direct edits](d35-git-history.md) | Accepted |
| [D36: Harvest and import file into notes, not episodes](d36-harvest-into-notes.md) | Accepted |
| [D37: Each agent consolidates its own episodes, in a session or on a schedule](d37-per-agent-consolidation.md) | Accepted |
| [D38: A topic is a folder and its page](d38-topic-pages.md) | Accepted |
| [D39: Relations are link-only fields the author declares](d39-relation-fields.md) | Accepted |
| [D40: Every folder is a topic](d40-every-folder-is-a-topic.md) | Accepted |
