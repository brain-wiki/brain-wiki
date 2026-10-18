# Concept analyses

An analysis asks whether a concept should exist in brain-wiki, and in what
shape, before anyone designs it. It gathers the concept's history, its use
cases, the behaviors it would drive, and what covers it today, then reaches
a verdict. A verdict to build something becomes a
[proposal](../proposal/README.md). A verdict that settles a question becomes
a [decision](../decision/README.md).

## Layout

A study groups the analyses of related concepts, so they share evidence and
are judged by the same criteria.

```text
docs/analysis/
├── README.md          the method and the list of studies (this file)
├── template.md        the skeleton every concept analysis follows
└── <study>/           one folder per study, such as relations/
    ├── README.md      the question, each concept with its status and verdict, shared findings
    ├── background.md  evidence every analysis in the study draws on
    ├── criteria.md    the tests every concept in the study is judged by
    ├── <concept>.md   one analysis per concept, such as part-of.md
    └── <question>.md  a question the concepts share, such as syntax.md
```

- A concept file is named after the concept in kebab case: `part-of.md`,
  `conflicts-with.md`.
- `background.md`, `criteria.md`, and shared-question files are optional.
  A small study may need only its README and the concept files.
- A concept listed in a study README has no file until someone starts it.

## Lifecycle

| Status | Meaning | Next step |
|---|---|---|
| Not started | Listed in the study README, no file yet | Copy `template.md` |
| Draft | Being written; open questions remain | Answer them |
| Concluded | Has a verdict | A proposal, a decision, or nothing |
| Proposed | A proposal carries the design | The proposal's own lifecycle |
| Built, or rejected | The design shipped, or the verdict was no | Link the decision |

An analysis is kept after its design ships, unlike a proposal. A decision
record states the decision in a paragraph, and the analysis keeps the
evidence behind it.

## Principle: fewer concepts

Every concept a user meets costs attention. A second name for an existing
concept (an alias), a concept that duplicates another, or two concepts that
overlap all make brain-wiki harder to learn and use. So an analysis:

- shows the concept is distinct from every concept brain-wiki already has;
- prefers extending an existing concept to adding a new one;
- gives the concept exactly one name, with no aliases;
- counts removing or merging a concept as a result as good as adding one.

## How to write one

1. Start from [template.md](template.md). Keep every heading, and write
   "None" where a section has nothing.
2. Ground the history in the repository: name the commit or document where
   the concept was designed, changed, or removed.
3. Judge the concept with the study's `criteria.md`, so verdicts across
   concepts compare.
4. Give each use case and test case a synthetic example with plain,
   commonly understood names: a notes app with Sync and Search topics, a
   team with its standup and projects, people with ordinary made-up names.
   Avoid invented names that read like jargon. Never use real people,
   projects, meeting series, or other real data from work or personal
   notes, even when a case is modeled on them.
5. End with the verdict, the smallest scope worth building, the evidence
   that would prove it works (bench cases), and the questions for the
   maintainer.

## Studies

| Study | Question | Status |
|---|---|---|
| [Typed relations](relations/README.md) | Which relation types should brain-wiki read again, and how should they be written? | Built 2026-10-18 in format 4 ([D39](../decision/d39-relation-fields.md)); the topic changes are still to do |
