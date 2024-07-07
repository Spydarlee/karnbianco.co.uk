---
title: GLEE – DirectX Engine
description: GLEE, aka the graphics/game library and extensible engine - written in C++.
summaryImage: glee.jpg
tags: 
date: 2011-05-10
---
GLEE – or graphics/game library and extensible engine – is an “under-development” engine for 3D graphics and game applications written in C++ using the DirectX rendering API. It bears absolutely no resemblance to the television show of the same name. However, if it were sentient, it would probably enjoy show tunes.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LRPsJ61I4Og?si=DZdgr7gIfqDu2XsC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Features

**Per-Pixel Lighting:** A shader-based implementation of the Phong shading and reflection model for accurate lighting at the pixel level. Currently supports up to 16 directional and point lights (8 of each).

**Multiple Windows/Viewports:** Multiple viewports and render windows can be freely created/adjusted at runtime. Potential applications include level editors and 3D editing software.

**Flexible Cameras:** Fixed, first- and third-person cameras are all supported. The latter can be controlled by either keyboard and mouse or (Xbox 360) gamepad input. Each can be tied to a specific viewport allowing for multiple views of a scene.

**XML Scene Loading:** Each scene is organized as a scene graph containing numerous scene nodes. Each of these can be described in an XML file and loaded in at runtime; therefore reducing compilation time.

**Collision Detection:** Collisions tests between spheres and axis-aligned bounding boxes (AABBs) are supported. An event-based system allows individual nodes/classes to respond to collision events as required.

**Terrain:** Terrain class supports generation using a heightmap, and rendering using multiple textures blended together based on terrain height. Collision with the terrain is supported to allow for objects to move around on its surface.

**L-Systems:** Simple scholastic, bracketed L-Systems allow for “procedurally” generated trees and foliage to decorate scenes. Currently limited to being rendered as collections of line primitives.

**Input:** Raw (unprocessed) keyboard and mouse input fully supported to allow for highly-accurate user input. Microsoft’s XInput library utilized to support input from an Xbox 360 gamepad.