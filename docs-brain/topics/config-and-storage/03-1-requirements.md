---
id: 01M3250V00SE3484QSZ4DGFKEM
type: design
title: "Requirements (Config and storage)"
aliases: ["03 §1"]
tags: [config-and-storage]
source: "docs/design/03-config-and-storage.md#1-requirements"
bw-part_of:
  - "[[config-and-storage]]"
---
# Requirements (Config and storage)

| # | Requirement | Why |
|---|---|---|
| C1 | Source code and brains are separate. Installing, upgrading, or deleting brain-wiki never touches a brain. | D2; open-source hygiene; users keep data where they choose. |
| C2 | A user can have several named brains and pick one per call, per project, or per host. | Work and personal knowledge should not mix; some agents should see only one. |
| C3 | Moving a brain folder, or opening it on another device, needs at most one command. | Brains are long-lived; machines are not. |
| C4 | Nothing that sync tools or git would corrupt lives in the brain. | SQLite and lock files break under file sync (§6.3). |
| C5 | v0.1 needs nothing but a local folder. Git is used when present. | G6. |
| C6 | Remote storage can be added later without changing the format or the engine's read path. | Private git remotes, GCS, and S3 are expected next. |
