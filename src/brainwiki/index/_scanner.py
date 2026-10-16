"""Keep the index fresh: stat walk, hash on change, parse, upsert, re-resolve links
(index-and-search.md §4).
"""

from __future__ import annotations

import json
import sqlite3
import time
from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from brainwiki.format import parse_document
from brainwiki.ids import is_ulid
from brainwiki.index._resolver import Resolver, name_rows
from brainwiki.index._topics import TopicTree, note_hub_changes, set_hub_files, topic_tree
from brainwiki.index._written import is_marked
from brainwiki.store import sha256_bytes

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_MAX_INDEX_BYTES = 2 * 1024 * 1024
_STATUSES = ("active", "superseded", "archived")
_NODE_KINDS = ("note", "hub", "episode", "archived_episode", "agent_file")
_BASELINE_KEEP = (
    "INSERT OR IGNORE INTO episode_hashes(episode_id, sha256, path, first_seen) VALUES (?, ?, ?, ?)"
)
_BASELINE_REPLACE = "INSERT OR REPLACE INTO episode_hashes(episode_id, sha256, path, first_seen) VALUES (?, ?, ?, ?)"


@dataclass
class ScanStats:
    added: int = 0
    changed: int = 0
    removed: int = 0
    renamed: int = 0
    unchanged: int = 0
    reresolved: bool = False
    seconds: float = 0.0
    paths: list[str] = field(default_factory=list)

    @property
    def any_change(self) -> bool:
        return bool(self.added or self.changed or self.removed)


def discovered_topics(engine: Engine) -> dict[str, str]:
    """Every topic as slug -> folder: the topic tree's paths (brain-format.md §2)."""
    return dict(topic_tree(engine).paths)


def classify(engine: Engine, rel: str, topics: dict[str, str]) -> str:
    layout = engine.manifest.layout
    if rel == "brain.toml":
        return "manifest"
    if rel == "AGENTS.md":
        return "agents_md"
    if rel == "rules.md":
        return "rules"
    if rel == "log.md":
        return "log"
    if rel == f"{layout.archive_dir}/rules.md":
        return "archived_rules"
    if not rel.lower().endswith(".md"):
        return "attachment"
    if rel.startswith(layout.reports_dir + "/"):
        return "report"
    if rel.startswith(layout.episodes_dir + "/"):
        return "episode"
    if rel.startswith(layout.agents_inbox_dir + "/"):
        return "agent_file"
    if rel.startswith(layout.proposals_dir + "/"):
        return "proposal"
    if rel.startswith((layout.archive_episodes_dir + "/", layout.archive_dir + "/agents/")):
        return "archived_episode"
    folder, _, filename = rel.rpartition("/")
    for path in topics.values():
        if folder == path:
            hub = layout.hub_filename.replace("{folder}", folder.rsplit("/", 1)[-1])
            if filename == hub:
                return "hub"
    return "note"


def _iso_from_ns(ns: int) -> str:
    return datetime.fromtimestamp(ns / 1e9, tz=UTC).replace(microsecond=0).isoformat()


def _as_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [
            str(v).lstrip("#") for v in value if v is not None and not isinstance(v, (dict, list))
        ]
    if isinstance(value, str):
        return [p.strip().lstrip("#") for p in value.split(",") if p.strip()]
    return [str(value)]


def scan(
    engine: Engine, *, force: bool = False, paths: list[str] | None = None, sanctioned: bool = False
) -> ScanStats:
    """Bring the index up to date. With `paths`, only those files are re-checked (write-through).

    `sanctioned` marks the write-through of a recorded run: episode hashes it produced become
    the new baseline instead of counting as edits (BW501).
    """
    started = time.monotonic()
    conn = engine.db
    stats = ScanStats()
    now_ns = time.time_ns()
    if (
        not force
        and paths is None
        and now_ns - engine.last_scan_ns < engine.manifest.search.freshness_ms * 1_000_000
    ):
        return stats
    if paths is None:
        rows = conn.execute("SELECT path, mtime_ns, size, sha256, node_id FROM files")
    else:
        marks = ",".join("?" * len(paths)) or "NULL"
        rows = conn.execute(
            f"SELECT path, mtime_ns, size, sha256, node_id FROM files WHERE path IN ({marks})",  # noqa: S608 - placeholders only
            paths,
        )
    known = {row["path"]: row for row in rows}
    if paths is not None and not known:
        known_any = conn.execute("SELECT 1 FROM files LIMIT 1").fetchone() is not None
    else:
        known_any = bool(known)
    if paths is None:
        seen = {s.path: s for s in engine.store.walk(skip=engine.manifest.is_ignored)}
        candidates = list(seen)
        deleted = [p for p in known if p not in seen]
    else:
        seen = {}
        for rel in paths:
            target = engine.store.abspath(rel)
            if target.is_file():
                st = target.stat()
                from brainwiki.store import FileStat

                seen[rel] = FileStat(rel, st.st_size, st.st_mtime_ns)
        candidates = list(seen)
        deleted = [p for p in paths if p not in seen and p in known]
    if paths is None:
        set_hub_files(engine, seen)
    else:
        note_hub_changes(engine, seen, [p for p in paths if p not in seen])
    tree = topic_tree(engine)
    topics = tree.paths
    stored_tree = conn.execute("SELECT value FROM meta WHERE key='topic_tree'").fetchone()
    tree_changed = stored_tree is None or stored_tree[0] != tree.signature
    force: set[str] = set()  # re-indexed although unchanged: the topic tree moved under them
    if tree_changed:
        for rel in _retopic(conn, tree, stored_tree[0] if stored_tree else None):
            if rel in deleted:
                continue
            if rel not in seen:
                target = engine.store.abspath(rel)
                if not target.is_file():
                    continue
                from brainwiki.store import FileStat

                st = target.stat()
                seen[rel] = FileStat(rel, st.st_size, st.st_mtime_ns)
                candidates.append(rel)
            force.add(rel)

    to_parse: list[tuple[str, bytes]] = []
    touch_only: list[tuple[str, int, int]] = []
    for rel in candidates:
        st = seen[rel]
        row = known.get(rel) if rel not in force else None
        if row and row["mtime_ns"] == st.mtime_ns and row["size"] == st.size:
            stats.unchanged += 1
            continue
        try:
            data = engine.store.read_bytes(rel)
        except OSError:
            continue
        if row and row["sha256"] == sha256_bytes(data):
            touch_only.append((rel, st.mtime_ns, st.size))
            stats.unchanged += 1
            continue
        to_parse.append((rel, data))

    if not to_parse and not deleted and not touch_only and not tree_changed:
        if paths is None:
            engine.last_scan_ns = now_ns
            conn.execute("UPDATE meta SET value=? WHERE key='last_scan_ns'", (str(now_ns),))
        stats.seconds = time.monotonic() - started
        return stats

    fresh = not known_any
    if fresh:
        # Filling an empty index deletes nothing, so cascades have nothing to do; enforcing
        # foreign keys here cost about a third of a 10k-note rebuild.
        conn.execute("PRAGMA foreign_keys=OFF")
    conn.execute("BEGIN IMMEDIATE")
    try:
        names_changed = False
        removed_ids: dict[str, str] = {}
        orphaned: list[int] = []  # edges whose target node was deleted and maybe re-inserted
        for rel in deleted:
            node_id = known[rel]["node_id"]
            if node_id:
                fm_id = conn.execute("SELECT fm_id FROM nodes WHERE id=?", (node_id,)).fetchone()
                if fm_id and fm_id["fm_id"]:
                    removed_ids[fm_id["fm_id"]] = rel
                _delete_node(conn, node_id, orphaned)
                names_changed = True
            conn.execute("DELETE FROM files WHERE path=?", (rel,))
            conn.execute("DELETE FROM diagnostics WHERE path=?", (rel,))
            conn.execute("DELETE FROM lint_cache WHERE path=?", (rel,))
            stats.removed += 1
        for rel, mtime_ns, size in touch_only:
            conn.execute("UPDATE files SET mtime_ns=?, size=? WHERE path=?", (mtime_ns, size, rel))
        parsed_nodes: list[tuple[str, str]] = []
        for rel, data in to_parse:
            st = seen[rel]
            kind = classify(engine, rel, topics)
            is_new = rel not in known
            node_id, changed_names = _index_file(
                engine, conn, rel, data, st.mtime_ns, st.size, kind, tree, sanctioned, orphaned
            )
            names_changed = names_changed or changed_names
            if node_id:
                parsed_nodes.append((node_id, rel))
            if is_new:
                stats.added += 1
            else:
                stats.changed += 1
            stats.paths.append(rel)
        for fm_id, old_path in removed_ids.items():
            row = conn.execute("SELECT id, path FROM nodes WHERE fm_id=?", (fm_id,)).fetchone()
            if row and row["path"] != old_path:
                stats.renamed += 1
                stats.removed -= 1
                stats.added = max(0, stats.added - 1)
            target_id = row["id"] if row else fm_id
            conn.execute(
                "INSERT OR REPLACE INTO path_history(node_id, path, last_seen) VALUES (?, ?, ?)",
                (target_id, old_path, _iso_from_ns(now_ns)),
            )
        if names_changed:
            _reresolve_all(conn)
            stats.reresolved = True
        elif parsed_nodes or orphaned:
            resolver = Resolver(conn)
            for node_id, rel in parsed_nodes:
                _resolve_edges_of(conn, resolver, node_id, rel)
            _resolve_edge_ids(conn, resolver, orphaned)
        if paths is None:
            conn.execute("UPDATE meta SET value=? WHERE key='last_scan_ns'", (str(now_ns),))
        if tree_changed:
            conn.execute(
                "INSERT OR REPLACE INTO meta(key, value) VALUES ('topic_tree', ?)",
                (tree.signature,),
            )
        conn.execute("COMMIT")
    except BaseException:
        conn.execute("ROLLBACK")
        raise
    finally:
        if fresh:
            conn.execute("PRAGMA foreign_keys=ON")
    if paths is None:
        engine.last_scan_ns = now_ns
    stats.seconds = time.monotonic() - started
    return stats


def _retopic(conn: sqlite3.Connection, tree: TopicTree, stored: str | None) -> list[str]:
    """Notes and hubs to re-index after the topic tree changed: their topic is different now, or
    their topic moved or gained a parent."""
    old = json.loads(stored) if stored else {}
    new = json.loads(tree.signature)
    changed = {s for s in old.keys() | new.keys() if old.get(s) != new.get(s)}
    return [
        row["path"]
        for row in conn.execute("SELECT path, topic FROM nodes WHERE kind IN ('note', 'hub')")
        if row["topic"] in changed or tree.for_path(row["path"]) != row["topic"]
    ]


def _delete_node(conn: sqlite3.Connection, node_id: str, orphaned: list[int] | None = None) -> None:
    row = conn.execute(
        "SELECT rowid, title, aliases, tags, headings, body FROM docs WHERE node_id=?",
        (node_id,),
    ).fetchone()
    if row:
        values = (
            row["rowid"],
            row["title"],
            row["aliases"],
            row["tags"],
            row["headings"],
            row["body"],
        )
        conn.execute(
            "INSERT INTO fts(fts, rowid, title, aliases, tags, headings, body) VALUES ('delete', ?, ?, ?, ?, ?, ?)",
            values,
        )
        if _has_tri(conn):
            conn.execute(
                "INSERT INTO fts_tri(fts_tri, rowid, title, body) VALUES ('delete', ?, ?, ?)",
                (row["rowid"], row["title"], row["body"]),
            )
    conn.execute("DELETE FROM nodes WHERE id=?", (node_id,))
    if orphaned is not None:
        orphaned += [r[0] for r in conn.execute("SELECT id FROM edges WHERE other=?", (node_id,))]
    conn.execute("UPDATE edges SET other=NULL, dst=NULL WHERE other=?", (node_id,))


def _has_tri(conn: sqlite3.Connection) -> bool:
    row = conn.execute("SELECT value FROM meta WHERE key='fts_trigram'").fetchone()
    return bool(row and row[0] == "1")


def _index_file(
    engine: Engine,
    conn: sqlite3.Connection,
    rel: str,
    data: bytes,
    mtime_ns: int,
    size: int,
    kind: str,
    tree: TopicTree,
    sanctioned: bool = False,
    orphaned: list[int] | None = None,
) -> tuple[str | None, bool]:
    """Index one file. Returns (node id or None, whether name keys may have changed)."""
    old = conn.execute("SELECT node_id FROM files WHERE path=?", (rel,)).fetchone()
    old_node = old["node_id"] if old else None
    names_changed = False
    if old_node:
        old_names = {
            (r["key"], r["kind"])
            for r in conn.execute("SELECT key, kind FROM names WHERE node_id=?", (old_node,))
        }
        _delete_node(conn, old_node, orphaned)
    else:
        old_names = set()
    conn.execute("DELETE FROM diagnostics WHERE path=?", (rel,))
    sha = sha256_bytes(data)
    if kind not in _NODE_KINDS:
        conn.execute(
            "INSERT OR REPLACE INTO files(path, kind, mtime_ns, size, sha256, node_id, parse_errors) VALUES (?, ?, ?, ?, ?, NULL, 0)",
            (rel, kind, mtime_ns, size, sha),
        )
        return None, bool(old_node)
    try:
        text = data.decode("utf-8")
        decode_error = None
    except UnicodeDecodeError:
        text = data.decode("utf-8", errors="replace")
        decode_error = "file is not valid UTF-8"
    if size > _MAX_INDEX_BYTES:
        text = ""
    doc = parse_document(rel, text)
    fm = doc.fm
    topic = tree.for_path(rel) if kind in ("note", "hub") else None
    fm_id = str(fm.get("id")) if fm.get("id") is not None else None
    node_id = fm_id if fm_id and is_ulid(fm_id) else f"path:{rel}"
    if node_id != f"path:{rel}":
        clash = conn.execute("SELECT path FROM nodes WHERE id=?", (node_id,)).fetchone()
        if clash and clash["path"] != rel:
            node_id = f"path:{rel}"  # the file indexed later yields; lint reports the duplicate
    status = str(fm.get("status") or "active")
    if status not in _STATUSES:
        status = "active"
    note_type = str(
        fm.get("type") or ("hub" if kind == "hub" else "episode" if "episode" in kind else "note")
    )
    if note_type == "hub" and kind == "note":
        kind = "hub"
    aliases = _as_list(fm.get("aliases"))
    tags = _as_list(fm.get("tags"))
    updated = str(fm.get("updated") or fm.get("created") or _iso_from_ns(mtime_ns))
    props = {
        k: v
        for k, v in fm.items()
        if not k.startswith("bw-")  # brain-wiki's fields are read through their plain names
        and k
        not in (
            "id",
            "type",
            "title",
            "status",
            "stage",
            "aliases",
            "tags",
            "created",
            "updated",
        )
    }
    episode_cols: dict[str, Any] = dict.fromkeys(
        ("agent", "session", "origin_turns", "device", "origin", "inputs", "captured")
    )
    if kind in ("episode", "archived_episode", "agent_file"):
        for col in episode_cols:
            value = fm.get(col)
            episode_cols[col] = (
                str(value).lower()
                if isinstance(value, bool)
                else (str(value) if value is not None else None)
            )
        if kind == "agent_file":
            episode_cols.update(
                origin="agent",
                inputs="unknown",
                captured="file",
                agent=rel.split("/")[2] if rel.count("/") >= 3 else None,
            )
        elif not (fm_id and is_marked(engine.brain.key, fm_id, sha)):
            # Not written by this device's write_episode(): its provenance is only a claim.
            episode_cols.update(inputs="unknown", captured="file")
            if episode_cols["origin"] == "owner":
                episode_cols["origin"] = "agent"
        if episode_cols["inputs"] not in ("local", "external", "unknown"):
            episode_cols["inputs"] = "unknown"
        if episode_cols["origin"] not in ("owner", "agent", "import", "system"):
            episode_cols["origin"] = "agent"
        node_kind = "episode" if kind == "agent_file" else kind
    else:
        node_kind = kind
    conn.execute(
        """INSERT INTO nodes(id, path, kind, topic, title, type, status, stage, created, updated,
                             aliases, tags, props, line_count, fm_id, agent, session, origin_turns, device, origin, inputs, captured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            node_id,
            rel,
            node_kind,
            topic,
            doc.title,
            note_type,
            status,
            str(fm["stage"])
            if fm.get("stage") is not None
            else (
                str(fm["status"])
                if fm.get("status") and str(fm["status"]) not in _STATUSES
                else None
            ),
            str(fm.get("created")) if fm.get("created") else None,
            updated,
            json.dumps(aliases),
            json.dumps(tags),
            json.dumps(props, default=str),
            doc.line_count,
            fm_id,
            *[
                episode_cols[c]
                for c in (
                    "agent",
                    "session",
                    "origin_turns",
                    "device",
                    "origin",
                    "inputs",
                    "captured",
                )
            ],
        ),
    )
    new_names = name_rows(node_id, rel, doc.title, aliases, fm_id)
    conn.executemany("INSERT OR IGNORE INTO names(key, kind, node_id) VALUES (?, ?, ?)", new_names)
    if {(k, kind_) for k, kind_, _ in new_names} != old_names:
        names_changed = True
    for link in doc.links:
        conn.execute(
            """INSERT INTO edges(src, dst, rel, written, declared_in, other, line, raw_target)
               VALUES (?, NULL, 'links_to', ?, ?, NULL, ?, ?)""",
            (node_id, "embed" if link.embed else link.kind, node_id, link.line, link.target),
        )
    for rel_name, link in doc.meta_links:
        conn.execute(
            """INSERT INTO edges(src, dst, rel, written, declared_in, other, line, raw_target)
               VALUES (?, NULL, ?, 'field', ?, NULL, ?, ?)""",
            (node_id, rel_name, node_id, link.line, link.target),
        )
    headings = "\n".join(h[2] for h in doc.headings)
    body = doc.body_text
    cur = conn.execute(
        "INSERT INTO docs(node_id, title, aliases, tags, headings, body) VALUES (?, ?, ?, ?, ?, ?)",
        (node_id, doc.title, " ".join(aliases), " ".join(tags), headings, body),
    )
    rowid = cur.lastrowid
    conn.execute(
        "INSERT INTO fts(rowid, title, aliases, tags, headings, body) VALUES (?, ?, ?, ?, ?, ?)",
        (rowid, doc.title, " ".join(aliases), " ".join(tags), headings, body),
    )
    if _has_tri(conn):
        conn.execute(
            "INSERT INTO fts_tri(rowid, title, body) VALUES (?, ?, ?)", (rowid, doc.title, body)
        )
    if kind in ("episode", "archived_episode") and fm_id and is_ulid(fm_id):
        conn.execute(
            _BASELINE_REPLACE if sanctioned else _BASELINE_KEEP,
            (fm_id, sha, rel, _iso_from_ns(time.time_ns())),
        )
    problems = list(doc.problems)
    if decode_error:
        problems.append((1, "BW111", decode_error))
    for line, code, message in problems:
        conn.execute(
            "INSERT INTO diagnostics(path, line, code, severity, message) VALUES (?, ?, ?, 'error', ?)",
            (rel, line, code, message),
        )
    conn.execute(
        "INSERT OR REPLACE INTO files(path, kind, mtime_ns, size, sha256, node_id, parse_errors) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (rel, kind, mtime_ns, size, sha, node_id, len(problems)),
    )
    return node_id, names_changed


def _apply_resolution(
    conn: sqlite3.Connection, edge: sqlite3.Row, resolver: Resolver, from_path: str
) -> None:
    res = resolver.resolve(edge["raw_target"], from_path)
    conn.execute(
        "UPDATE edges SET other=?, dst=?, ambiguous=? WHERE id=?",
        (res.node_id, res.node_id, int(res.ambiguous), edge["id"]),
    )


def _resolve_edges_of(conn: sqlite3.Connection, resolver: Resolver, node_id: str, rel: str) -> None:
    for edge in conn.execute(
        "SELECT id, raw_target, declared_in FROM edges WHERE declared_in=?", (node_id,)
    ).fetchall():
        _apply_resolution(conn, edge, resolver, rel)


def _resolve_edge_ids(conn: sqlite3.Connection, resolver: Resolver, edge_ids: list[int]) -> None:
    if not edge_ids:
        return
    paths = {}
    for start in range(0, len(edge_ids), 500):
        chunk = edge_ids[start : start + 500]
        rows = conn.execute(
            f"SELECT id, raw_target, declared_in FROM edges WHERE id IN ({','.join('?' * len(chunk))})",  # noqa: S608 - placeholders only
            chunk,
        ).fetchall()
        for edge in rows:
            declared = edge["declared_in"]
            if declared not in paths:
                row = conn.execute("SELECT path FROM nodes WHERE id=?", (declared,)).fetchone()
                paths[declared] = row["path"] if row else ""
            _apply_resolution(conn, edge, resolver, paths[declared])


def _reresolve_all(conn: sqlite3.Connection) -> None:
    resolver = Resolver(conn, preload=True)
    paths = {row["id"]: row["path"] for row in conn.execute("SELECT id, path FROM nodes")}
    for edge in conn.execute("SELECT id, raw_target, declared_in FROM edges").fetchall():
        _apply_resolution(conn, edge, resolver, paths.get(edge["declared_in"], ""))
