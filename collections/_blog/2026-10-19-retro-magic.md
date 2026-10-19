---
layout: default
title: "I Wrote BASIC for Three Dead Machines So the Feed Could Wait"
date: 2026-10-19 12:00:00
featured: true
description: "RETRO MAGIC writes BASIC and assembly for the C64, the Apple II, and the TI-99/4A. RETRO Studio is the window. No login. No 3D. Alpha."
tags: [tech, meta]
---

## 🕹️ I Wrote BASIC for Three Dead Machines So the Feed Could Wait

The language was not enough. MAGIC still compiles to JavaScript, which means a browser, which means the year we are actually in. I wanted a machine that cannot show me a notification.

So there's RETRO MAGIC. A script still looks like MAGIC. The output is BASIC and assembly for the Commodore 64, the Apple II, and the TI-99/4A. The first two share a 6502. The TI uses a TMS9900, because Texas had to be different, and for once I respect it.

A sparkle is still an emoji. The compiler turns it into an 8×8 picture. On the C64 that picture is a VIC-II sprite. On the TI it is a TMS9918 sprite. The Apple II has no sprite chip, so the same bits get plotted in lo-res. The listing says where it landed. I'm not going to call a smear a sprite just to be polite.

C64 BASIC is V2. It doesn't have ELSE. The listing doesn't invent one. If the program needed another path, write the other line. Welcome to 1982. Names on the C64 and the Apple are two characters, and a REM at the top remembers what they used to mean. The TI sprite programs are Extended BASIC, because even that machine found a way to charge extra for the good toys.

`@3d` stays home. The compiler stops and tells you to drop it. A breadbox is not a graphics card, and I'm not rasterizing a cube in BASIC so a paragraph can say immersive. Pictures, a terminal, sound, hex boards, games, and a small text UI still fit. That's already more than these machines asked for.

RETRO Studio is the window. It starts black. Gold spark, project tree, editor, and a panel for the run, the machine, or the listing. The toolbar picks the machine. It also picks whether a `.magic` file runs on the host screen, comes out as BASIC, or comes out as assembly. A `.bas` file is BASIC. A `.asm` file is 6502. A `.a99` file is the TMS9900. I didn't expect to type that sentence this year, and yet here we are.

There's no Ask panel. That one lives on MAGIC Studio, with the computers that still boot into the present. The breadbox doesn't need a chatbot to explain PRINT. Shift+F10 runs. If the program is stupid, the listing is on the next tab. Argue with that.

Alpha. MIT. No account. No share-to-unlock. These machines are older than most of the arguments on the timeline, and they still boot faster than a terms-of-service page.

- [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) — the 8-bit compiler
- [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}) — the window
- [MAGIC]({{ '/magic/' | relative_url }}) — still JavaScript, if you insist on living in the present

You're welcome. Or sorry. Depends on whether you miss ELSE.
