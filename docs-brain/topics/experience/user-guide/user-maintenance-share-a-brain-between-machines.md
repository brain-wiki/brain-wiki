---
id: 01M3250V00CHSMQ1729P0FMHNK
type: guide
title: "Share a brain between machines"
source: "docs/user/maintenance.md#share-a-brain-between-machines"
---
# Share a brain between machines

Push the brain to a private git remote and clone it on each machine. Give
each machine a commit job with `--push`. Each one then fetches, rebases, and
pushes, and origin carries changes between them.

Do not keep a git brain in a folder that a sync tool (iCloud, Dropbox,
Syncthing) copies between machines. Two machines committing into the same
`.git` folder can corrupt it. A brain without git can live in a synced
folder, but then direct edits have no history.
