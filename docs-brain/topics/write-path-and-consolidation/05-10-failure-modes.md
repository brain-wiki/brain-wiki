---
id: 01M3250V007RWZW40MB8M8M2R1
type: design
title: "Failure modes (Write path and consolidation)"
aliases: ["05 §10"]
tags: [write-path-and-consolidation]
source: "docs/design/05-write-path-and-consolidation.md#10-failure-modes"
bw-part_of:
  - "[[write-path-and-consolidation]]"
---
# Failure modes (Write path and consolidation)

| Failure | Result |
|---|---|
| Backend command missing or times out | Run fails before apply; episodes stay pending; error names the preset and the command line. |
| Model returns prose instead of JSON | Extraction fails → one retry with a reminder → run fails. |
| Model invents a handle or a span | V2/V3 reject it with the exact op index. |
| Crash during apply | Writes are per-file atomic. On restart, a run directory without `finished` is detected; `brain doctor` restores pre-images for files whose hash matches the recorded `after`, so a half-applied run is rolled back. |
| Index stale or busy | Selection uses a fresh scan; apply verifies note hashes from disk, not from the index. |
| Proposal file edited by hand | Accept re-parses the JSON block; invalid JSON is reported, nothing applied. |
| Origin transcript missing or unreadable | `brain_read_origin` returns `not_available`; consolidation uses the episode alone. |
| Host changes its transcript format | The session reader skips what it cannot parse; harvest reports the session as unreadable; raw capture falls back to `bw-taint: unknown` or no episode. |
