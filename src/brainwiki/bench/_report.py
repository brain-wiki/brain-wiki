"""Bench output: results.json, report.md, a terminal table, and comparisons (design doc 11 §5)."""

from __future__ import annotations

import json
from collections import defaultdict
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from brainwiki.bench._suites import SuiteResult
from brainwiki.errors import FormatError

_SCHEMA = 1


def build(results: list[SuiteResult], **meta: Any) -> dict[str, Any]:
    import brainwiki

    return {
        "schema": _SCHEMA,
        "version": brainwiki.__version__,
        "created": datetime.now(UTC).replace(microsecond=0).isoformat(),
        **meta,
        "suites": {
            r.name: {"status": r.status, "skipped": r.skipped, "details": r.details}
            for r in results
        },
        "metrics": [m.to_json() for r in results for m in r.metrics],
    }


def hard_failures(data: dict[str, Any]) -> list[dict[str, Any]]:
    return [m for m in data["metrics"] if m["hard"] and m["pass"] is False]


def _value(value: Any) -> str:
    if isinstance(value, float):
        return f"{value:.4g}"
    text = "-" if value is None else str(value)
    return text if len(text) <= 60 else text[:59] + "…"  # results.json keeps the full text


def _ok(row: dict[str, Any]) -> str:
    return {True: "ok", False: "FAIL" if row["hard"] else "miss", None: ""}[row["pass"]]


def _render(rows: list[list[str]], header: list[str], markdown: bool) -> list[str]:
    if markdown:
        lines = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]
        return lines + ["| " + " | ".join(r) + " |" for r in rows]
    widths = [max(len(x) for x in col) for col in zip(header, *rows, strict=False)]
    return [
        "  ".join(cell.ljust(w) for cell, w in zip(row, widths, strict=False)).rstrip()
        for row in [header, *rows]
    ]


def table(data: dict[str, Any], *, markdown: bool = False, collapse: int = 6) -> str:
    """One line per metric; groups larger than `collapse` (lint rules) fold into their worst value."""
    header = ["suite", "case", "backend", "metric", "value", "target", "ok"]
    groups: dict[tuple[str, str, str], list[dict[str, Any]]] = defaultdict(list)
    for row in data["metrics"]:
        groups[(row["suite"], row["metric"], row["backend"])].append(row)
    rows: list[list[str]] = []
    for (suite, metric, backend), members in groups.items():
        numeric = [m for m in members if isinstance(m["value"], int | float)]
        if len(members) <= collapse or len(numeric) != len(members):
            for m in members:
                rows.append(
                    [
                        suite,
                        m["case"],
                        backend,
                        metric,
                        _value(m["value"]),
                        m["target"] or "",
                        _ok(m),
                    ]
                )
            continue
        failed = [m["case"] for m in members if m["pass"] is False]
        worst = min(numeric, key=lambda m: m["value"] if metric != "violations" else -m["value"])
        case = f"{len(members)} cases" + (f"; failing: {', '.join(failed)}" if failed else "")
        rows.append(
            [
                suite,
                case,
                backend,
                metric,
                _value(worst["value"]),
                worst["target"] or "",
                _ok(worst),
            ]
        )
    for name, suite in data["suites"].items():
        if suite["skipped"]:
            rows.append([name, "-", "-", "status", "skipped", "", ""])
    return "\n".join(_render(rows, header, markdown))


def _markdown(data: dict[str, Any]) -> str:
    lines = [
        "# brain-wiki bench",
        "",
        f"`{data.get('command', 'brain bench')}` · brain-wiki {data['version']} · {data['created']}",
        "",
        "| suite | status |",
        "|---|---|",
        *[f"| {n} | {s['status']} |" for n, s in data["suites"].items()],
        "",
    ]
    for name, suite in data["suites"].items():
        lines += [f"## {name}", ""]
        if suite["skipped"]:
            lines += [f"Skipped: {suite['skipped']}", ""]
            continue
        rows = [m for m in data["metrics"] if m["suite"] == name]
        worst = [m for m in rows if m["metric"].startswith("worst_model")]
        sub = {"metrics": worst + [m for m in rows if m not in worst], "suites": {}}
        lines += [table(sub, markdown=True, collapse=10_000), ""]
        for key, value in suite["details"].items():
            if value in ({}, [], None):
                continue
            text = json.dumps(value, indent=1, ensure_ascii=False)
            lines += [f"**{key}**", "", "```json", text, "```", ""]
    return "\n".join(lines)


def write(out: Path, data: dict[str, Any]) -> tuple[Path, Path]:
    out.mkdir(parents=True, exist_ok=True)
    results, report = out / "results.json", out / "report.md"
    results.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    report.write_text(_markdown(data), encoding="utf-8")
    return results, report


_METRIC_KEYS = ("suite", "case", "backend", "metric", "value", "pass")


def _load_results(path: Path) -> dict[str, Any]:
    """A results.json from `brain bench`, checked enough that comparing it cannot crash."""
    try:
        data = json.loads(Path(path).read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise FormatError(f"{path} is not JSON ({exc.msg} at line {exc.lineno})") from None
    metrics = data.get("metrics") if isinstance(data, dict) else None
    if not isinstance(metrics, list) or not all(
        isinstance(m, dict) and all(k in m for k in _METRIC_KEYS) for m in metrics
    ):
        raise FormatError(
            f"{path} is not a bench results file: it needs a metrics list whose entries have "
            f"{', '.join(_METRIC_KEYS)} (compare the results.json files `brain bench` writes)"
        )
    return data


def compare(a: Path, b: Path, *, quiet: bool = False) -> tuple[str, int]:
    """Metric deltas from results file A to B, and the number of regressions (pass -> fail).
    `quiet` keeps only the regressions."""
    old, new = _load_results(a), _load_results(b)

    def key(m: dict[str, Any]) -> tuple[str, str, str, str]:
        return (m["suite"], m["case"], m["backend"], m["metric"])

    before = {key(m): m for m in old["metrics"]}
    after = {key(m): m for m in new["metrics"]}
    lines, regressions = [], 0
    for k in sorted(before.keys() | after.keys()):
        x, y = before.get(k), after.get(k)
        name = " ".join(p for p in k if p != "-")
        if x is None or y is None:
            lines.append(f"{'+' if x is None else '-'} {name}: {_value((y or x)['value'])}")
            continue
        if x["value"] == y["value"] and x["pass"] == y["pass"]:
            continue
        mark = " "
        if x["pass"] is not False and y["pass"] is False:
            mark, regressions = "!", regressions + 1
        elif x["pass"] is False and y["pass"] is not False:
            mark = "*"
        delta = ""
        if isinstance(x["value"], int | float) and isinstance(y["value"], int | float):
            delta = f" ({y['value'] - x['value']:+.4g})"
        lines.append(f"{mark} {name}: {_value(x['value'])} -> {_value(y['value'])}{delta}")
    versions = (old.get("version", "?"), new.get("version", "?"))
    head = f"{a} ({versions[0]}) -> {b} ({versions[1]}): {regressions} regression(s)"
    if quiet:
        return "\n".join([head, *(line for line in lines if line.startswith("!"))]), regressions
    legend = "! regression (pass -> fail)   * fixed (fail -> pass)   +/- metric added/removed"
    return "\n".join([head, legend, *(lines or ["no metric changed"])]), regressions
