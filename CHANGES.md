---
layout: default
title: Tools changelog
description: What changed in the tools, the Play link, previews, and install-as-app.
permalink: /changes/
---

# Changes

## 2026-10-22

- **RETRO Center.** A Qt shelf for the C64, the Apple II, the TI-99/4A, the Amiga, and the Atari ST. Power on starts the emulator. Classics on the shelf are cards. The page is [RETRO Center](https://thewhitewitchtm.github.io/whitewitch/magic/retro/center/). The repo is [RETRO-Center](https://github.com/TheWhiteWitchTM/RETRO-Center).
- **Retro menu.** [RETRO Toolchain](https://thewhitewitchtm.github.io/whitewitch/magic/retro/toolchain/) and [RETRO Center](https://thewhitewitchtm.github.io/whitewitch/magic/retro/center/) sit with RETRO MAGIC and RETRO Studio. The toolchain had a repo and a blog post. It has a page now.
- **Blog.** [The Shelf Has a Power Button](https://thewhitewitchtm.github.io/whitewitch/blog/2026-10-22-retro-center.html).

## 2026-10-21

- **LibreSky.** The long site was still introducing itself as politics only. The front page, the menu, the footer, the about page, and the head tags now name [LibreSky](https://thewhitewitchtm.github.io/LibreSky/), the Bluesky client. Edit, voice, video, and chat. The password stays with Bluesky.
- **Blog.** [The Breadbox Has a Compiler Now](https://thewhitewitchtm.github.io/whitewitch/blog/2026-10-21-c64-toolchain.html). Assembler, C, Pascal, BASIC, and Space Invaders. The repo is [RETRO-Toolchain](https://github.com/TheWhiteWitchTM/RETRO-Toolchain).

## 2026-10-19

- **MAGIC Overview** is the first item in the MAGIC menu. [MAGIC Overview](https://thewhitewitchtm.github.io/whitewitch/magic/overview/) is the short map: the goal, the five pages, and the five repos.
- **MAGIC** sits in the menu after Content. The items read [MAGIC](https://thewhitewitchtm.github.io/whitewitch/magic/), [MAGIC Studio](https://thewhitewitchtm.github.io/whitewitch/magic/studio/), and [MAGIC Apprentice](https://thewhitewitchtm.github.io/whitewitch/magic/apprentice/). A separator comes next. Under it: [RETRO MAGIC](https://thewhitewitchtm.github.io/whitewitch/magic/retro/) and [RETRO Studio](https://thewhitewitchtm.github.io/whitewitch/magic/retro/studio/). The two compilers are not one menu item. Repos: [MAGIC](https://github.com/TheWhiteWitchTM/MAGIC), [MAGIC Studio](https://github.com/TheWhiteWitchTM/MAGIC-Studio), [MAGIC Apprentice](https://github.com/TheWhiteWitchTM/MAGIC-Apprentice), [RETRO-MAGIC](https://github.com/TheWhiteWitchTM/RETRO-MAGIC), and [RETRO-Studio](https://github.com/TheWhiteWitchTM/RETRO-Studio).
- **Blog.** [I Wrote BASIC for Three Dead Machines So the Feed Could Wait](https://thewhitewitchtm.github.io/whitewitch/blog/2026-10-19-retro-magic.html). RETRO MAGIC and RETRO Studio, in the usual tone.

## 2026-10-18

- **Play** opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/) in a new tab. This site stays where it was.
- **Open as app.** Chrome and Edge show an install bar when the site can be installed. The button opens the browser’s install prompt. iPhone and iPad get the Add to Home Screen hint instead. Dismiss it and it stays dismissed on that browser.

## 2026-10-17

- **Play** leaves this site. The menu item opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/). Old `/games/` addresses redirect to the same games over there.
- **X previews.** Blog and Rants pointed at image files that were not in the repo, so the card image 404’d. Those cards are in, at 1200×630. The default card is `/assets/images/og.jpg`, also 1200×630. Head tags now send an absolute `og:image` and `twitter:image`, plus type, width, and height when the size is known. Blog posts use the blog card. Rants use the rants card.
- **App Icon Wizard** at `/tools/icon-wizard/`. Drop an image and it builds the iOS and web-app sizes (favicon, apple-touch, 192, 512, maskable), plus a manifest and a zip. It stays in the browser.
- **Install as app.** `manifest.webmanifest`, home-screen icons, and a service worker so the browser can offer install / open as app.
