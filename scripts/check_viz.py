"""Check the committed visualizer bundle (design doc 12 §5).

The front end's source lives in the brain-wiki-viz repository; this repository commits only
its build, in src/brainwiki/viz/app/.

- The bundle has index.html, the assets it references, and THIRD_PARTY_NOTICES.txt.
- BUILD_INFO.json names the brain-wiki-viz commit it was built from, built from a clean tree.
- With --source PATH (a brain-wiki-viz checkout at that commit, after `npm ci`), a fresh build
  must equal the committed bundle byte for byte.

Exit 1 on any problem.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "brainwiki" / "viz" / "app"
COMMIT = re.compile(r"[0-9a-f]{40}")


def bundle_problems(app: Path = APP) -> list[str]:
    index = app / "index.html"
    if not index.is_file():
        return [f"missing {index}; run `npm run build` in brain-wiki-viz"]
    problems = []
    for ref in re.findall(r'(?:src|href)="/(assets/[^"]+)"', index.read_text(encoding="utf-8")):
        if not (app / ref).is_file():
            problems.append(f"index.html references a missing file: {ref}")
    if not (app / "THIRD_PARTY_NOTICES.txt").is_file():
        problems.append("missing THIRD_PARTY_NOTICES.txt next to the bundle")
    return problems + build_info_problems(app)


def build_info_problems(app: Path = APP) -> list[str]:
    path = app / "BUILD_INFO.json"
    try:
        info = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return [
            "missing or unreadable BUILD_INFO.json; rebuild with `npm run build` in brain-wiki-viz"
        ]
    problems = []
    if info.get("source") != "brain-wiki-viz" or not COMMIT.fullmatch(str(info.get("commit", ""))):
        problems.append("BUILD_INFO.json does not name a brain-wiki-viz commit")
    if info.get("dirty"):
        problems.append(
            "the bundle was built from uncommitted brain-wiki-viz changes; commit there and rebuild"
        )
    return problems


def source_problems(source: Path, app: Path = APP) -> list[str]:
    npm = shutil.which("npm")
    if npm is None or not (source / "node_modules").is_dir():
        return [f"cannot verify against {source}: needs npm and `npm ci` there"]
    head = subprocess.run(
        ["git", "rev-parse", "HEAD"], cwd=source, capture_output=True, text=True, check=False
    ).stdout.strip()
    want = json.loads((app / "BUILD_INFO.json").read_text(encoding="utf-8")).get("commit")
    problems = (
        []
        if head == want
        else [f"{source} is at {head[:12]}, but the bundle was built from {str(want)[:12]}"]
    )
    env = {**os.environ, "BRAIN_WIKI_APP_DIR": str(app)}
    done = subprocess.run(
        [npm, "run", "--silent", "verify"],
        cwd=source,
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )
    if done.returncode != 0:
        problems.append((done.stderr or done.stdout).strip()[-500:])
    return problems


def main() -> int:
    parser = argparse.ArgumentParser(description=(__doc__ or "").split("\n\n")[0])
    parser.add_argument(
        "--source", type=Path, help="a brain-wiki-viz checkout to rebuild and compare"
    )
    args = parser.parse_args()
    problems = bundle_problems()
    if args.source and not problems:
        problems += source_problems(args.source.resolve())
    for p in problems:
        print(f"   {p}")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
