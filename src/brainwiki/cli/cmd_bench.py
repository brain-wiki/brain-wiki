"""bench: run the evaluation suites (design doc 11)."""

from __future__ import annotations

import os
import shutil
import tempfile
import time
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from typing import Any

from brainwiki.errors import UsageError

SUITES = ("retrieval", "lint", "consolidation", "perf", "agent")
DEFAULT_SUITES = ["retrieval", "lint", "perf"]
_ENV = ("BRAIN_WIKI_CONFIG", "BRAIN_WIKI_STATE_DIR", "BRAIN_WIKI_CACHE_DIR", "BRAIN_WIKI_DATA_DIR")


def parse_sizes(raw: str) -> list[int]:
    sizes = []
    for item in (s.strip().lower() for s in raw.split(",") if s.strip()):
        try:
            sizes.append(int(float(item[:-1]) * 1000) if item.endswith("k") else int(item))
        except ValueError as exc:
            raise UsageError(f"bad size {item!r}; use e.g. 1k, 10k or 200") from exc
    if not sizes or min(sizes) < 50:
        raise UsageError("sizes must be at least 50 notes")
    return sizes


@contextmanager
def isolated_state(base: Path) -> Iterator[None]:
    """Keep bench indexes, runs, and user config away from the user's own brain-wiki state."""
    saved = {k: os.environ.get(k) for k in (*_ENV, "BRAIN_WIKI_BRAIN", "BRAIN_WIKI_INTERNAL")}
    os.environ["BRAIN_WIKI_CONFIG"] = str(base / "config.toml")
    for key, sub in zip(_ENV[1:], ("state", "cache", "data"), strict=True):
        os.environ[key] = str(base / sub)
    os.environ.pop("BRAIN_WIKI_BRAIN", None)
    os.environ.pop("BRAIN_WIKI_INTERNAL", None)
    try:
        yield
    finally:
        for key, value in saved.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value


def bench(args: Any) -> int:
    from brainwiki.bench import report, suites

    if args.compare:
        text, regressions = report.compare(Path(args.compare[0]), Path(args.compare[1]))
        print(text)
        return 1 if regressions else 0
    names = args.suites or DEFAULT_SUITES
    unknown = [n for n in names if n not in SUITES]
    if unknown:
        raise UsageError(f"unknown suite(s) {', '.join(unknown)}; choose from {', '.join(SUITES)}")
    sizes = parse_sizes(args.sizes)
    backends = [b.strip() for b in (args.backends or "").split(",") if b.strip()]
    out = Path(args.out) if args.out else Path(tempfile.mkdtemp(prefix="brain-bench-"))
    work = out / "work"
    if work.exists():
        shutil.rmtree(work)  # generated brains from an earlier run in the same --out
    work.mkdir(parents=True)

    results = []
    with isolated_state(work / ".state"):
        for name in names:
            started = time.monotonic()
            if name in ("retrieval", "perf"):
                result = getattr(suites, name)(work, sizes[0])
                for size in sizes[1:]:
                    extra = getattr(suites, name)(work, size)
                    result.metrics += extra.metrics
                    result.details.update({f"{k}@{size}": v for k, v in extra.details.items()})
            elif name == "lint":
                result = suites.lint_suite(work)
            else:
                result = getattr(suites, name)(work, backends)
            result.details["seconds"] = round(time.monotonic() - started, 1)
            results.append(result)
            if not args.quiet:
                print(f"{name}: {result.status} ({result.details['seconds']} s)", flush=True)

    command = " ".join(["brain bench", *names, "--sizes", args.sizes])
    if backends:
        command += " --backends " + ",".join(backends)
    data = report.build(results, command=command, sizes=sizes, backends=backends)
    results_path, report_path = report.write(out, data)
    print(report.table(data))
    failures = report.hard_failures(data)
    if failures:
        print(f"\n{len(failures)} hard target(s) failed:")
        for m in failures[:20]:
            print(f"  {m['suite']} {m['case']} {m['metric']} = {m['value']} (target {m['target']})")
    print(f"\nResults: {results_path}\nReport:  {report_path}")
    return 1 if failures else 0
