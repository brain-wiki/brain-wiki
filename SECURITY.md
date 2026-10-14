# Security

## Reporting a vulnerability

Please report vulnerabilities privately through GitHub's "Report a
vulnerability" form on this repository (Security → Advisories), not in a
public issue. Include the version, the steps to reproduce, and the impact
you see. You will get an acknowledgement within a week.

## Scope

Of particular interest:

- anything that lets content from a web page, a document, or another
  person become a standing rule or an instruction to the user's agents
  without the user's confirmation;
- profile or host limits that let an agent write what its profile does not
  allow, or use a brain it is not allowed to;
- an episode or edit that passes as the user's own, or as untainted, when it
  is not;
- secrets that reach a brain despite redaction;
- path traversal from any input that becomes a file path;
- the local visualizer server being reachable or writable from elsewhere;
- hooks that can break, block, or inject commands into an agent host.

The threat model is in
[`docs/design/10-security-and-privacy.md`](docs/design/10-security-and-privacy.md).
