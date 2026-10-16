from __future__ import annotations

import json
from pathlib import Path

import pytest

from brainwiki.bench import _suites as suites
from brainwiki.bench._generate import generate
from brainwiki.bench._report import hard_failures
from brainwiki.cli._cmd_bench import _parse_sizes
from brainwiki.cli._main import main


def _files(root: Path) -> dict[str, bytes]:
    return {
        p.relative_to(root).as_posix(): p.read_bytes()
        for p in sorted(root.rglob("*"))
        if p.is_file()
    }


def _metrics(result: suites.SuiteResult) -> dict[tuple[str, str], suites.Metric]:
    return {(m.case, m.metric): m for m in result.metrics}


def test_generator_is_deterministic_and_realistic(tmp_path: Path):
    a = generate(tmp_path / "a", notes=200, seed=7)
    b = generate(tmp_path / "b", notes=200, seed=7)
    assert _files(a.root) == _files(b.root)
    assert _files(generate(tmp_path / "c", notes=200, seed=8).root) != _files(a.root)
    mix = a.relation_counts
    total = sum(mix.values())
    assert 1.5 <= total / 200 <= 2.5
    assert 0.02 <= mix["superseded_by"] / total <= 0.045
    notes = [n for n in a.nodes.values() if n.kind == "note"]
    lines = sum(len((a.root / n.path).read_text().splitlines()) for n in notes) / len(notes)
    assert 30 <= lines <= 50
    assert all(a.nodes[old].status == "superseded" for _, old in a.supersedes)
    assert {"exact", "title", "group"} <= {q.family for q in a.queries}


def test_retrieval_targets_hold(tmp_path: Path):
    result = suites.retrieval(tmp_path, 200)
    m = _metrics(result)
    assert m[("200", "guard_recall")].value == 1.0
    assert m[("200", "newest_successor")].value == 1.0
    assert m[("200/all", "recall@8")].value > 0.9
    assert result.status == "pass", result.details


def test_lint_suite_finds_every_planted_defect_and_fixes_safely(tmp_path: Path):
    result = suites.lint_suite(tmp_path)
    failing = [(m.case, m.metric) for m in result.metrics if m.passed is False]
    assert failing == [], result.details["mismatches"]
    codes = {m.case for m in result.metrics if m.metric == "recall"}
    assert {
        "BW103",
        "BW106",
        "BW114",
        "BW117",
        "BW118",
        "BW119",
        "BW120",
        "BW307",
        "BW502",
        "BW701",
    } <= codes
    assert {m.case for m in result.metrics if m.metric == "fix_local"} >= {
        "BW103",
        "BW117",
        "BW502",
    }


def test_wikilink_after_token_is_not_a_secret():
    from brainwiki.write._secrets import find_secrets

    assert find_secrets("The rotation token is [[broker-policy]] for now.") == []


def test_perf_suite_measures_every_budget(tmp_path: Path):
    result = suites.perf(tmp_path, 100)
    m = _metrics(result)
    assert {"rebuild_s", "freshness_ms", "search_p95_ms", "orient_p95_ms", "lint_warm_s"} <= {
        metric for _, metric in m
    }


def test_parse_sizes():
    assert _parse_sizes("1k,10k,200") == [1000, 10000, 200]


def test_cli_writes_results_and_compares(tmp_path: Path, capsys: pytest.CaptureFixture[str]):
    out = tmp_path / "out"
    code = main(["bench", "retrieval", "--sizes", "200", "--out", str(out)])
    data = json.loads((out / "results.json").read_text())
    assert (out / "report.md").read_text().startswith("# brain-wiki bench")
    assert {"guard_recall", "newest_successor", "recall@8"} <= {
        m["metric"] for m in data["metrics"]
    }
    assert code == (1 if hard_failures(data) else 0)
    results = str(out / "results.json")
    capsys.readouterr()
    assert main(["bench", "--compare", results, results]) == 0
    assert "0 regression(s)" in capsys.readouterr().out


def test_quiet_bench_prints_a_summary_not_the_table(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    out = tmp_path / "out"
    main(["bench", "-q", "lint", "--out", str(out)])
    printed = capsys.readouterr().out
    assert printed.startswith("bench: 1 suite(s), ") and "suite  case" not in printed
    assert (out / "results.json").is_file()


def test_compare_refuses_files_that_are_not_results(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    empty, broken = tmp_path / "empty.json", tmp_path / "broken.json"
    empty.write_text("{}")
    broken.write_text("{nope")
    assert main(["bench", "--compare", str(empty), str(empty)]) == 1
    assert capsys.readouterr().err.startswith(f"format: {empty} is not a bench results file")
    assert main(["bench", "--compare", str(broken), str(empty)]) == 1
    assert capsys.readouterr().err.startswith(f"format: {broken} is not JSON")
