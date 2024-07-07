---
title: Escape From Alcatraz
description: A point and click adventure game demo inspired by the LucasArts graphic adventure games of the 1990s.
summaryImage: alcatraz.jpg
tags:
  - games
date: 2010-12-15
---
_Escape from Alcatraz_ is a point and click adventure game inspired by LucasArts graphic adventure games from the 1990s, such as _The Curse of Monkey Island_ and _Grim Fandango_. It was developed using the Unreal Development Kit (UDK) over the course of several weeks.

Mechanics-wise, _Escape from Alcatraz_ is a complete game. In terms of content it features around ten-fifteen minutes of gameplay, assuming the player knows exactly what to do, as shown in the video walkthrough above. The aim of the game/demo is to collect items needed to make a fake head, which the main character can then use to placate the guards while he escapes during the night.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tNksUqPSYkM?si=tCuVFjzwePulTE5n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
### Unique Selling Points

**Point-and-click Interface** Movement, interactions, conversations, inventory navigation, and so on, are all handled exclusively using the mouse. There is no keyboard/gamepad input at all.

**Navigation Mesh Pathfinding** The Unreal Engine’s support for auto-generation of Navigation Meshes, which simplifies the representation of complex geometry, is utilized for pathfinding instead of traditional path nodes.

**Conversations** A linear, rather than fully branching, conversation system is included which supports multiple dialogue choices and item trading with non-playable characters. It uses [Scaleform](http://www.scaleform.com/) and Adobe Flash for its user interface.

**Inventory** The Scaleform-powered inventory supports a drag-and-drop interface for reordering and/or combining items. Items can each be examined individually, and the player can cycle through items without using the inventory UI courtesy of the scroll wheel.

**Interaction System** Most of the objects in Alcatraz can be interacted with in one way or another; almost all can be examined, while many can be used directly, or used in conjunction with the currently equipped inventory item.