# D9: Provenance comes from the code path

Status: accepted.
Argued in: [write path §3](../design/write-path.md#3-provenance-and-inputs), [security](../design/security-and-privacy.md).

The code that writes an episode sets its provenance (`bw-origin`, `bw-inputs`, `bw-agent`, session, and turn range), never the model's text. `brain_log_episode` records `inputs: unknown`, because the MCP server cannot see what else the agent read in that session. Harvest takes provenance from its own parse of the transcript.

A rule is written only from the user's own words, which the user confirms. Content an agent read, whatever its inputs, never becomes a rule.

## Alternatives considered

- Trusting what the model reports about itself. Text planted in a web page could claim to come from the user.
