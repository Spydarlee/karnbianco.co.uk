---
title: MIPS Assembly Music Sequencer
description: A simple music sequencer capable of playing back music stored in a custom binary format.
summaryImage: mips-sequencer.jpg
tags: 
date: 2010-11-12
---
Using the [MIPS](http://en.wikipedia.org/wiki/MIPS_architecture) assembly language I developed a simple music sequencer capable of playing back music stored in a custom binary format. The MIPS architecture is the basis for the PlayStation Portable’s core CPU, but for this project I was using it in a simulated environment. MARS (the MIPS Assembler and Runtime Simulator) is an open-source MIPS IDE released by [Missouri State University](http://courses.missouristate.edu/KenVollmar/MARS/) that I was able to use and extend.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/F7_ipG2mj0M?si=m0UCLDi7I1trysTp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The current version (4.0.1) of MARS boasts two system call (Syscall) functions for simulating MIDI playback through Java (which MARS is built in). Unfortunately these are not designed for the kind of intense MIDI usage I needed for the project. As such, I took it upon myself (with assistance from Dominic Bodman) to write two improved Syscalls – one for playing a note, and another for setting a MIDI channel with a given instrument – and make the resulting project available to my classmates.

The above recording (which features an impromptu appearance from yours truly) would have sounded far worse in the original version of MARS. Notes in a chord would not have played at the same time, becoming arpeggiated, and slowdown would have been a big problem. After I solved these issues I was able to distribute the new version of MARS among my University classmates so that anyone who wished to could make use of it in their assignments.

As for my actual MIPS assembly program; it works by reading in data extracted from MIDI files (achieved with a custom C# application I wrote as part of my “tool chain”) and saved into a custom (.karn) binary format. My MIPS assembly then reads this data in, dynamically allocating memory on the heap depending on song length. From here it sets up any necessary MIDI channels with the appropriate instrument, and handles playing back notes at the correct intervals.

High-level languages and third-party game engines are becoming increasingly commonplace in the games industry, but low-level optimisations are still important. As my first foray into assembly programming, this project has been great fun. Working simultaneously on improving MARS in Java and writing my sequencer in MIPS assembly reinforced just how much is being done for us under the hood of higher level languages, and how much we take for granted.