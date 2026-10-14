"""Opening the index: location, pragmas, capability probes, and automatic rebuilds."""

from __future__ import annotations

import hashlib
import json
import logging
import sqlite3
from pathlib import Path

import brainwiki
from brainwiki.config import Manifest, brain_cache_dir
from brainwiki.errors import BrainError
from brainwiki.index._schema import DDL, SCHEMA_VERSION, TRIGRAM_DDL

log = logging.getLogger(__name__)


def _config_hash(manifest: Manifest) -> str:
    relevant = {
        "layout": vars(manifest.layout),
        "topics": {k: vars(v) for k, v in sorted(manifest.topics.items())},
    }
    return hashlib.sha256(json.dumps(relevant, sort_keys=True, default=str).encode()).hexdigest()[
        :16
    ]


def _index_path(brain_key: str) -> Path:
    return brain_cache_dir(brain_key) / "index.sqlite"


def _connect(path: Path) -> sqlite3.Connection:
    conn = sqlite3.connect(path, timeout=5.0, isolation_level=None, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA busy_timeout=5000")
    conn.execute(
        "PRAGMA cache_size=-65536"
    )  # up to 64 MB; full scans of large brains thrash the default
    conn.execute("PRAGMA temp_store=MEMORY")
    return conn


def _create(conn: sqlite3.Connection, root: Path, manifest: Manifest) -> None:
    conn.executescript(DDL)
    trigram = True
    try:
        conn.executescript(TRIGRAM_DDL)
    except sqlite3.OperationalError:
        trigram = False
    meta = {
        "schema_version": str(SCHEMA_VERSION),
        "brain_id": manifest.id,
        "brain_root": str(root),
        "config_hash": _config_hash(manifest),
        "engine_version": brainwiki.__version__,
        "last_scan_ns": "0",
        "fts_trigram": "1" if trigram else "0",
    }
    conn.execute("BEGIN IMMEDIATE")
    conn.executemany("INSERT INTO meta(key, value) VALUES (?, ?)", meta.items())
    conn.execute("COMMIT")


def _baselines(conn: sqlite3.Connection) -> list[tuple[object, ...]]:
    """Recorded versions of notes (05 §2.3), which outlive a rebuild: they are the only record
    of edits nobody has checked yet."""
    try:
        return [
            tuple(r) for r in conn.execute("SELECT path, sha256, content, since FROM baselines")
        ]
    except sqlite3.DatabaseError:
        return []


def _meta(conn: sqlite3.Connection) -> dict[str, str]:
    try:
        return {row["key"]: row["value"] for row in conn.execute("SELECT key, value FROM meta")}
    except sqlite3.DatabaseError:
        return {}


def open_index(
    brain_key: str, root: Path, manifest: Manifest, *, rebuild: bool = False
) -> sqlite3.Connection:
    path = _index_path(brain_key)
    try:
        conn = _connect(path)
        meta = _meta(conn)
        stale = rebuild or (
            not meta
            or meta.get("schema_version") != str(SCHEMA_VERSION)
            or meta.get("config_hash") != _config_hash(manifest)
            or meta.get("brain_id") != manifest.id
        )
        if stale:
            kept = _baselines(conn) if meta.get("brain_id") == manifest.id else []
            conn.close()
            if meta and not rebuild:
                log.info("rebuilding index for %s (schema or configuration changed)", root)
            _remove(path)
            conn = _connect(path)
            _create(conn, root, manifest)
            if kept:
                conn.execute("BEGIN IMMEDIATE")
                conn.executemany(
                    "INSERT INTO baselines(path, sha256, content, since) VALUES (?, ?, ?, ?)", kept
                )
                conn.execute("COMMIT")
        return conn
    except sqlite3.DatabaseError as exc:
        _remove(path)
        try:
            conn = _connect(path)
            _create(conn, root, manifest)
            return conn
        except sqlite3.DatabaseError as exc2:
            raise BrainError(f"cannot open index at {path}: {exc2}") from exc


def _remove(path: Path) -> None:
    for suffix in ("", "-wal", "-shm"):
        Path(str(path) + suffix).unlink(missing_ok=True)


def has_trigram(conn: sqlite3.Connection) -> bool:
    row = conn.execute("SELECT value FROM meta WHERE key='fts_trigram'").fetchone()
    return bool(row and row[0] == "1")
