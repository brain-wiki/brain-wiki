---
id: 01M3250V008ETPVZQQX0408EAC
type: design
title: "Undo (Write path)"
aliases: ["Write path §8"]
source: "docs/design/write-path.md#8-undo"
---
# Undo (Write path)

Every run writes a record to
`<state>/brains/<brain-key>/runs/<run>/record.json`
([[config-and-storage-4-machine-state|config and storage §4]]). Abridged:

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
  "undoes": null, "undone_by": null, "error": null
}
```

`status` is `applying`, `applied`, `failed`, or `rolled_back`. Pre-images
are stored next to the record as `preimages/<sha256>.gz`. `brain runs`
lists records newest first, and `brain runs show [RUN]` prints one (default
the newest).

`brain undo [<run>] [--force]` defaults to the latest applied run on this
device that is not an undo and was not undone.

- Undo restores each file's pre-image, deletes files the run created, and
  moves episodes back. `log.md` is append-only and not restored.
- If any file changed since the run (its hash is not `after`), undo refuses
  and lists them. Files no later change touched do not block, so an older
  run can be undone. `--force` first saves the current versions under
  `<state>/brains/<brain-key>/runs/<run>/conflicts/`.
- Undo is itself a run (`kind: undo`, §7.3), logged and, in a git brain,
  committed with exactly the restored files. The undone record gets
  `undone_by`, and undoing it again is a `conflict`.
- Pre-images, not git, are the source. A run can touch files git never saw
  (an uncommitted episode), and a `git revert` of an older run conflicts on
  `log.md`.
- Undo is refused under `--as`, and there is no MCP undo tool.

Direct edits have no run record; git reverses them (§5). Retention is the
last 200 runs or 90 days, whichever keeps more. Older runs cannot be undone
with `brain undo`, but their commits can still be reverted.
