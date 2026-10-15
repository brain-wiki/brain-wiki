"""Which brain to open for a person at a terminal, when several are registered."""

from __future__ import annotations

import os
import sys
from typing import Any


def chosen_brain(args: Any) -> str | None:
    """The brain named on the command line (`brain viz NAME` or `--brain`), else, with several
    brains and a terminal, the one the user picks. The brain the command would open anyway is
    the default, so Enter keeps it; with one brain there is nothing to ask."""
    named = getattr(args, "which", None)
    if named and args.brain and named != args.brain:
        from brainwiki.errors import UsageError

        raise UsageError(f"two brains given: {named!r} and --brain {args.brain!r}")
    explicit = named or args.brain
    if explicit or os.environ.get("BRAIN_WIKI_BRAIN") or args.json or not sys.stdin.isatty():
        return explicit
    from brainwiki.config import load_user_config, resolve_brain
    from brainwiki.errors import BrainError

    user = load_user_config()
    names = sorted(user.brains)
    if len(names) < 2:
        return args.brain
    try:
        default = resolve_brain(None, user=user).name
    except BrainError:
        default = user.default
    if default not in names:
        default = names[0]
    for number, name in enumerate(names, 1):
        print(f"  {number}. {name}" + ("  (default)" if name == default else ""), file=sys.stderr)
    for _ in range(3):
        answer = input(f"Which brain? [{default}] ").strip()
        if not answer:
            return default
        if answer.isdigit() and 1 <= int(answer) <= len(names):
            return names[int(answer) - 1]
        if answer in names:
            return answer
        print(f"Pick a number from 1 to {len(names)}, or a name.", file=sys.stderr)
    return default
