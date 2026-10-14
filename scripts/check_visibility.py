"""Fail when a module-level name is public but nothing outside its module uses it.

A name in src/brainwiki is public (no leading underscore) only when another module, a test, or
a script uses it, it names a class in a public signature, or it is listed in ALLOWED below.
Everything else is `_private`, so a module's interface is exactly what others depend on.

    python scripts/check_visibility.py
"""

from __future__ import annotations

import ast
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

# Public on purpose although nothing imports them by name.
ALLOWED = {
    # `brain bench` looks suites up by name (cli/cmd_bench.py).
    ("brainwiki.bench.suites", "retrieval"),
    ("brainwiki.bench.suites", "lint"),
    ("brainwiki.bench.suites", "consolidation"),
    ("brainwiki.bench.suites", "perf"),
    ("brainwiki.bench.suites", "agent"),
    # MCP tool input models: their names become schema titles agents see.
    ("brainwiki.mcp.server", "RuleConfirmation"),
    ("brainwiki.mcp.server", "HarvestClaim"),
    ("brainwiki.mcp.server", "HarvestEntry"),
    # The MCP server's constructor, for embedding and tests.
    ("brainwiki.mcp.server", "build_server"),
}
CONVENTIONAL = {"log", "logger"}


def _modname(path: Path) -> str:
    parts = list(path.relative_to(SRC).with_suffix("").parts)
    return ".".join(parts[:-1] if parts[-1] == "__init__" else parts)


def _public_defs(tree: ast.Module) -> list[tuple[str, int, str]]:
    out = []
    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            out.append(
                (node.name, node.lineno, "class" if isinstance(node, ast.ClassDef) else "def")
            )
        elif isinstance(node, (ast.Assign, ast.AnnAssign)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            out += [(t.id, node.lineno, "name") for t in targets if isinstance(t, ast.Name)]
    return [d for d in out if not d[0].startswith("_") and d[0] not in CONVENTIONAL]


def _signature_names(tree: ast.Module) -> set[str]:
    """Names in public function signatures and public dataclass fields."""
    names: set[str] = set()

    def annotation(node: ast.AST | None) -> None:
        for sub in ast.walk(node) if node is not None else ():
            if isinstance(sub, ast.Name):
                names.add(sub.id)

    def function(f: ast.FunctionDef | ast.AsyncFunctionDef) -> None:
        if f.name.startswith("_") and not f.name.startswith("__"):
            return
        for arg in f.args.posonlyargs + f.args.args + f.args.kwonlyargs:
            annotation(arg.annotation)
        annotation(f.returns)

    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            function(node)
        elif isinstance(node, ast.ClassDef) and not node.name.startswith("_"):
            for item in node.body:
                if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    function(item)
                elif (
                    isinstance(item, ast.AnnAssign)
                    and isinstance(item.target, ast.Name)
                    and not item.target.id.startswith("_")
                ):
                    annotation(item.annotation)
    return names


def problems() -> list[str]:
    modules = {_modname(p): p for p in sorted(SRC.rglob("*.py")) if "__pycache__" not in p.parts}
    trees = {m: ast.parse(p.read_text(encoding="utf-8")) for m, p in modules.items()}
    users: dict[tuple[str, str], set[str]] = defaultdict(set)
    readers = list(modules.items()) + [
        (str(p.relative_to(ROOT)), p)
        for d in ("tests", "scripts")
        for p in sorted((ROOT / d).rglob("*.py"))
        if "__pycache__" not in p.parts and p != Path(__file__).resolve()
    ]
    for name, path in readers:
        text = path.read_text(encoding="utf-8")
        tree = trees.get(name) or ast.parse(text)
        aliases: dict[str, str] = {}
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.module:
                for a in node.names:
                    users[(node.module, a.name)].add(name)
                    if f"{node.module}.{a.name}" in modules:
                        aliases[a.asname or a.name] = f"{node.module}.{a.name}"
            elif isinstance(node, ast.Import):
                for a in node.names:
                    if a.name in modules and a.asname:
                        aliases[a.asname] = a.name
        for node in ast.walk(tree):
            if (
                isinstance(node, ast.Attribute)
                and isinstance(node.value, ast.Name)
                and node.value.id in aliases
            ):
                users[(aliases[node.value.id], node.attr)].add(name)
        for m in re.finditer(r"(brainwiki(?:\.\w+)+):(\w+)", text):
            users[(m.group(1), m.group(2))].add(name)
    for m in re.finditer(
        r"(brainwiki(?:\.\w+)+):(\w+)", (ROOT / "pyproject.toml").read_text(encoding="utf-8")
    ):
        users[(m.group(1), m.group(2))].add("pyproject.toml")

    found = []
    for mod, tree in trees.items():
        in_signatures = _signature_names(tree)
        for name, line, kind in _public_defs(tree):
            outside = users[(mod, name)] - {mod}
            if outside or (mod, name) in ALLOWED:
                continue
            if kind == "class" and name in in_signatures:
                continue
            rel = modules[mod].relative_to(ROOT)
            found.append(
                f"{rel}:{line}: {name} is public but used only in its module; name it _{name}"
            )
    return found


def main() -> int:
    found = problems()
    for line in found:
        print(f"   {line}")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
