"""Line-local edits to notes: append to a section, replace one line, insert above a line."""

from __future__ import annotations

from brainwiki.format.document import HEADING_RE
from brainwiki.format.links import mask_code


def _newline(text: str) -> str:
    return "\r\n" if "\r\n" in text else "\n"


def _split(text: str) -> list[str]:
    return text.split("\n") if "\r\n" not in text else text.split("\r\n")


def _join(lines: list[str], newline: str) -> str:
    return newline.join(lines)


def _body_start(lines: list[str]) -> int:
    if lines and lines[0].strip() == "---":
        for idx in range(1, len(lines)):
            if lines[idx].strip() in ("---", "..."):
                return idx + 1
    return 0


def _find_section(lines: list[str], name: str) -> tuple[int, int] | None:
    """Return (heading index, end index exclusive) of a level-2 section, by 0-based indexes."""
    start = _body_start(lines)
    masked = [""] * start + mask_code(lines[start:])
    heading_idx = None
    for idx in range(start, len(lines)):
        match = HEADING_RE.match(masked[idx])
        if not match:
            continue
        level = len(match.group("hashes"))
        if heading_idx is None:
            if level == 2 and match.group("text").strip().lower() == name:
                heading_idx = idx
        elif level <= 2:
            return heading_idx, idx
    if heading_idx is None:
        return None
    return heading_idx, len(lines)


def append_to_section(
    text: str, section: str, new_lines: list[str], *, create_before: str | None = None
) -> str:
    """Append lines at the end of a section's list, creating the section if needed.

    A new section is inserted before `create_before` when that section exists, else at the end.
    """
    newline = _newline(text)
    lines = _split(text)
    found = _find_section(lines, section)
    if found is None:
        heading = "## " + section.capitalize()
        block = [heading, *new_lines, ""]
        anchor = _find_section(lines, create_before) if create_before else None
        if anchor is not None:
            insert_at = anchor[0]
            lines[insert_at:insert_at] = block
        else:
            while lines and lines[-1] == "":
                lines.pop()
            lines.extend(["", *block])
        return _join(lines, newline)
    heading_idx, end = found
    insert_at = end
    while insert_at - 1 > heading_idx and lines[insert_at - 1].strip() == "":
        insert_at -= 1
    lines[insert_at:insert_at] = new_lines
    if insert_at + len(new_lines) < len(lines) and lines[insert_at + len(new_lines)].strip() != "":
        lines.insert(insert_at + len(new_lines), "")
    return _join(lines, newline)


def replace_line(text: str, line_no: int, new_line: str) -> str:
    newline = _newline(text)
    lines = _split(text)
    lines[line_no - 1] = new_line
    return _join(lines, newline)


def replace_line_matching(text: str, original: str, new_line: str, hint: int | None = None) -> str:
    """Replace the line whose content equals `original`, nearest to `hint` (1-based).

    Locating by content keeps several edits to one file correct even after earlier edits
    shifted line numbers. Returns the text unchanged when no line matches.
    """
    newline = _newline(text)
    lines = _split(text)
    matches = [i for i, line in enumerate(lines) if line == original]
    if not matches:
        return text
    target = min(matches, key=lambda i: abs(i + 1 - (hint or i + 1)))
    lines[target] = new_line
    return _join(lines, newline)


def insert_before_line(text: str, line_no: int, new_lines: list[str]) -> str:
    newline = _newline(text)
    lines = _split(text)
    lines[line_no - 1 : line_no - 1] = new_lines
    return _join(lines, newline)


def section_lines(text: str, section: str) -> list[str]:
    lines = _split(text)
    found = _find_section(lines, section)
    if not found:
        return []
    return lines[found[0] + 1 : found[1]]


def line_count(text: str) -> int:
    return len(text.splitlines())
