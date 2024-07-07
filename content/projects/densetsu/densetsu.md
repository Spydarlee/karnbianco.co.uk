---
title: Densetsu
description: A Zelda-themed demo demonstrating physics and "AI" techniques.
summaryImage: densetsu.jpg
tags:
  - games
date: 2013-03-12
---
_Densetsu_ is a simple game demo built to demonstrate several physics and artificial intelligence techniques as part of a final year University project. The game uses assets from the seminal Super Nintendo game, _The Legend of Zelda: A Link to the Past_, and challenges players to dash around, sword in hand, collecting rupees, while avoiding (or fighting off) enemy guards.

The game features custom rigid body physics and a [separating axis theorem (SAT)](http://en.wikipedia.org/wiki/Separating_axis_theorem)-based collision to model all physical actions and reactions in the world. Surface friction is modelled alongside air resistance/drag (the latter affecting airborne projectiles such as the boomerang). Different surfaces have different friction coefficients and these can be altered at runtime, such as when the ground become slicker in the rain.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/sIDiXPt-78Y?si=dgtJ3tJhW2b4CoBV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Movement is all calculated using real(-ish) physics, be it linear momentum for player and AI movement or angular momentum in the case of the spinning boomerang. The effect of mass can best be seen in the “black holes” which are incredibly dense and suck in everything around them (well, everything that isn’t nailed down to the ground or it wouldn’t be a very fun game).

The guard’s artificial intelligence went through two major iterations. In the first, AI agents used the [Theta* algorithm](http://aigamedev.com/open/tutorials/theta-star-any-angle-paths/) (an A* variation) for pathfinding alongside simple finite state machines to search out and chase down the player. Once in contact enemies simply charged in at full-speed to attack the player. The video included above is from this first iteration.

The second version of _Densetsu_ replaced finite state machines with more powerful and versatile behaviour trees. A blackboard system was used to simulate agent-to-agent communication which allowed groups of enemy guards to (or at least _appear to_) work together to take down the player. This culminated in an _Assassin’s Creed_-esque combat system in which enemies cluster around the player but only attack (or feint an attack!) one by one.
## Sources

– Sprites and images: Sourced directly from _The Legend of Zelda: A Link to the Past_ and from [zfgc.com](http://zfgc.com/forum/index.php?topic=38894.0)  
– Title Screen Music: [The Legend of Zelda: A Link to the Past ‘Triforce Majeure’ (OC Remix)](http://ocremix.org/remix/OCR01184)  
– Game Over Music: [DJ ShaK – Legend of Zelda NES Remix](http://www.youtube.com/watch?v=j96Xgn2G-XQ)  
– Song of Storms remix: [The Legend of Zelda: Ocarina of Time ‘Thunderstruck’ (OC Remix)](http://ocremix.org/remix/OCR02328)  
– Dark World remix: [The Legend of Zelda: A Link to the Past ‘Dark World Orchestrated’](http://www.youtube.com/watch?v=Xd-jThRvlYI)  
– Sound effects: _The Legend of Zelda: Ocarina of Time_ and _A Link to the Past_ via [noproblo.dayjo.org](http://noproblo.dayjo.org/ZeldaSounds/)