---
id: 01M3250V004M6MK3V9C14T2992
type: proposal
title: "Alternatives considered (Remote sync and object storage)"
aliases: ["Remote sync and object storage §6"]
source: "docs/proposal/remote-sync.md#6-alternatives-considered"
---
# Alternatives considered (Remote sync and object storage)

| Option | Why not |
|---|---|
| `fsspec.generic.rsync` or a cache layer as the sync engine | One-way, size-only comparison, no conflict handling. |
