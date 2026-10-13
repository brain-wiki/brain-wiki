"""Seeded synthetic brains with planted ground truth (design doc 11 §4).

Everything is fictional: notes about invented software projects, written in a vocabulary of
common English words plus generated pseudo-words, drawn with a Zipf distribution so FTS ranks
them the way it ranks real prose. The same seed always writes byte-identical files.
"""

from __future__ import annotations

import random
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import UTC, date, datetime, timedelta
from pathlib import Path

from brainwiki.format.agents_md import replace_block
from brainwiki.format.fields import claim_value, quote, relation_value
from brainwiki.lifecycle import default_agents_block, init_brain

BRAIN_EXTRA = """
[git]
mode = "off"
"""

COMMON = """
the of and to in is for that on with as it be by this are from or at an was not but have
which can we use when all new one more will if they so has data been their than only also
into after first two most over such time some these way may should could would each other
then before because about where while under between both through during without again
service build release cache deploy config test queue index schema client server request
response latency error retry timeout worker job batch stream event log metric alert trace
storage disk memory thread lock token session user account team owner review change patch
branch merge commit version upgrade migration rollback flag feature module package library
api endpoint route handler parser format file path folder record table column row query
search ranking score result page limit budget plan decision proposal incident outage fix
bug issue ticket note doc guide policy rule default option setting value key name list map
set graph node edge link source target input output message channel payload backend frontend
cluster region zone host network port proxy gateway load balance scale shard replica backup
restore snapshot archive compress encode decode hash check verify validate measure profile
slow fast small large daily weekly monthly local remote shared private public stable legacy
""".split()  # noqa: SIM905

_ONSETS = "b c d f g h j k l m n p r s t v w br cr dr fl fr gl gr pl pr sk sl sn sp st tr".split()  # noqa: SIM905
_VOWELS = "a e i o u ai ea ou ie oa".split()  # noqa: SIM905
_CODAS = ["", "", "", "n", "r", "l", "s", "t", "m", "nd", "st", "rk", "ld"]
_CLAIM_VERBS = ["requires", "uses", "replaces", "limits", "stores", "caches", "logs", "checks"]
_TYPES = ["decision", "reference", "concept", "howto", "incident"]
_PLANT_LETTERS = "abcdefghijklmnopqrstuvwy"  # no z: planted tokens start with "zx"
_B32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
_EPOCH = datetime(2026, 1, 1, tzinfo=UTC)


def _vocabulary() -> list[str]:
    """Common words first (most frequent), then pseudo-words; fixed, independent of the brain seed."""
    rng = random.Random(1729)  # noqa: S311 - not security sensitive
    words = list(dict.fromkeys(COMMON))
    seen = set(words)
    synthetic: list[str] = []
    while len(synthetic) < 3200:
        word = "".join(
            rng.choice(_ONSETS) + rng.choice(_VOWELS) + rng.choice(_CODAS)
            for _ in range(rng.choice((2, 2, 3)))
        )
        if 4 <= len(word) <= 11 and word not in seen and "zx" not in word:
            seen.add(word)
            synthetic.append(word)
    return words + synthetic


WORDS = _vocabulary()
_CUM: list[float] = []
_total = 0.0
for _rank in range(len(WORDS)):
    _total += 1.0 / (_rank + 1) ** 1.05
    _CUM.append(_total)


@dataclass
class Node:
    id: str
    slug: str
    path: str
    title: str
    topic: str | None
    kind: str = "note"  # note | hub | episode
    status: str = "active"
    token: str = ""  # unique planted token in the body


@dataclass
class Query:
    text: str
    expected: dict[str, int]  # node id -> graded relevance
    family: str  # exact | title | group


@dataclass
class Truth:
    seed: int
    root: Path
    nodes: dict[str, Node] = field(default_factory=dict)
    supersedes: list[tuple[str, str]] = field(default_factory=list)  # (newer, older)
    conflicts: list[tuple[str, str]] = field(default_factory=list)
    queries: list[Query] = field(default_factory=list)
    relation_counts: Counter[str] = field(default_factory=Counter)

    def __post_init__(self) -> None:
        self._index()

    def _index(self) -> None:
        self.newer: dict[str, list[str]] = defaultdict(list)
        self.older: dict[str, list[str]] = defaultdict(list)
        self.conflicting: dict[str, list[str]] = defaultdict(list)
        for new, old in self.supersedes:
            self.newer[old].append(new)
            self.older[new].append(old)
        for a, b in self.conflicts:
            self.conflicting[a].append(b)
            self.conflicting[b].append(a)

    def chain(self, node_id: str) -> list[str]:
        """Successors from the direct one to the newest."""
        out, current = [], node_id
        while self.newer.get(current) and len(out) < 5:
            current = self.newer[current][0]
            out.append(current)
        return out

    def expected_guards(self, node_id: str) -> set[tuple[str, str]]:
        """The guards (label, id) a hit must carry (doc 04 §5); `superseded_by` is the newest."""
        shown = {("supersedes", other) for other in self.older.get(node_id, [])}
        shown |= {("conflicts_with", other) for other in self.conflicting.get(node_id, [])}
        chain = self.chain(node_id)
        if chain:
            shown.add(("superseded_by", chain[-1]))
        return shown


class _Gen:
    def __init__(self, seed: int):
        self.rng = random.Random(seed)  # noqa: S311 - not security sensitive
        self.tokens: set[str] = set()

    def words(self, n: int) -> list[str]:
        return self.rng.choices(WORDS, cum_weights=_CUM, k=n)

    def band(self, lo: int = 250, hi: int = 2600) -> str:
        return WORDS[self.rng.randrange(lo, min(hi, len(WORDS)))]

    def token(self) -> str:
        while True:
            tok = "zx" + "".join(self.rng.choice(_PLANT_LETTERS) for _ in range(6))
            if tok not in self.tokens:
                self.tokens.add(tok)
                return tok

    def ulid(self, when: datetime) -> str:
        value = (int(when.timestamp() * 1000) << 80) | self.rng.getrandbits(80)
        return "".join(_B32[(value >> (5 * i)) & 31] for i in reversed(range(26)))

    def sentence(self, n: int, extra: list[str] = ()) -> str:
        words = self.words(n)
        for item in extra:
            words.insert(self.rng.randrange(len(words) + 1), item)
        text = " ".join(words)
        return text[0].upper() + text[1:] + "."


def generate(root: Path, notes: int = 1000, seed: int = 0) -> Truth:
    """Write a brain of `notes` notes under `root` (created; must not be a brain yet)."""
    g = _Gen(seed)
    rng = g.rng
    root = init_brain(Path(root), "bench")
    truth = Truth(seed=seed, root=root)

    # Topics: about forty notes each.
    n_topics = max(3, notes // 40)
    topic_slugs: list[str] = []
    while len(topic_slugs) < n_topics:
        word = g.band(400, 3000)
        if word not in topic_slugs:
            topic_slugs.append(word)
    topic_titles = {t: f"{t.title()} service" for t in topic_slugs}
    topic_about = {
        t: f"How the fictional {t.title()} project builds and runs." for t in topic_slugs
    }
    hubs: dict[str, Node] = {}
    for t in topic_slugs:
        hub = Node(g.ulid(_EPOCH), "index", f"topics/{t}/index.md", topic_titles[t], t, "hub")
        hubs[t] = hub
        truth.nodes[hub.id] = hub

    # Notes: unique titles, one unique token each.
    titles: set[str] = set()
    order: list[Node] = []
    for i in range(notes):
        topic = topic_slugs[rng.randrange(n_topics)]
        while True:
            title = " ".join(g.band() for _ in range(rng.choice((3, 4, 4, 5)))).capitalize()
            if title not in titles:
                titles.add(title)
                break
        slug = f"{title.split()[0].lower()}-{title.split()[-1].lower()}-{i}"
        node = Node(
            g.ulid(_EPOCH), slug, f"topics/{topic}/{slug}.md", title, topic, token=g.token()
        )
        order.append(node)
        truth.nodes[node.id] = node
    by_topic: dict[str, list[Node]] = defaultdict(list)
    for n in order:
        by_topic[n.topic or ""].append(n)

    # Guards: supersession chains (3% of relations) and conflicts (2%).
    used: set[str] = set()
    target_sup = round(0.03 * 3 * notes)
    target_conf = round(0.02 * 3 * notes)

    def free(pool: list[Node], k: int) -> list[Node] | None:
        options = [n for n in pool if n.id not in used]
        if len(options) < k:
            return None
        picked = rng.sample(options, k)
        used.update(n.id for n in picked)
        return picked

    def chain_of(members: list[Node]) -> None:
        for older, newer in zip(members, members[1:], strict=False):
            truth.supersedes.append((newer.id, older.id))
            older.status = "superseded"

    pools = [p for p in by_topic.values() if len(p) >= 4]
    tries = 0
    while len(truth.supersedes) < target_sup and tries < 10 * notes:
        tries += 1
        pool = pools[rng.randrange(len(pools))]
        members = free(pool, rng.choice((2, 2, 3, 3, 4)))  # chains of 1-3 supersessions
        if members:
            chain_of(members)
    tries = 0
    while len(truth.conflicts) < target_conf and tries < 10 * notes:
        tries += 1
        pair = free(order, 2)
        if pair:
            truth.conflicts.append((pair[0].id, pair[1].id))
    truth._index()
    # Dates follow supersession: newer notes are updated later.
    day = {n.id: rng.randrange(0, 200) for n in order}
    for new, old in truth.supersedes:
        day[new] = max(day[new], day[old] + 1 + rng.randrange(30))
    for node_id in [n.id for n in order]:
        for newer in truth.chain(node_id):
            day[newer] = max(day[newer], day[node_id] + 1)

    # Relations, declared in the newer note for supersession.
    relations: dict[str, list[tuple[str, str]]] = defaultdict(list)  # note -> (verb, link)
    linked: dict[str, set[str]] = defaultdict(set)

    def link_name(n: Node) -> str:
        return n.slug

    def declare(a: Node, verb: str, b: Node) -> None:
        relations[a.id].append((verb, link_name(b)))
        linked[a.id].add(b.id)
        linked[b.id].add(a.id)

    for new, old in truth.supersedes:
        declare(truth.nodes[new], "supersedes", truth.nodes[old])
        truth.relation_counts["supersedes"] += 1
    for x, y in truth.conflicts:
        declare(truth.nodes[x], "conflicts_with", truth.nodes[y])
        truth.relation_counts["conflicts_with"] += 1
    for n in order:
        relations[n.id].insert(
            0, ("part_of", f"topics/{n.topic}/index|{hubs[n.topic or ''].title}")
        )
        truth.relation_counts["part_of"] += 1
        same = by_topic[n.topic or ""]
        for _ in range(2 if rng.random() < 0.85 else 1):
            pick = rng.random()
            verb = "depends_on" if pick < 0.45 else "related_to" if pick < 0.88 else "enables"
            for _attempt in range(6):
                pool = same if rng.random() < 0.6 and len(same) > 1 else order
                other = pool[rng.randrange(len(pool))]
                if other.id != n.id and other.id not in linked[n.id]:
                    relations[n.id].append((verb, link_name(other)))
                    linked[n.id].add(other.id)
                    linked[other.id].add(n.id)
                    truth.relation_counts["depends_on" if verb == "enables" else verb] += 1
                    break

    # Group queries: a shared token planted 3, 2 and 1 times gives graded relevance.
    plants: dict[str, list[str]] = defaultdict(list)
    for n in order:
        plants[n.id].append(n.token)
    for _ in range(max(5, notes // 30)):
        members = rng.sample(order, 3)
        tok = g.token()
        for grade, member in zip((3, 2, 1), members, strict=True):
            plants[member.id] += [tok] * grade
        truth.queries.append(
            Query(tok, {m.id: gr for m, gr in zip(members, (3, 2, 1), strict=True)}, "group")
        )

    # Write notes.
    for n in order:
        _write(root / n.path, _note_text(g, n, day[n.id], plants[n.id], order, relations[n.id]))

    # Hubs list their notes.
    for t in topic_slugs:
        hub = hubs[t]
        listed = by_topic[t]
        lines = [
            "---",
            f"id: {hub.id}",
            "type: hub",
            f"title: {hub.title}",
            "---",
            f"# {hub.title}",
            "",
            topic_about[t],
            "",
            "## Notes",
            *[f"- [[{n.slug}]]: {n.title.lower()}" for n in listed],
        ]
        _write(root / hub.path, "\n".join(lines) + "\n")

    # Pending episodes, some unverified.
    for i in range(max(5, notes // 50)):
        when = _EPOCH + timedelta(days=60, hours=i)
        eid = g.ulid(when)
        node = Node(
            eid,
            eid,
            f"inbox/episodes/{when:%Y}/{when:%m}/{eid}.md",
            "",
            None,
            "episode",
            token=g.token(),
        )
        truth.nodes[eid] = node
        fm = [
            "---",
            f"id: {eid}",
            "type: episode",
            "bw-agent: bench-agent",
            "bw-origin: agent",
            f"bw-taint: {rng.choice(('false', 'false', 'unknown'))}",
            "bw-captured: mcp",
            f"created: {when:%Y-%m-%dT%H:%M:%SZ}",
        ]
        body = [g.sentence(12, [node.token] if j == 1 else []) for j in range(4)]
        _write(root / node.path, "\n".join([*fm, "---", *body]) + "\n")

    _write_manifest(root, g.ulid(_EPOCH), topic_slugs, topic_titles, topic_about)
    rows = [(t, hubs[t].path, topic_about[t]) for t in sorted(topic_slugs)]
    agents = (root / "AGENTS.md").read_text(encoding="utf-8")
    _write(root / "AGENTS.md", replace_block(agents, default_agents_block("bench", rows)))

    _plant_queries(g, truth, order)
    return truth


def _note_text(
    g: _Gen,
    n: Node,
    day: int,
    plants: list[str],
    order: list[Node],
    relations: list[tuple[str, str]],
) -> str:
    rng = g.rng
    when = date(2026, 1, 1) + timedelta(days=day)
    fm = [
        "---",
        f"id: {n.id}",
        f"type: {_TYPES[rng.randrange(len(_TYPES))]}",
        f"title: {n.title}",
        f"created: {when - timedelta(days=rng.randrange(30)):%Y-%m-%d}",
        f"updated: {when:%Y-%m-%d}",
    ]
    if n.status != "active":
        fm.append(f"status: {n.status}")
    targets = [o for o in rng.sample(order, min(12, len(order))) if o is not n]
    links = [f"[[{o.slug}]]" for o in targets[:5]]
    extras = plants + links
    rng.shuffle(extras)
    n_lines = rng.randrange(14, 26)
    per_line: list[list[str]] = [[] for _ in range(n_lines)]
    for item in extras:
        per_line[rng.randrange(n_lines)].append(item)
    body: list[str] = []
    for i in range(n_lines):
        if i and i % 5 == 0:
            body.append("")
        body.append(g.sentence(rng.randrange(8, 15), per_line[i]))
    claims = []
    for _ in range(rng.randrange(2, 6)):
        subject = " ".join(g.words(3))
        claim = f"{subject.capitalize()} {rng.choice(_CLAIM_VERBS)} {' '.join(g.words(4))}."
        cid = "c-" + g.ulid(_EPOCH + timedelta(days=day))
        claims.append(claim_value(claim, {"id": cid, "at": f"{when:%Y-%m-%d}"}))
    by_verb: dict[str, list[str]] = defaultdict(list)
    for verb, link in relations:
        by_verb[verb].append(relation_value(link))
    for verb, values in by_verb.items():
        fm += [f"bw-{verb}:", *[f"  - {quote(v)}" for v in values]]
    fm += ["bw-claims:", *[f"  - {quote(c)}" for c in claims], "---"]
    return "\n".join([*fm, f"# {n.title}", "", *body]) + "\n"


def _plant_queries(g: _Gen, truth: Truth, order: list[Node]) -> None:
    rng = g.rng
    guarded = {x for pair in truth.supersedes + truth.conflicts for x in pair}
    sample = rng.sample(order, max(30, len(order) // 10))
    ids = dict.fromkeys([*sorted(guarded), *(n.id for n in sample)])
    for n in (truth.nodes[i] for i in ids):
        truth.queries.append(Query(n.token, {n.id: 1}, "exact"))
    for n in rng.sample(order, max(20, len(order) // 10)):
        truth.queries.append(Query(n.title, {n.id: 1}, "title"))


def _write_manifest(
    root: Path,
    brain_id: str,
    topics: list[str],
    titles: dict[str, str],
    about: dict[str, str],
) -> None:
    path = root / "brain.toml"
    text = path.read_text(encoding="utf-8")
    text = re.sub(r'^id = ".*"$', f'id = "{brain_id}"', text, count=1, flags=re.M)
    lines = [text.rstrip("\n"), BRAIN_EXTRA]
    for t in sorted(topics):
        lines += [f"[topics.{t}]", f'title = "{titles[t]}"', f'description = "{about[t]}"', ""]
    path.write_text("\n".join(lines), encoding="utf-8")


def _write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
