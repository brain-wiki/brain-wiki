"""Token-guarded, read-only HTTP server for the visualizer, on loopback unless asked otherwise
(design doc 12 §5, §8)."""

from __future__ import annotations

import hmac
import json
import re
import secrets
import socket
import socketserver
import sys
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
from brainwiki.viz import _export as export
from brainwiki.viz._export import build_graph
from brainwiki.viz._lod import MAX_SEARCH, Atlas

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_HOST = "127.0.0.1"
# Every-interface address -> the loopback address to open locally. Opt-in through --host.
_WILDCARDS = {"0.0.0.0": "127.0.0.1", "::": "::1"}  # noqa: S104
_LOOPBACK = ("127.0.0.1", "::1", "localhost")
_IDLE_SECONDS = 30 * 60
_MAX_MARKDOWN = 200_000
# Read at request time, so tests can point the server at a stand-in build.
_APP_DIR: Path = export.APP_DIR
_CSP = (
    "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; "
    "connect-src 'self'; worker-src 'self'; font-src 'self'"
)
_MIME = {
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
    "banners",
    "summary",
    "backlinks",
)


class _VizServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(
        self, engine: Engine, port: int, topics: list[str] | None = None, host: str = _HOST
    ):
        self.host = host
        if ":" in host:
            self.address_family = socket.AF_INET6
        super().__init__((host, port), _Handler)
        self.engine = engine
        self.topics = topics
        self.token = secrets.token_urlsafe(24)
        self.lock = threading.Lock()
        self.last_request = time.monotonic()
        self._atlas: Atlas | None = None

    def server_bind(self) -> None:
        # HTTPServer.server_bind names the server with socket.getfqdn, a reverse DNS lookup
        # that can stall for seconds on macOS; the server never uses the name.
        socketserver.TCPServer.server_bind(self)
        self.server_name, self.server_port = self.host, self.server_address[1]

    def _url(self, host: str) -> str:
        shown = f"[{host}]" if ":" in host else host
        return f"http://{shown}:{self.server_address[1]}/?t={self.token}"

    @property
    def url(self) -> str:
        """The address to open on this machine."""
        return self._url(_WILDCARDS.get(self.host, self.host))

    @property
    def remote_url(self) -> str | None:
        """The address for other machines, when the server listens beyond loopback."""
        if self.host in _LOOPBACK:
            return None
        return self._url(socket.gethostname() if self.host in _WILDCARDS else self.host)

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
        from brainwiki.index import search

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
        from brainwiki.format import split
        from brainwiki.index import read

        with self.lock:
            result = read(self.engine, node_id, mode="outline")
            root = self.engine.brain.root
            text = self.engine.store.read_text(result["path"])
            links = self._links(result["id"])
        out = {key: result.get(key) for key in _NOTE_FIELDS}
        out["outlinks"] = result.get("links")
        out["abs_path"] = str(root / result["path"])
        # The preview renders the note like Obsidian: frontmatter as properties, the body as
        # Markdown, and wikilinks resolved to the notes they name.
        fm = split(text)
        out["properties"] = fm.raw  # as written: no plain-name copies of bw- fields
        out["markdown"] = fm.body[:_MAX_MARKDOWN]
        out["links"] = links
        return out

    def _links(self, node_id: str) -> dict[str, dict[str, Any]]:
        """Caller holds the lock. Link text as written -> the note it resolves to."""
        rows = self.engine.db.execute(
            """SELECT e.raw_target, n.id, n.title, n.topic FROM edges e
               JOIN nodes n ON n.id = e.other WHERE e.declared_in = ?""",
            (node_id,),
        )
        return {
            row["raw_target"]: {"id": row["id"], "title": row["title"], "topic": row["topic"]}
            for row in rows
        }

    def watch_idle(self, idle_seconds: float = _IDLE_SECONDS, interval: float = 30.0) -> None:
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
    def viz(self) -> _VizServer:
        return cast(_VizServer, self.server)

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
            self._file(_app_dir() / "index.html", _MIME[".html"])
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
            body = b"the visualizer app is not built; see CONTRIBUTING.md (brain-wiki-viz)\n"
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
        mime = _MIME.get(target.suffix)
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
        self._send(HTTPStatus.OK, body, _MIME[".json"])

    def _not_found(self) -> None:
        self._send(HTTPStatus.NOT_FOUND, b"not found\n", "text/plain; charset=utf-8")

    def _send(self, status: HTTPStatus, body: bytes, mime: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Security-Policy", _CSP)
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
    return _APP_DIR


def _make_server(
    engine: Engine, port: int = 0, topics: list[str] | None = None, host: str = _HOST
) -> _VizServer:
    return _VizServer(engine, port, topics, host)


def serve(
    engine: Engine,
    port: int,
    open_browser: bool,
    *,
    topics: list[str] | None = None,
    host: str = _HOST,
) -> None:
    server = _make_server(engine, port, topics, host)
    server.watch_idle()
    print(f"brain viz: {server.url}")
    if server.remote_url:
        print(f"From other machines: {server.remote_url}")
        print(
            "Anyone who can reach this address and has the link can read the brain, and the "
            "traffic is not encrypted; on an untrusted network, use an SSH tunnel instead.",
            file=sys.stderr,
        )
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
