---
layout: default
title: "The Shelf Has a Power Button"
date: 2026-10-22 19:30:00 +0200
featured: true
description: "RETRO Center powers on the C64, the Apple II, the TI-99/4A, the Amiga, and the Atari ST. Your disks. The toolchain and the window were already there."
image: /assets/images/retro-center.jpg
image_width: 1200
image_height: 630
tags: [tech]
---

## 🗄️ The Shelf Has a Power Button

RETRO MAGIC writes the listing. RETRO Studio is the window for that listing. RETRO Toolchain is the C compiler that comes out as a PRG. None of those start the machine.

[RETRO Center]({{ '/magic/retro/center/' | relative_url }}) does. Qt. Dark. Amber. Commodore 64, Apple II, TI-99/4A, Amiga, Atari ST. Power on starts the emulator. Drop a disk you own on the window and the card fills in. The commercial games on the shelf are names, not files. I am not shipping someone else's Boulder Dash.

Three things play the moment it opens. Drift, on the C64. A and D. Miss a rock and the score stops. A boot disk for the Apple II, so LinApple can prove it woke up. A short program for the Atari ST. Hatari and FS-UAE install from the shelf if they are missing. Kickstart stays yours. Power on the Amiga uses AROS until Settings points at a ROM you own.

```bash
./build.sh
./build/retrocenter
```

The other three were already up. They are on the same menu now, so the shelf is not a door with two rooms and a toolbox in the hall.

- [RETRO Center]({{ '/magic/retro/center/' | relative_url }}) — power on
- [RETRO Toolchain]({{ '/magic/retro/toolchain/' | relative_url }}) — assembler, C, Pascal, BASIC
- [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) — the listing
- [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}) — the window for the listing

You're welcome. The joystick is still in the drawer.
