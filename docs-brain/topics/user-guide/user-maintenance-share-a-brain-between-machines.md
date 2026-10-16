---
id: 01M3250V00CHSMQ1729P0FMHNK
type: guide
title: "Share a brain between machines"
tags: [user-guide]
source: "docs/user/maintenance.md#share-a-brain-between-machines"
---
# Share a brain between machines

Push the brain to a private git remote and clone it on each machine. With a
commit job that pushes on every machine, each one fetches, rebases, and
pushes, so origin is how changes move between them.

Do not keep a git brain in a folder that a sync tool (iCloud, Dropbox,
Syncthing, …) copies between machines: two machines committing into the same
`.git` folder can corrupt it. A brain without git can live in a synced
folder, but then direct edits have no history.
