---
id: 01M3250V00YW3RBMG96CS38F28
type: design
title: "Undo (Write path and consolidation)"
aliases: ["05 §8"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#8-undo"
bw-part_of:
  - "[[write-path-and-consolidation]]"
---
# Undo (Write path and consolidation)

Every run (consolidation, rule change, review accept, import apply,
`lint --fix`, `mv`) writes a record to `<state>/runs/<run>/`:

```json
{
  "run": "run-01JA0D7F…", "kind": "consolidate", "brain": "01J9Z7M0…",
  "started": "…", "finished": "…", "status": "applied",
  "backend": "agent", "agent": "claude-code", "model": null,
  "packet_sha256": "…", "ops": [ … ], "warnings": [ … ],
  "files": [
    {"path": "topics/search/fts5.md", "before": "sha256:…", "after": "sha256:…"},
    {"path": "inbox/episodes/2026/10/01JA….md", "moved_to": "archive/episodes/2026/10/01JA….md"},
    {"path": "topics/search/trigram.md", "before": null, "after": "sha256:…"}
  ],
  "git_commit": "3f2a…"
}
```

Pre-images are stored next to it (`preimages/<sha256>`, gzip).

`brain undo [<run>]` (default: the latest applied run on this device):

- For each file, if its current hash equals `after`, restore the pre-image
  (or delete it if `before` is null) and move episodes back. `log.md` is
  append-only and not restored. If any file changed since the run, refuse
  and list them; files no later run touched do not block, so an older run
  can be undone. `--force` saves the current versions under
  `<state>/runs/<run>/conflicts/` first.
- Undo is itself a run (`kind: undo`, §7.3): logged in `log.md` and, in a
  git brain, committed with exactly the restored files, deletions included.
- Git is never the source of what to restore, the pre-images are: a run can
  touch files git never saw (an uncommitted episode, a proposal), and a
  `git revert` of an older run conflicts on `log.md`.

Retention: the last 200 runs or 90 days, whichever keeps more. Older runs can no
longer be undone by `brain undo`; in a git brain, their commits can still be reverted
with git.
