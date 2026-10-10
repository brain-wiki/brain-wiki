from __future__ import annotations

from pathlib import Path

import pytest

from brainwiki.config.manifest import parse_manifest
from brainwiki.config.resolve import resolve_brain
from brainwiki.errors import Conflict, NotConfigured, UsageError
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
    )
    assert m.layout.topics_dir == "topics"
    assert m.privacy_rank("sensitive") == 1
    assert set(m.unknown_keys) == {"weird", "layout.foo"}
    assert m.profile("unknown-host").write == ["episodes"]
    assert m.profile(None).can("consolidate")


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
