# D13: Pending episodes are known by location

Status: accepted.
Argued in: [brain format §9](../design/brain-format.md#9-episodes).

An episode is pending while it is in `inbox/episodes/` and consolidated once it moves to `archive/episodes/`. No watermark file records which episodes are done, so the state is visible in any file browser and survives sync.

## Alternatives considered

- A watermark in machine state. It would differ between devices and be invisible in the brain.
