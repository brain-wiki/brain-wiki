"""ULID generation and validation (Crockford base32, monotonic within a millisecond)."""

from __future__ import annotations

import os
import re
import threading
import time
from datetime import UTC, datetime

_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
_DECODE = {c: i for i, c in enumerate(_ALPHABET)}
_ULID_PATTERN = r"[0-7][0-9A-HJKMNP-TV-Z]{25}"
_ULID_RE = re.compile(rf"^{_ULID_PATTERN}$")

_lock = threading.Lock()
_last_ms = -1
_last_random = 0


def new_ulid() -> str:
    global _last_ms, _last_random
    with _lock:
        ms = time.time_ns() // 1_000_000
        if ms <= _last_ms:
            ms = _last_ms
            _last_random += 1
            if _last_random >= 1 << 80:
                raise OverflowError("ULID random component overflow within one millisecond")
        else:
            _last_ms = ms
            _last_random = int.from_bytes(os.urandom(10), "big")
        value = (ms << 80) | _last_random
    return _encode(value)


def _encode(value: int) -> str:
    chars = []
    for _ in range(26):
        chars.append(_ALPHABET[value & 31])
        value >>= 5
    return "".join(reversed(chars))


def is_ulid(text: str) -> bool:
    return bool(_ULID_RE.match(text or ""))


def ulid_datetime(ulid: str) -> datetime:
    value = 0
    for ch in ulid[:10]:
        value = (value << 5) | _DECODE[ch]
    return datetime.fromtimestamp(value / 1000, tz=UTC)


def claim_id() -> str:
    return "c-" + new_ulid()


def rule_id() -> str:
    return "r-" + new_ulid()


def run_id() -> str:
    return "run-" + new_ulid()


def is_prefixed(text: str, prefix: str) -> bool:
    return text.startswith(prefix) and is_ulid(text[len(prefix) :])
