---
layout: default
title: RETRO Toolchain
description: "RETRO Toolchain is a Commodore 64 assembler, plus C, Pascal, and BASIC compilers. JavaScript, no packages, one PRG. Space Invaders is the sample. Alpha. MIT."
image: /assets/images/retro-toolchain.jpg
image_width: 1200
image_height: 630
permalink: /magic/retro/toolchain/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/retro-toolchain.jpg' | relative_url }}" alt="RETRO Toolchain. Assembler, C, Pascal, BASIC." width="100%">

# 🛠️ RETRO Toolchain

[RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) writes a listing. This is the toolbox under it.

A 6510 assembler, and C, Pascal, and BASIC compilers. They are JavaScript. Node runs them. No packages. One CPU table, one memory map, one runtime. Each compiler emits a PRG through the assembler. `LOAD` and `RUN`. The same file runs in VICE.

The C is the integer kind. Pascal is the integer kind. BASIC keeps the whole variable name, which stock C64 BASIC refused to do. `examples/invaders.c` is Space Invaders. A and D move the cannon. Comma and period do the same. Space fires. One shot at a time.

```bash
cd c64
npm test
node bin/c64asm.js examples/border.asm --run
./play.sh
```

`./play.sh` builds the invaders and opens VICE. `./play.sh --build` writes the PRG and leaves the emulator alone. On this machine `c64 -autostart` is VICE `x64sc`.

The Apple II and the TI-99 get the same shape of toolbox after the C64 has had two passes.

The shelf that powers the machine on is [RETRO Center]({{ '/magic/retro/center/' | relative_url }}). The listing, if the script should still look like MAGIC, is [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}).

MIT. No account. Alpha.

## Four repos

The 8-bit compiler, the window, the C64 toolchain, and the shelf. Roots. Clone them.

{% include retro-links.html %}
