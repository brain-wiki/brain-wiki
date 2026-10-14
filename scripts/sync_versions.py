"""Write the pyproject version into the plugin files and regenerate the generated plugin files.

The version in pyproject.toml is the only one maintained by hand. This script copies it into
every plugin manifest and every `brain-wiki==<version>` pin, regenerates the skill references
that mirror src/brainwiki/assets/, and writes Antigravity's always-on rule from the static
instruction block in src/brainwiki/hosts/instructions.py (design docs 08 §3.2, 13 §4, 15 §2).

    python scripts/sync_versions.py           # write changes
    python scripts/sync_versions.py --check   # change nothing; exit 1 on drift (for CI)
"""

from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import tomllib
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
ASSETS = Path("src/brainwiki/assets")

PIN = re.compile(r"brain-wiki==[^\s\"']+")

# Manifest version fields, as key paths into the parsed JSON.
VERSION_FIELDS: dict[str, list[tuple[str | int, ...]]] = {
    "plugin.json": [("version",)],
    ".claude-plugin/plugin.json": [("version",)],
    ".claude-plugin/marketplace.json": [("version",)],
    "server.json": [("version",), ("packages", 0, "version")],
}
# Files whose commands run a pinned release; each must hold at least one pin.
PIN_FILES = ["mcp.json", ".mcp.json", "mcp_config.json"]
RULE = Path("rules/brain-wiki.md")
JSON_FILES = list(VERSION_FIELDS) + PIN_FILES


def read_version(root: Path) -> str:
    with (root / "pyproject.toml").open("rb") as f:
        return tomllib.load(f)["project"]["version"]


def _set_path(data: Any, path: tuple[str | int, ...], value: str) -> None:
    for key in path[:-1]:
        data = data[key]
    data[path[-1]] = value


def _replace_pins(data: Any, version: str) -> tuple[Any, int]:
    """Return `data` with every pin set to `version`, and how many pins were found."""
    if isinstance(data, str):
        new, count = PIN.subn(f"brain-wiki=={version}", data)
        return new, count
    if isinstance(data, list):
        items = [_replace_pins(item, version) for item in data]
        return [item for item, _ in items], sum(n for _, n in items)
    if isinstance(data, dict):
        pairs = {key: _replace_pins(value, version) for key, value in data.items()}
        return {key: value for key, (value, _) in pairs.items()}, sum(n for _, n in pairs.values())
    return data, 0


def _header(source: Path) -> str:
    return (
        f"<!-- Generated from {source.as_posix()} by scripts/sync_versions.py. "
        "Do not edit; edit the source and rerun the script. -->\n\n"
    )


def expected(root: Path, version: str) -> tuple[dict[Path, str], list[str]]:
    """Map each managed file (relative to root) to its expected content; also return problems."""
    out: dict[Path, str] = {}
    problems: list[str] = []
    for name in JSON_FILES:
        path = root / name
        if not path.is_file():
            problems.append(f"missing: {name}")
            continue
        data, pins = _replace_pins(json.loads(path.read_text(encoding="utf-8")), version)
        if name in PIN_FILES and pins == 0:
            problems.append(f"no brain-wiki==<version> pin in {name}")
        for field in VERSION_FIELDS.get(name, []):
            try:
                _set_path(data, field, version)
            except (KeyError, IndexError, TypeError):
                problems.append(f"{name}: no version field at {'.'.join(map(str, field))}")
        out[Path(name)] = json.dumps(data, indent=2, ensure_ascii=False) + "\n"

    sources = {
        Path("skills/brain-maintain/references/consolidate.md"): ASSETS / "prompts/consolidate.md",
        Path("skills/brain-maintain/references/harvest.md"): ASSETS / "prompts/harvest.md",
    }
    for target, source in sources.items():
        if not (root / source).is_file():
            problems.append(f"missing: {source.as_posix()}")
            continue
        out[target] = _header(source) + (root / source).read_text(encoding="utf-8")
    rule = _rule(root)
    if rule is None:
        problems.append("missing: src/brainwiki/hosts/instructions.py")
    else:
        out[RULE] = rule
    return out, problems


def _rule(root: Path) -> str | None:
    """Antigravity's rule for a marketplace install: the block for the default profile, since
    nothing is known about the user's own profile yet."""
    import importlib.util

    source = root / "src/brainwiki/hosts/instructions.py"
    if not source.is_file():
        return None
    spec = importlib.util.spec_from_file_location("_brainwiki_instructions", source)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module  # dataclasses resolve annotations through sys.modules
    spec.loader.exec_module(module)
    return module.antigravity_rule(module.Access())


def run(root: Path, check: bool) -> int:
    version = read_version(root)
    managed, problems = expected(root, version)
    for problem in problems:
        print(problem, file=sys.stderr)

    drift: list[str] = []
    for rel, content in managed.items():
        path = root / rel
        current = path.read_text(encoding="utf-8") if path.is_file() else None
        if current == content:
            continue
        drift.append(rel.as_posix())
        if check:
            diff = difflib.unified_diff(
                (current or "").splitlines(keepends=True),
                content.splitlines(keepends=True),
                f"{rel.as_posix()} (current)",
                f"{rel.as_posix()} (expected)",
            )
            sys.stdout.writelines(diff)
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")

    verb = "out of sync" if check else "updated"
    for item in drift:
        print(f"{verb}: {item}")
    if check and not drift and not problems:
        print(f"plugin files match version {version}")
    return 1 if problems or (check and drift) else 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="change nothing; exit 1 on drift")
    parser.add_argument("--root", type=Path, default=ROOT, help=argparse.SUPPRESS)
    args = parser.parse_args(argv)
    return run(args.root, args.check)


if __name__ == "__main__":
    sys.exit(main())
