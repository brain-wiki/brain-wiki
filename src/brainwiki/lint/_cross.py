"""Cross-file lint rules, answered from the index so whole-brain lint stays fast
(lint-and-reports.md §4).
"""

from __future__ import annotations

import difflib
import re
from collections import defaultdict
from collections.abc import Callable
from datetime import UTC, datetime
from typing import TYPE_CHECKING

from brainwiki.config import SLUG_RE
from brainwiki.format import (
    append_to_section,
    extract_block,
    parse_document,
    replace_block,
    set_fields,
)
from brainwiki.ids import is_ulid, new_ulid, ulid_datetime
from brainwiki.index import LinkNamer, Resolver, link_text, norm_key
from brainwiki.lint._files import FileContext
from brainwiki.lint._model import Fix, Problem

if TYPE_CHECKING:
    import sqlite3

    from brainwiki.engine import Engine

_STRICT_CONFLICT = re.compile(
    r"\.sync-conflict-\d{8}-\d{6}-[A-Z0-9]+|(?i:conflicted copy)|\.conflict\d+$|\.\.?path[12]$"
    r"|\.conflict-[^/]+-\d{8}T\d{6}Z?\.md$"
)
_LOOSE_CONFLICT = re.compile(r"^(?P<stem>.+?)(?: \(\d+\)| \d+)(?P<ext>\.md)$")
_DB_SUFFIXES = (".sqlite", ".sqlite3", ".db", "-wal", "-shm")
_EPISODE_REF = re.compile(r"inbox/episodes/\d{4}/\d{2}/[0-9A-HJKMNP-TV-Z]{26}\.md")


def cross_checks(engine: Engine, ctx: FileContext, *, fixes: bool = False) -> list[Problem]:
    conn = engine.db
    problems: list[Problem] = []
    problems += _manifest_checks(engine)
    problems += _tree_checks(engine, conn)
    problems += _duplicate_ids(conn)
    problems += _edge_checks(engine, conn)
    problems += _structure_checks(engine, conn, ctx, fixes)
    problems += _inbox_checks(engine, conn)
    return problems


# -- helpers -------------------------------------------------------------
# -- manifest and file tree ----------------------------------------------
def _manifest_checks(engine: Engine) -> list[Problem]:
    out = [
        Problem("BW109", "brain.toml", None, f"unknown key {key!r}")
        for key in engine.manifest.unknown_keys
    ]
    out += [
        Problem("BW409", "brain.toml", None, f"topic slug {slug!r} must match [a-z0-9][a-z0-9-]*")
        for slug in engine.manifest.topics
        if not SLUG_RE.match(slug)
    ]
    return out


def _tree_checks(engine: Engine, conn: sqlite3.Connection) -> list[Problem]:
    out: list[Problem] = []
    paths = [row["path"] for row in conn.execute("SELECT path FROM files ORDER BY path")]
    present = set(paths)
    by_case: dict[str, list[str]] = defaultdict(list)
    for rel in paths:
        by_case[rel.casefold()].append(rel)
    for group in by_case.values():
        for rel in group[1:]:
            out.append(Problem("BW110", rel, None, f"differs only by letter case from {group[0]}"))
    for rel in paths:
        name = rel.rsplit("/", 1)[-1]
        if name.endswith(_DB_SUFFIXES):
            out.append(
                Problem(
                    "BW115",
                    rel,
                    None,
                    "database or lock file inside the brain; sync tools corrupt these",
                )
            )
        if _STRICT_CONFLICT.search(name):
            out.append(
                Problem("BW112", rel, None, "looks like a sync conflict copy; merge it by hand")
            )
            continue
        loose = _LOOSE_CONFLICT.match(rel)
        if loose:
            base = loose.group("stem") + loose.group("ext")
            if base in present and engine.store.sha(base) != engine.store.sha(rel):
                out.append(
                    Problem(
                        "BW112",
                        rel,
                        None,
                        f"looks like a sync conflict copy of {base}; merge it by hand",
                    )
                )
    return out


def _duplicate_ids(conn: sqlite3.Connection) -> list[Problem]:
    out: list[Problem] = []
    rows = conn.execute(
        """SELECT n.fm_id, n.id, n.path, n.kind FROM nodes n JOIN files f ON f.path = n.path
           WHERE n.fm_id IN (
             SELECT fm_id FROM nodes WHERE fm_id IS NOT NULL GROUP BY fm_id HAVING COUNT(*) > 1)
           ORDER BY n.fm_id, f.mtime_ns, n.path"""
    ).fetchall()
    groups: dict[str, list[sqlite3.Row]] = defaultdict(list)
    for row in rows:
        if is_ulid(row["fm_id"]):
            groups[row["fm_id"]].append(row)
    for fm_id, group in groups.items():
        owner = group[0]  # the oldest file keeps the id; newer copies are re-minted
        for row in group:
            if row is owner:
                continue
            fix = None
            if row["kind"] in ("note", "hub"):
                fresh = new_ulid()
                fix = Fix(
                    "re-mint this file's id",
                    lambda t, fresh=fresh: set_fields(t, {"id": fresh}, order_first=("id",)),
                )
            out.append(
                Problem(
                    "BW105",
                    row["path"],
                    None,
                    f"id {fm_id} is also used by {owner['path']}",
                    fix=fix,
                )
            )
    return out


# -- relations and links -------------------------------------------------
def _history_fix(
    conn: sqlite3.Connection, history: dict[str, str], edge: sqlite3.Row
) -> Fix | None:
    node_id = history.get(norm_key(edge["raw_target"]))
    if not node_id:
        return None
    if not conn.execute("SELECT 1 FROM nodes WHERE id=?", (node_id,)).fetchone():
        return None
    raw = edge["raw_target"]
    new = link_text(conn, node_id)
    line_no = edge["line"]

    def edit(text: str) -> str:
        lines = text.split("\n")
        if line_no - 1 >= len(lines):
            return text
        line = lines[line_no - 1]
        line = re.sub(r"\[\[\s*" + re.escape(raw) + r"(?=\s*[\]|#])", "[[" + new, line)
        lines[line_no - 1] = line
        return "\n".join(lines)

    return Fix(f"point the link at {new}", edit)


_EDGE_COLS = "e.id, e.src, e.dst, e.rel, e.declared_in, e.other, e.line, e.raw_target, e.ambiguous"


def _edge_checks(engine: Engine, conn: sqlite3.Connection) -> list[Problem]:
    """Targeted queries per rule, so cost follows the number of suspicious edges, not all edges."""
    out: list[Problem] = []
    node_cache: dict[str, sqlite3.Row | None] = {}
    layout = engine.manifest.layout

    def node(node_id: str | None) -> sqlite3.Row | None:
        if node_id is None:
            return None
        if node_id not in node_cache:
            node_cache[node_id] = conn.execute(
                "SELECT id, path, title, status, kind FROM nodes WHERE id=?",
                (node_id,),
            ).fetchone()
        return node_cache[node_id]

    unresolved = conn.execute(
        f"SELECT {_EDGE_COLS}, n.path AS from_path FROM edges e JOIN nodes n ON n.id = e.declared_in "  # noqa: S608
        "WHERE e.other IS NULL"
    ).fetchall()
    if unresolved:
        history: dict[str, str] = {}
        for row in conn.execute("SELECT node_id, path FROM path_history"):
            history[norm_key(row["path"])] = row["node_id"]
            history.setdefault(norm_key(row["path"].rsplit("/", 1)[-1]), row["node_id"])
        titles = sorted({r[0] for r in conn.execute("SELECT title FROM nodes")})
        files = {r[0] for r in conn.execute("SELECT path FROM files")}
        resolver = Resolver(conn)
        for index, edge in enumerate(unresolved):
            path, line, raw = edge["from_path"], edge["line"], edge["raw_target"]
            code, noun = {
                "superseded_by": ("BW119", "bw-superseded_by target"),
                "source": ("BW122", "bw-sources link"),
            }.get(edge["rel"], ("BW310", "link target"))
            if code == "BW122":
                pending = layout.inbox_dir + raw.removeprefix(layout.archive_dir).removesuffix(
                    ".md"
                )
                if raw.startswith(layout.archive_dir + "/") and f"{pending}.md" in files:
                    continue  # an episode `brain consolidate --done` has not archived yet
            if edge["ambiguous"]:
                candidates = resolver.resolve(raw, path).candidates
                paths = sorted(n["path"] for c in candidates if (n := node(c)) is not None)
                listed = ", ".join(paths[:5])
                out.append(Problem(code, path, line, f"{noun} {raw!r} is ambiguous: {listed}"))
                continue
            guess = difflib.get_close_matches(raw, titles, n=1, cutoff=0.6) if index < 200 else []
            hint = f'; did you mean "{guess[0]}"?' if guess else ""
            out.append(
                Problem(
                    code,
                    path,
                    line,
                    f"{noun} {raw!r} not found{hint}",
                    fix=_history_fix(conn, history, edge) if code == "BW310" else None,
                )
            )
    replaced_by: dict[str, list[sqlite3.Row]] = defaultdict(list)
    for edge in conn.execute(
        f"SELECT {_EDGE_COLS}, n.path AS from_path FROM edges e JOIN nodes n ON n.id = e.declared_in "  # noqa: S608
        "WHERE e.rel = 'superseded_by' AND e.other IS NOT NULL"
    ):
        if edge["other"] == edge["declared_in"]:
            out.append(Problem("BW119", edge["from_path"], edge["line"], "names itself"))
            continue
        replaced_by[edge["src"]].append(edge)
    out += _supersession_cycles(replaced_by, node)
    return out


def _supersession_cycles(
    graph: dict[str, list[sqlite3.Row]], lookup: Callable[[str], sqlite3.Row | None]
) -> list[Problem]:
    out: list[Problem] = []
    state: dict[str, int] = {}  # 1 visiting, 2 done
    reported: set[frozenset[str]] = set()
    for start in list(graph):
        if state.get(start):
            continue
        stack: list[tuple[str, int]] = [(start, 0)]
        trail: list[str] = []
        while stack:
            node, idx = stack.pop()
            if idx == 0:
                state[node] = 1
                trail.append(node)
            children = graph.get(node, [])
            if idx < len(children):
                stack.append((node, idx + 1))
                child = children[idx]["dst"]
                if state.get(child) == 1:
                    cycle = trail[trail.index(child) :]
                    key = frozenset(cycle)
                    if key not in reported:
                        reported.add(key)
                        edge = children[idx]
                        names = " → ".join(
                            r["path"] for n in [*cycle, child] if (r := lookup(n)) is not None
                        )
                        declared = lookup(edge["declared_in"])
                        out.append(
                            Problem(
                                "BW307",
                                declared["path"] if declared else "",
                                edge["line"],
                                f"supersession cycle: {names}",
                            )
                        )
                elif not state.get(child):
                    stack.append((child, 0))
            else:
                state[node] = 2
                trail.pop()
    return out


# -- structure -----------------------------------------------------------
def _structure_checks(
    engine: Engine, conn: sqlite3.Connection, ctx: FileContext, fixes: bool
) -> list[Problem]:
    from brainwiki.index import agents_block

    out: list[Problem] = []
    manifest = engine.manifest
    layout = manifest.layout
    namer = LinkNamer(conn)
    for slug, folder in sorted(ctx.topics.items()):
        hub_name = layout.hub_filename.replace("{folder}", folder.rsplit("/", 1)[-1])
        hub_path = f"{folder}/{hub_name}"
        hub = conn.execute(
            "SELECT id, path FROM nodes WHERE topic=? AND kind='hub' ORDER BY (path = ?) DESC, path",
            (slug, hub_path),
        ).fetchone()
        notes = conn.execute(
            "SELECT id, path, title FROM nodes WHERE topic=? AND kind='note' ORDER BY path", (slug,)
        ).fetchall()
        if hub is None:
            if engine.store.exists(hub_path):
                continue
            declared = manifest.topics.get(slug)
            title = (declared.title if declared and declared.title else None) or slug.replace(
                "-", " "
            ).title()
            listing = [f"- [[{namer(n['id'])}]]" for n in notes] if fixes else []
            content = (
                "\n".join(
                    [
                        "---",
                        f"id: {new_ulid()}",
                        "type: hub",
                        f"title: {title}",
                        "---",
                        f"# {title}",
                        "",
                        "## Notes",
                        *listing,
                    ]
                )
                + "\n"
            )
            out.append(
                Problem(
                    "BW404",
                    folder,
                    None,
                    f"topic {slug!r} has no hub ({hub_path})",
                    fix=Fix(f"create {hub_path}", create=content, target=hub_path),
                )
            )
            continue
        listed = _hub_listing(engine, conn, hub["id"], hub["path"])
        reached = _reaches_hub(conn, [n["id"] for n in notes], listed)
        for note in notes:
            if note["id"] in listed or note["id"] in reached:
                continue
            line = f"- [[{namer(note['id'])}]]"
            out.append(
                Problem(
                    "BW405",
                    note["path"],
                    None,
                    f"not listed in {hub['path']} ## Notes",
                    fix=Fix(
                        f"list it in {hub['path']}",
                        lambda t, line=line: append_to_section(t, "notes", [line]),
                        target=hub["path"],
                    ),
                )
            )
    for row in conn.execute(
        """SELECT n.path FROM nodes n WHERE n.kind='note' AND NOT EXISTS (
             SELECT 1 FROM edges e WHERE e.other = n.id AND e.declared_in != n.id)
           ORDER BY n.path"""
    ):
        out.append(
            Problem("BW406", row["path"], None, "orphan: no incoming links and not in a hub")
        )
    for row in conn.execute(
        "SELECT path FROM nodes WHERE kind='note' AND topic IS NULL ORDER BY path"
    ):
        out.append(Problem("BW407", row["path"], None, "note is outside any topic"))

    block = agents_block(engine)
    try:
        current = engine.store.read_text("AGENTS.md")
    except OSError:
        current = None
    regenerate = Fix("regenerate the managed block", lambda t: replace_block(t, block))
    if current is None:
        out.append(
            Problem(
                "BW408",
                "AGENTS.md",
                None,
                "AGENTS.md is missing",
                fix=Fix("create AGENTS.md", create=replace_block("", block)),
            )
        )
    else:
        limit = manifest.budgets.agents_md_max_lines
        lines = len(current.splitlines())
        if lines > limit:
            out.append(
                Problem(
                    "BW403",
                    "AGENTS.md",
                    None,
                    f"AGENTS.md has {lines} lines (budget {limit})",
                    fix=regenerate,
                )
            )
        existing = extract_block(current)
        if existing is None:
            out.append(
                Problem("BW408", "AGENTS.md", None, "managed block is missing", fix=regenerate)
            )
        elif existing.strip() != block.strip():
            out.append(
                Problem("BW408", "AGENTS.md", None, "managed block is out of date", fix=regenerate)
            )
    return out


def _reaches_hub(conn: sqlite3.Connection, note_ids: list[str], listed: set[str]) -> set[str]:
    """Notes reached by links from the notes the hub lists, so a topic can nest notes under
    section notes instead of listing every note in one long hub."""
    wanted = set(note_ids)
    reached: set[str] = set()
    frontier = [n for n in listed if n in wanted]
    while frontier:
        marks = ",".join("?" * len(frontier))
        found = [
            row["dst"]
            for row in conn.execute(
                f"SELECT dst FROM edges WHERE rel = 'links_to' AND src IN ({marks})",  # noqa: S608
                frontier,
            )
            if row["dst"] in wanted and row["dst"] not in listed and row["dst"] not in reached
        ]
        reached.update(found)
        frontier = list(dict.fromkeys(found))
    return reached


def _hub_listing(engine: Engine, conn: sqlite3.Connection, hub_id: str, hub_path: str) -> set[str]:
    try:
        doc = parse_document(hub_path, engine.store.read_text(hub_path))
    except (OSError, UnicodeDecodeError):
        return set()
    section = doc.section("notes")
    if section is None:
        section_range = range(0)
    else:
        section_range = range(section.heading_line + 1, section.end_line + 1)
    listed = set()
    for row in conn.execute(
        "SELECT other, line FROM edges WHERE declared_in=? AND rel = 'links_to' "
        "AND other IS NOT NULL",
        (hub_id,),
    ):
        if row["line"] in section_range:
            listed.add(row["other"])
    return listed


# -- inbox ---------------------------------------------------------------
def _inbox_checks(engine: Engine, conn: sqlite3.Connection) -> list[Problem]:
    out: list[Problem] = []
    layout = engine.manifest.layout
    for row in conn.execute(
        """SELECT n.path FROM episode_hashes h
           JOIN nodes n ON n.fm_id = h.episode_id AND n.kind IN ('episode', 'archived_episode')
           JOIN files f ON f.path = n.path
           WHERE f.sha256 != h.sha256 ORDER BY n.path"""
    ):
        out.append(
            Problem(
                "BW501",
                row["path"],
                None,
                "episode changed after it was created; episodes are immutable",
            )
        )
    files = {r["path"] for r in conn.execute("SELECT path FROM files")}
    for row in conn.execute("SELECT path FROM files WHERE kind='proposal' ORDER BY path"):
        try:
            text = engine.store.read_text(row["path"])
        except (OSError, UnicodeDecodeError):
            continue
        missing = sorted({m for m in _EPISODE_REF.findall(text) if m not in files})
        if missing:
            out.append(
                Problem(
                    "BW504",
                    row["path"],
                    None,
                    f"references {len(missing)} episode(s) no longer pending, e.g. {missing[0]}",
                )
            )
    days = engine.manifest.lint.stale_inbox_days
    now = datetime.now(UTC)
    ages = [
        (now - ulid_datetime(r["fm_id"])).days
        for r in conn.execute("SELECT fm_id FROM nodes WHERE kind='episode' AND fm_id IS NOT NULL")
        if is_ulid(r["fm_id"])
    ]
    stale = [a for a in ages if a > days]
    if stale:
        out.append(
            Problem(
                "BW505",
                layout.episodes_dir,
                None,
                f"{len(stale)} episode(s) pending longer than {days} days (oldest {max(stale)} days); consolidate them",
            )
        )
    return out
