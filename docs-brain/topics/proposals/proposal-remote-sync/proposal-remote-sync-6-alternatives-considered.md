---
id: 01M3250V00830YKV2FCQ84T8BJ
type: proposal
title: "Alternatives considered (Remote sync and object storage)"
source: "docs/proposals/remote-sync.md#6-alternatives-considered"
---
# Alternatives considered (Remote sync and object storage)

| Option | Why not |
|---|---|
| `fsspec.generic.rsync` or a cache layer as the sync engine | One-way, size-only comparison, no conflict handling. |
