"""Checked edits: direct edits validated against the last recorded version (05 §2.3)."""

from __future__ import annotations

import shutil
from pathlib import Path

import pytest

from brainwiki.cli.main import main
from brainwiki.config.resolve import open_brain
from brainwiki.config.user import register_brain
from brainwiki.engine import Engine
from brainwiki.errors import Forbidden
from brainwiki.runs import load_record
from brainwiki.write.edits import check_edits, pending_edits, restore

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
FTS5 = "topics/search/fts5.md"
CLAIM = "- SQLite FTS5 is the default search backend for Lumen."


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    (root / "brain.toml").write_text(
        (root / "brain.toml").read_text()
        + '\n[agents.claude-code]\nmax_privacy = "sensitive"\nwrite = ["episodes", "edit"]\n'
    )
    register_brain("ex", root, make_default=True)
    with Engine(open_brain(root)) as eng:
        eng.scan(force=True)  # the fresh index records every note as it is
    return root


def _agent(root: Path, host: str = "claude-code") -> Engine:
    return Engine(open_brain(root), host=host)


def _edit(root: Path, rel: str, old: str, new: str) -> None:
    path = root / rel
    text = path.read_text()
    assert old in text
    path.write_text(text.replace(old, new, 1))


def test_agent_edit_is_recorded_with_unverified_claims_and_undo(example: Path):
    original = (example / FTS5).read_text()
    _edit(
        example,
        FTS5,
        "- The trigram tokenizer requires SQLite 3.34 or newer.",
        "- The trigram tokenizer requires SQLite 3.34 or newer.\n- Queries return in under 50 ms.",
    )
    _edit(example, FTS5, "were too slow", "were far too slow")
    with _agent(example) as eng:
        result = check_edits(eng, [FTS5])
        assert result["status"] == "recorded", result
        record = load_record(eng.brain.key, result["run"])
        assert record.kind == "edit" and record.agent == "claude-code"
        assert pending_edits(eng) == []
    text = (example / FTS5).read_text()
    assert "Queries return in under 50 ms. <!-- id:c-" in text
    assert "origin:agent" in text and "taint:unknown" in text
    assert f"· edit · {result['run']}" in (example / "log.md").read_text()
    assert main(["undo", result["run"]]) == 0
    assert (example / FTS5).read_text() == original


def test_deleting_or_rewording_a_claim_fails_and_restore_puts_it_back(example: Path):
    original = (example / FTS5).read_text()
    _edit(example, FTS5, CLAIM, "- SQLite FTS5 is the only search backend for Lumen.")
    with _agent(example) as eng:
        failed = check_edits(eng, [FTS5])
        assert failed["status"] == "failed"
        assert [p["code"] for p in failed["problems"]] == ["claim_reworded"]
        assert pending_edits(eng)[0]["path"] == FTS5  # still pending, nothing recorded
        restored = restore(eng, FTS5)
        assert restored["status"] == "restored" and Path(restored["saved"]).exists()
    assert (example / FTS5).read_text() == original
    lines = original.splitlines()
    (example / FTS5).write_text("\n".join(line for line in lines if CLAIM not in line) + "\n")
    with _agent(example) as eng:
        assert "claim_deleted" in {p["code"] for p in check_edits(eng, [FTS5])["problems"]}


def test_superseding_a_claim_is_the_way_to_change_it(example: Path):
    text = (example / FTS5).read_text()
    line = next(line for line in text.splitlines() if line.startswith(CLAIM))
    struck = line.replace(CLAIM, "- ~~SQLite FTS5 is the default search backend for Lumen.~~")
    struck = struck.replace("origin:agent;", "origin:agent; status:superseded;")
    (example / FTS5).write_text(
        text.replace(line, struck + "\n- SQLite FTS5 with trigram is the default backend.")
    )
    with _agent(example) as eng:
        result = check_edits(eng, [FTS5])
    assert result["status"] == "recorded", result["problems"]


def test_checks_guard_privacy_protected_files_and_large_removals(example: Path):
    vector = "topics/search/vector-only.md"
    _edit(example, vector, "type: proposal", "type: proposal\nprivacy: sensitive")
    with _agent(example) as eng:
        assert check_edits(eng, [vector])["status"] == "recorded"
    _edit(example, vector, "privacy: sensitive", "privacy: default")
    _edit(example, "rules.md", "pytest", "nose")
    with _agent(example) as eng:
        codes = {p["code"] for p in check_edits(eng, [vector, "rules.md"])["problems"]}
        assert {"privacy_lowered", "protected"} <= codes
        restore(eng, vector)
    path = example / "topics/storage/sqlite-version-policy.md"
    text = path.read_text()
    path.write_text(text.split("\n#", 1)[0] + "\n# SQLite version policy\n")
    with _agent(example) as eng:
        assert "loss" in {p["code"] for p in check_edits(eng, [str(path)])["problems"]}
        assert check_edits(eng, [str(path)], allow_shrink=True)["status"] == "recorded"


def test_capability_and_topic_policies(example: Path):
    toml = example / "brain.toml"
    toml.write_text(
        toml.read_text()
        .replace(
            'description = "How local search works and why."',
            'description = "How local search works and why."\nagent_edits = "review"',
        )
        .replace(
            'description = "Where data lives and which versions we require."',
            'description = "Where data lives and which versions we require."\nagent_edits = "deny"',
        )
    )
    _edit(example, FTS5, "were too slow", "were far too slow")
    with _agent(example, "some-host") as eng, pytest.raises(Forbidden):
        check_edits(eng, [FTS5])
    with _agent(example) as eng:
        result = check_edits(eng, [FTS5])
    assert result["status"] == "review" and "far too slow" not in (example / FTS5).read_text()
    run = result["proposal"].rsplit("/", 1)[-1][:-3]
    assert main(["review", "accept", run]) == 0
    assert "far too slow" in (example / FTS5).read_text()
    _edit(example, "topics/storage/sqlite-version-policy.md", "# SQLite", "# The SQLite")
    with _agent(example) as eng:
        denied = check_edits(eng, ["topics/storage/sqlite-version-policy.md"])
    assert denied["status"] == "failed" and denied["problems"][0]["code"] == "edits_denied"


def test_hand_edits_are_pending_until_adopted_and_never_nag(example: Path):
    _edit(example, FTS5, "were too slow", "were painfully slow")
    (example / "topics/search/new-idea.md").write_text(
        "---\ntype: idea\n---\n# New idea\n\nTry BM25F.\n"
    )
    with Engine(open_brain(example)) as eng:
        pending = {p["path"]: p for p in pending_edits(eng)}
        assert pending[FTS5]["change"] == "changed" and "+We switched" not in pending[FTS5]["diff"]
        assert "painfully" in pending[FTS5]["diff"]
        assert pending["topics/search/new-idea.md"]["change"] == "created"
    assert main(["lint"]) in (0, 1)  # pending edits are not lint problems
    assert main(["check", "--adopt", FTS5, "topics/search/new-idea.md"]) == 0
    with Engine(open_brain(example)) as eng:
        assert pending_edits(eng) == []


def test_runs_and_hand_renames_move_the_recorded_version(example: Path):
    assert main(["mv", "topics/search/vector-only.md", "topics/search/vectors.md"]) == 0
    (example / "topics/search/ripgrep.md").rename(example / "topics/search/rg.md")
    with Engine(open_brain(example)) as eng:
        assert pending_edits(eng) == []


def test_rollback_keeps_the_agent_version(example: Path):
    from brainwiki.runs import Run
    from brainwiki.runs.transaction import rollback

    _edit(example, FTS5, "were too slow", "were far too slow")
    edited = (example / FTS5).read_bytes()
    with _agent(example) as eng:
        run = Run(eng, "edit")
        from brainwiki.write.edits import baseline

        _, base = baseline(eng, FTS5)
        run.adopt(FTS5, base, edited + b"\nstamped\n")
        record = run.commit(log=False, use_git=False)
        rollback(eng, record)
    assert (example / FTS5).read_bytes() == edited


def test_cli_check_lists_and_records(example: Path, capsys: pytest.CaptureFixture[str]):
    assert main(["check"]) == 0
    assert "No pending edits" in capsys.readouterr().out
    _edit(example, FTS5, "were too slow", "were slow")
    assert main(["check"]) == 0
    assert "fts5.md (changed)" in capsys.readouterr().out
    assert main(["check", FTS5]) == 0
    assert "Recorded as run-" in capsys.readouterr().out


def test_invalid_policy_acts_as_deny_and_is_linted(
    example: Path, capsys: pytest.CaptureFixture[str]
):
    toml = example / "brain.toml"
    toml.write_text(
        toml.read_text().replace(
            'description = "How local search works and why."',
            'description = "How local search works and why."\nagent_edits = "maybe"',
        )
    )
    _edit(example, FTS5, "were too slow", "were slow")
    with _agent(example) as eng:
        assert check_edits(eng, [FTS5])["problems"][0]["code"] == "edits_denied"
    main(["lint", "--select", "BW109"])
    assert "agent_edits must be allow, review, or deny" in capsys.readouterr().out
