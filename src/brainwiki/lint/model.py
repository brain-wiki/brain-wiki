"""Lint problems, fixes, and results."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

from brainwiki.lint.catalog import fixable as catalog_fixable


@dataclass
class Fix:
    description: str
    edit: Callable[[str], str] | None = None  # text transform of the target file
    move_to: str | None = None
    create: str | None = None  # full content for a file that does not exist yet
    target: str | None = None  # file the fix changes, when it is not the problem's file


@dataclass
class Problem:
    code: str
    path: str
    line: int | None
    message: str
    severity: str = ""
    fix: Fix | None = None
    fixable: bool = False

    def __post_init__(self) -> None:
        if self.fix is not None:
            self.fixable = True
        self.fixable = self.fixable and catalog_fixable(self.code)

    def key(self) -> tuple[str, int, str]:
        return (self.path, self.line or 0, self.code)

    def to_json(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "severity": self.severity,
            "path": self.path,
            "line": self.line,
            "message": self.message,
            "fixable": self.fixable,
        }

    def __str__(self) -> str:
        where = f"{self.path}:{self.line}" if self.line else self.path
        return f"{where} {self.code} {self.message}"


@dataclass
class LintResult:
    problems: list[Problem] = field(default_factory=list)
    files_checked: int = 0
    seconds: float = 0.0

    def count(self, severity: str) -> int:
        return sum(1 for p in self.problems if p.severity == severity)

    @property
    def errors(self) -> int:
        return self.count("error")

    @property
    def fixable(self) -> int:
        return sum(1 for p in self.problems if p.fixable)

    def to_json(self) -> dict[str, Any]:
        return {
            "problems": [p.to_json() for p in self.problems],
            "errors": self.errors,
            "warnings": self.count("warning"),
            "info": self.count("info"),
            "fixable": self.fixable,
            "files_checked": self.files_checked,
        }

    def format_text(self) -> str:
        lines: list[str] = []
        current = None
        for p in self.problems:
            if p.path != current:
                lines.append(p.path)
                current = p.path
            line = str(p.line) if p.line else "-"
            fix = "  (fixable)" if p.fixable else ""
            lines.append(f"  {line:>4}  {p.severity:<7}  {p.code}  {p.message}{fix}")
        total = len(self.problems)
        if not total:
            return f"No problems ({self.files_checked} files checked)."
        parts = [f"{self.errors} error{'s' if self.errors != 1 else ''}"]
        warnings = self.count("warning")
        parts.append(f"{warnings} warning{'s' if warnings != 1 else ''}")
        if self.count("info"):
            parts.append(f"{self.count('info')} info")
        summary = f"{total} problem{'s' if total != 1 else ''} ({', '.join(parts)})"
        if self.fixable:
            summary += f", {self.fixable} fixable with --fix"
        lines.append(summary)
        return "\n".join(lines)
