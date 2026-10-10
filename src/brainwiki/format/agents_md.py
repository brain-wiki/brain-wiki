"""The generated block inside a brain's `AGENTS.md` (design doc 02 §11)."""

from __future__ import annotations

BEGIN = "<!-- brain-wiki:begin (generated; edit outside these markers) -->"
END = "<!-- brain-wiki:end -->"


def replace_block(text: str, block: str) -> str:
    """Insert or replace the managed block, preserving everything outside the markers."""
    managed = f"{BEGIN}\n{block.rstrip()}\n{END}"
    start = text.find(BEGIN)
    end = text.find(END)
    if start != -1 and end != -1 and end > start:
        return text[:start] + managed + text[end + len(END) :]
    if not text.strip():
        return managed + "\n"
    return managed + "\n\n" + text.lstrip("\n")


def extract_block(text: str) -> str | None:
    start = text.find(BEGIN)
    end = text.find(END)
    if start == -1 or end == -1 or end < start:
        return None
    return text[start + len(BEGIN) : end].strip("\n")
