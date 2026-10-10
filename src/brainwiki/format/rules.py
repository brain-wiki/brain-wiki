"""`rules.md`: standing directives with the user's verbatim quote (design doc 02 §10)."""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from brainwiki.format.meta import format_meta, split_meta

_ITEM_RE = re.compile(r"^[-*+]\s+(?P<rest>.+)$")
RULES_HEADER = "# Rules\n"


@dataclass
class Rule:
    line: int
    text: str
    meta: dict[str, str] = field(default_factory=dict)
    has_meta: bool = False

    @property
    def id(self) -> str | None:
        return self.meta.get("id")


def parse_rules(text: str) -> tuple[list[Rule], list[tuple[int, str]]]:
    rules: list[Rule] = []
    problems: list[tuple[int, str]] = []
    for idx, line in enumerate(text.splitlines(), start=1):
        match = _ITEM_RE.match(line)
        if not match:
            continue
        body, meta = split_meta(match.group("rest"))
        if "<!--" in body and meta is None:
            problems.append((idx, "rule metadata comment is malformed"))
        rules.append(Rule(idx, body.strip(), meta or {}, meta is not None))
    return rules, problems


def format_rule(text: str, meta: dict[str, str]) -> str:
    return f"- {' '.join(text.split())} {format_meta(meta)}"
