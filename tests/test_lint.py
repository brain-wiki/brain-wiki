from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

import pytest
from tests.conftest import write

from brainwiki.cli._main import main
from brainwiki.config._resolve import open_brain
from brainwiki.engine import Engine
from brainwiki.errors import InvalidOps
from brainwiki.lint import lint
from brainwiki.lint._files import run_gate
from brainwiki.lint._fixes import fix
from brainwiki.lint._reports import generate
from brainwiki.runs import Run
from brainwiki.runs._undo import undo

FIXTURE = Path(__file__).parent / "fixtures" / "example-brain"
NOTE = "---\nid: {id}\ntitle: {title}\n---\n# {title}\n\n{body}\n"


def note(root: Path, rel: str, ulid: str, title: str, body: str = "Text.") -> None:
    write(root, rel, NOTE.format(id=ulid, title=title, body=body))


def codes(result) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    for p in result.problems:
        out.setdefault(p.code, []).append(p.path)
    return out


@pytest.fixture
def example(tmp_path: Path) -> Path:
    root = tmp_path / "example"
    shutil.copytree(FIXTURE, root)
    return root


def eng(root: Path) -> Engine:
    return Engine(open_brain(root))


def test_example_brain_is_clean(example: Path):
    with eng(example) as e:
        assert lint(e).problems == []


def test_fix_converts_format_2_and_marks_the_replaced_note(example: Path):
    ripgrep = example / "topics/search/ripgrep.md"
    ripgrep.write_text(
        ripgrep.read_text().replace("status: superseded\n", "").replace("bw-superseded_by", "x")
    )
    fts5 = example / "topics/search/fts5.md"
    fts5.write_text(
        fts5.read_text().replace(
            "bw-sources:",
            'bw-supersedes:\n  - "[[ripgrep]] (replaced)"\nbw-claims:\n'
            '  - "Prefix queries take 4 ms. {src: inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB.md}"\n'
            "bw-sources:",
        )
    )
    ripgrep.write_text(ripgrep.read_text().replace('x: "[[fts5]]"\n', ""))
    with eng(example) as e:
        found = [p for p in lint(e).problems if p.code == "BW117"]
        assert [p.path for p in found] == ["topics/search/fts5.md"] * 2
        fix(e)
        assert lint(e).problems == []
    assert 'status: superseded\nbw-superseded_by: "[[fts5]]"\n' in ripgrep.read_text()
    text = fts5.read_text()
    assert text.count("## Related") == 1 and text.count("## Facts") == 1
    assert "- Supersedes [[ripgrep]] (replaced)\n" in text
    assert "- Prefix queries take 4 ms.\n" in text
    assert '  - "[[archive/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB]]"' in text


def test_agents_md_follows_the_default_profile(brain_dir: Path):
    agents = brain_dir / "AGENTS.md"
    assert "`brain validate <path>`" in agents.read_text()
    with eng(brain_dir) as e:
        assert "BW408" not in {p.code for p in lint(e).problems}
    manifest = brain_dir / "brain.toml"
    manifest.write_text(manifest.read_text().replace('["episodes", "edit"]', '["episodes"]', 1))
    with eng(brain_dir) as e:
        assert "BW408" in {p.code for p in lint(e).problems}
        fix(e, select=["BW408"])
    text = agents.read_text()
    assert "Never edit `topics/`" in text and "brain validate" not in text


def test_file_rules(brain_dir: Path):
    write(brain_dir, "topics/a/no-id.md", "---\nstatus: draft\n---\n# No id\n")
    write(
        brain_dir,
        "topics/a/bad.md",
        "---\nid: 01M4KT3JPRY4W6766VT18CQS91\nbw-mood: calm\n---\n# Bad\n\n"
        "## Claims\n- one <!-- id:c-01M4KT3JPSB7BP2SNSCAVC2SFD; inputs:unknown -->\n\n"
        "## Relations\n- contains [[no-id]]\n\n"
        "<<<<<<< HEAD\nkey " + "AKIA" + "ABCDEFGHIJKLMNOP\n",  # split so secret scanners skip it
    )
    write(
        brain_dir,
        "topics/a/meta.md",
        "---\nid: 01M4KT3JPRY4W6766VT18CQS92\nbw-superseded_by: plain text\n"
        "bw-sources: [a note]\n---\n# Meta\n",
    )
    write(
        brain_dir,
        "topics/a/early.md",
        '---\nid: 01M4KT3JPRY4W6766VT18CQS93\nbw-superseded_by: "[[meta]]"\n---\n# Early\n',
    )
    write(
        brain_dir,
        "rules.md",
        '# Rules\n- Use tabs.\n- Use pytest. <!-- id:r-1; quote:"use pytest"; origin:agent -->\n',
    )
    with eng(brain_dir) as e:
        found = codes(lint(e))
    assert found["BW117"] == ["topics/a/bad.md"]
    assert found["BW118"] == ["topics/a/bad.md"]
    assert found["BW119"] == ["topics/a/early.md", "topics/a/meta.md"]  # status, then shape
    assert found["BW120"] == ["topics/a/meta.md"]
    for code in ("BW103", "BW106", "BW114", "BW601", "BW602", "BW701"):
        assert code in found, code


def test_profiles_and_overrides(brain_dir: Path):
    write(brain_dir, "topics/a/no-id.md", "# No id\n")
    write(brain_dir, "Clippings/x.md", "# Clip\n")
    with eng(brain_dir) as e:
        strict = {p.code: p.severity for p in lint(e).problems if p.path == "topics/a/no-id.md"}
        assert strict["BW103"] == "error"
        migrate = {
            p.code: p.severity
            for p in lint(e, profile="migrate").problems
            if p.path == "topics/a/no-id.md"
        }
        assert migrate["BW103"] == "info"
    toml = brain_dir / "brain.toml"
    toml.write_text(toml.read_text() + '\n[lint.overrides]\n"Clippings/**" = "off"\n')
    with eng(brain_dir) as e:
        assert not [p for p in lint(e).problems if p.path.startswith("Clippings/")]


def test_cross_file_rules(brain_dir: Path):
    ids = {k: f"01M4KT3JPRY4W6766VT18CQS{n:02d}" for n, k in enumerate("abcdefgh", start=10)}

    def replaced(rel: str, ulid: str, title: str, by: str, body: str = "Text.") -> None:
        write(
            brain_dir,
            rel,
            f'---\nid: {ulid}\ntitle: {title}\nstatus: superseded\nbw-superseded_by: "[[{by}]]"\n'
            f'bw-sources: ["[[archive/episodes/2026/10/gone]]"]\n---\n# {title}\n\n{body}\n',
        )

    note(brain_dir, "topics/a/index.md", ids["a"], "Hub A", "## Notes\n- [[one]]")
    replaced("topics/a/one.md", ids["b"], "One", "two", "See [[Tow]].")
    replaced("topics/a/two.md", ids["c"], "Two", "one")
    replaced("topics/a/three.md", ids["d"], "Three", "three")
    replaced("topics/a/four.md", ids["h"], "Four", "nowhere")
    note(brain_dir, "topics/b/dup1.md", ids["e"], "Dup", "body")
    note(brain_dir, "topics/b/dup2.md", ids["e"], "Dup", "body")
    note(brain_dir, "topics/b/amb.md", ids["f"], "Amb", "See [[Dup]].")
    write(brain_dir, "loose.md", NOTE.format(id=ids["g"], title="Loose", body="x"))
    write(brain_dir, "topics/b/note.sync-conflict-20261010-101010-ABCDEFG.md", "# x\n")
    write(brain_dir, "cache.sqlite", "x")
    with eng(brain_dir) as e:
        found = codes(lint(e))
        problems = lint(e).problems
    messages = {(p.code, p.path): p.message for p in problems}
    assert 'did you mean "Two"' in messages["BW310", "topics/a/one.md"]
    assert (
        "is ambiguous: topics/b/dup1.md, topics/b/dup2.md" in messages["BW310", "topics/b/amb.md"]
    )
    assert found["BW307"]  # one and two replace each other
    assert messages["BW119", "topics/a/three.md"] == "names itself"
    assert "'nowhere' not found" in messages["BW119", "topics/a/four.md"]
    assert len(found["BW122"]) == 4
    assert found["BW105"] == ["topics/b/dup2.md"]
    assert "topics/b" in found["BW404"]
    assert "topics/a/two.md" in found["BW405"]
    assert "loose.md" in found["BW407"]
    assert "topics/b/note.sync-conflict-20261010-101010-ABCDEFG.md" in found["BW112"]
    assert "cache.sqlite" in found["BW115"]


def test_episode_rules_and_fixes(brain_dir: Path):
    write(
        brain_dir,
        "inbox/episodes/2026/10/wrong-name.md",
        "---\nid: 01M4KT3JPSB7BP2SNSCAVC2SFB\norigin: agent\ntaint: false\n---\nx\n",
    )
    write(brain_dir, "inbox/episodes/2026/10/no-fields.md", "dropped by an agent\n")
    with eng(brain_dir) as e:
        found = codes(lint(e))
        assert "inbox/episodes/2026/10/wrong-name.md" in found["BW502"]
        assert "inbox/episodes/2026/10/no-fields.md" in found["BW503"]
        outcome = fix(e)
        assert outcome.record is not None
        assert (brain_dir / "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB.md").exists()
        left = codes(lint(e))
        assert "BW502" not in left and "BW503" not in left and "BW501" not in left
        moved = brain_dir / "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB.md"
        moved.write_text(moved.read_text() + "edited later\n")
        assert "BW501" in codes(lint(e))


def test_fix_is_one_undoable_run(brain_dir: Path):
    write(
        brain_dir, "topics/a/x.md", "---\nstatus: wip\n---\n# X\n\n## Relations\n- requires [[y]]\n"
    )
    write(brain_dir, "topics/a/y.md", "---\nid: 01M4KT3JPRY4W6766VT18CQS20\n---\n# Y\n")
    before = (brain_dir / "topics/a/x.md").read_text()
    with eng(brain_dir) as e:
        outcome = fix(e)
        text = (brain_dir / "topics/a/x.md").read_text()
        assert "status: active" in text and "bw-stage: wip" in text and "id: " in text
        assert text.endswith("## Related\n\n- Requires [[y]]\n") and "## Relations" not in text
        assert (brain_dir / "topics/a/index.md").exists()  # BW404 created the hub
        undo(e, outcome.record.run)
        assert (brain_dir / "topics/a/x.md").read_text() == before
        assert not (brain_dir / "topics/a/index.md").exists()


def test_renamed_target_is_repaired_from_path_history(brain_dir: Path):
    note(
        brain_dir,
        "topics/a/index.md",
        "01M4KT3JPRY4W6766VT18CQS30",
        "A",
        "## Notes\n- [[old-name]]",
    )
    note(brain_dir, "topics/a/old-name.md", "01M4KT3JPRY4W6766VT18CQS31", "Renamed note")
    with eng(brain_dir) as e:
        e.scan(force=True)
        (brain_dir / "topics/a/old-name.md").rename(brain_dir / "topics/a/new-name.md")
        e.scan(force=True)
        assert "BW310" in codes(lint(e))
        fix(e)
        assert "- [[new-name]]" in (brain_dir / "topics/a/index.md").read_text()


def test_gate_blocks_only_new_errors(brain_dir: Path):
    write(
        brain_dir,
        "topics/a/x.md",
        "---\nid: 01M4KT3JPRY4W6766VT18CQS40\nbw-mood: calm\n---\n# X\n",
    )
    with eng(brain_dir) as e:
        run = Run(e, "test")
        run.write("topics/a/x.md", (brain_dir / "topics/a/x.md").read_text() + "\nmore prose\n")
        run.commit(check=run_gate(e))  # the existing BW118 does not block
        run = Run(e, "test")
        text = (brain_dir / "topics/a/x.md").read_text()
        run.write(
            "topics/a/x.md", text.replace("bw-mood: calm\n", "bw-mood: calm\nbw-sources: 3\n")
        )
        with pytest.raises(InvalidOps):
            run.commit(check=run_gate(e))


def test_reports(example: Path):
    note(
        example,
        "topics/search/howto.md",
        "01M4KT3JPRY4W6766VT18CQS52",
        "How to search",
        "Run [[ripgrep]].",
    )
    with eng(example) as e:
        written = generate(e)
    assert "reports/stale.md" in written
    text = (example / "reports/stale.md").read_text()
    assert text.startswith("<!-- Generated by brain-wiki")
    assert (
        "- [[topics/search/howto|How to search]] links to "
        "[[topics/search/ripgrep|Use ripgrep for search]] (superseded)"
    ) in text
    assert "topics/search/fts5" not in text  # its successor and its hub may link to it
    with eng(example) as e:
        assert generate(e) == ["reports/index.md"]  # unchanged pages are not rewritten


def test_cli_lint_exit_codes_and_staged(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path, capsys
):
    assert main(["lint", "--brain", str(brain_dir)]) == 0
    write(brain_dir, "topics/a/no-id.md", "# No id\n")
    assert main(["lint", "--brain", str(brain_dir), "--json"]) == 1
    assert '"BW103"' in capsys.readouterr().out

    empty = tmp_path / "gitconfig"
    empty.write_text("")
    monkeypatch.setenv("GIT_CONFIG_GLOBAL", str(empty))
    monkeypatch.setenv("GIT_CONFIG_NOSYSTEM", "1")
    subprocess.run(["git", "-C", str(brain_dir), "init", "-q"], check=True)
    write(
        brain_dir,
        "topics/a/no-id.md",
        "---\nid: 01M4KT3JPRY4W6766VT18CQS50\n---\n# Fixed in tree\n",
    )
    write(brain_dir, "topics/a/staged.md", "# Staged without id\n")
    subprocess.run(["git", "-C", str(brain_dir), "add", "topics/a/staged.md"], check=True)
    assert main(["lint", "--brain", str(brain_dir), "--staged", "--json"]) == 1
    out = capsys.readouterr().out
    assert "topics/a/staged.md" in out and "topics/a/no-id.md" not in out
    assert main(["lint", "--brain", str(brain_dir), "--install-hook"]) == 0
    assert (brain_dir / ".git/hooks/pre-commit").read_text().startswith("#!/bin/sh")


def test_notes_nested_under_listed_notes_need_no_hub_line(brain_dir: Path):
    from brainwiki.ids import new_ulid

    ids = {k: new_ulid() for k in "habc"}
    note(brain_dir, "topics/a/index.md", ids["h"], "A", "## Notes\n- [[section]]")
    note(brain_dir, "topics/a/section.md", ids["a"], "Section", "## Parts\n- [[deep/child]]")
    note(brain_dir, "topics/a/deep/child.md", ids["b"], "Child", "body")
    note(brain_dir, "topics/a/stray.md", ids["c"], "Stray", "body")
    with eng(brain_dir) as e:
        found = codes(lint(e, select=["BW405"]))
    assert found["BW405"] == ["topics/a/stray.md"]


def test_fixable_count_matches_what_fix_applies(brain_dir: Path, capsys):
    write(brain_dir, "topics/a/index.md", "---\nid: 01M4KT3JPRY4W6766VT18CQS51\n---\n# A\n")
    write(brain_dir, "topics/a/bad.md", "# Bad\n\n<<<<<<< HEAD\nx\n=======\ny\n>>>>>>> o\n")
    assert main(["lint", "--fix"]) == 1  # BW103 and BW408 are fixed; the merge markers are not
    assert "Fixed " in capsys.readouterr().out
    assert main(["lint"]) == 1
    out = capsys.readouterr().out
    assert "fixable with --fix" not in out and "1 more with --fix --select BW405" in out
    assert main(["lint", "--fix"]) == 1
    assert "Nothing to fix" in capsys.readouterr().out
    assert main(["lint", "--select", "BW405"]) == 0
    assert "1 fixable with --fix" in capsys.readouterr().out


def test_validate_checks_changed_notes_and_refuses_protected_files(
    example: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path, capsys
):
    config = tmp_path / "gitconfig"
    config.write_text("[user]\n\tname = T\n\temail = t@example.com\n")
    monkeypatch.setenv("GIT_CONFIG_GLOBAL", str(config))
    monkeypatch.setenv("GIT_CONFIG_NOSYSTEM", "1")
    for argv in (["init", "-q"], ["add", "-A"], ["commit", "-qm", "brain"]):
        subprocess.run(["git", "-C", str(example), *argv], check=True)
    assert main(["validate", "--brain", str(example)]) == 0
    assert "Nothing to validate" in capsys.readouterr().out
    assert main(["log", "--brain", str(example), "Prefix queries take 4 ms."]) == 0
    assert main(["report", "--brain", str(example)]) == 0
    capsys.readouterr()
    assert main(["validate", "--brain", str(example)]) == 0  # a new episode, rewritten reports
    assert "Nothing to validate" in capsys.readouterr().out
    episode = example / "inbox/episodes/2026/10/01M4KT3JPSB7BP2SNSCAVC2SFB.md"
    episode.write_text(episode.read_text() + "Edited later.\n")
    assert main(["validate", "--brain", str(example), "--json"]) == 1
    assert (
        "inbox files (episodes and proposals) are never edited directly" in capsys.readouterr().out
    )
    subprocess.run(["git", "-C", str(example), "checkout", "--", "inbox"], check=True)
    gpu = example / "topics/budget/gpu-freeze.md"
    gpu.write_text(gpu.read_text().replace("title:", "bw-mood: calm\ntitle:"))
    rules = example / "rules.md"
    rules.write_text(rules.read_text() + "- Edited by hand.\n")
    assert main(["validate", "--brain", str(example), "--json"]) == 1
    out = capsys.readouterr().out
    assert '"BW118"' in out and "gpu-freeze.md" in out
    assert '"BW121"' in out and "rules.md is never edited directly" in out
    assert main(["validate", "--brain", str(example), "topics/search/fts5.md"]) == 0
    assert "Valid: 1 file(s) checked" in capsys.readouterr().out
    new = example / "topics/search/prefix.md"
    new.write_text("---\ntitle: Prefix queries\n---\n# Prefix queries\n\nFast.\n")
    assert main(["validate", "--brain", str(example), "topics/search/prefix.md"]) == 1
    line = re.search(r"add `(id: [0-9A-HJKMNP-TV-Z]{26})`", capsys.readouterr().out).group(1)
    new.write_text(new.read_text().replace("---\n", f"---\n{line}\n", 1))
    assert main(["validate", "--brain", str(example), "topics/search/prefix.md"]) == 0


def test_lint_usage_errors(brain_dir: Path, capsys):
    for argv in (
        ["--select", "foo"],
        ["--select", "BW999"],
        ["--ignore", "BW1,BW99"],
        ["--dry-run"],
    ):
        assert main(["lint", *argv]) == 2, argv
    assert "BW99" in capsys.readouterr().err
    assert main(["lint", "--select", "BW1,bw405"]) == 0


def test_install_hook_is_idempotent_and_git_refusals_are_reported(
    brain_dir: Path, monkeypatch: pytest.MonkeyPatch, tmp_path: Path, capsys
):
    empty = tmp_path / "gitconfig"
    empty.write_text("[user]\n\tname = T\n\temail = t@example.com\n")
    monkeypatch.setenv("GIT_CONFIG_GLOBAL", str(empty))
    monkeypatch.setenv("GIT_CONFIG_NOSYSTEM", "1")
    subprocess.run(["git", "-C", str(brain_dir), "init", "-q"], check=True)
    assert main(["lint", "--install-hook"]) == 0
    assert main(["lint", "--install-hook"]) == 0
    assert "Already installed" in capsys.readouterr().out
    hook = brain_dir / ".git/hooks/pre-commit"
    hook.write_text("#!/bin/sh\necho 'lint says no' >&2\nexit 1\n")
    assert main(["lint", "--install-hook"]) == 4  # someone else's hook is never overwritten
    capsys.readouterr()
    assert main(["rules", "add", "Write US English."]) == 0
    captured = capsys.readouterr()
    assert captured.out.startswith("Added r-")
    assert "git refused the commit" in captured.err and "lint says no" in captured.err
