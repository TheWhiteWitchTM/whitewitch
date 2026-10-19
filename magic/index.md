---
layout: default
title: MAGIC
description: "MAGIC mixes Lua and BASIC and compiles to JavaScript. Pictures, terminals, games. RETRO MAGIC is the 8-bit compiler. Alpha. MIT. No account."
image: /assets/images/magic.jpg
image_width: 1200
image_height: 630
permalink: /magic/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/magic.jpg' | relative_url }}" alt="MAGIC. Lua, BASIC, JavaScript." width="100%">

# 🪄 MAGIC

I got tired of the timeline, so I wrote a language. The name is MAGIC. A committee did not get a vote. You can tell.

It mixes Lua and BASIC, and it compiles to JavaScript. A newline ends a statement. `end` closes the block. Keywords ignore case. Names keep theirs. Indexes start at 0, because I have already lived through the other argument. `nil`, `false`, `0`, and `""` are false. `--` comments out the rest of the line. `$"..."` fills text. `=` assigns. `==` compares. This is not a riddle.

`@canvas` is a picture. `@terminal` is a grid of text. There's also 3D, a UI kit, sound, hex boards, and the usual game helpers. A language that cannot move a sprite is just a slower way to be annoyed.

## A program

```
@canvas
@games

let engine = new Engine({ width: 480, height: 270 })
let spark = engine.sprite("✦", 240, 135, 42)

fn frame()
  if engine.isKeyDown("ArrowRight") then
    spark.x = spark.x + 4
  end
  engine.update()
  engine.canvas.draw()
  requestAnimationFrame(frame)
end

requestAnimationFrame(frame)
```

`magic run` runs that file. `magic app` writes an Electron project around it. `magic pack` writes the same project, and `magic pack --build` also builds the app. The window keeps `contextIsolation` on, `nodeIntegration` off, and `sandbox` on. Alpha. It can still change. If it does something stupid, the code is in the repo, which is the point of the links below.

MIT. No account. No share-to-unlock. No quiet sponsor hiding in the footer.

The short course, if you want to read before you clone, is [on the language site](https://thewhitewitchtm.github.io/MAGIC/). The repo is still the copy that can change under you. The editor, if you want a window that starts black, is [MAGIC Studio]({{ '/magic/studio/' | relative_url }}). The smaller desk, with the big Run button, is [MAGIC Apprentice]({{ '/magic/apprentice/' | relative_url }}).

## Two compilers

This page is MAGIC. It compiles to JavaScript. Pictures, a terminal, 3D, a UI kit, sound, hex boards, games, and an Electron window.

[RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) is the other compiler. A script still looks like MAGIC. The output is BASIC and assembly for the Commodore 64, the Apple II, and the TI-99/4A. `@3d` stays here. It does not fit those machines. The window for that one is [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}).

## Three repos

The language, the window, and the smaller desk. Roots. Not a signup form with a trailer.

{% include repo-links.html %}
