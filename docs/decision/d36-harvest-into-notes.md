# D36: Harvest and import file into notes, not episodes

Status: accepted.
Argued in: [write path §2.2](../design/write-path.md#22-harvesting-sessions), [import §6](../design/import.md#6-documents-and-memory-files), [episode lifecycle proposal](../proposal/episode-lifecycle.md).

Harvest and import are already off the busy path, so they skip the inbox. The agent whose sessions they are, or the agent the user asks to import documents or memory files, applies the consolidation patterns directly and files notes. A note cites a session with a session URL (`session://<host>/<session id>#turns=A-B`) and a document with its URL or the record note made from it. brain-wiki still reads, filters, routes, and scrubs sessions and computes their provenance (D20); `brain_harvest_done` checks that the notes cite the session before it advances the watermark. `brain harvest --apply`, `--raw`, and `--distill`, and `brain import --to-episodes` and `--from`, are removed.

Episodes remain for mid-task capture, where the agent cannot stop to organize. Each agent consolidates its own episodes, and another agent's only when the user asks.

## Alternatives considered

- Harvest and import write episodes for a later consolidation, as before. The agent reading the session or document is the best placed to file it, and the second pass added cost without adding provenance.
- Headless distillation with tools off, kept for large backfills. It cannot search or edit the brain, so it could only write episodes; a backfill runs over several rounds or scheduled runs instead.
- Citing local file paths for imported documents. A brain moves between machines, so a path would not resolve elsewhere and would leak the machine's layout.
