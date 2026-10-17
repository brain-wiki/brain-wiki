---
id: 01M3250V00NMXVMESQR9XH6AVB
type: design
title: "Requirements (Config and storage)"
aliases: ["Config and storage §1"]
source: "docs/design/config-and-storage.md#1-requirements"
---
# Requirements (Config and storage)

| # | Requirement | Why |
|---|---|---|
| C1 | Source code and brains are separate. Installing, upgrading, or deleting brain-wiki never touches a brain. | [[d02-code-and-brains-apart\|D2]]; users keep data where they choose. |
| C2 | A user can have several named brains and pick one per call, per project, or per host. | Work and personal knowledge should not mix, and some agents should see only one. |
| C3 | Moving a brain folder, or opening it on another device, needs at most one command. | Brains outlive machines. |
| C4 | Nothing that sync tools or git would corrupt lives in the brain. | SQLite and lock files break under file sync (§6.3). |
| C5 | A local folder is all a brain needs. Git is used when present. | G6, [[d11-local-storage\|D11]]. |
| C6 | Remote storage can be added later without changing the format or the engine's read path. | Private git remotes, GCS, and S3 are expected ([[proposal-remote-sync\|proposal]]). |
