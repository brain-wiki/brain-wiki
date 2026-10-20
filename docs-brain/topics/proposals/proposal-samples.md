---
id: 01M3250V00E8HMTSHW2S7V01PF
type: proposal
title: "Sample brains"
source: "docs/proposal/samples.md"
---
# Sample brains

Status: draft; open questions SQ1 to SQ4. Not built.

A new user meets an empty brain. They cannot see what a mature brain looks
like, how its topics are organized, or what an agent does with it, until
they have filled one themselves. This proposal turns the
`brain-wiki-samples` repository into two filled brains, one for work and
one for personal life, that a user can explore first and then start their
own brain from.


## 1. What a sample is for

Each sample serves two uses, with no new concept in brain-wiki:

| Use | Command | What the user gets |
|---|---|---|
| Explore | `brain viz --brain Work`, or `brain brains add Work ./Work` and point an agent at it | A mature brain to browse, search, and question |
| Start from it | `brain init ~/brains/work --template ./Work` | The sample's folders, topic pages, and topic rules, with no notes ([[d44-brain-templates\|D44]]) |

`--template` already accepts a brain and copies only its topic tree
([[config-and-storage-5-brain-lifecycle|config and storage §5.1]]),
so a sample needs nothing beyond being a valid brain. D44's objection to
templates with notes still holds: the notes stay in the sample and never
reach the user's brain.


## 2. Two samples, one person

Work and personal knowledge belong in separate brains
([[config-and-storage|config and storage, C2]]), so the
samples are two brains. Both belong to the same made-up person, Rin Sato,
a software engineer on a notes app. Each brain works on its own, and
together they show the two-brain setup and where its boundary lies.

```text
brain-wiki-samples/
├── README.md        the two samples, prompts to try, template commands,
│                    and how to register both brains with harvest routes
├── Work/            a brain
├── Personal/        a brain
└── .github/workflows/check.yml
```

The topic rules decide the cases that cross the boundary:

- An equity grant is compensation, so it lives in `Personal/Money/Equity`,
  not in the work brain, even though the employer issued it.
- A promotion case is about Rin's career, so it lives in
  `Personal/Career`. The projects it cites are named in plain text, since
  links do not cross brains.
- A coworker who is also a friend has a note in each brain: work facts in
  `Work/People`, personal ones in `Personal/People`.


## 3. Work

About 150 notes over one quarter.

| Topic | Holds |
|---|---|
| Projects | One sub-folder per project (App v2 Launch, Search Rewrite, Sync Reliability), with its decisions, status, and risks |
| Meetings | One sub-folder per series (Team Standup, Weekly Planning, 1:1 with Ari Moss, App v2 Launch Review), each holding dated records |
| People | Coworkers: role, what they own, how they like to work, open threads with Rin |
| Teams | The teams Rin works with, what they own, and how to reach them |
| Systems | The services and components the projects change |
| Playbooks | How-tos: on-call, releases, incident response |
| Preferences | How Rin likes to work: review style, writing, tools |

Things a user can ask an agent about:

- A launch date moved twice, each record replacing the previous one.
- A release playbook that conflicts with a newer system change.
- Action items from meeting records, traced to the people who own them.
- Who to ask about a system, from People, Teams, and Systems.


## 4. Personal

About 200 notes across most areas of a life.

| Topic | Holds |
|---|---|
| Money | Budget, Investing (allocation plan, rebalancing rules, accounts), Equity, Taxes, Insurance, big purchases |
| Career | Goals, the promotion case, compensation history, learning plan |
| Health | Doctors, checkups, fitness routine, sleep |
| Home | The lease or house, repairs, appliances, contractors |
| Family | Family members' dates, plans, and shared logistics |
| People | Friends and contacts, and what Rin knows about them |
| Travel | Past trips, planned trips, travel preferences |
| Learning | Books, courses, notes from reading |
| Hobbies | Ongoing projects outside work |
| Preferences | Food, gifts, purchases, how Rin decides |

Things a user can ask an agent about:

- The investment allocation plan, replaced twice, and why it changed.
- A tax decision that conflicts with a newer equity vest.
- What to get a family member for their birthday, from People and Family.
- Which contractor fixed the water heater, and what it cost.


## 5. Content rules

- Every person, company, and product is made up, with plain names (Notes
  App, Team Standup, Rin Sato, Ari Moss).
- Money notes use asset classes and invented amounts (total-market index
  fund, bond ladder, employer stock, emergency fund), never real tickers,
  funds, or brokers. The README says it is not financial advice.
- Both brains cover this checklist, so the features the prompts ask about
  are present: a supersession chain of at least three notes, an open
  conflict, a sub-folder with its own `_Rules.md`, a few pending episodes
  in `inbox/` for trying consolidation, and `rules.md` with Rin's
  preferences in Rin's words.
- Names follow brain-wiki's defaults: Title Case files and folders,
  `_Index.md` topic pages, every folder a topic.
- Notes carry explicit `created` and `updated` dates. A clone has no
  per-note git history, and without dates every note would take the clone
  time.


## 6. How samples are made and kept current

The samples are written as Markdown with an agent, from a short
`World.md` beside each brain (people, timeline, events), and reviewed by
hand. The brain itself is the source; format changes go through
`brain lint --fix`, the same migration users run.

The current OpenClaw sample went stale silently: it is still format 2,
and `brain lint` reports 773 errors on it. A scheduled CI job, and one
triggered by each brain-wiki release, checks both brains:

1. `brain lint` reports no errors, with the latest release and with `main`.
2. `brain init --template <brain>` into a temporary folder lints clean.
3. A scan finds no real names, tickers, or credential-shaped strings.


## 7. Changes in brain-wiki

- README and Getting Started: a "Try a sample" link next to install.
- `brain-setup` skill: when the user picks a template, offer the Work or
  Personal sample as one.
- [[config-and-storage-5-brain-lifecycle|config and storage §5.1]]:
  name the samples repository as a source of templates.

No code changes; `--template PATH` already does what §1 needs.


## 8. Open questions

| # | Question | Recommendation |
|---|---|---|
| SQ1 | The OpenClaw sample: remove it, or rebuild it in the current format as a third, large sample (about 840 notes from a real public project)? | Remove it; the two samples cover onboarding, and the bench generator already covers scale |
| SQ2 | Should the built-in templates match the samples' topic trees? | Decided: brain-wiki keeps one built-in, `minimal`; the samples are the fuller templates, passed by path (`--template ./Personal`) |
| SQ3 | Fixed dates, or a script that shifts dates so the newest note is today, making "what changed last week" prompts work? | Fixed dates, with prompts that do not depend on the current date |
| SQ4 | Keep the samples in their own repository, or move them into brain-wiki as `samples/`? | Own repository: about 350 notes would bloat the sdist, and samples change on their own schedule |
