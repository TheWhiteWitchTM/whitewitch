---
layout: default
title: Tools changelog
description: What changed in the tools, the Play link, previews, and install-as-app.
permalink: /changes/
---

# Changes

## 2026-10-19

- **MAGIC** sits in the menu after Content. [MAGIC](https://thewhitewitchtm.github.io/whitewitch/magic/), [Studio](https://thewhitewitchtm.github.io/whitewitch/magic/studio/), and [Apprentice](https://thewhitewitchtm.github.io/whitewitch/magic/apprentice/) are real pages now. Each one links the repo roots: [MAGIC](https://github.com/TheWhiteWitchTM/MAGIC), [MAGIC Studio](https://github.com/TheWhiteWitchTM/MAGIC-Studio), and [MAGIC Apprentice](https://github.com/TheWhiteWitchTM/MAGIC-Apprentice).
- **RETRO MAGIC** sits under that menu, after a separator. [RETRO MAGIC](https://thewhitewitchtm.github.io/whitewitch/magic/retro/) writes BASIC and assembly for the C64, the Apple II, and the TI-99/4A. [RETRO Studio](https://thewhitewitchtm.github.io/whitewitch/magic/retro/studio/) is its window. The menu says MAGIC and RETRO MAGIC, so the two compilers are not one item. Repos: [RETRO-MAGIC](https://github.com/TheWhiteWitchTM/RETRO-MAGIC) and [RETRO-Studio](https://github.com/TheWhiteWitchTM/RETRO-Studio).

## 2026-10-18

- **Play** opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/) in a new tab. This site stays where it was.
- **Open as app.** Chrome and Edge show an install bar when the site can be installed. The button opens the browser’s install prompt. iPhone and iPad get the Add to Home Screen hint instead. Dismiss it and it stays dismissed on that browser.

## 2026-10-17

- **Play** leaves this site. The menu item opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/). Old `/games/` addresses redirect to the same games over there.
- **X previews.** Blog and Rants pointed at image files that were not in the repo, so the card image 404’d. Those cards are in, at 1200×630. The default card is `/assets/images/og.jpg`, also 1200×630. Head tags now send an absolute `og:image` and `twitter:image`, plus type, width, and height when the size is known. Blog posts use the blog card. Rants use the rants card.
- **App Icon Wizard** at `/tools/icon-wizard/`. Drop an image and it builds the iOS and web-app sizes (favicon, apple-touch, 192, 512, maskable), plus a manifest and a zip. It stays in the browser.
- **Install as app.** `manifest.webmanifest`, home-screen icons, and a service worker so the browser can offer install / open as app.
