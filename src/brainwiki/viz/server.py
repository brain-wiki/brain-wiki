"""Loopback-only, token-guarded, read-only HTTP server for the visualizer (design doc 12 §2, §7)."""

from __future__ import annotations

import hmac
import json
import re
import secrets
import threading
import time
import webbrowser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import TYPE_CHECKING, Any, cast
from urllib.parse import parse_qs, unquote, urlsplit

from brainwiki.errors import Ambiguous, NotFound
from brainwiki.viz.export import ASSETS, build_graph

if TYPE_CHECKING:
    from brainwiki.engine import Engine

HOST = "127.0.0.1"
IDLE_SECONDS = 30 * 60
CSP = (
    "default-src 'none'; script-src 'self'; style-src 'self'; "
    "img-src 'self' data:; connect-src 'self'"
)
MIME = {
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
}
_ASSET_RE = re.compile(r"^(?:vendor/)?[A-Za-z0-9][A-Za-z0-9_.-]*$")
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

    @property
    def url(self) -> str:
        return f"http://{HOST}:{self.server_address[1]}/?t={self.token}"

    def graph(self) -> dict[str, Any]:
        with self.lock:
            return build_graph(self.engine, topics=self.topics)

    def note(self, node_id: str) -> dict[str, Any]:
        from brainwiki.index.read import read

        with self.lock:
            result = read(self.engine, node_id, mode="outline")
            root = self.engine.brain.root
        out = {key: result.get(key) for key in _NOTE_FIELDS}
        out["abs_path"] = str(root / result["path"])
        return out

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

    @property
    def viz(self) -> VizServer:
        return cast(VizServer, self.server)

    def log_message(self, format: str, *args: Any) -> None:
        return

    def do_GET(self) -> None:
        self.viz.last_request = time.monotonic()
        parts = urlsplit(self.path)
        token = parse_qs(parts.query).get("t", [""])[0]
        if not hmac.compare_digest(token.encode(), self.viz.token.encode()):
            self._send(HTTPStatus.FORBIDDEN, b"forbidden\n", "text/plain; charset=utf-8")
            return
        try:
            self._route(parts.path)
        except Exception as exc:  # noqa: BLE001 - report, keep serving
            body = f"error: {type(exc).__name__}\n".encode()
            self._send(HTTPStatus.INTERNAL_SERVER_ERROR, body, "text/plain; charset=utf-8")

    def _route(self, path: str) -> None:
        if path in ("/", "/index.html"):
            self._index()
        elif path.startswith("/assets/"):
            self._asset(path[len("/assets/") :])
        elif path == "/api/graph":
            self._json(self.viz.graph())
        elif path.startswith("/api/note/"):
            self._note(unquote(path[len("/api/note/") :]))
        else:
            self._not_found()

    def do_HEAD(self) -> None:
        self._send(HTTPStatus.METHOD_NOT_ALLOWED, b"", "text/plain; charset=utf-8")

    def do_POST(self) -> None:
        self._send(HTTPStatus.METHOD_NOT_ALLOWED, b"read-only\n", "text/plain; charset=utf-8")

    def _index(self) -> None:
        html = (ASSETS / "index.html").read_text(encoding="utf-8")
        body = html.replace("__TOKEN__", self.viz.token).encode("utf-8")
        self._send(HTTPStatus.OK, body, MIME[".html"])

    def _asset(self, name: str) -> None:
        name = unquote(name)
        if not _ASSET_RE.match(name) or ".." in name:
            self._not_found()
            return
        base = ASSETS.resolve()
        target = (base / name).resolve()
        mime = MIME.get(target.suffix)
        if not target.is_relative_to(base) or not target.is_file() or mime is None:
            self._not_found()
            return
        if target.name == "index.html":
            self._index()
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
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
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
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


def make_server(engine: Engine, port: int = 0, topics: list[str] | None = None) -> VizServer:
    return VizServer(engine, port, topics)


def serve(
    engine: Engine, port: int, open_browser: bool, *, topics: list[str] | None = None
) -> None:
    server = make_server(engine, port, topics)
    server.watch_idle()
    print(f"brain viz: {server.url}")
    print("Press Ctrl-C to stop (stops by itself after 30 minutes idle).")
    if open_browser:
        webbrowser.open(server.url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
