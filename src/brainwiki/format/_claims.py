"""Claims: `bw-claims` strings, or (format 1) list items under `## Claims` read only to convert
them (brain-format.md §13).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from brainwiki.format._meta import split_meta

_ITEM_RE = re.compile(r"^(?P<bullet>[-*+])\s+(?P<rest>.*)$")
_STRUCK_RE = re.compile(r"^~~(?P<text>.+?)~~\s*$")


@dataclass
class Claim:
    line: int  # 1-based line of the item's first line
    last_line: int  # line holding the metadata comment
    text: str
    meta: dict[str, str] = field(default_factory=dict)
    struck: bool = False  # superseded: struck through (format 1) or in `bw-claims-superseded`
    has_meta: bool = False
    key: str | None = None  # the frontmatter list holding it (`bw-claims`); None for a body line
    index: int = 0  # its position in that list

    @property
    def id(self) -> str | None:
        return self.meta.get("id")

    @property
    def status(self) -> str:
        if self.meta.get("status"):
            return self.meta["status"]
        return "superseded" if self.struck else "active"

    @property
    def inputs(self) -> str:
        """Failing closed: anything but absent or `local` reads as unverified (write-path.md §3)."""
        value = self.meta.get("inputs", "local")
        return value if value in ("local", "external") else "unknown"

    @property
    def sources(self) -> list[str]:
        raw = self.meta.get("src", "")
        return [s.strip() for s in raw.split(",") if s.strip()]


def parse_claim_block(lines: list[tuple[int, str]]) -> tuple[list[Claim], list[tuple[int, str]]]:
    """Parse the lines of a Claims section. Returns (claims, malformed (line, message))."""
    claims: list[Claim] = []
    problems: list[tuple[int, str]] = []
    current: list[tuple[int, str]] = []

    def flush() -> None:
        if not current:
            return
        first_line, first_text = current[0]
        match = _ITEM_RE.match(first_text)
        assert match is not None
        pieces = [match.group("rest")] + [t.strip() for _, t in current[1:]]
        last_line, last_text = current[-1]
        joined = " ".join(p for p in pieces if p)
        text, meta = split_meta(joined)
        if "<!--" in text and meta is None:
            problems.append((last_line, "claim metadata comment is malformed"))
        struck = bool(_STRUCK_RE.match(text))
        if struck:
            m = _STRUCK_RE.match(text)
            assert m is not None
            text = m.group("text")
        claims.append(
            Claim(
                line=first_line,
                last_line=last_line,
                text=text.strip(),
                meta=meta or {},
                struck=struck,
                has_meta=meta is not None,
            )
        )
        current.clear()

    for line_no, text in lines:
        if _ITEM_RE.match(text):
            flush()
            current.append((line_no, text))
        elif current and text.startswith(("  ", "\t")) and text.strip():
            current.append((line_no, text))
        else:
            flush()
    flush()
    return claims, problems


def _clean_claim_text(text: str) -> str:
    return " ".join(text.replace("<!--", "").replace("-->", "").split())
