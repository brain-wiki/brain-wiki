from __future__ import annotations

import re
from pathlib import Path

import pytest

from brainwiki.config.manifest import parse_manifest
from brainwiki.config.resolve import resolve_brain
from brainwiki.errors import Conflict, FormatError, NotConfigured, UsageError
from brainwiki.ids import is_ulid, new_ulid, ulid_datetime
from brainwiki.store import LocalStore


def test_ulids_are_valid_sorted_and_unique():
    ids = [new_ulid() for _ in range(2000)]
    assert all(is_ulid(i) for i in ids)
    assert ids == sorted(ids)
    assert len(set(ids)) == len(ids)
    assert ulid_datetime(ids[0]).year >= 2024


def test_store_refuses_escapes(tmp_path: Path):
    store = LocalStore(tmp_path)
    for bad in ["../x", "/etc/passwd", "a/../../b", "", "a\x00b"]:
        with pytest.raises(UsageError):
            store.abspath(bad)


def test_store_refuses_symlink_escape(tmp_path: Path):
    outside = tmp_path / "outside"
    outside.mkdir()
    root = tmp_path / "root"
    root.mkdir()
    (root / "link").symlink_to(outside)
    with pytest.raises(UsageError):
        LocalStore(root).abspath("link/file.md")


def test_store_atomic_write_and_expect(tmp_path: Path):
    store = LocalStore(tmp_path)
    sha = store.write_text("a/b.md", "one")
    assert store.read_text("a/b.md") == "one"
    store.write_text("a/b.md", "two", expect_sha=sha)
    with pytest.raises(Conflict):
        store.write_text("a/b.md", "three", expect_sha=sha)
    assert not [p for p in (tmp_path / "a").iterdir() if p.name.startswith(".brain-tmp-")]


def test_store_create_is_exclusive(tmp_path: Path):
    store = LocalStore(tmp_path)
    store.create_text("x.md", "1")
    with pytest.raises(FileExistsError):
        store.create_text("x.md", "2")


def test_manifest_defaults_and_unknown_keys():
    m = parse_manifest(
        'format = 1\nid = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"\nweird = 1\n[layout]\nfoo = 2\n'
        '[topics.search]\nprivacy = "sensitive"\n[agents.codex]\nmax_privacy = "secret"\n'
    )
    assert m.layout.topics_dir == "topics"
    assert set(m.unknown_keys) == {
        "weird",
        "layout.foo",
        "topics.search.privacy",
        "agents.codex.max_privacy",
    }
    assert m.profile("unknown-host").write == ["episodes", "edit"]
    assert m.profile(None).can("consolidate")


@pytest.mark.parametrize(
    ("extra", "where"),
    [
        ('topics = ["x"]', "[topics]"),
        ('agents = "x"', "[agents]"),
        ('[search]\nfreshness_ms = "x"', "search.freshness_ms"),
        ('[layout]\nignore = "drafts"', "layout.ignore"),
        ('[agents.codex]\nwrite = "edit"', "agents.codex.write"),
        ('[search.kind_factor]\nhub = "high"', "search.kind_factor"),
        ("[topics.search]\ntitle = 3", "topics.search.title"),
    ],
)
def test_manifest_rejects_values_of_the_wrong_type(extra: str, where: str):
    with pytest.raises(FormatError, match=re.escape(where)):
        parse_manifest(f'format = 2\nid = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"\n{extra}\n')
    assert parse_manifest(
        'format = 2\nid = "01J9Z7M0W4K8P2R6T9V3X5Z7A1"\n[search]\nrecency_half_life_days = 90\n'
    ).search.recency_half_life_days == pytest.approx(90.0)


def test_a_broken_brain_does_not_break_the_others(
    brain_dir: Path, tmp_path: Path, capsys: pytest.CaptureFixture[str]
):
    from brainwiki.cli.main import main
    from brainwiki.config.user import register_brain
    from brainwiki.lifecycle import init_brain

    bad = init_brain(tmp_path / "brains" / "bad", "bad")
    (bad / "brain.toml").write_text((bad / "brain.toml").read_text() + "\n[git]\nmode = 1\n")
    register_brain("bad", bad)
    assert main(["list"]) == 0
    out = capsys.readouterr().out
    assert "bad" in out and "unavailable: brain.toml: git.mode must be a string" in out
    assert "test" in out
    assert main(["lint", "nowhere.md"]) == 3
    assert "no such file or folder in the brain" in capsys.readouterr().err
    (tmp_path / "a-file").write_text("x")
    assert main(["init", str(tmp_path / "a-file" / "brain")]) == 1
    assert "os_error:" in capsys.readouterr().err


def test_init_and_resolve(brain_dir: Path, tmp_path: Path):
    brain = resolve_brain(cwd=tmp_path)
    assert brain.root == brain_dir
    assert brain.name == "test"
    assert (brain_dir / "AGENTS.md").read_text().startswith("<!-- brain-wiki:begin")
    assert is_ulid(brain.id)


def test_resolve_project_file_and_host_limit(brain_dir: Path, tmp_path: Path):
    from brainwiki.config.user import register_brain, set_value
    from brainwiki.errors import Forbidden
    from brainwiki.lifecycle import init_brain

    other = init_brain(tmp_path / "brains" / "work", "work")
    register_brain("work", other)
    project = tmp_path / "proj" / "sub"
    project.mkdir(parents=True)
    (tmp_path / "proj" / ".brain-wiki.toml").write_text('brain = "work"\n')
    assert resolve_brain(cwd=project).name == "work"
    set_value("hosts.codex.brains", ["test"])
    with pytest.raises(Forbidden):
        resolve_brain(cwd=project, host="codex")


def test_resolve_without_config(tmp_path: Path):
    with pytest.raises(NotConfigured):
        resolve_brain(cwd=tmp_path)
