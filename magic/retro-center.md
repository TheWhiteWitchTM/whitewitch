---
layout: default
title: RETRO Center
description: "RETRO Center is a Qt shelf for the Commodore 64, the Apple II, the TI-99/4A, the Amiga, and the Atari ST. Power on starts the emulator. Drop a disk you own on the window. Alpha. MIT."
image: /assets/images/retro-center.jpg
image_width: 1200
image_height: 630
permalink: /magic/retro/center/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/retro-center.jpg' | relative_url }}" alt="RETRO Center. Five machines, one shelf." width="100%">

# 🗄️ RETRO Center

The compilers write the program. This starts the machine.

RETRO Center is a Qt window for five emulators: VICE, LinApple, Libre99, FS-UAE, and Hatari. Power on starts the emulator. A game launch starts it with a disk image. Another machine is a name, a command, and a list of file types.

The classics on the shelf are cards. RETRO Center does not include commercial games. Pick a disk image you own, or drop it on the window. A file whose name matches a card fills that card.

Three original demos play immediately. Drift, on the C64. A moves left, D moves right. Miss a falling rock and the score stops. A boot disk for the Apple II. A short program for the Atari ST. Cartridges already installed for Libre99 are linked when the files are present.

Power on the Amiga uses the built-in AROS ROM. Add a Kickstart you own in Settings to boot original Amiga disks. Hatari runs with its bundled EmuTOS until you add a TOS image. If Hatari or FS-UAE is missing, the shelf can install the Flatpak.

## Build

Qt 6.4 or newer, with Qt Quick and Qt Quick Controls.

```bash
./build.sh
./build/retrocenter
```

`build.sh` prefers `~/Qt/6.12.0` and otherwise uses `qmake6`. `./build/retrocenter --check` prints which emulators were found and whether the bundled demos extracted.

The listing is [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}). The window for that listing is [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}). The C64 compilers are [RETRO Toolchain]({{ '/magic/retro/toolchain/' | relative_url }}).

MIT. No account. Alpha.

## Four repos

The 8-bit compiler, the window, the C64 toolchain, and the shelf. Roots. Clone them.

{% include retro-links.html %}
