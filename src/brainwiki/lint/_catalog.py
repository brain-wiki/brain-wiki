"""The BW rule catalog (lint-and-reports.md §3). Codes are stable; new rules get new codes."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class _RuleInfo:
    code: str
    strict: str
    migrate: str
    fixable: bool
    summary: str


_RULES = [
    _RuleInfo("BW101", "error", "error", False, "frontmatter is not valid YAML"),
    _RuleInfo("BW102", "error", "warning", False, "frontmatter contains a nested mapping"),
    _RuleInfo("BW103", "error", "info", True, "note has no id"),
    _RuleInfo("BW104", "error", "warning", True, "id is not a ULID"),
    _RuleInfo("BW105", "error", "error", True, "two files share an id"),
    _RuleInfo("BW106", "error", "info", True, "status is not active, superseded, or archived"),
    _RuleInfo("BW109", "warning", "warning", False, "unknown key in brain.toml"),
    _RuleInfo("BW110", "warning", "warning", False, "two paths differ only by letter case"),
    _RuleInfo("BW111", "error", "error", False, "file is not valid UTF-8"),
    _RuleInfo("BW112", "warning", "warning", False, "file looks like a sync conflict copy"),
    _RuleInfo("BW114", "error", "error", False, "leftover merge conflict markers"),
    _RuleInfo("BW115", "warning", "warning", False, "database or lock file inside the brain"),
    _RuleInfo(
        "BW117",
        "error",
        "warning",
        True,
        "older format: claims or relations not where format 4 keeps them",
    ),
    _RuleInfo("BW118", "error", "warning", False, "unknown bw- field in a note"),
    _RuleInfo(
        "BW119",
        "error",
        "warning",
        True,
        "bw-superseded_by is malformed, unresolved, or without status: superseded",
    ),
    _RuleInfo("BW120", "error", "warning", False, "bw-sources item is not a link or a URL"),
    _RuleInfo("BW121", "error", "error", False, "file is never edited directly"),
    _RuleInfo("BW122", "warning", "info", False, "bw-sources link does not resolve"),
    _RuleInfo("BW123", "error", "warning", False, "relation field item is not one link"),
    _RuleInfo("BW124", "warning", "info", False, "relation field link does not resolve"),
    _RuleInfo("BW307", "error", "error", False, "supersession cycle (bw-superseded_by)"),
    _RuleInfo("BW310", "warning", "info", True, "body link does not resolve"),
    _RuleInfo("BW312", "error", "warning", False, "note names itself in a relation field"),
    _RuleInfo("BW313", "info", "info", True, "bw-part_of names the note's own topic page"),
    _RuleInfo(
        "BW314",
        "info",
        "info",
        True,
        "conflict with a superseded or archived note (likely resolved)",
    ),
    _RuleInfo("BW315", "error", "error", False, "part_of cycle (bw-part_of)"),
    _RuleInfo("BW402", "error", "error", False, "rules.md exceeds its budget"),
    _RuleInfo("BW403", "error", "warning", True, "AGENTS.md exceeds its budget"),
    _RuleInfo("BW404", "warning", "info", True, "topic folder has no topic page"),
    _RuleInfo("BW405", "info", "off", True, "note is missing from its topic page's ## Notes"),
    _RuleInfo("BW406", "info", "off", False, "orphan note"),
    _RuleInfo("BW407", "info", "off", False, "note outside any topic"),
    _RuleInfo("BW408", "warning", "warning", True, "AGENTS.md managed block missing or stale"),
    _RuleInfo("BW409", "error", "warning", False, "topic slug invalid"),
    _RuleInfo("BW410", "warning", "info", True, "topic page has the old default name"),
    _RuleInfo("BW411", "warning", "warning", False, "topic rules exceed their budget"),
    _RuleInfo("BW501", "error", "error", False, "episode changed after it was created"),
    _RuleInfo("BW502", "error", "warning", True, "episode path does not match its id"),
    _RuleInfo("BW503", "error", "warning", True, "episode lacks required provenance fields"),
    _RuleInfo("BW504", "warning", "warning", False, "proposal references a missing episode"),
    _RuleInfo("BW505", "info", "info", False, "episodes pending too long"),
    _RuleInfo("BW601", "error", "warning", False, "rule has no quote"),
    _RuleInfo("BW602", "error", "error", False, "rule origin is not owner"),
    _RuleInfo("BW603", "error", "error", False, "rule line does not parse"),
    _RuleInfo("BW701", "error", "error", False, "text matches a secret pattern"),
]
_RULES: dict[str, _RuleInfo] = {r.code: r for r in _RULES}
# The frontmatter rules `brain validate` runs (lint-and-reports.md §3).
SCHEMA_CODES = (
    "BW101",
    "BW102",
    "BW103",
    "BW104",
    "BW105",
    "BW106",
    "BW117",
    "BW118",
    "BW119",
    "BW120",
    "BW121",
    "BW122",
    "BW123",
    "BW124",
    "BW307",
    "BW312",
    "BW313",
    "BW314",
    "BW315",
)


def severity(code: str, profile: str) -> str:
    info = _RULES.get(code)
    if info is None:
        return "error"
    if profile == "off":
        return "off"
    return info.migrate if profile == "migrate" else info.strict


def fixable(code: str) -> bool:
    info = _RULES.get(code)
    return bool(info and info.fixable)


def unknown_codes(patterns: list[str]) -> list[str]:
    """The codes or prefixes (`BW3`, `BW405`) in `patterns` that match no rule."""
    return [p for p in patterns if not any(code.startswith(p.upper()) for code in _RULES)]
