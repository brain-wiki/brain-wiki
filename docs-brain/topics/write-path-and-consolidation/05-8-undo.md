---
id: 01M3250V00YW3RBMG96CS38F28
type: design
title: "Undo (Write path and consolidation)"
aliases: ["05 §8"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#8-undo"
---
# Undo (Write path and consolidation)

Every run writes a record to the brain's state directory,
`<state>/brains/<brain-key>/runs/<run>/record.json`
([[03-4-machine-state|03 §4]]):

```json
{
  "run": "run-01JA0D7F…", "kind": "consolidate", "brain": "01J9Z7M0…",
  "started": "…", "finished": "…", "status": "applied",
  "agent": "claude-code", "summary": "archived 2 episodes",
  "files": [
    {"path": "log.md", "before": "sha256:…", "after": "sha256:…", "append_only": true},
    {"path": "inbox/episodes/2026/10/01JA….md", "before": "sha256:…", "after": "sha256:…",
     "moved_to": "archive/episodes/2026/10/01JA….md"}
  ],
  "git_commit": "3f2a…", "git_error": null,
  "undoes": null, "undone_by": null
}
```

`status` is `applying`, `applied`, `failed`, or `rolled_back`. Pre-images
are stored next to it (`preimages/<sha256>.gz`). `brain runs` lists records
newest first and `brain runs show [RUN]` prints one.

`brain undo [<run>]` (default: the latest applied run on this device that
is not an undo and was not undone):

- For each file, if its current hash equals `after`, restore the pre-image
  (or delete it if `before` is null) and move episodes back. `log.md` is
  append-only and not restored. If any file changed since the run (a direct
  edit counts), refuse and list them; files no later change touched do not
  block, so an older run can be undone. `--force` saves the current
  versions under `<state>/brains/<brain-key>/runs/<run>/conflicts/` first.
- Undo is itself a run (`kind: undo`, §7.3): logged in `log.md` and, in a
  git brain, committed with exactly the restored files, deletions included.
  The undone record gets `undone_by`, and undoing it again is a `conflict`.
- Git is never the source of what to restore, the pre-images are: a run can
  touch files git never saw (an uncommitted episode), and a `git revert` of
  an older run conflicts on `log.md`.
- Undo is the user's decision: refused under `--as`, and there is no MCP
  undo tool.

Direct edits have no run record, so `brain undo` cannot reverse them; git
can (§2.3, §5).

Retention: the last 200 runs or 90 days, whichever keeps more. Older runs can no
longer be undone by `brain undo`; in a git brain, their commits can still be reverted
with git.
