"""The BW rule catalog (design doc 06 §3). Codes are stable; new rules get new codes."""

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
    _RuleInfo("BW113", "info", "info", True, "frontmatter property holds relation-like links"),
    _RuleInfo("BW114", "error", "error", False, "leftover merge conflict markers"),
    _RuleInfo("BW115", "warning", "warning", False, "database or lock file inside the brain"),
    _RuleInfo(
        "BW116", "warning", "info", True, "note is in format 1 (body sections, unprefixed fields)"
    ),
    _RuleInfo("BW201", "error", "warning", False, "claim metadata comment is malformed"),
    _RuleInfo("BW202", "error", "error", True, "duplicate claim id"),
    _RuleInfo("BW203", "error", "warning", False, "by: points to a claim that does not exist"),
    _RuleInfo("BW204", "warning", "info", False, "src: points to a missing file or line range"),
    _RuleInfo("BW205", "info", "off", True, "claim has no metadata"),
    _RuleInfo("BW206", "warning", "warning", False, "near-identical claims cite the same span"),
    _RuleInfo("BW207", "error", "warning", False, "more than one ## Claims section"),
    _RuleInfo("BW301", "error", "warning", False, "relation line does not parse"),
    _RuleInfo("BW302", "error", "warning", False, "unknown relation verb or bw- field"),
    _RuleInfo("BW303", "warning", "info", True, "alias verb instead of canonical"),
    _RuleInfo("BW304", "error", "warning", True, "relation target does not resolve"),
    _RuleInfo("BW305", "error", "error", False, "relation target is ambiguous"),
    _RuleInfo("BW306", "error", "error", False, "note relates to itself"),
    _RuleInfo("BW307", "error", "error", False, "supersession cycle"),
    _RuleInfo("BW308", "warning", "info", True, "supersedes target is not status: superseded"),
    _RuleInfo("BW309", "error", "error", False, "contradictory containment"),
    _RuleInfo("BW310", "warning", "info", True, "body link does not resolve"),
    _RuleInfo("BW311", "error", "warning", False, "more than one ## Relations section"),
    _RuleInfo("BW402", "error", "error", False, "rules.md exceeds its budget"),
    _RuleInfo("BW403", "error", "warning", True, "AGENTS.md exceeds its budget"),
    _RuleInfo("BW404", "warning", "info", True, "topic folder has no hub"),
    _RuleInfo("BW405", "info", "off", True, "note is missing from its hub's ## Notes"),
    _RuleInfo("BW406", "info", "off", False, "orphan note"),
    _RuleInfo("BW407", "info", "off", False, "note outside any topic"),
    _RuleInfo("BW408", "warning", "warning", True, "AGENTS.md managed block missing or stale"),
    _RuleInfo("BW409", "error", "warning", False, "topic slug invalid"),
    _RuleInfo("BW501", "error", "error", False, "episode changed after it was created"),
    _RuleInfo("BW502", "error", "warning", True, "episode path does not match its id"),
    _RuleInfo("BW503", "error", "warning", True, "episode lacks required provenance fields"),
    _RuleInfo("BW504", "warning", "warning", False, "proposal references a missing episode"),
    _RuleInfo("BW505", "info", "info", False, "episodes pending too long"),
    _RuleInfo("BW601", "error", "warning", False, "rule has no quote"),
    _RuleInfo("BW602", "error", "error", False, "rule origin is not owner"),
    _RuleInfo("BW603", "error", "error", False, "rule line does not parse"),
    _RuleInfo("BW701", "error", "error", False, "text matches a secret pattern"),
    _RuleInfo("BW702", "warning", "warning", False, "instruction-like text in an unverified claim"),
]
_RULES: dict[str, _RuleInfo] = {r.code: r for r in _RULES}


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
