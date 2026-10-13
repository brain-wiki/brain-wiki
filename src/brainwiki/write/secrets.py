"""Secret detection and redaction (design doc 10 §6). Pattern-based; misses unusual formats."""

from __future__ import annotations

import math
import re
from collections import Counter
from dataclasses import dataclass

# (name, pattern). Fixed-prefix formats first; the generic assignment rule runs last.
_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    (
        "private-key",
        re.compile(
            r"-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----[\s\S]*?(?:-----END (?:[A-Z0-9]+ )*PRIVATE KEY-----|\Z)"
        ),
    ),
    ("aws-access-key", re.compile(r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b")),
    ("google-api-key", re.compile(r"\bAIza[0-9A-Za-z_\-]{35}\b")),
    (
        "github-token",
        re.compile(r"\b(?:gh[pousr]_[0-9A-Za-z]{36,}|github_pat_[0-9A-Za-z_]{40,})\b"),
    ),
    ("slack-token", re.compile(r"\bxox[abposr]-[0-9A-Za-z-]{10,}\b")),
    ("slack-webhook", re.compile(r"https://hooks\.slack\.com/services/[A-Za-z0-9/]{20,}")),
    ("stripe-key", re.compile(r"\b(?:sk|rk)_(?:live|test)_[0-9A-Za-z]{16,}\b")),
    ("anthropic-key", re.compile(r"\bsk-ant-[0-9A-Za-z_\-]{20,}\b")),
    ("openai-key", re.compile(r"\bsk-(?:proj-|svcacct-|admin-)?[0-9A-Za-z_\-]{20,}\b")),
    ("jwt", re.compile(r"\beyJ[0-9A-Za-z_\-]{8,}\.eyJ[0-9A-Za-z_\-]{8,}\.[0-9A-Za-z_\-]{8,}\b")),
]
_ASSIGNMENT = re.compile(
    r"(?i)\b(?P<key>[a-z0-9_.\-]*(?:password|passwd|secret|token|api[_\-]?key|access[_\-]?key)[a-z0-9_.\-]*)"
    r"(?P<sep>\s*[:=]\s*|\s+is\s+)"
    r"(?P<quote>[\"']?)(?P<value>[^\s\"'`,;]{12,})(?P=quote)"
)
_REDACTED = re.compile(r"\[REDACTED:[a-z-]+\]")
# Values that name or compute a secret rather than hold one: code (calls, templates, optional
# chaining), environment lookups, dotted references, ALL_CAPS variable names, and secret-manager
# references such as `github-pat:latest`.
_REFERENCE = re.compile(
    r"[()${}]|\?\.|^(?:process\.env|os\.environ|env)\b|^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+$"
    r"|^[A-Z][A-Z0-9_]*$|:latest$"
)


@dataclass
class SecretHit:
    kind: str
    start: int
    end: int
    line: int


def _entropy(value: str) -> float:
    counts = Counter(value)
    return -sum(c / len(value) * math.log2(c / len(value)) for c in counts.values())


def _high_entropy(value: str) -> bool:
    if _REDACTED.fullmatch(value) or value.lower() in ("redacted", "changeme", "placeholder"):
        return False
    if value.startswith(("[[", "[", "(", "<", "{")) or "](" in value:
        return False  # a link or a placeholder, not a credential
    if _REFERENCE.search(value):
        return False
    classes = sum(
        bool(re.search(p, value)) for p in (r"[a-z]", r"[A-Z]", r"[0-9]", r"[^A-Za-z0-9]")
    )
    return classes >= 2 and _entropy(value) >= 3.5


def _keylike(body: str) -> bool:
    """Generated keys mix upper case, lower case, and digits; words and slugs do not."""
    return all(re.search(p, body) for p in (r"[a-z]", r"[A-Z]", r"[0-9]"))


def find_secrets(text: str) -> list[SecretHit]:
    spans: list[tuple[int, int, str]] = []

    def free(start: int, end: int) -> bool:
        return all(end <= s or start >= e for s, e, _ in spans)

    for kind, pattern in _PATTERNS:
        for match in pattern.finditer(text):
            if kind == "openai-key" and not _keylike(match.group(0)[3:]):
                continue  # `sk-` starts many words and URL slugs ("sk-learning-path-…")
            if free(match.start(), match.end()):
                spans.append((match.start(), match.end(), kind))
    for match in _ASSIGNMENT.finditer(text):
        start, end = match.span("value")
        if free(start, end) and _high_entropy(match.group("value")):
            spans.append((start, end, "secret-assignment"))
    spans.sort()
    return [SecretHit(kind, s, e, text.count("\n", 0, s) + 1) for s, e, kind in spans]


def scrub(text: str) -> tuple[str, list[str]]:
    """Replace secrets with `[REDACTED:<kind>]`. Returns (text, kinds found)."""
    hits = find_secrets(text)
    if not hits:
        return text, []
    out, last = [], 0
    for hit in hits:
        out.append(text[last : hit.start])
        out.append(f"[REDACTED:{hit.kind}]")
        last = hit.end
    out.append(text[last:])
    return "".join(out), [h.kind for h in hits]
