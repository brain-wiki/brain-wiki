"""Fail when something in src/brainwiki is more visible than its users need.

Package boundaries:
- Every module in a sub-package is private (`_name.py`); the package's API is what its
  `__init__.py` re-exports, listed in `__all__`.
- Code outside a package (other packages, top-level modules, scripts) imports only that API,
  never a private module. Tests may import private modules.
- Every re-export is used outside its package; otherwise drop it.

Names:
- A module-level name is public (no leading underscore) only when another module, a test, or
  a script uses it, it names a class in a public signature, or it is listed in ALLOWED below.

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
    # `brain bench` looks suites up by name (cli/_cmd_bench.py).
    ("brainwiki.bench._suites", "retrieval"),
    ("brainwiki.bench._suites", "lint"),
    ("brainwiki.bench._suites", "consolidation"),
    ("brainwiki.bench._suites", "perf"),
    ("brainwiki.bench._suites", "agent"),
    # MCP tool input models: their names become schema titles agents see.
    ("brainwiki.mcp._server", "RuleConfirmation"),
    ("brainwiki.mcp._server", "HarvestClaim"),
    ("brainwiki.mcp._server", "HarvestEntry"),
}
CONVENTIONAL = {"log", "logger"}


def _modname(path: Path) -> str:
    parts = list(path.relative_to(SRC).with_suffix("").parts)
    return ".".join(parts[:-1] if parts[-1] == "__init__" else parts)


def _package(mod: str) -> str | None:
    """`brainwiki.index` for anything inside it; None for top-level modules."""
    parts = mod.split(".")
    if len(parts) >= 2 and (SRC / "brainwiki" / parts[1]).is_dir():
        return ".".join(parts[:2])
    return None


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


def _all_names(tree: ast.Module) -> list[str]:
    for node in tree.body:
        if (
            isinstance(node, ast.Assign)
            and any(isinstance(t, ast.Name) and t.id == "__all__" for t in node.targets)
            and isinstance(node.value, (ast.List, ast.Tuple))
        ):
            return [str(e.value) for e in node.value.elts if isinstance(e, ast.Constant)]
    return []


def problems() -> list[str]:
    modules = {_modname(p): p for p in sorted(SRC.rglob("*.py")) if "__pycache__" not in p.parts}
    trees = {m: ast.parse(p.read_text(encoding="utf-8")) for m, p in modules.items()}
    packages = {m for m, p in modules.items() if p.name == "__init__.py" and m != "brainwiki"}
    found: list[str] = []

    def where(mod: str, line: int) -> str:
        return f"{modules[mod].relative_to(ROOT)}:{line}"

    # What each package re-exports: names, and private modules exposed as namespaces.
    reexports: dict[tuple[str, str], tuple[str, str]] = {}  # (package, public) -> (module, name)
    namespaces: dict[str, str] = {}  # "brainwiki.hosts.connect" -> "brainwiki.hosts._connect"
    for pkg in sorted(packages):
        exported: list[str] = []
        for node in trees[pkg].body:
            if isinstance(node, ast.ImportFrom) and node.module and node.module != "__future__":
                for a in node.names:
                    public = a.asname or a.name
                    exported.append(public)
                    if node.module == pkg:
                        namespaces[f"{pkg}.{public}"] = f"{pkg}.{a.name}"
                    else:
                        reexports[(pkg, public)] = (node.module, a.name)
        if sorted(_all_names(trees[pkg])) != sorted(exported):
            found.append(f"{where(pkg, 1)}: __all__ must list exactly the re-exported names")
    for mod in modules:
        pkg = _package(mod)
        if pkg and mod != pkg and not mod.rsplit(".", 1)[1].startswith("_"):
            found.append(
                f"{where(mod, 1)}: modules inside a package are private; "
                f"rename it _{mod.rsplit('.', 1)[1]}.py"
            )

    def resolve(module: str, name: str) -> tuple[str, str]:
        """Follow re-exports to the module that defines `name`."""
        while (module, name) in reexports:
            module, name = reexports[(module, name)]
        return module, name

    users: dict[tuple[str, str], set[str]] = defaultdict(set)
    readers = list(modules.items()) + [
        (str(p.relative_to(ROOT)), p)
        for d in ("tests", "scripts")
        for p in sorted((ROOT / d).rglob("*.py"))
        if "__pycache__" not in p.parts and p != Path(__file__).resolve()
    ]
    for reader, path in readers:
        text = path.read_text(encoding="utf-8")
        tree = trees.get(reader) or ast.parse(text)
        reader_pkg = _package(reader) if reader in modules else None
        guarded = reader in modules or reader.startswith("scripts")  # tests may reach inside
        aliases: dict[str, str] = {}
        for node in ast.walk(tree):
            if not (
                isinstance(node, ast.ImportFrom)
                and node.module
                and node.module.startswith("brainwiki")
            ):
                continue
            target_pkg = _package(node.module)
            for a in node.names:
                full = f"{node.module}.{a.name}"
                private = node.module.rsplit(".", 1)[-1].startswith("_") or (
                    node.module in packages and a.name.startswith("_")
                )
                if guarded and target_pkg and target_pkg != reader_pkg and private:
                    found.append(
                        f"{path.relative_to(ROOT)}:{node.lineno}: imports {full} from outside "
                        f"{target_pkg}; use what {target_pkg} exports"
                    )
                users[(node.module, a.name)].add(reader)
                if full in modules or full in namespaces:
                    aliases[a.asname or a.name] = namespaces.get(full, full)
                else:
                    users[resolve(node.module, a.name)].add(reader)
        for node in ast.walk(tree):
            if (
                isinstance(node, ast.Attribute)
                and isinstance(node.value, ast.Name)
                and node.value.id in aliases
            ):
                users[resolve(aliases[node.value.id], node.attr)].add(reader)
        for m in re.finditer(r"(brainwiki(?:\.\w+)+):(\w+)", text):
            users[(m.group(1), m.group(2))].add(reader)
            users[resolve(m.group(1), m.group(2))].add(reader)
    for m in re.finditer(
        r"(brainwiki(?:\.\w+)+):(\w+)", (ROOT / "pyproject.toml").read_text(encoding="utf-8")
    ):
        users[(m.group(1), m.group(2))].add("pyproject.toml")
        users[resolve(m.group(1), m.group(2))].add("pyproject.toml")

    def used_outside(pkg: str, public: str) -> bool:
        return any(not (u in modules and _package(u) == pkg) for u in users[(pkg, public)])

    for pkg, public in sorted(reexports):
        if not used_outside(pkg, public):
            found.append(f"{where(pkg, 1)}: {public} is exported but unused outside {pkg}")
    for full in sorted(namespaces):
        pkg, public = full.rsplit(".", 1)
        if not used_outside(pkg, public):
            found.append(f"{where(pkg, 1)}: {public} is exported but unused outside {pkg}")

    for mod, tree in trees.items():
        if mod in packages:
            continue
        in_signatures = _signature_names(tree)
        for name, line, kind in _public_defs(tree):
            if users[(mod, name)] - {mod} or (mod, name) in ALLOWED:
                continue
            if kind == "class" and name in in_signatures:
                continue
            found.append(
                f"{where(mod, line)}: {name} is public but used only in its module; name it _{name}"
            )
    return found


def main() -> int:
    found = problems()
    for line in found:
        print(f"   {line}")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
