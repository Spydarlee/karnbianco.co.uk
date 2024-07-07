---
title: 3D Software Renderer
description: Simple software renderer written in C++.
summaryImage: software-renderer.jpg
tags:
date: 2010-12-26
---
My 3D software renderer was written in C++ and is capable of displaying 3D models loaded from id Software’s [.md2 format](http://en.wikipedia.org/wiki/MD2_%28file_format%29). It utilizes the GDI+ graphics library to set pixels on the screen, but is otherwise entirely custom code.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HAuabF-zVkQ?si=X0MTsGARw9y4R5_s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Key Features

**3D Transformations** Models loaded from.md2 files can be translated, rotated and scaled in 3D space. The camera can also be translated and rotated in real-time.

**Back-face Culling** Only visible polygon’s are rendered. Visibility is determined by checking the dot product of a polygon’s surface normal with the vector from the camera to that polygon for negativity.

**Depth Sorting** A basic implementation of the [Painter’s algorithm](http://en.wikipedia.org/wiki/Painter's_algorithm) ensures that those polygons furthest from the camera are rendered first, while those nearest are drawn last and on top of everything else.

**Custom Flat Shading** The FillPolygon() routine provided by GDI+ has been replaced by a custom routine that allows each pixel on the screen to be set separately using GDI+’s SetPixel().

**Gouraud Shading** Shading/lighting is computed by interpolating between vertices with Gouraud shading. This is less accurate and less computationally-intensive than per-pixel lighting (as in Phong shading) but far more aesthetically appealing than flat shading.

**Lighting** Multiple ambient, directional and point lights are all implemented with diffuse reflection. Spot lights and specular reflection were partially implemented (but not demoed).

**Texturing** MD2 models that include a corresponding texture file in the .pcx format can be rendered to the screen with that texture, along with the effects of any applied lighting.
