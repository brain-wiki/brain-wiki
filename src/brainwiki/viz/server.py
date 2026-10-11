"""Loopback-only, token-guarded, read-only HTTP server for the visualizer (design doc 12 §5, §8)."""

from __future__ import annotations

import hmac
import json
import re
import secrets
import threading
import time
import webbrowser
from http import HTTPStatus
from http.cookies import CookieError, SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import TYPE_CHECKING, Any, cast
from urllib.parse import parse_qs, unquote, urlsplit

from brainwiki.errors import Ambiguous, NotFound
from brainwiki.viz import export
from brainwiki.viz.export import build_graph
from brainwiki.viz.lod import MAX_SEARCH, Atlas

if TYPE_CHECKING:
    from brainwiki.engine import Engine

HOST = "127.0.0.1"
IDLE_SECONDS = 30 * 60
MAX_MARKDOWN = 200_000
# Read at request time, so tests can point the server at a stand-in build.
APP_DIR: Path = export.APP_DIR
CSP = (
    "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; "
    "connect-src 'self'; worker-src 'self'; font-src 'self'"
)
MIME = {
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".woff2": "font/woff2",
}
_ASSET_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.-]*$")
_NOTE_FIELDS = (
    "id",
    "title",
    "path",
    "kind",
    "type",
    "status",
    "topic",
    "updated",
    "privacy",
    "banners",
    "summary",
    "claims",
    "relations",
    "backlinks",
)


class VizServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, engine: Engine, port: int, topics: list[str] | None = None):
        super().__init__((HOST, port), _Handler)
        self.engine = engine
        self.topics = topics
        self.token = secrets.token_urlsafe(24)
        self.lock = threading.Lock()
        self.last_request = time.monotonic()
        self._atlas: Atlas | None = None

    @property
    def url(self) -> str:
        return f"http://{HOST}:{self.server_address[1]}/?t={self.token}"

    @property
    def cookie_name(self) -> str:
        # Browsers share cookies across ports on one host; the port keeps two servers apart.
        return f"brainviz_{self.server_address[1]}"

    def atlas(self, *, fresh: bool = True) -> Atlas:
        """The graph; ``fresh=False`` reuses the cached one without a change scan."""
        with self.lock:
            if not fresh and self._atlas is not None:
                return self._atlas
            return self._fresh_atlas()

    def _fresh_atlas(self) -> Atlas:
        """Caller holds the lock. Rebuild only when a scan reports changes."""
        stats = self.engine.scan()
        changed = stats.added or stats.changed or stats.removed or stats.renamed or stats.reresolved
        if self._atlas is None or changed:
            self._atlas = Atlas(build_graph(self.engine, topics=self.topics))
        return self._atlas

    def search(self, query: str) -> dict[str, Any]:
        from brainwiki.index.search import search

        query = query.strip()
        if not query:
            return {"results": []}
        with self.lock:
            atlas = self._fresh_atlas()
            results = atlas.search_titles(query)
            seen = {r["id"] for r in results}
            if len(results) < MAX_SEARCH:
                found = search(
                    self.engine,
                    query,
                    limit=MAX_SEARCH,
                    topics=self.topics,
                    intent="none",
                    include_episodes=False,
                )
                for hit in found["results"]:
                    node = atlas.note(hit["id"])
                    if node is None or hit["id"] in seen:
                        continue
                    seen.add(hit["id"])
                    results.append(
                        {
                            "id": hit["id"],
                            "title": node["title"],
                            "topic": node["topic"],
                            "kind": node["kind"],
                            "snippet": hit.get("snippet"),
                        }
                    )
        return {"results": results[:MAX_SEARCH]}

    def note(self, node_id: str) -> dict[str, Any]:
        from brainwiki.format.frontmatter import split
        from brainwiki.index.read import read

        with self.lock:
            result = read(self.engine, node_id, mode="outline")
            root = self.engine.brain.root
            text = self.engine.store.read_text(result["path"])
            links = self._visible_links(result["id"])
        out = {key: result.get(key) for key in _NOTE_FIELDS}
        out["abs_path"] = str(root / result["path"])
        # The preview renders the note like Obsidian: frontmatter as properties, the body as
        # Markdown, and wikilinks resolved only to notes this profile may see.
        fm = split(text)
        out["properties"] = fm.data
        out["markdown"] = fm.body[:MAX_MARKDOWN]
        out["links"] = links
        return out

    def _visible_links(self, node_id: str) -> dict[str, dict[str, Any]]:
        """Caller holds the lock. Link text as written -> the note it resolves to, if visible."""
        links: dict[str, dict[str, Any]] = {}
        rows = self.engine.db.execute(
            """SELECT e.raw_target, n.id, n.title, n.topic, n.privacy_rank FROM edges e
               JOIN nodes n ON n.id = e.other WHERE e.declared_in = ?""",
            (node_id,),
        )
        for row in rows:
            if self.engine.visible(row["privacy_rank"], row["topic"]):
                links[row["raw_target"]] = {
                    "id": row["id"],
                    "title": row["title"],
                    "topic": row["topic"],
                }
        return links

    def watch_idle(self, idle_seconds: float = IDLE_SECONDS, interval: float = 30.0) -> None:
        def run() -> None:
            while True:
                time.sleep(interval)
                if time.monotonic() - self.last_request > idle_seconds:
                    self.shutdown()
                    return

        threading.Thread(target=run, name="brain-viz-idle", daemon=True).start()


class _Handler(BaseHTTPRequestHandler):
    server_version = "brain-viz"
    sys_version = ""
    _set_cookie = False

    @property
    def viz(self) -> VizServer:
        return cast(VizServer, self.server)

    def log_message(self, format: str, *args: Any) -> None:
        return

    def do_GET(self) -> None:
        self.viz.last_request = time.monotonic()
        parts = urlsplit(self.path)
        query = parse_qs(parts.query)
        expected = self.viz.token.encode()
        by_query = hmac.compare_digest(query.get("t", [""])[0].encode(), expected)
        self._set_cookie = False
        if not by_query and not hmac.compare_digest(self._cookie().encode(), expected):
            self._send(HTTPStatus.FORBIDDEN, b"forbidden\n", "text/plain; charset=utf-8")
            return
        self._set_cookie = by_query
        try:
            self._route(parts.path, query)
        except Exception as exc:  # noqa: BLE001 - report, keep serving
            body = f"error: {type(exc).__name__}\n".encode()
            self._send(HTTPStatus.INTERNAL_SERVER_ERROR, body, "text/plain; charset=utf-8")

    def _cookie(self) -> str:
        try:
            jar = SimpleCookie(self.headers.get("Cookie", ""))
        except CookieError:
            return ""
        morsel = jar.get(self.viz.cookie_name)
        return morsel.value if morsel else ""

    def _route(self, path: str, query: dict[str, list[str]]) -> None:
        if path in ("/", "/index.html"):
            self._file(_app_dir() / "index.html", MIME[".html"])
        elif path.startswith("/assets/"):
            self._asset(path[len("/assets/") :])
        elif path == "/api/world":
            self._json(self.viz.atlas().world())
        elif path.startswith("/api/topic/"):
            # Topics come from the graph the page's world came from, and a reveal never waits on a scan.
            topic = self.viz.atlas(fresh=False).topic(unquote(path[len("/api/topic/") :]))
            if topic is None:
                self._not_found()
            else:
                self._json(topic)
        elif path.startswith("/api/note/"):
            self._note(unquote(path[len("/api/note/") :]))
        elif path == "/api/search":
            self._json(self.viz.search(query.get("q", [""])[0]))
        elif path == "/api/health":
            self._json(self.viz.atlas().health())
        else:
            self._not_found()

    def do_HEAD(self) -> None:
        self._send(HTTPStatus.METHOD_NOT_ALLOWED, b"", "text/plain; charset=utf-8")

    def do_POST(self) -> None:
        self._send(HTTPStatus.METHOD_NOT_ALLOWED, b"read-only\n", "text/plain; charset=utf-8")

    def _file(self, path: Path, mime: str) -> None:
        if not path.is_file():
            body = b"the visualizer app is not built (see viz-app/)\n"
            self._send(HTTPStatus.SERVICE_UNAVAILABLE, body, "text/plain; charset=utf-8")
            return
        self._send(HTTPStatus.OK, path.read_bytes(), mime)

    def _asset(self, name: str) -> None:
        name = unquote(name)
        if not _ASSET_RE.match(name) or ".." in name:
            self._not_found()
            return
        base = (_app_dir() / "assets").resolve()
        target = (base / name).resolve()
        mime = MIME.get(target.suffix)
        if not target.is_relative_to(base) or not target.is_file() or mime is None:
            self._not_found()
            return
        self._send(HTTPStatus.OK, target.read_bytes(), mime)

    def _note(self, node_id: str) -> None:
        try:
            data = self.viz.note(node_id)
        except (NotFound, Ambiguous):
            self._not_found()
            return
        self._json(data)

    def _json(self, data: Any) -> None:
        body = json.dumps(data, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self._send(HTTPStatus.OK, body, MIME[".json"])

    def _not_found(self) -> None:
        self._send(HTTPStatus.NOT_FOUND, b"not found\n", "text/plain; charset=utf-8")

    def _send(self, status: HTTPStatus, body: bytes, mime: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Security-Policy", CSP)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Cache-Control", "no-store")
        if self._set_cookie:
            self.send_header(
                "Set-Cookie",
                f"{self.viz.cookie_name}={self.viz.token}; HttpOnly; SameSite=Strict; Path=/",
            )
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


def _app_dir() -> Path:
    return APP_DIR


def make_server(engine: Engine, port: int = 0, topics: list[str] | None = None) -> VizServer:
    return VizServer(engine, port, topics)


def serve(
    engine: Engine, port: int, open_browser: bool, *, topics: list[str] | None = None
) -> None:
    server = make_server(engine, port, topics)
    server.watch_idle()
    print(f"brain viz: {server.url}")
    # Flush: through a pipe (an agent's shell tool, `| tee`) the token URL would otherwise
    # stay buffered until the server exits, and the map is unreachable without it.
    print("Press Ctrl-C to stop (stops by itself after 30 minutes idle).", flush=True)
    if open_browser:
        webbrowser.open(server.url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
