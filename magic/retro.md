---
layout: default
title: RETRO MAGIC
description: "RETRO MAGIC writes BASIC and assembly for the C64, the Apple II, and the TI-99/4A. A script still looks like MAGIC. MAGIC itself compiles to JavaScript. Alpha. MIT. No account."
image: /assets/images/retro-magic.jpg
image_width: 1200
image_height: 630
permalink: /magic/retro/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/retro-magic.jpg' | relative_url }}" alt="RETRO MAGIC. C64, Apple II, TI-99." width="100%">

# 🕹️ RETRO MAGIC

[MAGIC]({{ '/magic/' | relative_url }}) compiles to JavaScript. RETRO MAGIC writes BASIC and assembly for three machines.

The Commodore 64, the Apple II, and the TI-99/4A. A script still looks like MAGIC. The C64 and the Apple II share the 6502. The TI-99/4A uses the TMS9900. C64 BASIC is V2, so the listing avoids `ELSE`. Apple BASIC is Applesoft. TI sprite programs are Extended BASIC. Names in the C64 and Apple listings are two characters, and a `REM` line maps them back.

`@canvas`, `@terminal`, `@sound`, `@hex`, `@games`, and a small text `@ui` stay. `@3d` does not fit these machines. The compiler stops and tells you to drop it.

An emoji in a sprite becomes an 8×8 picture. On the C64 that picture is a VIC-II sprite. On the TI-99/4A it is a TMS9918 sprite. The Apple II has no sprite chip, so the same picture is plotted in lo-res.

`@c64`, `@apple2`, and `@ti99` keep a statement on that machine. `@target("c64")` picks the machine when the command line does not.

## A sprite

```
@canvas

let engine = new Engine({ width: 320, height: 200 })
let spark = engine.sprite("✦", 40, 90, 28)
engine.motion(spark, 8, 0)
```

`✦` compiles to the same 8×8 bits on every machine. The note in the listing says where it landed: `VIC-II`, `TMS9918`, or lo-res.

## Commands

```
npx retro run examples/hello.magic --target c64
npx retro compile examples/scene.magic --target all --as basic
npx retro compile examples/scene.magic --target ti99 --as asm
npx retro basic run examples/add.bas --target apple2
npx retro asm run examples/add.asm --cpu 6502 --target c64
npx retro asm run examples/add.a99 --cpu 9900
```

`retro run` is the host screen. It prints what the program prints. `retro compile` writes the BASIC listing, the assembly listing, or both. `retro basic` runs, checks, or tokenizes a listing. Tokenize writes a C64 or Applesoft program image. `retro asm` assembles and runs 6502 or TMS9900 source. The C64 image is a PRG with a SYS stub. The Apple II image has a 4-byte start-and-length header. The TI-99/4A image is a raw binary from `>A000`.

Text is 40×25 on the C64, 40×24 on the Apple II, and 32×24 on the TI-99/4A. The C64 has 8 VIC-II sprites. The TI-99/4A has 32 TMS9918 sprites. The Apple II plots the emoji in lo-res.

The JavaScript language, with 3D and an Electron window, is [MAGIC]({{ '/magic/' | relative_url }}). The dark window for these three machines is [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}).

MIT. No account. Alpha. It can still change.

## Two repos

The 8-bit compiler, and the window that runs it. Roots. Clone them.

{% include retro-links.html %}
