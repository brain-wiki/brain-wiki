"""`brain import <folder> --into <brain>`: copy notes in as topics, rewriting links (design doc 09 §5)."""

from __future__ import annotations

import posixpath
import re
from pathlib import Path
from typing import TYPE_CHECKING, Any
from urllib.parse import quote, unquote

from brainwiki.importer.normalize import convert_relations, identity_and_status
from brainwiki.importer.survey import survey
from brainwiki.index.resolver import norm_key
from brainwiki.index.topics import slugify
from brainwiki.runs import Run

if TYPE_CHECKING:
    from brainwiki.engine import Engine

_WIKI = re.compile(r"(?P<embed>!?)\[\[(?P<target>[^\]|#\n]+)(?P<rest>[^\]\n]*)\]\]")
_MD = re.compile(r"(?<!!)\[(?P<label>[^\]\n]*)\]\((?P<href>[^)\s]+)\)")


def plan_into(
    engine: Engine, source: Path, *, topic: str | None = None
) -> tuple[Run, dict[str, Any]]:
    source = source.expanduser().resolve()
    found = survey(source)
    topics_dir = engine.manifest.layout.topics_dir
    mapping: dict[str, str] = {}
    for rel in found.notes:
        if topic:
            new = f"{topics_dir}/{topic}/{rel}"
        else:
            first, _, rest = rel.partition("/")
            new = (
                f"{topics_dir}/{slugify(first)}/{rest}"
                if rest
                else f"{topics_dir}/{slugify(source.name)}/{first}"
            )
        mapping[rel] = new
    by_key = {norm_key(old): new for old, new in mapping.items()}
    run = Run(engine, "import", summary=f"import {len(mapping)} notes from {source.name}")
    unresolved = 0
    for old, new in mapping.items():
        text = (source / old).read_text(encoding="utf-8", errors="replace")

        def wiki(match: re.Match[str], old: str = old) -> str:
            target = match.group("target").strip()
            hit = by_key.get(norm_key(target)) or by_key.get(
                norm_key(posixpath.join(posixpath.dirname(old), target))
            )
            if hit is None or "/" not in target:
                return match.group(0)  # file-name links keep resolving after the move
            return f"{match.group('embed')}[[{hit[:-3] if hit.endswith('.md') else hit}{match.group('rest')}]]"

        def md(match: re.Match[str], old: str = old, new: str = new) -> str:
            nonlocal unresolved
            href = match.group("href")
            if "://" in href or href.startswith(("#", "mailto:")):
                return match.group(0)
            path, _, anchor = unquote(href).partition("#")
            target_old = posixpath.normpath(posixpath.join(posixpath.dirname(old), path))
            hit = mapping.get(target_old)
            if hit is None:
                if path.endswith(".md"):
                    unresolved += 1
                return match.group(0)
            rel = posixpath.relpath(hit, posixpath.dirname(new))
            return f"[{match.group('label')}]({quote(rel)}{'#' + anchor if anchor else ''})"

        text = _MD.sub(md, _WIKI.sub(wiki, text))
        text = identity_and_status(convert_relations(text))
        run.create(new, text)
    summary = {
        "source": str(source),
        "files": len(mapping),
        "unresolved_md_links": unresolved,
        "topics": sorted({n.split("/")[1] for n in mapping.values()}),
    }
    return run, summary
