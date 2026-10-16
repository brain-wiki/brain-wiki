"""`--to-episodes` and `--from <host>`: documents and agent memory files become episodes (docs/design/import.md §6)."""

from __future__ import annotations

import hashlib
import os
import re
from pathlib import Path
from typing import TYPE_CHECKING, Any

from brainwiki.errors import NotFound, UnsupportedHost
from brainwiki.format import EpisodeContent, split
from brainwiki.write import write_episode

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_MEMORY_HOSTS = ("claude-code", "codex", "antigravity", "openclaw")
_CHUNK_BYTES = 8 * 1024
_HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$")


def memory_files(host: str, override: Path | None = None) -> list[Path]:
    """Where each host keeps its own memory (docs/design/import.md §6; locations change, so they live in code)."""
    home = Path.home()
    if override:
        if not override.exists():
            raise NotFound(f"no such file or folder: {override}")
        return sorted(p for p in ([override] if override.is_file() else override.rglob("*.md")))
    if host == "claude-code":
        base = Path(os.environ.get("CLAUDE_CONFIG_DIR") or home / ".claude").expanduser()
        found = sorted(base.glob("projects/*/memory/*.md"))
        return found + [p for p in (base / "CLAUDE.md",) if p.is_file()]
    if host == "codex":
        base = Path(os.environ.get("CODEX_HOME") or home / ".codex").expanduser()
        return sorted((base / "memories").rglob("*.md")) + [
            p for p in (base / "AGENTS.md",) if p.is_file()
        ]
    if host == "antigravity":
        base = home / ".gemini"
        candidates = [
            base / "AGENTS.md",
            base / "GEMINI.md",
            *sorted((base / "config" / "rules").glob("*.md")),
        ]
        return [p for p in candidates if p.is_file()]
    if host == "openclaw":
        base = home / ".openclaw" / "workspace"
        candidates = [base / "MEMORY.md", base / "USER.md", *sorted((base / "memory").glob("*.md"))]
        return [p for p in candidates if p.is_file()]
    raise UnsupportedHost(
        f"no known memory files for {host!r} (known: {', '.join(_MEMORY_HOSTS)}); "
        "give their location as PATH"
    )


def _split_document(text: str) -> list[tuple[str | None, str]]:
    """Split the body (frontmatter is metadata, not content) on headings into chunks of at most
    CHUNK_BYTES: [(heading, text)]."""
    sections: list[tuple[str | None, list[str]]] = [(None, [])]
    for line in split(text).body.splitlines():
        match = _HEADING.match(line)
        if match:
            sections.append((match.group(1), [line]))
        else:
            sections[-1][1].append(line)
    chunks: list[tuple[str | None, str]] = []
    for heading, lines in sections:
        body = "\n".join(lines).strip()
        while body:
            piece = body.encode("utf-8")[:_CHUNK_BYTES].decode("utf-8", "ignore")
            if len(piece) < len(body) and "\n" in piece:
                piece = piece[: piece.rfind("\n")]
            chunks.append((heading, piece.strip()))
            body = body[len(piece) :].strip()
    return [(h, t) for h, t in chunks if t]


def import_documents(
    engine: Engine,
    paths: list[Path],
    *,
    base: Path,
    origin: str,
    inputs: str,
    agent: str | None = None,
    topic: str | None = None,
    dry_run: bool = False,
) -> list[dict[str, Any]]:
    results = []
    for path in paths:
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            results.append({"file": str(path), "error": "unreadable"})
            continue
        try:
            name = path.relative_to(base).as_posix()
        except ValueError:
            name = path.name
        for heading, chunk in _split_document(text):
            source = name + (f"#{heading}" if heading else "")
            if dry_run:
                results.append({"source": source, "bytes": len(chunk.encode("utf-8"))})
                continue
            key = "import:" + hashlib.sha256(f"{source}\n{chunk}".encode()).hexdigest()[:24]
            written = write_episode(
                engine,
                EpisodeContent(summary=chunk),
                origin=origin,
                inputs=inputs,
                captured="import",
                agent=agent,
                topics=[topic] if topic else None,
                dedupe=key,
                source=source[:200].replace("\n", " "),
            )
            results.append({"source": source, "episode": written.path, "deduped": written.deduped})
    return results
