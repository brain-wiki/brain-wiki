---
id: 01M3250V00EMJ17A6X27XEZVZT
type: design
title: "Matching"
aliases: ["Index and search §6.2"]
source: "docs/design/index-and-search.md#62-matching"
---
# Matching

1. Split the query into word tokens, lowercased. Each token is quoted, so
   user text is never read as FTS5 operators.
2. Drop filler words ("the", "did", "why", "what", "how", "we", and other
   common words) when any content word remains, so a question phrased as a
   sentence matches by what it is about.
3. Build `"tok1" "tok2" "tok3"*` from what is left. This is an implicit
   AND, with a prefix match on the last token when it has 2 or more
   characters, since queries are often partial words.
4. If fewer than `limit` nodes match and there is more than one token,
   also run the same tokens joined by OR.
5. If the query contains CJK text (Han, kana, or Hangul), or nothing has
   matched yet, also query `fts_tri` when it exists. It searches each CJK
   run of 3 or more characters, or each token of 3 or more characters when
   the query has no CJK.
6. CJK runs shorter than 3 characters, which trigram cannot match, use a
   bounded `LIKE` scan over `docs.title` and `docs.body`.
7. Topic, type, tag, property, and date filters apply to FTS candidates
   before scoring and truncation (R3). Candidates come in growing batches,
   starting at four times what the page needs and doubling, so
   filtered-out notes never displace matching ones.

An empty query skips text matching. It selects the filtered nodes
directly and orders them by `sort`, which is how an agent lists a topic or
asks for the latest release. A browse result's snippet is the opening
words of the body.
