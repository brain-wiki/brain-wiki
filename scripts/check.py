"""Run every check CI runs, locally: `uv run scripts/check.py` (design doc 13 §8)."""

from __future__ import annotations

import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN_FILES = (
    "plugin.json",
    "mcp.json",
    ".mcp.json",
    "mcp_config.json",
    "server.json",
)


def run(name: str, *argv: str) -> bool:
    print(f"== {name}: {' '.join(argv)}", flush=True)
    ok = subprocess.run(argv, cwd=ROOT, check=False).returncode == 0
    print(f"   {'ok' if ok else 'FAILED'}", flush=True)
    return ok


def wheel_contents() -> bool:
    print("== wheel contents", flush=True)
    with tempfile.TemporaryDirectory() as tmp:
        built = subprocess.run(
            ["uv", "build", "--wheel", "-o", tmp],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        if built.returncode != 0:
            print(built.stderr[-2000:])
            return False
        wheel = next(Path(tmp).glob("*.whl"))
        names = set(zipfile.ZipFile(wheel).namelist())
    required = [f"brainwiki/assets/plugin/{p}" for p in PLUGIN_FILES] + [
        "brainwiki/assets/prompts/consolidate.md",
        "brainwiki/assets/routines/brain-maintenance.md",
        "brainwiki/viz/app/index.html",
        "brainwiki/assets/plugin/skills/brain/SKILL.md",
    ]
    missing = [r for r in required if r not in names]
    print("   ok" if not missing else f"   FAILED, missing: {missing}", flush=True)
    return not missing


def main() -> int:
    python = sys.executable
    results = [
        run("ruff check", python, "-m", "ruff", "check", "src", "tests", "scripts"),
        run("ruff format", python, "-m", "ruff", "format", "--check", "src", "tests", "scripts"),
        run("tests", python, "-m", "pytest", "-q"),
        run("plugin versions", python, "scripts/sync_versions.py", "--check"),
        run("docs brain", python, "scripts/build_docs_brain.py", "--check"),
        run("visualizer bundle", python, "scripts/check_viz.py"),
        wheel_contents(),
    ]
    bench = ROOT / "src" / "brainwiki" / "bench"
    if bench.is_dir():
        with tempfile.TemporaryDirectory() as tmp:
            results.append(
                run(
                    "bench (offline, small)",
                    python,
                    "-m",
                    "brainwiki",
                    "bench",
                    "retrieval",
                    "lint",
                    "--sizes",
                    "300",
                    "--out",
                    tmp,
                )
            )
    failed = results.count(False)
    print(f"\n{len(results) - failed} of {len(results)} checks passed.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
