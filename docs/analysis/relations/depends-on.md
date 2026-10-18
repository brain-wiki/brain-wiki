# depends_on: what a note rests on

Status: concluded.
Study: [Typed relations](README.md).
Verdict: revive as `bw-depends_on` on the dependent note, for requirements only.

A decision rests on a constraint, a howto on a setup, a plan on a decision.
When the thing underneath changes, what rests on it may be wrong. This
analysis asks whether brain-wiki should know what each note rests on, and
what it would do with that.

## At a glance

- **Stale dependents are the reason.** When a note is superseded or archived, the notes that rest on it need review; only a typed relation tells them apart from notes that merely mention it.
- **The dependent declares it.** A note knows what it needs, the way code lists its imports; "what rests on this" is a backlink.
- **Requirements only.** "Caused by" stays prose: an event does not go stale when its cause changes.

## 1. Definition

A depends_on B: A holds, or works, only while B does. If B changes, is
superseded, or is archived, A may need review.

| Not depends_on | Example | Where it belongs |
|---|---|---|
| Caused by | "The outage happened because of the cache change" | Prose and a plain link |
| Part of | "This benchmark is part of the App v2 Launch" | `bw-part_of` |
| Replaced by | "This policy replaces the old one" | `bw-superseded_by` |
| Mentions | "See the SQLite docs" | A plain link |

## 2. History

| When | What |
|---|---|
| Formats 1 and 2 | The dependency family: `depends_on` and its inverse `enables`, with aliases (`requires`, `builds_on`, `uses`, `caused_by`, and `drives`, `causes`, `supports`, `unblocks` for the inverse) and qualifiers such as `weight=0.6, lag=1Q` |
| Format 2 consumers | The `why` search intent (a hit's `depends_on` targets), the `impact` intent (notes depending on a hit), the stale dependents report, `neighbors` by relation, blue trails on the map |
| Format 3 (`4b25b37`) | Removed. Each relation became a "Depends on" bullet under `## Related`, which nothing reads |

See [background](background.md).

## 3. Use cases

| Kind | Example | Why a plain link falls short | What it would unlock |
|---|---|---|---|
| Decision on a constraint | "Use SQLite FTS5 for Local Search" rests on "SQLite Version Policy" | A link may only mention the policy | When the policy is superseded, the decision is flagged for review |
| Howto on a setup | "Release Checklist" rests on "Build Server Setup" | Same | Changing the setup lists every howto that rests on it |
| Plan on a decision | "App v2 Launch" rests on "Pricing Decision" | Same | Reopening the decision shows the plans it would affect |
| Finding on a prior result | "Search Latency Study" rests on "Benchmark Method" | Same | A flaw found in the method reaches every study built on it |

## 4. Behaviors

| Behavior | What it does | Chains |
|---|---|---|
| Stale dependents | A note that rests on a superseded or archived note is listed in `reports/stale.md`, ahead of plain stale links, and counted in the briefing | one hop |
| Impact | Reading B lists the notes that rest on it ("Depended on by"); `brain_neighbors` follows them, deeper on request | on request |
| Why | Reading A lists what it rests on ("Depends on") | one hop |
| Lint | A dependency that does not resolve; a note that depends on itself | no |
| Map | Dependency links drawn in their own color | no |

## 5. Today without it

| Use case | What covers it now | Gap |
|---|---|---|
| All four | A plain link, often in a "Depends on" bullet | The link is untyped, so nothing knows that A rests on B |
| Stale dependents | `reports/stale.md` lists active notes linking to superseded or archived notes | Every mention counts, so a decision that rests on an outdated policy sits among notes that only cite it in passing |

## 6. Design questions

1. **Which side holds the field?** Settled (2026-10-18): the dependent, `bw-depends_on`
   on A. A note knows what it needs, the edit happens on the note being
   written, and "what rests on B" is a backlink. There is no `bw-enables`
   ([one direction](syntax.md)).
2. **Does it cover causation?** Format 2 mapped `caused_by` onto
   depends_on. Settled (2026-10-18): no. Its behaviors are about review when the base
   changes, and an event does not go stale when its cause changes. "Caused
   by" stays prose with a plain link, which keeps one meaning per relation
   ([fewer concepts](../README.md#principle-fewer-concepts)).
3. **Search intents or not?** Format 2 exposed why and impact as search
   intents. Settled (2026-10-18): no intents, which were a concept of their own; the
   read outline lists "Depends on" and "Depended on by", and
   `brain_neighbors` filters by relation.
4. **One stale report or two?** Settled (2026-10-18): one `reports/stale.md`, with
   dependents first and plain stale links after, so there is one place to
   look.

## 7. Against the criteria

| Criterion | Result | Why |
|---|---|---|
| C1 engine behavior | pass | Stale dependents, impact, and why are testable |
| C2 one distinct concept | partial | Overlaps plain links and the stale-links report; distinct because it says A rests on B, not that A mentions B |
| C3 declared by the author | pass | The dependent's author writes the field |
| C4 writable by direct edit | pass | A list of quoted links on the note being written |
| C5 links only in frontmatter | pass | Format 2's qualifiers move to prose |
| C6 prose stays free | pass | Why A needs B can go in `## Relations`, or nowhere |
| C7 one direction, safe chains | pass | One field, on the dependent; chains of requirements are one kind, so following them for impact is sound |
| C8 cost | medium | One field, index edges, a report section, read outline lines, a lint rule |

## 8. Verdict

**Revive as `bw-depends_on` on the dependent note, for requirements only.**

```markdown
---
title: Use SQLite FTS5 for Local Search
bw-depends_on: ["[[SQLite Version Policy]]"]
---
```

- **Smallest scope worth building:** the field; stale dependents in
  `reports/stale.md` and the briefing; "Depends on" and "Depended on by"
  in the read outline; `brain_neighbors` by relation; lint for unresolved
  items and self-dependency.
- **Out of scope:** search intents, causation, weights and other
  qualifiers.
- **Evidence it works:** the test cases below.

### Test case 1: a superseded policy flags a decision

```text
topics/Search/Use SQLite FTS5 for Local Search.md  bw-depends_on: ["[[SQLite Version Policy]]"]
topics/Search/SQLite Version Policy.md             status: superseded, bw-superseded_by: "[[SQLite Version Policy 2027]]"
topics/Search/Search Overview.md                   links to SQLite Version Policy in a sentence
```

- `reports/stale.md` lists the FTS5 decision under dependents, and Search
  Overview only under plain stale links.
- The FTS5 decision stays `active`; nothing changes it.

### Test case 2: impact of a change

```text
topics/Infra/Build Server Setup.md
topics/Infra/Release Checklist.md        bw-depends_on: ["[[Build Server Setup]]"]
topics/Infra/Nightly Tests.md            bw-depends_on: ["[[Build Server Setup]]"]
```

- Reading Build Server Setup lists Nightly Tests and Release Checklist
  under "Depended on by".
- `brain_neighbors("Build Server Setup", relations=["depends_on"],
  direction="in")` returns the same two notes.

### Test case 3: causation stays prose

```text
topics/Company/Records/2026-10-14 Outage.md   "caused by the [[Cache Config Change]]" in its body
```

- The outage is not listed as resting on the change, and superseding the
  change flags nothing.

## 9. Open questions

None. Settled on 2026-10-18:

| Question | Answer |
|---|---|
| Which side holds the field? | The dependent, in `bw-depends_on` |
| Does it cover causation? | No. "Caused by" stays prose |
| Search intents? | No. Relations show in the read outline and `brain_neighbors` |
| One stale report or two? | One, `reports/stale.md`, with dependents first |

## Sources

- [Background](background.md) for the format 2 model and its consumers.
- `docs/design/04-index-and-retrieval.md` §6.4 (intents) and §9 (stale
  dependents), at `4b25b37^`.
- The stale-links query in
  [index and search §9](../../design/index-and-search.md#9-other-queries).
