"""Body links: `[[wikilinks]]`, embeds, and Markdown links to notes (design doc 02 §6.5)."""

from __future__ import annotations

import re
from dataclasses import dataclass
from urllib.parse import unquote

WIKILINK_RE = re.compile(r"(?P<embed>!?)\[\[(?P<inner>[^\[\]\n]+?)\]\]")
MDLINK_RE = re.compile(r"(?<!!)\[(?P<label>[^\]\n]*)\]\((?P<href>[^)\s]+)\)")
_FENCE_RE = re.compile(r"^(\s*)(```|~~~)")
_INLINE_CODE_RE = re.compile(r"`[^`\n]*`")


@dataclass
class Link:
    line: int
    target: str
    heading: str | None
    label: str | None
    embed: bool
    kind: str  # "wiki" | "md"


def mask_code(lines: list[str]) -> list[str]:
    """Blank out fenced code blocks and inline code so links inside them are ignored."""
    masked, in_fence, fence = [], False, ""
    for line in lines:
        match = _FENCE_RE.match(line)
        if match and (not in_fence or line.strip().startswith(fence)):
            in_fence = not in_fence
            fence = match.group(2)
            masked.append("")
            continue
        masked.append("" if in_fence else _INLINE_CODE_RE.sub("", line))
    return masked


def extract_links(
    lines: list[str], first_line: int = 1, *, skip_lines: set[int] | None = None
) -> list[Link]:
    links: list[Link] = []
    for offset, line in enumerate(mask_code(lines)):
        line_no = first_line + offset
        if skip_lines and line_no in skip_lines:
            continue
        for match in WIKILINK_RE.finditer(line):
            inner = match.group("inner")
            label = None
            if "|" in inner:
                inner, label = inner.split("|", 1)
            heading = None
            if "#" in inner:
                inner, heading = inner.split("#", 1)
            if not inner.strip():
                continue  # same-note heading link
            links.append(
                Link(line_no, inner.strip(), heading, label, bool(match.group("embed")), "wiki")
            )
        for match in MDLINK_RE.finditer(line):
            href = match.group("href")
            if "://" in href or href.startswith(("#", "mailto:")):
                continue
            path, _, heading = href.partition("#")
            path = unquote(path)
            if not path.lower().endswith(".md") and "." in path.rsplit("/", 1)[-1]:
                continue  # attachment links are not note links
            links.append(
                Link(line_no, path, heading or None, match.group("label") or None, False, "md")
            )
    return links
