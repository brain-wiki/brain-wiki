---
id: 01M3250V00V433703QGMZ2D7WR
type: design
title: "Matching"
aliases: ["04 §6.2"]
tags: [index-and-retrieval]
source: "docs/design/04-index-and-retrieval.md#62-matching"
bw-part_of:
  - "[[04-6-search]]"
---
# Matching

1. Tokenize the query with the same Unicode rules as the index; drop FTS5
   syntax characters so user text can never be interpreted as operators.
2. Drop filler words ("the", "did", "why", "what", "how", "we"…) when any
   content word remains, so a question phrased as a sentence matches by what
   it is about. Build `"tok1" "tok2" "tok3"*` from what is left (implicit
   AND, prefix match on the last token, since queries are often partial
   words).
3. If fewer than `limit` nodes match, retry with OR between the same
   tokens.
4. If the query contains CJK or other unsegmented script, or the token
   query found nothing, also query `fts_tri` (trigram) with each run of 3+
   characters. Shorter runs fall back to a bounded `LIKE` scan over
   `docs.title` and `docs.body` (trigram cannot match fewer than 3
   characters).
5. Topic, type, tag, property, and date filters are applied to FTS
   candidates before scoring and truncation (R3). Candidates are fetched in
   growing batches, so filtered-out notes never displace matching ones.
6. An empty query skips steps 1–4: it selects the filtered nodes directly and
   orders them by `sort`, which is how an agent lists a topic or asks for the
   latest release.
