---
layout: default
title: MAGIC Overview
description: "MAGIC is a small language that compiles to JavaScript, plus a window, a kid's desk, and an 8-bit compiler for the C64, the Apple II, and the TI-99/4A. Five repos. Alpha. MIT. No account."
image: /assets/images/overview.jpg
image_width: 1200
image_height: 630
permalink: /magic/overview/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/overview.jpg' | relative_url }}" alt="MAGIC Overview. Five repos, one language." width="100%">

# ✨ MAGIC Overview

The goal is a language a person can read on a Tuesday. One script. A picture, a line of text, or a sprite that moves.

MAGIC mixes Lua and BASIC, and it compiles to JavaScript. A newline ends a statement. `end` closes the block. `@canvas` is a picture. `@terminal` is a grid of text. Games, sound, and 3D are modules you turn on when you want them.

[RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) is the same kind of script, aimed at three old machines. The Commodore 64, the Apple II, and the TI-99/4A. It writes BASIC and assembly. `@3d` stays with MAGIC. Those machines do not have it. [RETRO Toolchain]({{ '/magic/retro/toolchain/' | relative_url }}) is the C64 assembler and the C, Pascal, and BASIC compilers. [RETRO Center]({{ '/magic/retro/center/' | relative_url }}) is the shelf. Power on, or drop a disk you own. The Amiga and the Atari ST live there too.

Two windows, and one smaller desk.

[MAGIC Studio]({{ '/magic/studio/' | relative_url }}) is the dark editor for the JavaScript compiler. [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}) is the dark editor for the 8-bit one. [MAGIC Apprentice]({{ '/magic/apprentice/' | relative_url }}) is the desk for ages 8 to 16. A program on the page, a big Run button, and a plain sentence when something breaks.

MIT. No account. Alpha, so the edges can still move. The pages say what each piece is. The cards are the code.

## Five pages

- [MAGIC]({{ '/magic/' | relative_url }}) — the language. JavaScript.
- [MAGIC Studio]({{ '/magic/studio/' | relative_url }}) — the window.
- [MAGIC Apprentice]({{ '/magic/apprentice/' | relative_url }}) — the small desk.
- [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) — C64, Apple II, TI-99/4A.
- [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}) — the window for those machines.

## Five repos

The language, the window, and the smaller desk. Roots. Clone them.

{% include repo-links.html %}

The 8-bit compiler, its window, the C64 toolchain, and the shelf.

{% include retro-links.html %}
