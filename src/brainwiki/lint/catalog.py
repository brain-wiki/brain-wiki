"""The BW rule catalog (design doc 06 §3). Codes are stable; new rules get new codes."""

from __future__ import annotations

from dataclasses import dataclass

SEVERITIES = ("error", "warning", "info", "off")


@dataclass(frozen=True)
class RuleInfo:
    code: str
    strict: str
    migrate: str
    fixable: bool
    summary: str


_RULES = [
    RuleInfo("BW101", "error", "error", False, "frontmatter is not valid YAML"),
    RuleInfo("BW102", "error", "warning", False, "frontmatter contains a nested mapping"),
    RuleInfo("BW103", "error", "info", True, "note has no id"),
    RuleInfo("BW104", "error", "warning", True, "id is not a ULID"),
    RuleInfo("BW105", "error", "error", True, "two files share an id"),
    RuleInfo("BW106", "error", "info", True, "status is not active, superseded, or archived"),
    RuleInfo("BW109", "warning", "warning", False, "unknown key in brain.toml"),
    RuleInfo("BW110", "warning", "warning", False, "two paths differ only by letter case"),
    RuleInfo("BW111", "error", "error", False, "file is not valid UTF-8"),
    RuleInfo("BW112", "warning", "warning", False, "file looks like a sync conflict copy"),
    RuleInfo("BW113", "info", "info", True, "frontmatter property holds relation-like links"),
    RuleInfo("BW114", "error", "error", False, "leftover merge conflict markers"),
    RuleInfo("BW115", "warning", "warning", False, "database or lock file inside the brain"),
    RuleInfo(
        "BW116", "warning", "info", True, "note is in format 1 (body sections, unprefixed fields)"
    ),
    RuleInfo("BW201", "error", "warning", False, "claim metadata comment is malformed"),
    RuleInfo("BW202", "error", "error", True, "duplicate claim id"),
    RuleInfo("BW203", "error", "warning", False, "by: points to a claim that does not exist"),
    RuleInfo("BW204", "warning", "info", False, "src: points to a missing file or line range"),
    RuleInfo("BW205", "info", "off", True, "claim has no metadata"),
    RuleInfo("BW206", "warning", "warning", False, "near-identical claims cite the same span"),
    RuleInfo("BW207", "error", "warning", False, "more than one ## Claims section"),
    RuleInfo("BW301", "error", "warning", False, "relation line does not parse"),
    RuleInfo("BW302", "error", "warning", False, "unknown relation verb or bw- field"),
    RuleInfo("BW303", "warning", "info", True, "alias verb instead of canonical"),
    RuleInfo("BW304", "error", "warning", True, "relation target does not resolve"),
    RuleInfo("BW305", "error", "error", False, "relation target is ambiguous"),
    RuleInfo("BW306", "error", "error", False, "note relates to itself"),
    RuleInfo("BW307", "error", "error", False, "supersession cycle"),
    RuleInfo("BW308", "warning", "info", True, "supersedes target is not status: superseded"),
    RuleInfo("BW309", "error", "error", False, "contradictory containment"),
    RuleInfo("BW310", "warning", "info", True, "body link does not resolve"),
    RuleInfo("BW311", "error", "warning", False, "more than one ## Relations section"),
    RuleInfo("BW402", "error", "error", False, "rules.md exceeds its budget"),
    RuleInfo("BW403", "error", "warning", True, "AGENTS.md exceeds its budget"),
    RuleInfo("BW404", "warning", "info", True, "topic folder has no hub"),
    RuleInfo("BW405", "info", "off", True, "note is missing from its hub's ## Notes"),
    RuleInfo("BW406", "info", "off", False, "orphan note"),
    RuleInfo("BW407", "info", "off", False, "note outside any topic"),
    RuleInfo("BW408", "warning", "warning", True, "AGENTS.md managed block missing or stale"),
    RuleInfo("BW409", "error", "warning", False, "topic slug invalid"),
    RuleInfo("BW501", "error", "error", False, "episode changed after it was created"),
    RuleInfo("BW502", "error", "warning", True, "episode path does not match its id"),
    RuleInfo("BW503", "error", "warning", True, "episode lacks required provenance fields"),
    RuleInfo("BW504", "warning", "warning", False, "proposal references a missing episode"),
    RuleInfo("BW505", "info", "info", False, "episodes pending too long"),
    RuleInfo("BW601", "error", "warning", False, "rule has no quote"),
    RuleInfo("BW602", "error", "error", False, "rule origin is not owner"),
    RuleInfo("BW603", "error", "error", False, "rule line does not parse"),
    RuleInfo("BW701", "error", "error", False, "text matches a secret pattern"),
    RuleInfo("BW702", "warning", "warning", False, "instruction-like text in an unverified claim"),
]
RULES: dict[str, RuleInfo] = {r.code: r for r in _RULES}


def severity(code: str, profile: str) -> str:
    info = RULES.get(code)
    if info is None:
        return "error"
    if profile == "off":
        return "off"
    return info.migrate if profile == "migrate" else info.strict


def fixable(code: str) -> bool:
    info = RULES.get(code)
    return bool(info and info.fixable)
