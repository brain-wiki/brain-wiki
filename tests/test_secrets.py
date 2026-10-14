"""Secret detection: real credential shapes are caught, code that only names them is not."""

from __future__ import annotations

import pytest

from brainwiki.write._secrets import find_secrets

# Assembled at runtime so secret scanners do not flag this file.
OPENAI = "sk-" + "proj-" + "Ab3dE5gH7jK9mN1pQ3sT5vW7yZ9bC2eF4"
GENERIC = "token = " + "'q8Lz" + "R2vX9mPw4KtB7nYc'"


@pytest.mark.parametrize("text", [OPENAI, f"key: {OPENAI}", GENERIC])
def test_credentials_are_found(text):
    assert find_secrets(text)


@pytest.mark.parametrize(
    "text",
    [
        "https://example.com/2026/07/10/sk-learning-path-for-new-hires/",
        "apiKey: process.env.ANTHROPIC_API_KEY,",
        "const tokens = run.usage?.totalTokens ?? 0;",
        "console.log(`Input tokens: ${stats.tokens.input}`);",
        "export GITHUB_TOKEN=YOUR_GITHUB_TOKEN",
        "jwt_token = generate_jwt(APP_ID, PRIVATE_KEY)",
        "--set-secrets=GITHUB_PAT=github-pat:latest",
        'ApiKey = Environment.GetEnvironmentVariable("LUMEN_SYNC_KEY"),',
    ],
)
def test_code_that_names_a_secret_is_not_one(text):
    assert find_secrets(text) == []
