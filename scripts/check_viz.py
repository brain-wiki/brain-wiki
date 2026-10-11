"""Check the committed visualizer bundle against its source (design doc 12 §5).

- src/brainwiki/viz/app/ has index.html, the assets it references, and THIRD_PARTY_NOTICES.txt.
- viz-app/package-lock.json resolves packages from the public npm registry only.
- When viz-app/node_modules exists, a fresh build must equal the committed bundle byte for byte.

Exit 1 on any problem.
"""

from __future__ import annotations

import filecmp
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "brainwiki" / "viz" / "app"
SRC = ROOT / "viz-app"
PUBLIC = "https://registry.npmjs.org/"


def bundle_problems(app: Path = APP) -> list[str]:
    index = app / "index.html"
    if not index.is_file():
        return [f"missing {index.relative_to(ROOT)}; run `npm run build` in viz-app"]
    problems = []
    for ref in re.findall(r'(?:src|href)="/(assets/[^"]+)"', index.read_text(encoding="utf-8")):
        if not (app / ref).is_file():
            problems.append(f"index.html references a missing file: {ref}")
    if not (app / "THIRD_PARTY_NOTICES.txt").is_file():
        problems.append("missing THIRD_PARTY_NOTICES.txt next to the bundle")
    return problems


def lock_problems(lock: Path = SRC / "package-lock.json") -> list[str]:
    data = json.loads(lock.read_text(encoding="utf-8"))
    bad = sorted(
        {
            meta["resolved"].split("/")[2]
            for meta in data.get("packages", {}).values()
            if "resolved" in meta and not meta["resolved"].startswith(PUBLIC)
        }
    )
    return [f"package-lock.json resolves from a non-public registry: {host}" for host in bad]


def rebuild_problems() -> list[str]:
    npx = shutil.which("npx")
    if npx is None or not (SRC / "node_modules").is_dir():
        print("   skipped rebuild: run `npm ci` in viz-app to compare the bundle with its source")
        return []
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / "app"
        done = subprocess.run(
            [npx, "vite", "build", "--outDir", str(out), "--emptyOutDir", "--logLevel", "error"],
            cwd=SRC,
            capture_output=True,
            text=True,
            check=False,
        )
        if done.returncode != 0:
            return [f"vite build failed: {done.stderr.strip()[-500:]}"]
        cmp = filecmp.dircmp(out, APP, ignore=["THIRD_PARTY_NOTICES.txt"])
        stale = _differences(cmp)
    return (
        [
            f"committed bundle differs from viz-app source ({', '.join(stale)}); run `npm run build` in viz-app"
        ]
        if stale
        else []
    )


def _differences(cmp: filecmp.dircmp) -> list[str]:
    out = [*cmp.left_only, *cmp.right_only, *cmp.diff_files]
    for sub in cmp.subdirs.values():
        out += _differences(sub)
    return out


def main() -> int:
    problems = bundle_problems() + lock_problems() + rebuild_problems()
    for p in problems:
        print(f"   {p}")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
