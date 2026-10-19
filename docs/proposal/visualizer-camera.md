# Visualizer camera: turning at the cursor, view modes, and a navigation control

Status: draft; research done 2026-10-19; open questions in §6. Not built.

The map can be turned since the layers design
([visualizer §3](../design/visualizer.md#3-rendering)), but turning feels
unnatural and has no on-screen control. This proposal takes what map and 3D
tools have settled on and fits it to the map's planes and rings.

## 1. What is wrong today

| Problem | Why it matters |
|---|---|
| Shift+drag turns around the point at the center of the screen, wherever the cursor is | Turning while pointing at a ring near the edge swings that ring away, and the user has to pan back |
| Nothing on screen shows the heading or tilt | After a turn, the user cannot tell which way is north or how to get back |
| Resetting is only the `R` key | People who do not read the shortcuts never find it |
| One way of looking | Some tasks want a flat, top-down map (reading the layout), others a free 3D view (seeing the levels) |

## 2. What others do

| Tool | Turn and tilt | Pivot | Reset | 2D and 3D |
|---|---|---|---|---|
| Google Maps (vector map) | Shift+drag: up and down tilts, left and right turns the heading. Shift+arrow keys do the same | The map's center | The Rotate control in the bottom right combines tilt and rotate; the 3D map's Compass control resets the heading to north | Tilt is capped by zoom: 30° at zoom 10 or lower, rising to 67.5° at zoom 15.5 |
| Google Earth (web) | Ctrl+drag; Shift+arrow keys rotate the globe | Not documented | Compass button: true north. Keys: `n` north, `u` top-down, `r` reset the view | A button in the bottom right switches between top-down and orbiting 3D, labeled with the mode it switches to. Key `o` |
| MapLibre GL JS | Right-drag or Ctrl+drag turns and tilts | The map's center | The navigation control holds zoom buttons and a compass; with `visualizePitch` the compass tilts to show the pitch | Pitch is part of the camera |
| Blender | Middle-drag orbits | "Auto Depth" orbits around the surface under the cursor; "Orbit Around Selection" around the selection | View menu | Perspective and orthographic toggle |
| camera-controls (our library) | Any button can rotate | `setOrbitPoint(x, y, z)` moves the pivot without moving the camera; it must not run during a transition | `rotateTo`, `setLookAt` | Works with a perspective or orthographic camera |

Three patterns recur:

- Turning is Shift+drag (or a second button), and Shift+arrow keys turn too.
- A compass in the corner shows the heading, and clicking it resets to north.
- A control switches between a flat top-down view and a turnable 3D view.

The pivot under the cursor comes from 3D tools, not from maps. Maps pivot at
the center because the user pans first. Our map has many separate places (rings
on several planes), and pointing at one before turning is the natural gesture.

## 3. Turn around the point under the cursor

- On Shift+drag (or a right-drag, §6 question 1), the pivot is what the cursor
  points at: a star or topic center within a few pixels, or else the point on the
  plane of the topic in view. The camera does not move when the pivot changes;
  only the turn does.
- A small ring marks the pivot while the turn lasts, so the user sees what the
  view turns around.
- When the turn ends, the pivot moves back to the point at the center of the
  screen on the same plane, again without moving the camera, so that zooms,
  flights, and the level of detail work from a centered target as before.
- A flight in progress stops before the pivot changes (camera-controls cannot set
  a pivot during a transition).

## 4. Three view modes

| Mode | Tilt | Heading | Planes | Shift+drag | For |
|---|---|---|---|---|---|
| 2D | Straight down, fixed | Turnable | Shown from above; see §6 question 2 | Turns the heading | Reading the layout and the rings as a flat map |
| 2.5D (default) | 50°, fixed | Turnable | Stacked | Turns the heading | Everyday use: the levels show, and no accidental tilt |
| 3D | 0° to 78°, free | Turnable | Stacked | Turns and tilts | Looking between the planes and along links |

- Switching modes animates the tilt, and the mode is remembered like the
  graphics setting, with `?view=` in the URL to override it.
- Flights keep the mode's tilt and the user's heading.

## 5. A navigation control

A small stack in the bottom right corner, the place Google Maps, Google Earth,
and MapLibre all use:

```
 ┌──────┐
 │  ⊙N  │  compass: the needle points north and tilts with the view;
 ├──────┤           click for north up at the mode's tilt, drag to turn
 │ 2D   │
 │ 2.5D │  view mode, the current one lit
 │ 3D   │
 ├──────┤
 │  +   │  zoom in and out, toward the center of the screen
 │  −   │
 ├──────┤
 │  ⤢   │  reset the view: north up, the mode's tilt, the place in view framed
 └──────┘
```

Keys and gestures, following Google Maps and Google Earth where ours are free:

| Input | Does | From |
|---|---|---|
| Shift+drag | Turn around the point under the cursor (tilt too, in 3D) | Google Maps, Google Earth; the pivot from Blender's Auto Depth |
| Shift+← / → | Turn the heading by 15° | Google Maps, Google Earth |
| Shift+↑ / ↓ | Tilt by 10°, in 3D | Google Maps |
| `N` | North up, keeping the tilt | Google Earth |
| `U` | Straight down (2D) | Google Earth |
| `V` | Next view mode | Google Earth uses `o`, which is our Overview |
| `R` | Reset the view, as the ⤢ button | Google Earth |
| Two-finger twist, two-finger drag up or down | Turn; tilt in 3D | Google Maps, MapLibre (follow-up) |

`R` today resets the heading and tilt around the same point. It becomes the
full reset, and the compass click takes over the orientation-only reset.

## 6. Open questions

1. Should a right-drag turn the view, as in Google Maps and MapLibre, instead of
   panning as it does now?
2. In 2D, should the planes flatten onto plane 0? From straight above, a
   parent's ring covers the sub-topics packed under it either way; reserving the
   ring's area when packing would fix that, at the cost of larger footprints.
3. Is `V` right for the view mode, with `O` kept for the overview?
4. Should tilt be capped when zoomed out, as Google Maps does, so the overview
   never shows the map edge-on?

## 7. Changes

| Area | Change |
|---|---|
| Viz scene | Pivot under the cursor with a marker; view modes with animated tilt; Shift+arrow keys; optional flattening in 2D |
| Viz HUD | The navigation control; the shortcuts sheet; the mode remembered and read from `?view=` |
| Docs | [Visualizer](../design/visualizer.md) §3 and §4 rewritten when built; this proposal deleted |

## Sources

- Google Maps vector map tilt and rotation:
  https://developers.google.com/maps/documentation/javascript/vector-map
- Google Maps controls (Rotate control) and 3D map controls (Compass, Tilt):
  https://developers.google.com/maps/documentation/javascript/controls,
  https://developers.google.com/maps/documentation/javascript/3d/map-controls
- Google Earth navigation and keyboard shortcuts:
  https://developers.google.com/maps/documentation/earth/navigate-the-globe,
  https://developers.google.com/maps/documentation/earth/use-keyboard-shortcuts
- MapLibre navigation control options:
  https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/NavigationControlOptions/
- Blender navigation preferences:
  https://docs.blender.org/manual/en/latest/editors/preferences/navigation.html
- camera-controls 2.10.1, `setOrbitPoint` in its type declarations.
