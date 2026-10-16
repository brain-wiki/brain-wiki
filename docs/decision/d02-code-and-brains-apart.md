# D2: Code and brains live apart

Status: accepted.
Argued in: [config and storage](../design/config-and-storage.md).

The repository holds only source code. Brains live at paths the user chooses and registers by name, and one user can have several brains, for example one for work and one for personal notes. Configuration picks the brain for each call, project, or host.

## Alternatives considered

- A brain inside the repository. Personal data would sit next to published code.
- One brain per user. There would be no way to keep work and personal knowledge apart.
