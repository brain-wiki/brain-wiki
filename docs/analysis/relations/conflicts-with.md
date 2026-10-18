# conflicts_with: read both before acting

Status: concluded.
Study: [Typed relations](README.md).
Verdict: revive as `bw-conflicts_with`, written once on either note, with a guard between active notes.

Two notes can disagree: two proposals that cannot both ship, a rule and its
exception, two sources that report different numbers. Reading one without
the other misleads. Format 2 guaranteed that retrieving either side brought
the other; format 3 dropped that. This analysis asks whether to bring it
back.

## At a glance

- **It is the guard brain-wiki lost.** Goal G5 once covered notes that were "superseded or contradicted"; today it covers only superseded.
- **Disagreement is worth keeping.** An agent that cannot tell which of two notes is right can record the conflict instead of overwriting one, and every later reader sees both.
- **It ends where supersession begins.** Once one side is superseded or archived, the supersession guard takes over and the conflict is closed.

## 1. Definition

A conflicts_with B: reading A without B, or B without A, would mislead.
Either they contradict each other, or one limits the other. The relation
is symmetric.

| Not conflicts_with | Example | Where it belongs |
|---|---|---|
| Replaced by | "The 2027 policy replaces the 2026 policy" | `bw-superseded_by` |
| Depends on | "The decision rests on the policy" | `bw-depends_on` |
| Different but compatible | "Search and storage both use SQLite" | A plain link |

## 2. History

| When | What |
|---|---|
| Formats 1 and 2 | The conflict family: `conflicts_with`, symmetric, with aliases `contradicts`, `unless`, `invalidated_by`, `refutes`, `exception`. A guard: retrieving either side returned the other, labeled "read both before acting" |
| Format 2 consumers | Guard co-retrieval on top of the result limit; `reports/contradictions.md`; open conflicts in the briefing; red trails and a red tint on the map |
| Format 3 (`4b25b37`) | Removed, guard included. A note that disagrees says so in a sentence with a link, and G5 narrowed to supersession |

See [background](background.md).

## 3. Use cases

| Kind | Example | Why a plain link falls short | What it would unlock |
|---|---|---|---|
| Competing proposals | "Vector-Only Search Proposal" and "Use SQLite FTS5 for Local Search" | A search may rank one in and the other out | Either hit carries the other |
| Rule and exception | "Deploy on Tuesdays" and "No Deploys in Launch Week" | The rule alone gives the wrong answer in launch week | The rule always arrives with its exception |
| Disagreeing sources | "Vendor Benchmark" and "Our Benchmark" report different latencies | A reader sees one number | Both numbers, and the open question, come together |
| Unresolved capture | An agent's new episode contradicts an existing note | Overwriting loses one side; adding a note leaves them unconnected | The agent records the conflict, and a person resolves it later |

## 4. Behaviors

| Behavior | What it does |
|---|---|
| Guard | A search or read that returns either side also returns the other, labeled "conflicts with: read both", on top of the result limit, while both are active |
| Open conflicts | The briefing counts conflicts between active notes, and `reports/stale.md` lists them, so there is one report to check |
| Read | Each side shows a banner naming the other |
| Lint | A conflict that does not resolve; a note in conflict with itself; a conflict with a superseded or archived note, reported as likely resolved |
| Map | Conflict links drawn in their own color |

## 5. Today without it

| Use case | What covers it now | Gap |
|---|---|---|
| All four | A sentence and a plain link | Nothing guarantees both sides come back; a search can return one confidently |
| Resolution | Superseding the losing side | Works, but only once someone decides; until then the disagreement is invisible to retrieval |

## 6. Design questions

1. **Which note holds the field?** The relation is symmetric, so it has no
   direction. Settled (2026-10-18): one field name, `bw-conflicts_with`, written once
   on either note; the index applies it to both. Writing it on both is
   allowed and changes nothing.
2. **Do exceptions count?** Format 2 folded `unless` and `exception` in.
   Settled (2026-10-18): yes. The definition is behavioral (reading one alone
   misleads), and a rule without its exception does mislead.
3. **When does the guard stop?** Settled (2026-10-18): when either side is superseded
   or archived. Supersession then carries the reader to the current note,
   and lint suggests removing the closed conflict.
4. **Should agents write it?** Settled (2026-10-18): yes. The consolidate and harvest
   guidance says to record a conflict, not overwrite, when an episode
   contradicts a note and the agent cannot tell which is right.

## 7. Against the criteria

| Criterion | Result | Why |
|---|---|---|
| C1 engine behavior | pass | The guard, open conflicts, and banners are testable |
| C2 one distinct concept | pass | Nothing else guarantees co-retrieval of two active notes |
| C3 declared by the author | pass | Written by a person or an agent, never inferred |
| C4 writable by direct edit | pass | A list of quoted links on either note |
| C5 links only in frontmatter | pass | The nature of the conflict goes in prose |
| C6 prose stays free | pass | Why they conflict can go in `## Relations`, or nowhere |
| C7 one direction, safe chains | pass | Symmetric, so no direction to choose; the guard goes one hop, never along chains |
| C8 cost | medium | One field, the guard (built before, in format 2), a briefing line, banners, lint rules |

## 8. Verdict

**Revive as `bw-conflicts_with`, written once on either note, with a guard
between active notes.** It restores the "or contradicted" half of G5.

```markdown
---
title: Vector-Only Search Proposal
bw-conflicts_with: ["[[Use SQLite FTS5 for Local Search]]"]
---
```

- **Smallest scope worth building:** the field, symmetric in the index;
  the guard; the briefing count; banners; lint for unresolved, self, and
  closed conflicts; one line of consolidation guidance.
- **Out of scope:** a separate contradictions report, unless the stale
  report proves too crowded.
- **Evidence it works:** the test cases below, and guard recall of 100% on
  conflicts in the retrieval bench, as for supersession today.

### Test case 1: either hit carries the other

```text
topics/Search/Vector-Only Search Proposal.md        bw-conflicts_with: ["[[Use SQLite FTS5 for Local Search]]"]
topics/Search/Use SQLite FTS5 for Local Search.md   no field
```

- A search that ranks only the proposal in its top results also returns
  the FTS5 decision, labeled as a conflict.
- A search that ranks only the FTS5 decision also returns the proposal:
  the field on one note covers both.

### Test case 2: a rule and its exception

```text
topics/Company/Deploy on Tuesdays.md          bw-conflicts_with: ["[[No Deploys in Launch Week]]"]
topics/Company/No Deploys in Launch Week.md
```

- A search for "deploy day" that finds the rule also returns the
  exception.

### Test case 3: resolution closes the conflict

```text
topics/Search/Vector-Only Search Proposal.md   status: superseded, bw-superseded_by: "[[Use SQLite FTS5 for Local Search]]"
                                               bw-conflicts_with: ["[[Use SQLite FTS5 for Local Search]]"]
```

- The conflict guard no longer applies; the supersession guard carries
  readers to the FTS5 decision.
- The briefing's open-conflict count drops by one, and lint suggests
  removing the closed conflict.

## 9. Open questions

None. Settled on 2026-10-18:

| Question | Answer |
|---|---|
| Which note holds the field? | Either, once; the index applies it to both |
| Do exceptions count? | Yes |
| When does the guard stop? | When either side is superseded or archived |
| Should agents write it? | Yes, when they cannot tell which of two notes is right |

## Sources

- [Background](background.md) for the format 2 guard.
- `docs/design/02-brain-format.md` §7 and
  `docs/design/04-index-and-retrieval.md` §5, at `4b25b37^`.
- Goal G5 in [overview](../../design/overview.md).
