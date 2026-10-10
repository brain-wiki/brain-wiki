"""Verify vendored files against scripts/vendor.lock. Exit 1 on any mismatch or missing file."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCK = ROOT / "scripts" / "vendor.lock"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check(lock: Path = LOCK, root: Path = ROOT) -> list[str]:
    problems = []
    for entry in json.loads(lock.read_text(encoding="utf-8"))["files"]:
        path = root / entry["path"]
        if not path.is_file():
            problems.append(f"missing: {entry['path']}")
            continue
        actual = sha256(path)
        if actual != entry["sha256"]:
            problems.append(
                f"sha256 mismatch: {entry['path']} ({entry['package']} {entry['version']})\n"
                f"  expected {entry['sha256']}\n  actual   {actual}"
            )
    return problems


def main() -> int:
    problems = check()
    for problem in problems:
        print(problem, file=sys.stderr)
    if problems:
        return 1
    print(f"vendored files match {LOCK.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
