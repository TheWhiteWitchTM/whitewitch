---
layout: default
title: RETRO Studio
description: "RETRO Studio is the dark window for RETRO MAGIC. C64, Apple II, and TI-99/4A. MAGIC, BASIC, and assembly. It starts black. Alpha. No account."
image: /assets/images/retro-studio.jpg
image_width: 1200
image_height: 630
permalink: /magic/retro/studio/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/retro-studio.jpg' | relative_url }}" alt="RETRO Studio. BASIC, assembly, yours." width="100%">

# 🖥️ RETRO Studio

[MAGIC Studio]({{ '/magic/studio/' | relative_url }}) is the window for the language that compiles to JavaScript. This is the window for the other compiler.

RETRO Studio is an Electron app for [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}). Black window, gold spark, Monaco, project tree, editor, bottom panel. It starts black. The status bar says Black. Click that if you want the lights on. It remembers, so you only have to disappoint me once.

The toolbar has the machine. C64, Apple II, or TI-99/4A. Next to that, what Run does with a `.magic` file: the host screen, the BASIC listing, or the assembly listing. A `.bas` file runs as BASIC. A `.asm` file runs as 6502. A `.a99` file runs as TMS9900.

Shift+F10 runs. Ctrl+F9 checks. Ctrl+F2 stops. The Screen tab draws the picture. An emoji used as a sprite becomes an 8×8 picture. On the C64 and the TI-99/4A that picture is a hardware sprite. The Apple II has no sprite chip, so the same bits are the lo-res picture, and the caption says so. `@3d` stops with an error. It does not fit these machines.

The Listing tab shows the BASIC or the assembly the compiler wrote. Edit listing opens that text in the editor. Examples opens the RETRO MAGIC samples, when that repo is sitting next to this one.

The terminal is a pipe. Each line runs in `bash`. There is no PTY, so a full-screen program will not work. There is no Ask panel. That panel lives on MAGIC Studio.

## Start

```
npm install
npm start
```

`npm start` builds RETRO MAGIC, then opens the window. `npm test` compiles hello, a sprite scene, and the hand-written BASIC and assembly samples. If a display is set, it also opens the window, runs `print "studio"`, and closes.

MIT. No account. Alpha, so the window can still move.

## Two repos

The window, and the 8-bit compiler. Roots. Clone them.

{% include retro-links.html %}
