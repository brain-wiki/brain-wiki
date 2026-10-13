---
id: 01M3250V00830YKV2FCQ84T8BJ
type: proposal
title: "Alternatives considered (Remote sync and object storage)"
tags: [proposals]
source: "docs/proposals/remote-sync.md#6-alternatives-considered"
bw-part_of:
  - "[[proposal-remote-sync]]"
---
# Alternatives considered (Remote sync and object storage)

| Option | Why not |
|---|---|
| `fsspec.generic.rsync` or a cache layer as the sync engine | One-way, size-only comparison, no conflict handling. |
